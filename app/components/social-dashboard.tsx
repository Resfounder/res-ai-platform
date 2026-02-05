"use client"

import { Star, TrendingUp, MessageSquare, Clock, CheckCircle, Instagram, Facebook, MessageCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function SocialDashboard() {
  const stats = [
    {
      title: "Total Interactions",
      value: "1,247",
      change: "+23% this week",
      icon: MessageSquare,
      color: "text-blue-600",
    },
    {
      title: "Response Rate",
      value: "99.2%",
      change: "+25% with AI",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Avg Response Time",
      value: "3.2 min",
      change: "-2.8 hrs saved",
      icon: Clock,
      color: "text-purple-600",
    },
    {
      title: "Engagement Rate",
      value: "8.4%",
      change: "+1.2% this month",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  const platformStats = [
    {
      platform: "Instagram",
      icon: Instagram,
      interactions: 456,
      responseRate: "99%",
      avgTime: "2.1 min",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      platform: "Facebook",
      icon: Facebook,
      interactions: 324,
      responseRate: "100%",
      avgTime: "1.8 min",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      platform: "Google Reviews",
      icon: Star,
      interactions: 89,
      responseRate: "98%",
      avgTime: "4.2 min",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      platform: "Messages",
      icon: MessageCircle,
      interactions: 378,
      responseRate: "99%",
      avgTime: "2.8 min",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "instagram_comment",
      customer: "@sarah_foodie",
      content: "This pasta looks amazing! 😍",
      response:
        "Thank you Sarah! Our chef uses a family recipe that's been perfected over 20 years. Come try it soon! 🍝",
      platform: "Instagram",
      timeAgo: "2 min ago",
      status: "responded",
    },
    {
      id: 2,
      type: "facebook_message",
      customer: "Mike Johnson",
      content: "Do you have gluten-free options?",
      response:
        "Hi Mike! Yes, we have several delicious gluten-free pasta options and our chef can modify most dishes. Would you like to see our full gluten-free menu?",
      platform: "Facebook",
      timeAgo: "5 min ago",
      status: "responded",
    },
    {
      id: 3,
      type: "google_review",
      customer: "Jennifer L.",
      content: "Best Italian food in town! Service was outstanding.",
      response:
        "Jennifer, thank you so much! We're thrilled you enjoyed both the food and service. Our team works hard to create that perfect dining experience! 🌟",
      platform: "Google",
      timeAgo: "12 min ago",
      status: "responded",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Platform Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Performance</CardTitle>
          <CardDescription>AI performance across all your social platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {platformStats.map((platform, index) => (
              <div key={index} className={`p-4 rounded-lg ${platform.bgColor}`}>
                <div className="flex items-center space-x-2 mb-3">
                  <platform.icon className={`h-5 w-5 ${platform.color}`} />
                  <span className="font-medium">{platform.platform}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Interactions</span>
                    <span className="font-medium">{platform.interactions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Response Rate</span>
                    <span className="font-medium">{platform.responseRate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg Time</span>
                    <span className="font-medium">{platform.avgTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Time Savings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent AI Activity</CardTitle>
            <CardDescription>Latest automated responses across all platforms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{activity.customer}</span>
                    <Badge variant="outline" className="text-xs">
                      {activity.platform}
                    </Badge>
                  </div>
                  <span className="text-xs text-gray-500">{activity.timeAgo}</span>
                </div>
                <p className="text-sm text-gray-600">{activity.content}</p>
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                  <p className="text-sm">{activity.response}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time & Cost Savings</CardTitle>
            <CardDescription>How AI is transforming your social media management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Response Quality Score</span>
                <span>96%</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Brand Voice Consistency</span>
                <span>94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Customer Satisfaction</span>
                <span>98%</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-900">Time Saved This Month</span>
              </div>
              <p className="text-3xl font-bold text-purple-900 mt-1">47.2 hours</p>
              <p className="text-sm text-purple-700">Equivalent to $1,180 in labor costs</p>
              <p className="text-xs text-purple-600 mt-1">ROI: 295% vs subscription cost</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
