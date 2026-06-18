"use client"

import { useState } from "react"
import Link from "next/link"
import { Sparkles, Send, Check, RefreshCw, ArrowLeft, Copy, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ImportedConversation {
  platform: string
  customerName: string
  message: string
  date: string
}

// Simple rule-based reply generator for the pilot (no API integrations required).
// Matches common enquiry types by keyword and returns a friendly, on-brand draft.
function draftReply(message: string, customerName: string): string {
  const text = message.toLowerCase()
  const name = customerName.trim()
  const greeting = name ? `Hi ${name}, ` : "Hi there, "

  const has = (...keywords: string[]) => keywords.some((k) => text.includes(k))

  // Pricing / cost enquiries
  if (has("price", "pricing", "cost", "how much", "rates", "fee", "charge", "quote")) {
    return `${greeting}thanks so much for reaching out! We'd be happy to help. Our consultation prices start from $XX, and the final cost depends on exactly what you need. If you let us know a little more about what you're looking for, we can give you an accurate quote. Would you like us to put one together for you?`
  }

  // Availability / booking enquiries
  if (has("availab", "book", "appointment", "slot", "schedule", "this week", "free time", "opening")) {
    return `${greeting}thanks for getting in touch! Yes, we do have availability coming up. To get you booked in, could you let us know which day and time works best for you? We'll do our best to fit you in as soon as possible.`
  }

  // Opening hours enquiries
  if (has("hours", "open", "close", "what time", "when are you")) {
    return `${greeting}great question! We're open Monday to Friday, 9am–5pm, and Saturdays 10am–2pm. If you'd like to pop in or arrange a time that suits you, just let us know and we'll be glad to help.`
  }

  // Location / address enquiries
  if (has("where", "location", "address", "directions", "find you", "parking")) {
    return `${greeting}thanks for asking! You can find us at [your address here]. There's parking nearby, and we're easy to reach. Let us know if you'd like directions or anything else before your visit.`
  }

  // Services / what they offer
  if (has("do you do", "do you offer", "service", "what kind", "can you help with", "treatment")) {
    return `${greeting}thanks for your message! We offer a range of services and would love to help with what you need. Could you tell us a bit more about what you're looking for? That way we can point you in the right direction and make sure we're the perfect fit for you.`
  }

  // Contact / get in touch
  if (has("contact", "phone", "call", "email", "reach you", "speak to")) {
    return `${greeting}thanks for reaching out! The easiest way to chat is right here, or you can call us on [your number] or email [your email]. Let us know what works best and we'll get back to you quickly.`
  }

  // Simple greetings
  if (has("hello", "hi ", "hey", "good morning", "good afternoon") && message.trim().length < 30) {
    return `${greeting}thanks so much for getting in touch! How can we help you today? We'd love to answer any questions you have.`
  }

  // Friendly fallback for anything else
  return `${greeting}thanks so much for your message! We'd be happy to help with this. Could you share a little more detail so we can give you the best possible answer? We'll get back to you as soon as we can.`
}

export default function ImportConversationPage() {
  const today = new Date().toISOString().split("T")[0]

  const [conversation, setConversation] = useState<ImportedConversation>({
    platform: "instagram",
    customerName: "",
    message: "",
    date: today,
  })

  const [generatedResponse, setGeneratedResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [error, setError] = useState("")

  const canGenerate = conversation.customerName.trim() !== "" && conversation.message.trim() !== ""

  const generateResponse = async () => {
    if (!canGenerate) {
      setError("Please enter a customer name and message first.")
      return
    }

    setError("")
    setIsApproved(false)
    setIsGenerating(true)

    // Brief delay so the generating state is visible and feels responsive.
    setTimeout(() => {
      const reply = draftReply(conversation.message, conversation.customerName)
      setGeneratedResponse(reply)
      setIsGenerating(false)
    }, 600)
  }

  const copyResponse = () => {
    navigator.clipboard.writeText(generatedResponse)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <ClipboardList className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Import Conversation</h1>
                <p className="text-sm text-gray-500">Paste a customer message and let R.E.S. draft the reply</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversation details */}
          <Card>
            <CardHeader>
              <CardTitle>Conversation Details</CardTitle>
              <CardDescription>Enter the message from the customer&apos;s screenshot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select
                    value={conversation.platform}
                    onValueChange={(value) => setConversation({ ...conversation, platform: value })}
                  >
                    <SelectTrigger id="platform">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="google">Google</SelectItem>
                      <SelectItem value="yelp">Yelp</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={conversation.date}
                    onChange={(e) => setConversation({ ...conversation, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  value={conversation.customerName}
                  onChange={(e) => setConversation({ ...conversation, customerName: e.target.value })}
                  placeholder="e.g., Sarah"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={conversation.message}
                  onChange={(e) => setConversation({ ...conversation, message: e.target.value })}
                  placeholder="e.g., Do you have availability this week?"
                  className="min-h-[140px]"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button onClick={generateResponse} disabled={!canGenerate || isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Response
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* AI response */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>AI Response</CardTitle>
                  <CardDescription>Review, edit, and approve before sending</CardDescription>
                </div>
                {isApproved && (
                  <Badge className="bg-green-100 text-green-800">
                    <Check className="h-3 w-3 mr-1" />
                    Approved
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {generatedResponse ? (
                <>
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-purple-900">Suggested reply</span>
                      <Badge variant="outline">{conversation.platform}</Badge>
                    </div>
                    <Textarea
                      value={generatedResponse}
                      onChange={(e) => {
                        setGeneratedResponse(e.target.value)
                        setIsApproved(false)
                      }}
                      className="min-h-[160px] bg-white"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={() => setIsApproved(true)} disabled={isApproved} className="flex-1">
                      <Check className="h-4 w-4 mr-2" />
                      {isApproved ? "Approved" : "Approve"}
                    </Button>
                    <Button variant="outline" onClick={copyResponse}>
                      {isCopied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      {isCopied ? "Copied" : "Copy"}
                    </Button>
                    <Button variant="outline" onClick={generateResponse} disabled={isGenerating}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                  {isApproved && (
                    <div className="flex items-center text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
                      <Send className="h-4 w-4 mr-2" />
                      Response approved &mdash; ready to send back to {conversation.customerName}.
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Enter a customer message and click &quot;Generate Response&quot;</p>
                  <p className="text-sm mt-2">No API integrations required &mdash; just paste and generate</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
