"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Download, Filter, Search, Eye, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const mockSubmissions = [
  {
    id: 1,
    candidateName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    submittedAt: "2024-01-22 14:30",
    duration: 87,
    status: "completed",
    scores: {
      mcq: { score: 12, total: 15, percentage: 80 },
      subjective: { score: 7, total: 10, percentage: 70 },
      coding: { score: 2, total: 3, percentage: 67 },
      problemSolving: { score: 6, total: 8, percentage: 75 },
      overall: 73,
    },
    insights: {
      strengths: ["Problem-solving", "Technical knowledge"],
      weaknesses: ["Code optimization", "Time management"],
      recommendation: "Strong candidate with good fundamentals",
    },
    proctoring: {
      violations: 0,
      suspicious: false,
      webcamActive: true,
      tabSwitches: 2,
    },
  },
  {
    id: 2,
    candidateName: "Michael Chen",
    email: "michael.chen@email.com",
    submittedAt: "2024-01-22 16:45",
    duration: 92,
    status: "completed",
    scores: {
      mcq: { score: 14, total: 15, percentage: 93 },
      subjective: { score: 8, total: 10, percentage: 80 },
      coding: { score: 3, total: 3, percentage: 100 },
      problemSolving: { score: 7, total: 8, percentage: 88 },
      overall: 89,
    },
    insights: {
      strengths: ["Excellent coding skills", "Strong analytical thinking"],
      weaknesses: ["Communication in written responses"],
      recommendation: "Highly recommended candidate",
    },
    proctoring: {
      violations: 1,
      suspicious: false,
      webcamActive: true,
      tabSwitches: 0,
    },
  },
  {
    id: 3,
    candidateName: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    submittedAt: "2024-01-23 10:15",
    duration: 45,
    status: "incomplete",
    scores: {
      mcq: { score: 8, total: 15, percentage: 53 },
      subjective: { score: 3, total: 10, percentage: 30 },
      coding: { score: 0, total: 3, percentage: 0 },
      problemSolving: { score: 2, total: 8, percentage: 25 },
      overall: 36,
    },
    insights: {
      strengths: ["Basic understanding"],
      weaknesses: ["Incomplete submission", "Technical gaps"],
      recommendation: "Needs further evaluation",
    },
    proctoring: {
      violations: 3,
      suspicious: true,
      webcamActive: false,
      tabSwitches: 15,
    },
  },
]

export default function SubmissionsPage({ params }: { params: { testId: string } }) {
  const [submissions] = useState(mockSubmissions)
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "incomplete":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || sub.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const averageScore = submissions.reduce((sum, sub) => sum + sub.scores.overall, 0) / submissions.length
  const completedSubmissions = submissions.filter((sub) => sub.status === "completed").length

  if (selectedSubmission) {
    const submission = submissions.find((s) => s.id === selectedSubmission)!

    return (
      <div className="min-h-screen bg-[#F6F9FE]" style={{ fontFamily: "Archivo, sans-serif" }}>
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedSubmission(null)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Submissions
              </Button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{submission.candidateName}</h1>
                <p className="text-gray-600 font-regular">{submission.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getStatusColor(submission.status)}>
                {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
              </Badge>
              <Button variant="outline" className="font-medium bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="answers">Answers</TabsTrigger>
                  <TabsTrigger value="proctoring">Proctoring</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-medium">Score Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-[#F8F8FF] rounded-lg">
                          <p className="text-3xl font-semibold text-[#4D31EC]">{submission.scores.overall}%</p>
                          <p className="text-sm text-gray-600 font-regular">Overall Score</p>
                        </div>
                        <div className="text-center p-4 bg-[#F6F9FE] rounded-lg">
                          <p className="text-3xl font-semibold text-gray-900">{submission.duration}m</p>
                          <p className="text-sm text-gray-600 font-regular">Time Taken</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-regular">
                              MCQ ({submission.scores.mcq.score}/{submission.scores.mcq.total})
                            </span>
                            <span className={`font-medium ${getScoreColor(submission.scores.mcq.percentage)}`}>
                              {submission.scores.mcq.percentage}%
                            </span>
                          </div>
                          <Progress value={submission.scores.mcq.percentage} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-regular">
                              Subjective ({submission.scores.subjective.score}/{submission.scores.subjective.total})
                            </span>
                            <span className={`font-medium ${getScoreColor(submission.scores.subjective.percentage)}`}>
                              {submission.scores.subjective.percentage}%
                            </span>
                          </div>
                          <Progress value={submission.scores.subjective.percentage} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-regular">
                              Coding ({submission.scores.coding.score}/{submission.scores.coding.total})
                            </span>
                            <span className={`font-medium ${getScoreColor(submission.scores.coding.percentage)}`}>
                              {submission.scores.coding.percentage}%
                            </span>
                          </div>
                          <Progress value={submission.scores.coding.percentage} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-regular">
                              Problem Solving ({submission.scores.problemSolving.score}/
                              {submission.scores.problemSolving.total})
                            </span>
                            <span
                              className={`font-medium ${getScoreColor(submission.scores.problemSolving.percentage)}`}
                            >
                              {submission.scores.problemSolving.percentage}%
                            </span>
                          </div>
                          <Progress value={submission.scores.problemSolving.percentage} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="proctoring" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-medium">Proctoring Report</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          {submission.proctoring.violations === 0 ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-yellow-500" />
                          )}
                          <div>
                            <p className="font-medium">{submission.proctoring.violations} Violations</p>
                            <p className="text-sm text-gray-600 font-regular">Security alerts</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {submission.proctoring.webcamActive ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                          <div>
                            <p className="font-medium">Webcam Status</p>
                            <p className="text-sm text-gray-600 font-regular">
                              {submission.proctoring.webcamActive ? "Active" : "Inactive"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <span className="font-regular">Tab Switches:</span>
                          <span className="font-medium">{submission.proctoring.tabSwitches}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-regular">Suspicious Activity:</span>
                          <Badge
                            className={
                              submission.proctoring.suspicious
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }
                          >
                            {submission.proctoring.suspicious ? "Detected" : "None"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="insights" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-medium">AI-Generated Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-green-700 mb-2">Strengths</h4>
                        <ul className="space-y-1">
                          {submission.insights.strengths.map((strength, index) => (
                            <li key={index} className="flex items-center gap-2 font-regular">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-red-700 mb-2">Areas for Improvement</h4>
                        <ul className="space-y-1">
                          {submission.insights.weaknesses.map((weakness, index) => (
                            <li key={index} className="flex items-center gap-2 font-regular">
                              <AlertCircle className="w-4 h-4 text-red-500" />
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-2">Recommendation</h4>
                        <p className="font-regular text-gray-700">{submission.insights.recommendation}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-medium">Candidate Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 font-regular">Submitted</p>
                    <p className="font-medium">{submission.submittedAt}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-regular">Duration</p>
                    <p className="font-medium">{submission.duration} minutes</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-regular">Status</p>
                    <Badge className={getStatusColor(submission.status)}>
                      {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-medium">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full font-medium bg-transparent">
                    Schedule Interview
                  </Button>
                  <Button variant="outline" className="w-full font-medium bg-transparent">
                    Send Feedback
                  </Button>
                  <Button variant="outline" className="w-full font-medium bg-transparent">
                    Add to Shortlist
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F6F9FE]" style={{ fontFamily: "Archivo, sans-serif" }}>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Test Submissions</h1>
              <p className="text-gray-600 font-regular">Frontend Developer Assessment</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="font-medium bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
            <Button
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50 font-medium bg-transparent"
            >
              End Test
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                  <p className="text-3xl font-semibold text-gray-900">{submissions.length}</p>
                </div>
                <Eye className="w-8 h-8 text-[#4D31EC]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-semibold text-gray-900">{completedSubmissions}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
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
                <Badge className="text-lg px-3 py-1 bg-[#F8F8FF] text-[#4D31EC]">
                  {averageScore >= 80 ? "Excellent" : averageScore >= 60 ? "Good" : "Needs Improvement"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Duration</p>
                  <p className="text-3xl font-semibold text-gray-900">75m</p>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="incomplete">Incomplete</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          {filteredSubmissions.map((submission) => (
            <Card
              key={submission.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedSubmission(submission.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#4D31EC] rounded-full flex items-center justify-center text-white font-semibold">
                      {submission.candidateName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{submission.candidateName}</h3>
                      <p className="text-gray-600 font-regular">{submission.email}</p>
                      <p className="text-sm text-gray-500 font-regular">Submitted: {submission.submittedAt}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-semibold text-[#4D31EC]">{submission.scores.overall}%</p>
                      <p className="text-sm text-gray-600 font-regular">Overall</p>
                    </div>

                    <div className="text-center">
                      <p className="text-lg font-medium">{submission.duration}m</p>
                      <p className="text-sm text-gray-600 font-regular">Duration</p>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <Badge className={getStatusColor(submission.status)}>
                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                      </Badge>
                      {submission.proctoring.suspicious && (
                        <Badge className="bg-red-100 text-red-800">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Flagged
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-4">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="font-medium">{submission.scores.mcq.percentage}%</p>
                    <p className="text-xs text-gray-600 font-regular">MCQ</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="font-medium">{submission.scores.subjective.percentage}%</p>
                    <p className="text-xs text-gray-600 font-regular">Subjective</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="font-medium">{submission.scores.coding.percentage}%</p>
                    <p className="text-xs text-gray-600 font-regular">Coding</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="font-medium">{submission.scores.problemSolving.percentage}%</p>
                    <p className="text-xs text-gray-600 font-regular">Problem Solving</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
