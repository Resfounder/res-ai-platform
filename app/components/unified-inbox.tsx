"use client"

import { useState } from "react"
import { Instagram, Facebook, Star, MessageCircle, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UnifiedInbox() {
  const [selectedMessage, setSelectedMessage] = useState(0)
  const [generatedResponse, setGeneratedResponse] = useState("")

  const messages = [
    {
      id: 1,
      type: "instagram_comment",
      customer: "@foodie_sarah",
      avatar: "S",
      content: "This looks absolutely delicious! What's in the sauce? 😍",
      platform: "Instagram",
      platformIcon: Instagram,
      timeAgo: "2 min ago",
      status: "pending",
      postContext: "Photo: Truffle Pasta Special",
      sentiment: "positive",
    },
    {
      id: 2,
      type: "facebook_message",
      customer: "Mike Johnson",
      avatar: "M",
      content: "Hi! I have a severe nut allergy. Can you tell me which dishes are safe for me to order?",
      platform: "Facebook",
      platformIcon: Facebook,
      timeAgo: "5 min ago",
      status: "pending",
      sentiment: "neutral",
    },
    {
      id: 3,
      type: "google_review",
      customer: "Jennifer L.",
      avatar: "J",
      content:
        "Disappointed with our visit last night. Food was cold and service was slow. Expected better for the price.",
      platform: "Google",
      platformIcon: Star,
      timeAgo: "12 min ago",
      status: "pending",
      rating: 2,
      sentiment: "negative",
    },
    {
      id: 4,
      type: "instagram_dm",
      customer: "@local_blogger",
      avatar: "L",
      content: "Hi! I'm a local food blogger with 15K followers. Would you be interested in a collaboration?",
      platform: "Instagram",
      platformIcon: MessageCircle,
      timeAgo: "1 hour ago",
      status: "pending",
      sentiment: "positive",
    },
  ]

  const aiResponses = {
    0: "Hi Sarah! 😊 Thank you so much! Our truffle pasta features a creamy parmesan sauce with real black truffle shavings, fresh herbs, and a touch of white wine. It's one of our chef's signature dishes! We'd love to have you try it in person soon. What's your favorite type of pasta? 🍝✨",
    1: "Hi Mike! Thank you for reaching out about your allergy - we take food safety very seriously. I'd be happy to help you dine safely with us! Our chef can prepare several dishes that are completely nut-free, including our Margherita pizza, grilled salmon, and most of our pasta dishes. I'll have our manager call you directly to discuss all safe options and ensure your meal is prepared with extra care. Could you share your phone number? We want to make sure you have a wonderful and worry-free dining experience! 🙏",
    2: "Hi Jennifer, thank you for taking the time to share your feedback, and I sincerely apologize that your experience didn't meet our usual standards. Cold food and slow service are absolutely not acceptable, and I take full responsibility for this. I'd like to make this right immediately - could you please call us at [phone] or email us directly? I'd love to invite you and your party back for a complimentary meal so we can show you the experience we're truly known for. Your feedback helps us improve, and I'm personally committed to ensuring this doesn't happen again. Thank you for giving us the opportunity to do better.",
    3: "Hi! Thank you so much for reaching out! We'd absolutely love to collaborate with you - your content looks amazing! 📸 We're always excited to work with local food enthusiasts who share our passion for great Italian cuisine. Could we schedule a time to chat about partnership opportunities? I'd love to have you try our new seasonal menu and discuss how we can create something special together. Feel free to DM us your availability or email us at [email]. Looking forward to working with you! 🤝✨",
  }

  const generateResponse = () => {
    setGeneratedResponse(aiResponses[selectedMessage as keyof typeof aiResponses])
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Messages List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Unified Inbox</CardTitle>
              <CardDescription>All customer interactions in one place</CardDescription>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="google">Google</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedMessage === index ? "border-purple-500 bg-purple-50" : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedMessage(index)}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-medium">
                  {message.avatar}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{message.customer}</span>
                      <message.platformIcon className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          message.sentiment === "positive"
                            ? "default"
                            : message.sentiment === "negative"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {message.sentiment}
                      </Badge>
                      <span className="text-xs text-gray-500">{message.timeAgo}</span>
                    </div>
                  </div>
                  {message.rating && (
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < message.rating! ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-gray-600">{message.content}</p>
                  {message.postContext && <p className="text-xs text-gray-500 italic">{message.postContext}</p>}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Response Generator */}
      <Card>
        <CardHeader>
          <CardTitle>AI Response Generator</CardTitle>
          <CardDescription>Generate contextual responses with AI</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Select defaultValue="friendly">
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="empathetic">Empathetic</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={generateResponse} className="flex-1">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Response
            </Button>
          </div>

          {generatedResponse && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-purple-900">AI Generated Response</span>
                  <Badge variant="outline">Context-Aware</Badge>
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
                  Send Response
                </Button>
                <Button variant="outline">Schedule</Button>
                <Button variant="outline" onClick={generateResponse}>
                  Regenerate
                </Button>
              </div>
            </div>
          )}

          {!generatedResponse && (
            <div className="text-center py-8 text-gray-500">
              <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Select a message and click "Generate Response" to get started</p>
              <p className="text-sm mt-2">AI will analyze context, sentiment, and your brand voice</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
