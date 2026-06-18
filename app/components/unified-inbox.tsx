"use client"

import { useState, useEffect } from "react"
import { Star, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBusiness } from "../context/business-context"

export function UnifiedInbox() {
  const { profile } = useBusiness()
  const [selectedMessage, setSelectedMessage] = useState(0)
  const [generatedResponse, setGeneratedResponse] = useState("")

  const messages = profile.messages
  const aiResponses = profile.aiResponses

  // Reset selection and any draft when the business profile changes.
  useEffect(() => {
    setSelectedMessage(0)
    setGeneratedResponse("")
  }, [profile.id])

  const generateResponse = () => {
    setGeneratedResponse(aiResponses[selectedMessage] ?? "")
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
