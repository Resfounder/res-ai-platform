"use client"

import { useState } from "react"
import { Star, Send, Sparkles, RefreshCw, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ReviewResponder() {
  const [selectedReview, setSelectedReview] = useState(0)
  const [generatedResponse, setGeneratedResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const pendingReviews = [
    {
      id: 1,
      customer: "Mike R.",
      rating: 4,
      text: "Good experience overall, though the wait time was a bit long. The food was tasty but service could be faster.",
      platform: "Yelp",
      timeAgo: "4 hours ago",
      sentiment: "mixed",
    },
    {
      id: 2,
      customer: "David K.",
      rating: 2,
      text: "Disappointed with my visit. The food was cold and the staff seemed uninterested. Expected better.",
      platform: "Google",
      timeAgo: "6 hours ago",
      sentiment: "negative",
    },
    {
      id: 3,
      customer: "Lisa P.",
      rating: 5,
      text: "Absolutely wonderful! The atmosphere was perfect and the service was outstanding. Highly recommend!",
      platform: "Google",
      timeAgo: "8 hours ago",
      sentiment: "positive",
    },
  ]

  const aiResponses = {
    0: "Hi Mike! Thank you so much for taking the time to share your feedback. We're thrilled you enjoyed the food! You're absolutely right about the wait time, and we sincerely apologize for that. We've been experiencing higher than usual volume, but that's no excuse for keeping our valued customers waiting. We're actively working on streamlining our service process to ensure faster delivery without compromising quality. We'd love to make it up to you - please reach out to us directly so we can offer you a complimentary appetizer on your next visit. Thanks again for your patience and honest feedback!",
    1: "Hi David, thank you for sharing your honest feedback with us. We're truly sorry to hear that your experience didn't meet your expectations - that's definitely not the standard we strive for. Cold food and inattentive service are completely unacceptable, and we take full responsibility. We'd like to make this right and learn more about what happened during your visit. Could you please contact us directly at [phone] or [email]? We'd love to invite you back for a complimentary meal so we can show you the experience we're known for. Your feedback helps us improve, and we're committed to doing better.",
    2: "Hi Lisa! Wow, thank you so much for this amazing review! 🌟 It absolutely made our day to read your kind words. We're so happy that you enjoyed both the atmosphere and service - our team works hard to create that perfect dining experience, and knowing we succeeded with you means the world to us. We can't wait to welcome you back soon and continue exceeding your expectations. Thank you for recommending us to others - customers like you are what make what we do so rewarding!",
  }

  const generateResponse = async () => {
    setIsGenerating(true)
    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setGeneratedResponse(aiResponses[selectedReview as keyof typeof aiResponses])
    setIsGenerating(false)
  }

  const copyResponse = () => {
    navigator.clipboard.writeText(generatedResponse)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Reviews</CardTitle>
          <CardDescription>Reviews waiting for your response</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingReviews.map((review, index) => (
            <div
              key={review.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedReview === index ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedReview(index)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{review.customer}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <Badge
                  variant={
                    review.sentiment === "positive"
                      ? "default"
                      : review.sentiment === "negative"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {review.sentiment}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">{review.text}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{review.platform}</span>
                <span>{review.timeAgo}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Response Generator */}
      <Card>
        <CardHeader>
          <CardTitle>AI Response Generator</CardTitle>
          <CardDescription>Generate personalized responses with AI</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Select defaultValue="professional">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Response tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={generateResponse} disabled={isGenerating}>
              {isGenerating ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              Generate Response
            </Button>
          </div>

          {generatedResponse && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900">AI Generated Response</span>
                  <Button variant="outline" size="sm" onClick={copyResponse}>
                    {isCopied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {isCopied ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <Textarea
                  value={generatedResponse}
                  onChange={(e) => setGeneratedResponse(e.target.value)}
                  className="min-h-[120px] bg-white"
                />
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Post Response
                </Button>
                <Button variant="outline" onClick={generateResponse}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {!generatedResponse && (
            <div className="text-center py-8 text-gray-500">
              <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Select a review and click "Generate Response" to get started</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
