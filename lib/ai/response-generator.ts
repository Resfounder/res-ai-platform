import { generateText, generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { anthropic } from "@ai-sdk/anthropic"
import { z } from "zod"

// AI Response Quality Schema
const ResponseQualitySchema = z.object({
  appropriateness: z.number().min(1).max(10),
  brandAlignment: z.number().min(1).max(10),
  helpfulness: z.number().min(1).max(10),
  professionalism: z.number().min(1).max(10),
  specificity: z.number().min(1).max(10),
  overallScore: z.number().min(1).max(10),
  issues: z.array(z.string()),
  suggestions: z.array(z.string()),
})

// Interaction Analysis Schema
const InteractionAnalysisSchema = z.object({
  sentiment: z.enum(["very_positive", "positive", "neutral", "negative", "very_negative"]),
  emotions: z.array(z.string()),
  topics: z.array(z.string()),
  urgency: z.enum(["low", "medium", "high", "critical"]),
  complexity: z.enum(["simple", "moderate", "complex"]),
  requiresHumanReview: z.boolean(),
  keyPoints: z.array(z.string()),
  customerIntent: z.string(),
})

export interface BrandVoice {
  businessName: string
  businessType: string
  personality: string[]
  tone: string
  values: string[]
  doNotSay: string[]
  preferredPhrases: string[]
  responseStyle: string
  ownerName?: string
  signature?: string
}

export interface Interaction {
  id: string
  platform: "google" | "facebook" | "instagram" | "yelp" | "tripadvisor"
  type: "review" | "comment" | "message" | "dm"
  content: string
  rating?: number
  customerName: string
  context?: {
    postContent?: string
    location?: string
    orderDetails?: string
  }
  timestamp: Date
}

export class AIResponseGenerator {
  private primaryModel = openai("gpt-4o")
  private fallbackModel = anthropic("claude-3-5-sonnet-20241022")

  async generateHighQualityResponse(
    interaction: Interaction,
    brandVoice: BrandVoice,
    options: {
      requireApproval?: boolean
      maxAttempts?: number
      qualityThreshold?: number
    } = {},
  ) {
    const { maxAttempts = 3, qualityThreshold = 8.0 } = options

    // Step 1: Deep analysis of the interaction
    const analysis = await this.analyzeInteraction(interaction)

    // Step 2: Generate multiple response candidates
    const candidates = await this.generateResponseCandidates(interaction, brandVoice, analysis, maxAttempts)

    // Step 3: Quality assessment for each candidate
    const qualityAssessments = await Promise.all(
      candidates.map((candidate) => this.assessResponseQuality(candidate, interaction, brandVoice, analysis)),
    )

    // Step 4: Select best response or regenerate
    const bestResponse = this.selectBestResponse(candidates, qualityAssessments)

    if (bestResponse.quality.overallScore < qualityThreshold) {
      // If quality is still poor, try with fallback model
      const fallbackResponse = await this.generateWithFallbackModel(interaction, brandVoice, analysis)

      const fallbackQuality = await this.assessResponseQuality(fallbackResponse, interaction, brandVoice, analysis)

      if (fallbackQuality.overallScore > bestResponse.quality.overallScore) {
        return {
          response: fallbackResponse,
          quality: fallbackQuality,
          analysis,
          model: "claude-3.5-sonnet",
          requiresHumanReview: fallbackQuality.overallScore < qualityThreshold,
        }
      }
    }

    return {
      response: bestResponse.response,
      quality: bestResponse.quality,
      analysis,
      model: "gpt-4o",
      requiresHumanReview: bestResponse.quality.overallScore < qualityThreshold,
    }
  }

  private async analyzeInteraction(interaction: Interaction) {
    const { object } = await generateObject({
      model: this.primaryModel,
      schema: InteractionAnalysisSchema,
      prompt: `Analyze this customer interaction in detail:
      
      Platform: ${interaction.platform}
      Type: ${interaction.type}
      Customer: ${interaction.customerName}
      ${interaction.rating ? `Rating: ${interaction.rating}/5 stars` : ""}
      Content: "${interaction.content}"
      ${interaction.context?.postContent ? `Post Context: "${interaction.context.postContent}"` : ""}
      
      Provide a comprehensive analysis focusing on:
      1. Emotional tone and sentiment
      2. Key topics and concerns mentioned
      3. Level of urgency and complexity
      4. Customer's underlying intent
      5. Whether this needs human review
      
      Be thorough and nuanced in your analysis.`,
    })

    return object
  }

  private async generateResponseCandidates(
    interaction: Interaction,
    brandVoice: BrandVoice,
    analysis: z.infer<typeof InteractionAnalysisSchema>,
    count = 3,
  ) {
    const systemPrompt = this.buildSystemPrompt(brandVoice, analysis)
    const userPrompt = this.buildUserPrompt(interaction, analysis)

    const candidates = await Promise.all(
      Array.from({ length: count }, async (_, i) => {
        const { text } = await generateText({
          model: this.primaryModel,
          system: systemPrompt,
          prompt: userPrompt,
          temperature: 0.3 + i * 0.2, // Vary creativity
          maxTokens: 300,
        })
        return text
      }),
    )

    return candidates
  }

  private buildSystemPrompt(brandVoice: BrandVoice, analysis: z.infer<typeof InteractionAnalysisSchema>): string {
    return `You are responding as ${brandVoice.businessName}, a ${brandVoice.businessType}.

BRAND PERSONALITY:
- Tone: ${brandVoice.tone}
- Personality traits: ${brandVoice.personality.join(", ")}
- Core values: ${brandVoice.values.join(", ")}
- Response style: ${brandVoice.responseStyle}

COMMUNICATION GUIDELINES:
- Use these preferred phrases when appropriate: ${brandVoice.preferredPhrases.join(", ")}
- NEVER say: ${brandVoice.doNotSay.join(", ")}
- ${brandVoice.ownerName ? `Sign responses as ${brandVoice.ownerName}` : "Use business name"}

INTERACTION CONTEXT:
- Customer sentiment: ${analysis.sentiment}
- Urgency level: ${analysis.urgency}
- Key topics: ${analysis.keyPoints.join(", ")}
- Customer intent: ${analysis.customerIntent}

RESPONSE REQUIREMENTS:
1. Address the customer by name when appropriate
2. Acknowledge specific points they mentioned
3. Match the emotional tone appropriately
4. Provide helpful, actionable information
5. Maintain professional yet personal communication
6. ${analysis.sentiment.includes("negative") ? "Apologize sincerely and offer resolution" : "Express genuine appreciation"}
7. Include a call-to-action when appropriate
8. Keep response length appropriate for the platform

Remember: You represent ${brandVoice.businessName} and every response reflects on the business reputation.`
  }

  private buildUserPrompt(interaction: Interaction, analysis: z.infer<typeof InteractionAnalysisSchema>): string {
    const platformContext = {
      google: "This is a Google Review response that will be public",
      facebook: "This is a Facebook comment response",
      instagram: "This is an Instagram comment response - keep it engaging",
      yelp: "This is a Yelp review response that will be public",
      tripadvisor: "This is a TripAdvisor review response",
    }

    return `${platformContext[interaction.platform]}.

CUSTOMER INTERACTION:
Customer: ${interaction.customerName}
${interaction.rating ? `Rating: ${interaction.rating}/5 stars` : ""}
Message: "${interaction.content}"
${interaction.context?.postContent ? `Context: They're commenting on "${interaction.context.postContent}"` : ""}

ANALYSIS INSIGHTS:
- This customer seems ${analysis.sentiment} 
- Main concerns: ${analysis.keyPoints.join(", ")}
- They want: ${analysis.customerIntent}
- Urgency: ${analysis.urgency}

Generate a response that:
1. Feels authentic and personal (not robotic)
2. Addresses their specific points
3. Matches our brand voice perfectly
4. Provides real value to the customer
5. Encourages positive future interaction

Make it sound like a real person from our business wrote it.`
  }

  private async assessResponseQuality(
    response: string,
    interaction: Interaction,
    brandVoice: BrandVoice,
    analysis: z.infer<typeof InteractionAnalysisSchema>,
  ) {
    const { object } = await generateObject({
      model: this.primaryModel,
      schema: ResponseQualitySchema,
      prompt: `Evaluate this AI-generated response for quality:

ORIGINAL CUSTOMER MESSAGE:
"${interaction.content}"
${interaction.rating ? `Rating: ${interaction.rating}/5` : ""}

BRAND VOICE REQUIREMENTS:
- Business: ${brandVoice.businessName} (${brandVoice.businessType})
- Tone: ${brandVoice.tone}
- Personality: ${brandVoice.personality.join(", ")}
- Should NOT say: ${brandVoice.doNotSay.join(", ")}

AI GENERATED RESPONSE:
"${response}"

Rate each aspect from 1-10:

1. APPROPRIATENESS: Does it match the situation and platform?
2. BRAND ALIGNMENT: Does it sound like this specific business?
3. HELPFULNESS: Does it provide value to the customer?
4. PROFESSIONALISM: Is it well-written and appropriate?
5. SPECIFICITY: Does it address specific points mentioned?

Also provide:
- Overall score (1-10)
- List any issues or problems
- Suggestions for improvement

Be critical but fair in your assessment.`,
    })

    return object
  }

  private selectBestResponse(candidates: string[], qualities: z.infer<typeof ResponseQualitySchema>[]) {
    let bestIndex = 0
    let bestScore = qualities[0].overallScore

    qualities.forEach((quality, index) => {
      if (quality.overallScore > bestScore) {
        bestScore = quality.overallScore
        bestIndex = index
      }
    })

    return {
      response: candidates[bestIndex],
      quality: qualities[bestIndex],
    }
  }

  private async generateWithFallbackModel(
    interaction: Interaction,
    brandVoice: BrandVoice,
    analysis: z.infer<typeof InteractionAnalysisSchema>,
  ) {
    const systemPrompt = this.buildSystemPrompt(brandVoice, analysis)
    const userPrompt = this.buildUserPrompt(interaction, analysis)

    const { text } = await generateText({
      model: this.fallbackModel,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.3,
      maxTokens: 300,
    })

    return text
  }
}
