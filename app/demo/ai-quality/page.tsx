"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react"

export default function AIQualityDemo() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedScenario, setSelectedScenario] = useState(0)
  const [generatedResponse, setGeneratedResponse] = useState("")
  const [qualityAssessment, setQualityAssessment] = useState<any>(null)

  const testScenarios = [
    {
      type: "Negative Review",
      platform: "Google",
      rating: 2,
      customer: "John D.",
      content:
        "Disappointed with my visit last night. Food was cold, service was slow, and the staff seemed uninterested. Expected much better for the price we paid.",
      context: "Italian Restaurant - Bella's Bistro",
    },
    {
      type: "Positive Review",
      platform: "Yelp",
      rating: 5,
      customer: "Sarah M.",
      content:
        "Absolutely amazing! The truffle pasta was incredible and our server Maria was so attentive. Best Italian food I've had outside of Italy!",
      context: "Italian Restaurant - Bella's Bistro",
    },
    {
      type: "Instagram Comment",
      platform: "Instagram",
      customer: "@foodie_jenny",
      content: "This looks delicious! 😍 Do you have vegan options? Planning to visit this weekend!",
      context: "Comment on pasta dish photo",
    },
    {
      type: "Facebook Message",
      platform: "Facebook",
      customer: "Mike Johnson",
      content:
        "Hi! I have a severe nut allergy. Can you tell me which dishes are completely nut-free? I'm planning a dinner for 6 people next Friday.",
      context: "Private message inquiry",
    },
  ]

  const brandVoice = {
    businessName: "Bella's Italian Bistro",
    businessType: "Family Italian Restaurant",
    personality: ["Warm", "Welcoming", "Passionate about food", "Family-oriented"],
    tone: "Friendly but professional",
    values: ["Authentic Italian cuisine", "Family traditions", "Customer care", "Quality ingredients"],
    responseStyle: "Personal and caring, like talking to a family friend",
  }

  const mockResponses = [
    {
      response:
        "Hi John, thank you for taking the time to share your feedback, and I sincerely apologize that your experience didn't meet our usual standards. Cold food and slow service are absolutely not acceptable, and I take full responsibility for this. I'd like to make this right immediately - could you please call us directly at (555) 123-4567 or email us? I'd love to invite you back for a complimentary meal so we can show you the experience we're truly known for. Your feedback helps us improve, and I'm personally committed to ensuring this doesn't happen again. - Maria (Owner)",
      quality: {
        appropriateness: 9,
        brandAlignment: 9,
        helpfulness: 10,
        professionalism: 9,
        specificity: 9,
        overallScore: 9.2,
        issues: [],
        suggestions: ["Could include specific steps being taken to prevent future issues"],
      },
    },
    {
      response:
        "Sarah, thank you so much for this wonderful review! 🌟 It absolutely made our day! We're thrilled you loved the truffle pasta - it's one of our chef's signature dishes using authentic Italian truffles. Maria will be so happy to hear your kind words about her service! We can't wait to welcome you back soon and continue sharing our passion for authentic Italian cuisine with you. Grazie mille! - The Bella's Family",
      quality: {
        appropriateness: 10,
        brandAlignment: 10,
        helpfulness: 8,
        professionalism: 9,
        specificity: 10,
        overallScore: 9.4,
        issues: [],
        suggestions: ["Perfect response - authentic and engaging"],
      },
    },
    {
      response:
        "Hi Jenny! 😊 Thank you so much! We absolutely have delicious vegan options! Our vegan pasta primavera and dairy-free risotto are customer favorites. We'd love to have you this weekend - just let your server know about your dietary preferences and we'll take great care of you! Can't wait to see you! 🍝✨",
      quality: {
        appropriateness: 9,
        brandAlignment: 9,
        helpfulness: 10,
        professionalism: 8,
        specificity: 9,
        overallScore: 9.0,
        issues: [],
        suggestions: ["Great use of emojis for Instagram platform"],
      },
    },
    {
      response:
        "Hi Mike! Thank you for reaching out about your allergy - we take food safety very seriously. I'd be happy to help you dine safely with us! Several of our dishes are completely nut-free, including our Margherita pizza, grilled salmon, and most pasta dishes. For your party of 6 next Friday, I'd love to have our chef speak with you directly to discuss all safe options and ensure your meal is prepared with extra care. Could you call us at (555) 123-4567? We want to make sure you have a wonderful and worry-free dining experience! - Maria",
      quality: {
        appropriateness: 10,
        brandAlignment: 10,
        helpfulness: 10,
        professionalism: 10,
        specificity: 9,
        overallScore: 9.8,
        issues: [],
        suggestions: ["Excellent handling of serious allergy concern"],
      },
    },
  ]

  const generateResponse = async () => {
    setIsGenerating(true)

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const mockResponse = mockResponses[selectedScenario]
    setGeneratedResponse(mockResponse.response)
    setQualityAssessment(mockResponse.quality)
    setIsGenerating(false)
  }

  const getQualityColor = (score: number) => {
    if (score >= 9) return "text-green-600"
    if (score >= 7.5) return "text-blue-600"
    if (score >= 6) return "text-yellow-600"
    return "text-red-600"
  }

  const getQualityBadge = (score: number) => {
    if (score >= 9) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>
    if (score >= 7.5) return <Badge className="bg-blue-100 text-blue-800">Good</Badge>
    if (score >= 6) return <Badge className="bg-yellow-100 text-yellow-800">Acceptable</Badge>
    return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">R.E.S AI Quality System</h1>
          <p className="text-xl text-gray-600">Advanced AI response generation with comprehensive quality assessment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Test Scenarios</CardTitle>
              <CardDescription>Select a customer interaction to test AI response quality</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {testScenarios.map((scenario, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedScenario === index ? "border-purple-500 bg-purple-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedScenario(index)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{scenario.type}</Badge>
                      <Badge variant="secondary">{scenario.platform}</Badge>
                      {scenario.rating && (
                        <Badge variant={scenario.rating <= 2 ? "destructive" : "default"}>{scenario.rating}★</Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm font-medium mb-1">{scenario.customer}</p>
                  <p className="text-sm text-gray-600 mb-2">"{scenario.content}"</p>
                  <p className="text-xs text-gray-500">{scenario.context}</p>
                </div>
              ))}

              <Button
                onClick={generateResponse}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating High-Quality Response...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate AI Response
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle>AI Generated Response</CardTitle>
              <CardDescription>High-quality response with comprehensive assessment</CardDescription>
            </CardHeader>
            <CardContent>
              {generatedResponse ? (
                <Tabs defaultValue="response" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="response">Response</TabsTrigger>
                    <TabsTrigger value="quality">Quality Analysis</TabsTrigger>
                  </TabsList>

                  <TabsContent value="response" className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-purple-900">AI Generated Response</span>
                        {qualityAssessment && getQualityBadge(qualityAssessment.overallScore)}
                      </div>
                      <Textarea
                        value={generatedResponse}
                        readOnly
                        className="min-h-[120px] bg-white border-purple-200"
                      />
                      {qualityAssessment && (
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <span className="text-gray-600">Overall Quality Score</span>
                          <span className={`font-bold ${getQualityColor(qualityAssessment.overallScore)}`}>
                            {qualityAssessment.overallScore}/10
                          </span>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="quality" className="space-y-4">
                    {qualityAssessment && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          {[
                            { label: "Appropriateness", score: qualityAssessment.appropriateness },
                            { label: "Brand Alignment", score: qualityAssessment.brandAlignment },
                            { label: "Helpfulness", score: qualityAssessment.helpfulness },
                            { label: "Professionalism", score: qualityAssessment.professionalism },
                            { label: "Specificity", score: qualityAssessment.specificity },
                          ].map((metric, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>{metric.label}</span>
                                <span className={`font-medium ${getQualityColor(metric.score)}`}>
                                  {metric.score}/10
                                </span>
                              </div>
                              <Progress value={metric.score * 10} className="h-2" />
                            </div>
                          ))}
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="font-medium text-green-900">Quality Assessment</span>
                          </div>
                          {qualityAssessment.suggestions.map((suggestion: string, index: number) => (
                            <p key={index} className="text-sm text-green-800">
                              {suggestion}
                            </p>
                          ))}
                        </div>

                        {qualityAssessment.issues.length > 0 && (
                          <div className="bg-yellow-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <AlertTriangle className="h-5 w-5 text-yellow-600" />
                              <span className="font-medium text-yellow-900">Areas for Improvement</span>
                            </div>
                            {qualityAssessment.issues.map((issue: string, index: number) => (
                              <p key={index} className="text-sm text-yellow-800">
                                {issue}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Select a scenario and click "Generate AI Response" to see the quality system in action</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Brand Voice Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Brand Voice Configuration</CardTitle>
            <CardDescription>How the AI learns and maintains your business's unique voice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="font-medium mb-2">Business Identity</h4>
                <p className="text-sm text-gray-600 mb-1">{brandVoice.businessName}</p>
                <p className="text-sm text-gray-600">{brandVoice.businessType}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Personality</h4>
                <div className="space-y-1">
                  {brandVoice.personality.map((trait, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Core Values</h4>
                <div className="space-y-1">
                  {brandVoice.values.map((value, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {value}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Communication Style</h4>
                <p className="text-sm text-gray-600">{brandVoice.tone}</p>
                <p className="text-xs text-gray-500 mt-1">{brandVoice.responseStyle}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
