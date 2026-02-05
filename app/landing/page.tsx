"use client"

import { useState } from "react"
import {
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  TrendingUp,
  Sparkles,
  Play,
  Instagram,
  Facebook,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LandingPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const features = [
    {
      icon: MessageSquare,
      title: "Unified Inbox",
      description: "All reviews, comments, and messages in one place",
    },
    {
      icon: Sparkles,
      title: "AI Response Generation",
      description: "Context-aware responses that match your brand voice",
    },
    {
      icon: Instagram,
      title: "Social Media Management",
      description: "Handle Instagram, Facebook, and Google interactions",
    },
    {
      icon: Clock,
      title: "24/7 Automation",
      description: "Respond to customers instantly, even while you sleep",
    },
    {
      icon: TrendingUp,
      title: "Analytics & Insights",
      description: "Track performance and ROI across all platforms",
    },
    {
      icon: CheckCircle,
      title: "Brand Voice Learning",
      description: "AI learns and adapts to your unique communication style",
    },
  ]

  const testimonials = [
    {
      name: "Maria Rodriguez",
      business: "Casa Maria Restaurant",
      image: "M",
      rating: 5,
      text: "SocialBot AI has been a game-changer! We went from spending 3 hours daily on social media to just 15 minutes weekly. Our response rate is now 99% and customers love how quickly we respond.",
      results: "Saved 20+ hours/week",
    },
    {
      name: "David Chen",
      business: "Chen's Hair Salon",
      image: "D",
      rating: 5,
      text: "The AI responses are so natural, customers can't tell they're automated. Our online reputation has improved dramatically, and we're booking 30% more appointments through social media.",
      results: "+30% bookings",
    },
    {
      name: "Sarah Johnson",
      business: "Bloom Flower Shop",
      image: "S",
      rating: 5,
      text: "I was skeptical about AI handling customer service, but SocialBot AI gets our brand voice perfectly. It's like having a dedicated social media manager for a fraction of the cost.",
      results: "95% cost savings",
    },
  ]

  const stats = [
    { number: "47", label: "Hours saved monthly", suffix: "+" },
    { number: "99.2", label: "Response rate", suffix: "%" },
    { number: "2.3", label: "Minute avg response", suffix: "min" },
    { number: "295", label: "ROI percentage", suffix: "%" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">SocialBot AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Features</Button>
              <Button variant="ghost">Pricing</Button>
              <Button variant="ghost">Login</Button>
              <Button>Start Free Trial</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">🚀 Save 20+ Hours Weekly</Badge>
                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                  AI-Powered Social Media Management for Local Businesses
                </h1>
                <p className="text-xl text-gray-600">
                  Stop spending hours responding to reviews and social media comments. Our AI handles all customer
                  interactions while you focus on running your business.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Start 14-Day Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => setIsVideoPlaying(true)}>
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo (2 min)
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>24/7 support</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                    <Badge className="bg-green-100 text-green-800">Live</Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Instagram className="h-5 w-5 text-pink-500 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">@foodie_sarah commented</p>
                        <p className="text-sm text-gray-600">"This looks amazing! 😍"</p>
                        <p className="text-xs text-green-600 mt-1">✓ AI responded in 1.2 minutes</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <Star className="h-5 w-5 text-yellow-500 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">New 5-star Google review</p>
                        <p className="text-sm text-gray-600">"Best service in town!"</p>
                        <p className="text-xs text-green-600 mt-1">✓ AI responded in 0.8 minutes</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                      <Facebook className="h-5 w-5 text-blue-500 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Facebook message received</p>
                        <p className="text-sm text-gray-600">"Do you have gluten-free options?"</p>
                        <p className="text-xs text-green-600 mt-1">✓ AI responded in 2.1 minutes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by 500+ Local Businesses</h2>
            <p className="text-xl text-gray-600">See the impact SocialBot AI has on businesses like yours</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {stat.number}
                  {stat.suffix}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Online Presence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From review responses to social media content, our AI handles it all while maintaining your unique brand
              voice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Real results from real businesses</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.image}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.business}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <Badge className="bg-green-100 text-green-800">{testimonial.results}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Save 20+ Hours Per Week?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join hundreds of local businesses already using SocialBot AI to automate their customer interactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Start 14-Day Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm text-purple-200 mt-4">No credit card required • Setup in under 5 minutes</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6" />
                <span className="text-xl font-bold">SocialBot AI</span>
              </div>
              <p className="text-gray-400">AI-powered social media management for local businesses.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Integrations</li>
                <li>API</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Status</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SocialBot AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
