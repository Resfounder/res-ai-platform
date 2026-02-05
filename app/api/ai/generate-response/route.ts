import { type NextRequest, NextResponse } from "next/server"
import { generateText, generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

// Response Quality Schema
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

export async function POST(req: NextRequest) {
  try {
    const { interaction, brandVoice } = await req.json()

    const startTime = Date.now()

    // Step 1: Analyze the interaction
    const analysisResult = await generateObject({
      model: openai("gpt-4o"),
      schema: InteractionAnalysisSchema,
      prompt: `Analyze this customer interaction in detail:
      
      Platform: ${interaction.platform}
      Type: ${interaction.type}
      Customer: ${interaction.customerName}
      ${interaction.rating ? `Rating: ${interaction.rating}/5 stars` : ""}
      Content: "${interaction.content}"
      ${interaction.context ? `Context: "${interaction.context}"` : ""}
      
      Provide a comprehensive analysis focusing on:
      1. Emotional tone and sentiment
      2. Key topics and concerns mentioned
      3. Level of urgency and complexity
      4. Customer's underlying intent
      5. Whether this needs human review
      
      Be thorough and nuanced in your analysis.`,
    })

    const analysis = analysisResult.object

    // Step 2: Generate response
    const systemPrompt = `You are responding as ${brandVoice.businessName}, a ${brandVoice.businessType}.

BRAND PERSONALITY:
- Tone: ${brandVoice.tone}
- Personality traits: ${brandVoice.personality.join(", ")}
- Core values: ${brandVoice.values.join(", ")}
- Response style: ${brandVoice.responseStyle}

COMMUNICATION GUIDELINES:
${brandVoice.preferredPhrases?.length ? `- Use these preferred phrases when appropriate: ${brandVoice.preferredPhrases.join(", ")}` : ""}
${brandVoice.doNotSay?.length ? `- NEVER say: ${brandVoice.doNotSay.join(", ")}` : ""}
${brandVoice.ownerName ? `- Sign responses as ${brandVoice.ownerName}` : "- Use business name"}

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

    const userPrompt = `This is a ${interaction.platform} ${interaction.type} response.

CUSTOMER INTERACTION:
Customer: ${interaction.customerName}
${interaction.rating ? `Rating: ${interaction.rating}/5 stars` : ""}
Message: "${interaction.content}"
${interaction.context ? `Context: They're commenting on "${interaction.context}"` : ""}

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

    const responseResult = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.3,
      maxTokens: 300,
    })

    const response = responseResult.text

    // Step 3: Assess response quality
    const qualityResult = await generateObject({
      model: openai("gpt-4o"),
      schema: ResponseQualitySchema,
      prompt: `Evaluate this AI-generated response for quality:

ORIGINAL CUSTOMER MESSAGE:
"${interaction.content}"
${interaction.rating ? `Rating: ${interaction.rating}/5` : ""}

BRAND VOICE REQUIREMENTS:
- Business: ${brandVoice.businessName} (${brandVoice.businessType})
- Tone: ${brandVoice.tone}
- Personality: ${brandVoice.personality.join(", ")}
${brandVoice.doNotSay?.length ? `- Should NOT say: ${brandVoice.doNotSay.join(", ")}` : ""}

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

    const quality = qualityResult.object
    const processingTime = (Date.now() - startTime) / 1000

    return NextResponse.json({
      response,
      quality,
      analysis,
      model: "gpt-4o",
      processingTime,
    })
  } catch (error) {
    console.error("Error generating AI response:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
