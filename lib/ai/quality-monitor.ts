export interface QualityMetrics {
  responseId: string
  businessId: string
  timestamp: Date
  qualityScore: number
  humanApprovalRate: number
  customerSatisfaction?: number
  editDistance?: number // How much human edited the response
  model: string
  processingTime: number
}

export class AIQualityMonitor {
  private qualityThresholds = {
    excellent: 9.0,
    good: 7.5,
    acceptable: 6.0,
    poor: 4.0,
  }

  async trackQuality(metrics: QualityMetrics) {
    // Store quality metrics
    await this.storeQualityMetrics(metrics)

    // Check for quality degradation
    await this.checkQualityTrends(metrics.businessId)

    // Alert if quality drops
    if (metrics.qualityScore < this.qualityThresholds.acceptable) {
      await this.alertQualityIssue(metrics)
    }
  }

  async getQualityReport(businessId: string, timeframe: "day" | "week" | "month") {
    const metrics = await this.getQualityMetrics(businessId, timeframe)

    return {
      averageQuality: this.calculateAverage(metrics.map((m) => m.qualityScore)),
      approvalRate: this.calculateAverage(metrics.map((m) => m.humanApprovalRate)),
      responseTime: this.calculateAverage(metrics.map((m) => m.processingTime)),
      qualityTrend: this.calculateTrend(metrics),
      issueCount: metrics.filter((m) => m.qualityScore < this.qualityThresholds.acceptable).length,
      recommendations: this.generateRecommendations(metrics),
    }
  }

  private async storeQualityMetrics(metrics: QualityMetrics) {
    // Implementation would store in database
    console.log("Storing quality metrics:", metrics)
  }

  private async checkQualityTrends(businessId: string) {
    // Check if quality is declining over time
    const recentMetrics = await this.getQualityMetrics(businessId, "week")
    const trend = this.calculateTrend(recentMetrics)

    if (trend < -0.5) {
      // Quality dropping
      await this.alertQualityDegradation(businessId, trend)
    }
  }

  private calculateTrend(metrics: QualityMetrics[]): number {
    if (metrics.length < 2) return 0

    // Simple linear trend calculation
    const scores = metrics.map((m) => m.qualityScore)
    const n = scores.length
    const sumX = (n * (n + 1)) / 2
    const sumY = scores.reduce((a, b) => a + b, 0)
    const sumXY = scores.reduce((sum, score, index) => sum + score * (index + 1), 0)
    const sumX2 = (n * (n + 1) * (2 * n + 1)) / 6

    return (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
  }

  private generateRecommendations(metrics: QualityMetrics[]): string[] {
    const recommendations: string[] = []
    const avgQuality = this.calculateAverage(metrics.map((m) => m.qualityScore))
    const avgApproval = this.calculateAverage(metrics.map((m) => m.humanApprovalRate))

    if (avgQuality < this.qualityThresholds.good) {
      recommendations.push("Consider updating brand voice training data")
      recommendations.push("Review and improve system prompts")
    }

    if (avgApproval < 0.8) {
      recommendations.push("Increase quality threshold for auto-posting")
      recommendations.push("Add more specific brand voice guidelines")
    }

    return recommendations
  }

  private calculateAverage(numbers: number[]): number {
    return numbers.reduce((a, b) => a + b, 0) / numbers.length
  }

  private async getQualityMetrics(businessId: string, timeframe: string): Promise<QualityMetrics[]> {
    // Implementation would fetch from database
    return []
  }

  private async alertQualityIssue(metrics: QualityMetrics) {
    console.log(`Quality alert: Response ${metrics.responseId} scored ${metrics.qualityScore}`)
  }

  private async alertQualityDegradation(businessId: string, trend: number) {
    console.log(`Quality degradation alert for business ${businessId}: trend ${trend}`)
  }
}
