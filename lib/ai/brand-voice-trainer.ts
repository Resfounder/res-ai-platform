import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

const BrandVoiceAnalysisSchema = z.object({
  tone: z.string(),
  personality: z.array(z.string()),
  commonPhrases: z.array(z.string()),
  responsePatterns: z.array(z.string()),
  values: z.array(z.string()),
  communicationStyle: z.string(),
  doNotSay: z.array(z.string()),
  preferredGreetings: z.array(z.string()),
  closingPhrases: z.array(z.string()),
})

export interface TrainingData {
  approvedResponses: string[]
  businessDescription: string
  existingContent?: string[] // Website content, social posts, etc.
  ownerInput?: string
}

export class BrandVoiceTrainer {
  async trainBrandVoice(businessId: string, trainingData: TrainingData) {
    // Step 1: Analyze existing approved responses
    const responseAnalysis = await this.analyzeApprovedResponses(trainingData.approvedResponses)

    // Step 2: Analyze business content
    const contentAnalysis = await this.analyzeBusinessContent(
      trainingData.businessDescription,
      trainingData.existingContent || [],
    )

    // Step 3: Combine insights
    const brandVoice = await this.synthesizeBrandVoice(responseAnalysis, contentAnalysis, trainingData.ownerInput)

    // Step 4: Validate and refine
    const validatedVoice = await this.validateBrandVoice(brandVoice, trainingData)

    // Step 5: Store and version
    await this.storeBrandVoice(businessId, validatedVoice)

    return validatedVoice
  }

  private async analyzeApprovedResponses(responses: string[]) {
    if (responses.length === 0) return null

    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: BrandVoiceAnalysisSchema,
      prompt: `Analyze these approved business responses to extract brand voice patterns:

${responses.map((response, i) => `Response ${i + 1}: "${response}"`).join("\n\n")}

Extract:
1. Consistent tone and personality traits
2. Common phrases and expressions used
3. Response patterns and structures
4. Underlying values and principles
5. Communication style preferences
6. Things they would never say
7. Preferred greetings and closings

Be specific and detailed in your analysis.`,
    })

    return object
  }

  private async analyzeBusinessContent(description: string, content: string[]) {
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: BrandVoiceAnalysisSchema,
      prompt: `Analyze this business content to understand their brand voice:

Business Description: "${description}"

Additional Content:
${content.map((item, i) => `Content ${i + 1}: "${item}"`).join("\n\n")}

Extract the brand voice characteristics that should be reflected in customer responses.`,
    })

    return object
  }

  private async synthesizeBrandVoice(
    responseAnalysis: z.infer<typeof BrandVoiceAnalysisSchema> | null,
    contentAnalysis: z.infer<typeof BrandVoiceAnalysisSchema>,
    ownerInput?: string,
  ) {
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: BrandVoiceAnalysisSchema,
      prompt: `Synthesize a comprehensive brand voice profile from these analyses:

${responseAnalysis ? `Response Analysis: ${JSON.stringify(responseAnalysis, null, 2)}` : "No response data available"}

Content Analysis: ${JSON.stringify(contentAnalysis, null, 2)}

${ownerInput ? `Owner Input: "${ownerInput}"` : ""}

Create a unified brand voice profile that:
1. Combines insights from all sources
2. Resolves any conflicts intelligently
3. Provides clear, actionable guidelines
4. Ensures consistency across all responses

Focus on creating a distinctive, authentic voice that customers will recognize.`,
    })

    return object
  }

  private async validateBrandVoice(brandVoice: z.infer<typeof BrandVoiceAnalysisSchema>, trainingData: TrainingData) {
    // Test the brand voice against sample scenarios
    const testScenarios = [
      { type: "positive_review", content: "Amazing service! Best restaurant in town!" },
      { type: "negative_review", content: "Food was cold and service was slow. Very disappointed." },
      { type: "question", content: "Do you have gluten-free options?" },
      { type: "complaint", content: "I had to wait 45 minutes for my order. This is unacceptable." },
    ]

    // Generate test responses using the brand voice
    // Compare with approved responses if available
    // Adjust if necessary

    return brandVoice
  }

  private async storeBrandVoice(businessId: string, brandVoice: z.infer<typeof BrandVoiceAnalysisSchema>) {
    // Store in database with versioning
    console.log(`Storing brand voice for business ${businessId}:`, brandVoice)
  }

  async updateBrandVoice(businessId: string, newApprovedResponses: string[]) {
    // Incremental learning from new approved responses
    const currentVoice = await this.getCurrentBrandVoice(businessId)
    const newAnalysis = await this.analyzeApprovedResponses(newApprovedResponses)

    if (newAnalysis) {
      const updatedVoice = await this.mergeBrandVoiceUpdates(currentVoice, newAnalysis)
      await this.storeBrandVoice(businessId, updatedVoice)
      return updatedVoice
    }

    return currentVoice
  }

  private async getCurrentBrandVoice(businessId: string) {
    // Fetch from database
    return {} as z.infer<typeof BrandVoiceAnalysisSchema>
  }

  private async mergeBrandVoiceUpdates(
    current: z.infer<typeof BrandVoiceAnalysisSchema>,
    updates: z.infer<typeof BrandVoiceAnalysisSchema>,
  ) {
    // Intelligent merging of brand voice updates
    return current // Simplified for now
  }
}
