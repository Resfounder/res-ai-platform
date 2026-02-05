"use client"

import { useState } from "react"
import { PenTool, Calendar, ImageIcon, Sparkles, Instagram, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function ContentGenerator() {
  const [contentType, setContentType] = useState("daily-special")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const contentTemplates = [
    { id: "daily-special", name: "Daily Special Post", description: "Showcase today's featured dish" },
    { id: "review-celebration", name: "Review Celebration", description: "Share positive customer reviews" },
    { id: "behind-scenes", name: "Behind the Scenes", description: "Show kitchen/staff in action" },
    { id: "customer-story", name: "Customer Story", description: "Highlight loyal customers" },
    { id: "seasonal-menu", name: "Seasonal Menu", description: "Promote seasonal offerings" },
    { id: "event-announcement", name: "Event Announcement", description: "Announce special events" },
  ]

  const sampleContent = {
    "daily-special": {
      instagram:
        "🍝 Today's Special: Truffle Mushroom Risotto! 🍄✨\n\nOur chef's signature creamy arborio rice with wild mushrooms, fresh truffle shavings, and aged parmesan. Each grain is perfectly cooked to creamy perfection!\n\n📍 Available today only\n💰 $28\n⏰ Until 9 PM or while supplies last\n\n#TruffleRisotto #DailySpecial #ItalianCuisine #FreshTruffles #BellasItalianBistro #FoodieFavorites",
      facebook:
        "🍝 DAILY SPECIAL ALERT! 🍝\n\nToday we're featuring our incredible Truffle Mushroom Risotto - a dish that's been 20 years in the making! Our chef combines creamy arborio rice with wild mushrooms and fresh truffle shavings for a truly unforgettable experience.\n\nThis special is only available today for $28, and trust us - it's worth every penny! Come in before 9 PM or while supplies last.\n\nWhat's your favorite risotto flavor? Let us know in the comments! 👇",
    },
    "review-celebration": {
      instagram:
        '⭐⭐⭐⭐⭐ WOW! Thank you Sarah M.! ⭐⭐⭐⭐⭐\n\n"Amazing service! The staff was incredibly helpful and the food was delicious. Best Italian restaurant in town!" - Sarah M.\n\nReviews like this make our day! 🥰 Thank you for choosing Bella\'s and for taking the time to share your experience.\n\n#CustomerLove #FiveStars #BestItalian #ThankYou #BellasFamily #HappyCustomers',
      facebook:
        "🌟 CUSTOMER SPOTLIGHT 🌟\n\nWe're absolutely thrilled to share this amazing review from Sarah M.:\n\n\"Amazing service! The staff was incredibly helpful and the food was delicious. Best Italian restaurant in town!\"\n\nSarah, thank you so much for your kind words! It's customers like you who make what we do so rewarding. We're honored to be your go-to Italian spot! ❤️\n\nTo all our amazing customers - THANK YOU for your continued support and for sharing your experiences with others!",
    },
  }

  const generateContent = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const content = sampleContent[contentType as keyof typeof sampleContent]
    if (content) {
      setGeneratedContent(content.instagram)
    }
    setIsGenerating(false)
  }

  const copyContent = () => {
    navigator.clipboard.writeText(generatedContent)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Content Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Content Templates</CardTitle>
          <CardDescription>Choose from AI-powered content templates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {contentTemplates.map((template) => (
            <div
              key={template.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                contentType === template.id ? "border-purple-500 bg-purple-50" : "hover:bg-gray-50"
              }`}
              onClick={() => setContentType(template.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-gray-500">{template.description}</p>
                </div>
                <PenTool className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Content Generator */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Content</CardTitle>
          <CardDescription>AI will create platform-optimized content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Platform</Label>
              <Select defaultValue="instagram">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="both">Both Platforms</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select defaultValue="friendly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="exciting">Exciting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Additional Details (Optional)</Label>
            <Input placeholder="e.g., Price: $28, Available until 9 PM..." />
          </div>

          <Button onClick={generateContent} disabled={isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Content
              </>
            )}
          </Button>

          {generatedContent && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Instagram className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900">Instagram Post</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={copyContent}>
                    {isCopied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {isCopied ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <Textarea
                  value={generatedContent}
                  onChange={(e) => setGeneratedContent(e.target.value)}
                  className="min-h-[200px] bg-white"
                />
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>Character count: {generatedContent.length}</span>
                  <Badge variant="outline">Optimized for Instagram</Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Post
                </Button>
                <Button variant="outline">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
                <Button variant="outline" onClick={generateContent}>
                  Regenerate
                </Button>
              </div>
            </div>
          )}

          {!generatedContent && (
            <div className="text-center py-8 text-gray-500">
              <PenTool className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Select a template and click "Generate Content"</p>
              <p className="text-sm mt-2">AI will create engaging, brand-consistent posts</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
