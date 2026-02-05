"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle, Instagram, Facebook, Star, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    email: "",
    phone: "",
    website: "",
    brandVoice: "",
    plan: "professional",
  })

  const steps = [
    { number: 1, title: "Business Info", description: "Tell us about your business" },
    { number: 2, title: "Connect Platforms", description: "Link your social accounts" },
    { number: 3, title: "Brand Voice", description: "Customize your AI assistant" },
    { number: 4, title: "Complete Setup", description: "Finalize your account" },
  ]

  const platforms = [
    { name: "Google Reviews", icon: Star, connected: false, required: true },
    { name: "Instagram", icon: Instagram, connected: false, required: false },
    { name: "Facebook", icon: Facebook, connected: false, required: false },
  ]

  const handleNext = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setCurrentStep(currentStep + 1)
    setIsLoading(false)
  }

  const handlePlatformConnect = (platformName: string) => {
    // Simulate OAuth connection
    alert(`Connecting to ${platformName}... (Demo)`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">SocialBot AI Setup</span>
            </div>
            <Badge className="bg-green-100 text-green-800">14-Day Free Trial</Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.number ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > step.number ? <CheckCircle className="h-5 w-5" /> : step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-24 h-1 mx-4 ${currentStep > step.number ? "bg-purple-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{steps[currentStep - 1].title}</CardTitle>
            <CardDescription className="text-lg">{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Business Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name *</Label>
                    <Input
                      id="business-name"
                      placeholder="e.g., Bella's Italian Bistro"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-type">Business Type *</Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="salon">Salon/Spa</SelectItem>
                        <SelectItem value="retail">Retail Store</SelectItem>
                        <SelectItem value="hotel">Hotel/B&B</SelectItem>
                        <SelectItem value="service">Service Business</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="owner@business.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    placeholder="https://yourbusiness.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Connect Platforms */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <p className="text-gray-600">
                    Connect your platforms so our AI can start managing your customer interactions.
                  </p>
                </div>

                <div className="space-y-4">
                  {platforms.map((platform, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-6 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <platform.icon className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{platform.name}</h3>
                          <p className="text-sm text-gray-500">
                            {platform.required ? "Required" : "Optional"} • Manage reviews and interactions
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handlePlatformConnect(platform.name)}
                        variant={platform.connected ? "outline" : "default"}
                      >
                        {platform.connected ? "Connected" : "Connect"}
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Why do we need access?</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Read new reviews and comments</li>
                    <li>• Post AI-generated responses on your behalf</li>
                    <li>• Analyze sentiment and engagement metrics</li>
                    <li>• All data is encrypted and never shared</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 3: Brand Voice */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <p className="text-gray-600">
                    Help our AI understand your brand personality and communication style.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand-voice">Describe Your Brand Voice *</Label>
                    <Textarea
                      id="brand-voice"
                      placeholder="e.g., We're a family-owned Italian restaurant with a warm, welcoming atmosphere. We've been serving authentic dishes for over 20 years and pride ourselves on treating every customer like family. Our tone is friendly but professional, and we love sharing the stories behind our recipes..."
                      className="min-h-[120px]"
                      value={formData.brandVoice}
                      onChange={(e) => setFormData({ ...formData, brandVoice: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Tone Examples</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Professional</li>
                        <li>• Friendly</li>
                        <li>• Casual</li>
                        <li>• Formal</li>
                      </ul>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Values</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Family-owned</li>
                        <li>• Quality focused</li>
                        <li>• Community-minded</li>
                        <li>• Authentic</li>
                      </ul>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Personality</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Welcoming</li>
                        <li>• Passionate</li>
                        <li>• Helpful</li>
                        <li>• Genuine</li>
                      </ul>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Complete Setup */}
            {currentStep === 4 && (
              <div className="space-y-6 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">You're All Set! 🎉</h3>
                  <p className="text-gray-600 mb-6">
                    Your AI assistant is being trained on your brand voice. This usually takes 2-3 minutes.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">What happens next?</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>AI training completes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Platforms sync data</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Start managing interactions</span>
                    </div>
                  </div>
                </div>

                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}

            {/* Navigation */}
            {currentStep < 4 && (
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
