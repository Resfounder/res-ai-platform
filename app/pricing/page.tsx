"use client"

import { useState } from "react"
import { Check, ArrowRight, Sparkles, Zap, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses getting started",
      icon: Sparkles,
      price: { monthly: 99, annual: 79 },
      features: [
        "Up to 50 interactions/month",
        "Google Reviews + Yelp",
        "AI response generation",
        "Basic analytics",
        "Email support",
        "1 business location",
      ],
      limitations: ["No social media management", "No content generation", "Basic brand voice training"],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      description: "Complete social media automation",
      icon: Zap,
      price: { monthly: 199, annual: 159 },
      features: [
        "Up to 200 interactions/month",
        "All review platforms",
        "Instagram + Facebook management",
        "AI content generation",
        "Advanced analytics",
        "Priority support",
        "2 business locations",
        "Custom response templates",
        "Sentiment analysis",
      ],
      limitations: [],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For growing businesses and franchises",
      icon: Crown,
      price: { monthly: 399, annual: 319 },
      features: [
        "Unlimited interactions",
        "All platforms + TikTok",
        "Multi-location management",
        "Advanced AI customization",
        "White-label reporting",
        "Dedicated account manager",
        "API access",
        "Custom integrations",
        "Advanced brand voice AI",
        "Competitor monitoring",
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  const faqs = [
    {
      question: "How does the AI learn my brand voice?",
      answer:
        "Our AI analyzes your existing responses, website content, and brand guidelines to understand your unique communication style. It gets better over time as you approve or edit responses.",
    },
    {
      question: "Can I review responses before they're posted?",
      answer:
        "You can set up approval workflows for any type of interaction. Many customers auto-approve positive responses but review negative ones first.",
    },
    {
      question: "What platforms do you integrate with?",
      answer:
        "We integrate with Google Reviews, Yelp, Facebook, Instagram, TripAdvisor, and more. Enterprise plans include TikTok and custom platform integrations.",
    },
    {
      question: "How quickly does the AI respond?",
      answer:
        "Our AI typically responds within 2-5 minutes of receiving a new interaction. You can customize response delays to make them feel more natural.",
    },
    {
      question: "What if I'm not satisfied?",
      answer:
        "We offer a 14-day free trial and 30-day money-back guarantee. Most customers see immediate time savings and improved response rates.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">SocialBot AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Back to Home</Button>
              <Button variant="outline">Login</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the plan that fits your business. All plans include a 14-day free trial.
          </p>

          <div className="flex items-center justify-center space-x-4 mb-8">
            <Label htmlFor="billing-toggle" className="text-sm font-medium">
              Monthly
            </Label>
            <Switch id="billing-toggle" checked={isAnnual} onCheckedChange={setIsAnnual} />
            <Label htmlFor="billing-toggle" className="text-sm font-medium">
              Annual
            </Label>
            <Badge className="bg-green-100 text-green-800 ml-2">Save 20%</Badge>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? "border-purple-500 shadow-xl scale-105" : "border-gray-200"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                      plan.popular ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-gray-100"
                    }`}
                  >
                    <plan.icon className={`h-8 w-8 ${plan.popular ? "text-white" : "text-gray-600"}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-base mt-2">{plan.description}</CardDescription>

                  <div className="mt-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900">
                        ${isAnnual ? plan.price.annual : plan.price.monthly}
                      </span>
                      <span className="text-xl text-gray-500 ml-1">/month</span>
                    </div>
                    {isAnnual && (
                      <p className="text-sm text-green-600 mt-1">
                        Save ${(plan.price.monthly - plan.price.annual) * 12}/year
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                    {plan.cta !== "Contact Sales" && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">14-day free trial • No credit card required</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Calculate Your ROI</h2>
            <p className="text-xl text-gray-600">See how much time and money SocialBot AI can save your business</p>
          </div>

          <Card className="bg-white shadow-xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Current Situation</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Time spent daily on social media:</span>
                      <span className="font-semibold">2.5 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly time investment:</span>
                      <span className="font-semibold">75 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost at $20/hour:</span>
                      <span className="font-semibold text-red-600">$1,500/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Response rate:</span>
                      <span className="font-semibold text-red-600">65%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">With SocialBot AI</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Time spent weekly:</span>
                      <span className="font-semibold text-green-600">1 hour</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly time investment:</span>
                      <span className="font-semibold text-green-600">4 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total cost (AI + time):</span>
                      <span className="font-semibold text-green-600">$279/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Response rate:</span>
                      <span className="font-semibold text-green-600">99%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Monthly Savings: $1,221</h4>
                  <p className="text-gray-600 mb-4">Annual savings: $14,652 • ROI: 438%</p>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                    Start Saving Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Social Media Management?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join 500+ businesses saving 20+ hours weekly with AI automation
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            Start Your 14-Day Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-purple-200 mt-4">No credit card required • Setup in 5 minutes • Cancel anytime</p>
        </div>
      </section>
    </div>
  )
}
