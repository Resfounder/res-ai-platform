"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { ArrowLeft, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  businessProfiles,
  calculateHealthScore,
  getHealthRating,
  type BusinessType,
} from "../data/business-profiles"

function HealthScoreContent() {
  const searchParams = useSearchParams()
  const typeParam = searchParams.get("type") as BusinessType | null
  const businessType: BusinessType = typeParam && typeParam in businessProfiles ? typeParam : "hairsalon"
  const profile = businessProfiles[businessType]

  const healthScore = profile.healthScore
  const overallScore = calculateHealthScore(healthScore)
  const rating = getHealthRating(overallScore)

  const radius = 64
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (overallScore / 100) * circumference

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Activity className="h-6 w-6 text-purple-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Communication Health Score</h1>
              <p className="text-sm text-gray-500">{profile.name}</p>
            </div>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Overall score */}
        <Card className="border-purple-200">
          <CardContent className="py-8">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="relative h-44 w-44 shrink-0">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 144 144">
                  <circle
                    cx="72"
                    cy="72"
                    r={radius}
                    fill="none"
                    strokeWidth="14"
                    className="text-purple-100"
                    stroke="currentColor"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r={radius}
                    fill="none"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    className={rating.ring}
                    stroke="currentColor"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-gray-900">{overallScore}</span>
                  <span className="text-xs text-gray-500">out of 100</span>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <Badge variant="secondary" className={`${rating.color} bg-purple-50`}>
                  {rating.label}
                </Badge>
                <h2 className="text-2xl font-bold text-gray-900 mt-3">How your score is calculated</h2>
                <p className="text-gray-600 mt-2 max-w-lg">
                  Your Communication Health Score is a weighted average across six key areas. Each area contributes a
                  set number of points toward your total of 100.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Score Breakdown</CardTitle>
            <CardDescription>The weighted parameters that make up your overall score</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {healthScore.map((category, index) => {
              const points = Math.round((category.score * category.weight) / 100)
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-gray-900">{category.label}</span>
                      <Badge variant="outline" className="text-xs">
                        Weight {category.weight}
                      </Badge>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {points}/{category.weight} pts
                    </span>
                  </div>
                  <Progress value={category.score} className="h-2.5" />
                  <p className="text-xs text-gray-500">Performance in this area: {category.score}%</p>
                </div>
              )
            })}

            <div className="flex items-center justify-between border-t pt-4">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-semibold text-gray-900">{overallScore}/100</span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default function HealthScorePage() {
  return (
    <Suspense fallback={null}>
      <HealthScoreContent />
    </Suspense>
  )
}
