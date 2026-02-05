"use client"

import { Star, TrendingUp, MessageSquare, Clock, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function ReviewDashboard() {
  const stats = [
    {
      title: "Total Reviews",
      value: "247",
      change: "+12 this week",
      icon: MessageSquare,
      color: "text-blue-600",
    },
    {
      title: "Average Rating",
      value: "4.6",
      change: "+0.2 this month",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      title: "Response Rate",
      value: "98%",
      change: "+15% with AI",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Avg Response Time",
      value: "2.3 hrs",
      change: "-4.2 hrs saved",
      icon: Clock,
      color: "text-purple-600",
    },
  ]

  const recentReviews = [
    {
      id: 1,
      customer: "Sarah M.",
      rating: 5,
      text: "Amazing service! The staff was incredibly helpful and the food was delicious.",
      platform: "Google",
      status: "responded",
      timeAgo: "2 hours ago",
    },
    {
      id: 2,
      customer: "Mike R.",
      rating: 4,
      text: "Good experience overall, though the wait time was a bit long.",
      platform: "Yelp",
      status: "pending",
      timeAgo: "4 hours ago",
    },
    {
      id: 3,
      customer: "Jennifer L.",
      rating: 5,
      text: "Best restaurant in town! Will definitely be coming back.",
      platform: "Google",
      status: "responded",
      timeAgo: "1 day ago",
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

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
            <CardDescription>Latest customer feedback across all platforms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentReviews.map((review) => (
              <div key={review.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{review.customer}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <Badge variant={review.status === "responded" ? "default" : "secondary"}>{review.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{review.text}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{review.platform}</span>
                    <span>{review.timeAgo}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Performance</CardTitle>
            <CardDescription>How AI is improving your review management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Response Quality Score</span>
                <span>94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Brand Voice Consistency</span>
                <span>89%</span>
              </div>
              <Progress value={89} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Customer Satisfaction</span>
                <span>96%</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Time Saved This Month</span>
              </div>
              <p className="text-2xl font-bold text-blue-900 mt-1">23.5 hours</p>
              <p className="text-sm text-blue-700">Equivalent to $470 in labor costs</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
