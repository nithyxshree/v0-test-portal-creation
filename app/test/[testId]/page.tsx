"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Users, Clock, Share2, Edit3, Eye, Download, Settings, BarChart3 } from "lucide-react"
import Link from "next/link"

const mockTestData = {
  id: 1,
  title: "Frontend Developer Assessment",
  description: "React, JavaScript, and CSS fundamentals",
  status: "active",
  createdAt: "2024-01-15",
  duration: 90,
  questions: { mcq: 15, subjective: 5, coding: 3, problemSolving: 2 },
  submissions: [
    {
      id: 1,
      candidateName: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      submittedAt: "2024-01-22 14:30",
      status: "completed",
      score: 73,
      duration: 87,
    },
    {
      id: 2,
      candidateName: "Michael Chen",
      email: "michael.chen@email.com",
      submittedAt: "2024-01-22 16:45",
      status: "completed",
      score: 89,
      duration: 92,
    },
    {
      id: 3,
      candidateName: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      submittedAt: "2024-01-23 10:15",
      status: "in-progress",
      score: 0,
      duration: 45,
    },
  ],
}

export default function TestDetailPage({ params }: { params: { testId: string } }) {
  const [test] = useState(mockTestData)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "not-started":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const completedSubmissions = test.submissions.filter((s) => s.status === "completed")
  const averageScore =
    completedSubmissions.length > 0
      ? completedSubmissions.reduce((sum, s) => sum + s.score, 0) / completedSubmissions.length
      : 0
  const completionRate = (completedSubmissions.length / test.submissions.length) * 100

  return (
    <div className="min-h-screen bg-[#F6F9FE]" style={{ fontFamily: "Archivo, sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{test.title}</h1>
              <p className="text-gray-600 font-regular">{test.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-100 text-green-800">Active</Badge>
            <Button variant="outline" size="sm" className="font-medium bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="font-medium bg-transparent">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="font-medium bg-transparent">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50 font-medium bg-transparent"
            >
              End Test
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Test Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                  <p className="text-3xl font-semibold text-gray-900">{test.submissions.length}</p>
                </div>
                <Users className="w-8 h-8 text-[#4D31EC]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-semibold text-gray-900">{completedSubmissions.length}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{Math.round(completionRate)}% rate</p>
                  <Progress value={completionRate} className="w-16 h-2 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-3xl font-semibold text-gray-900">{Math.round(averageScore)}%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Duration</p>
                  <p className="text-3xl font-semibold text-gray-900">{test.duration}m</p>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Test Configuration */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-medium">Test Configuration</CardTitle>
            <CardDescription className="font-regular">Question breakdown and settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-[#F8F8FF] rounded-lg">
                <p className="text-2xl font-semibold text-[#4D31EC]">{test.questions.mcq}</p>
                <p className="text-sm text-gray-600 font-regular">MCQ Questions</p>
              </div>
              <div className="text-center p-4 bg-[#F8F8FF] rounded-lg">
                <p className="text-2xl font-semibold text-[#4D31EC]">{test.questions.subjective}</p>
                <p className="text-sm text-gray-600 font-regular">Subjective</p>
              </div>
              <div className="text-center p-4 bg-[#F8F8FF] rounded-lg">
                <p className="text-2xl font-semibold text-[#4D31EC]">{test.questions.coding}</p>
                <p className="text-sm text-gray-600 font-regular">Coding</p>
              </div>
              <div className="text-center p-4 bg-[#F8F8FF] rounded-lg">
                <p className="text-2xl font-semibold text-[#4D31EC]">{test.questions.problemSolving}</p>
                <p className="text-sm text-gray-600 font-regular">Problem Solving</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Submissions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-medium">Recent Submissions</CardTitle>
              <CardDescription className="font-regular">Latest candidate submissions</CardDescription>
            </div>
            <div className="flex gap-2">
              <Link href={`/submissions/${test.id}`}>
                <Button size="sm" className="bg-[#4D31EC] hover:bg-[#3D21DC] text-white font-medium">
                  <Eye className="w-4 h-4 mr-2" />
                  View All Submissions
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="font-medium bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {test.submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#4D31EC] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {submission.candidateName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h4 className="font-medium">{submission.candidateName}</h4>
                      <p className="text-sm text-gray-600 font-regular">{submission.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="font-semibold text-lg">{submission.score}%</p>
                      <p className="text-xs text-gray-600 font-regular">Score</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{submission.duration}m</p>
                      <p className="text-xs text-gray-600 font-regular">Duration</p>
                    </div>
                    <div className="text-center">
                      <Badge className={getStatusColor(submission.status)} size="sm">
                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                      </Badge>
                      <p className="text-xs text-gray-600 font-regular mt-1">{submission.submittedAt}</p>
                    </div>
                    <Link href={`/submissions/${test.id}?candidate=${submission.id}`}>
                      <Button variant="outline" size="sm" className="font-medium bg-transparent">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {test.submissions.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
                <p className="text-gray-600 font-regular">Share your test link to start receiving submissions.</p>
                <Button className="mt-4 bg-[#4D31EC] hover:bg-[#3D21DC] text-white font-medium">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Test
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
