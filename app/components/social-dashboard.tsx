"use client"

import Link from "next/link"
import { TrendingUp, Activity, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useBusiness } from "../context/business-context"
import { calculateHealthScore, getHealthRating } from "../data/business-profiles"

export function SocialDashboard() {
  const { businessType, profile } = useBusiness()
  const stats = profile.stats
  const platformStats = profile.platformStats
  const recentActivity = profile.recentActivity
  const healthScore = profile.healthScore
  const overallScore = calculateHealthScore(healthScore)
  const rating = getHealthRating(overallScore)

  // SVG donut ring geometry for the overall score.
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (overallScore / 100) * circumference

  return (
    <div className="space-y-6">
      {/* Communication Health Score */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-purple-600" />
            <CardTitle>Communication Health Score</CardTitle>
          </div>
          <CardDescription>
            A weighted measure of how well you respond to and engage with your customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6">
            {/* Overall score ring - click to view the full breakdown */}
            <Link
              href={`/health-score?type=${businessType}`}
              className="group flex flex-col items-center justify-center rounded-xl p-2 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              aria-label={`Communication health score ${overallScore} out of 100. View full breakdown.`}
            >
              <div className="relative h-36 w-36">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    strokeWidth="12"
                    className="text-purple-100"
                    stroke="currentColor"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    className={rating.ring}
                    stroke="currentColor"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                    {overallScore}
                  </span>
                  <span className="text-xs text-gray-500">out of 100</span>
                </div>
              </div>
              <Badge variant="secondary" className={`mt-3 ${rating.color} bg-white`}>
                {rating.label}
              </Badge>
            </Link>

            {/* Prompt to view the detailed breakdown */}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm text-gray-600 max-w-md">
                Your score is calculated from six weighted areas including review response rate, reply speed, and
                customer sentiment.
              </p>
              <Link
                href={`/health-score?type=${businessType}`}
                className="mt-3 inline-flex items-center text-sm font-medium text-purple-700 hover:text-purple-900"
              >
                View score breakdown
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
