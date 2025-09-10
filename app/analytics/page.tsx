"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, Target, Award, Download, Calendar, ArrowUp, ArrowDown } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

const mockAnalytics = {
  overview: {
    totalTests: 12,
    totalCandidates: 156,
    avgCompletionRate: 78,
    avgScore: 72,
  },
  trends: {
    testsCreated: { current: 12, previous: 8, change: 50 },
    candidatesAssessed: { current: 156, previous: 124, change: 26 },
    avgPerformance: { current: 72, previous: 68, change: 6 },
    completionRate: { current: 78, previous: 82, change: -5 },
  },
  topPerformingTests: [
    {
      id: 1,
      title: "Senior Frontend Developer",
      submissions: 24,
      avgScore: 85,
      completionRate: 92,
      difficulty: "hard",
    },
    {
      id: 2,
      title: "UX Designer Assessment",
      submissions: 18,
      avgScore: 78,
      completionRate: 89,
      difficulty: "medium",
    },
    {
      id: 3,
      title: "Digital Marketing Manager",
      submissions: 15,
      avgScore: 74,
      completionRate: 87,
      difficulty: "medium",
    },
  ],
  skillsAnalysis: [
    { skill: "React", avgScore: 82, candidates: 45, trend: "up" },
    { skill: "JavaScript", avgScore: 78, candidates: 52, trend: "up" },
    { skill: "Design Thinking", avgScore: 75, candidates: 28, trend: "stable" },
    { skill: "SEO", avgScore: 71, candidates: 22, trend: "down" },
    { skill: "Python", avgScore: 69, candidates: 18, trend: "up" },
  ],
  difficultyBreakdown: {
    easy: { tests: 3, avgScore: 84, completionRate: 95 },
    medium: { tests: 6, avgScore: 72, completionRate: 78 },
    hard: { tests: 3, avgScore: 58, completionRate: 65 },
  },
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [testFilter, setTestFilter] = useState("all")

  const getTrendIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="w-4 h-4 text-green-600" />
    if (change < 0) return <ArrowDown className="w-4 h-4 text-red-600" />
    return null
  }

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-600"
    if (change < 0) return "text-red-600"
    return "text-gray-600"
  }

  return (
    <div className="flex h-screen bg-[#F6F9FE]" style={{ fontFamily: "Archivo, sans-serif" }}>
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600 mt-1">Insights into test performance and candidate analytics</p>
            </div>
            <div className="flex gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="font-medium bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Tests</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{mockAnalytics.overview.totalTests}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {getTrendIcon(mockAnalytics.trends.testsCreated.change)}
                        <span
                          className={`text-xs font-medium ${getTrendColor(mockAnalytics.trends.testsCreated.change)}`}
                        >
                          +{mockAnalytics.trends.testsCreated.change}% vs last period
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-[#4D31EC] bg-opacity-10 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-[#4D31EC]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Candidates</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{mockAnalytics.overview.totalCandidates}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {getTrendIcon(mockAnalytics.trends.candidatesAssessed.change)}
                        <span
                          className={`text-xs font-medium ${getTrendColor(mockAnalytics.trends.candidatesAssessed.change)}`}
                        >
                          +{mockAnalytics.trends.candidatesAssessed.change}% vs last period
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg. Completion Rate</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">
                        {mockAnalytics.overview.avgCompletionRate}%
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        {getTrendIcon(mockAnalytics.trends.completionRate.change)}
                        <span
                          className={`text-xs font-medium ${getTrendColor(mockAnalytics.trends.completionRate.change)}`}
                        >
                          {mockAnalytics.trends.completionRate.change}% vs last period
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg. Score</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{mockAnalytics.overview.avgScore}%</p>
                      <div className="flex items-center gap-1 mt-2">
                        {getTrendIcon(mockAnalytics.trends.avgPerformance.change)}
                        <span
                          className={`text-xs font-medium ${getTrendColor(mockAnalytics.trends.avgPerformance.change)}`}
                        >
                          +{mockAnalytics.trends.avgPerformance.change}% vs last period
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top Performing Tests */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-bold">Top Performing Tests</CardTitle>
                  <CardDescription>Tests with highest scores and completion rates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockAnalytics.topPerformingTests.map((test, index) => (
                    <div key={test.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">#{index + 1}</span>
                          <h4 className="font-medium text-gray-900">{test.title}</h4>
                          <Badge
                            className={
                              test.difficulty === "easy"
                                ? "bg-green-100 text-green-800"
                                : test.difficulty === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }
                          >
                            {test.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{test.submissions} submissions</span>
                          <span>{test.completionRate}% completion</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#4D31EC]">{test.avgScore}%</p>
                        <p className="text-xs text-gray-600">Avg Score</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Skills Analysis */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-bold">Skills Performance</CardTitle>
                  <CardDescription>Average scores across different skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockAnalytics.skillsAnalysis.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{skill.skill}</span>
                          <Badge variant="outline" className="text-xs">
                            {skill.candidates} candidates
                          </Badge>
                          {skill.trend === "up" && <TrendingUp className="w-3 h-3 text-green-600" />}
                          {skill.trend === "down" && <ArrowDown className="w-3 h-3 text-red-600" />}
                        </div>
                        <span className="font-semibold text-[#4D31EC]">{skill.avgScore}%</span>
                      </div>
                      <Progress value={skill.avgScore} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Difficulty Analysis */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="font-bold">Performance by Difficulty</CardTitle>
                <CardDescription>How candidates perform across different difficulty levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-green-50 rounded-xl">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-xl text-green-900 mb-2">Easy</h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-3xl font-bold text-green-600">
                          {mockAnalytics.difficultyBreakdown.easy.avgScore}%
                        </p>
                        <p className="text-sm text-green-700">Average Score</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-green-600">
                          {mockAnalytics.difficultyBreakdown.easy.completionRate}%
                        </p>
                        <p className="text-xs text-green-700">Completion Rate</p>
                      </div>
                      <p className="text-sm text-green-700">{mockAnalytics.difficultyBreakdown.easy.tests} tests</p>
                    </div>
                  </div>

                  <div className="text-center p-6 bg-yellow-50 rounded-xl">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="font-bold text-xl text-yellow-900 mb-2">Medium</h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-3xl font-bold text-yellow-600">
                          {mockAnalytics.difficultyBreakdown.medium.avgScore}%
                        </p>
                        <p className="text-sm text-yellow-700">Average Score</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-yellow-600">
                          {mockAnalytics.difficultyBreakdown.medium.completionRate}%
                        </p>
                        <p className="text-xs text-yellow-700">Completion Rate</p>
                      </div>
                      <p className="text-sm text-yellow-700">{mockAnalytics.difficultyBreakdown.medium.tests} tests</p>
                    </div>
                  </div>

                  <div className="text-center p-6 bg-red-50 rounded-xl">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="font-bold text-xl text-red-900 mb-2">Hard</h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-3xl font-bold text-red-600">
                          {mockAnalytics.difficultyBreakdown.hard.avgScore}%
                        </p>
                        <p className="text-sm text-red-700">Average Score</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-red-600">
                          {mockAnalytics.difficultyBreakdown.hard.completionRate}%
                        </p>
                        <p className="text-xs text-red-700">Completion Rate</p>
                      </div>
                      <p className="text-sm text-red-700">{mockAnalytics.difficultyBreakdown.hard.tests} tests</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
