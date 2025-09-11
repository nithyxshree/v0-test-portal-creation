"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Download,
  Filter,
  Search,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Code,
  MessageSquare,
  Lightbulb,
  Target,
  Award,
  Brain,
} from "lucide-react"
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
    skillScores: {
      React: 85,
      JavaScript: 78,
      HTML5: 90,
      CSS3: 82,
      TypeScript: 65,
      "Problem Solving": 75,
      "System Design": 70,
      "Code Quality": 80,
    },
    answers: {
      mcq: [
        {
          id: 1,
          question: "What is the virtual DOM in React?",
          options: [
            "A) A real DOM element",
            "B) A JavaScript representation of the real DOM",
            "C) A CSS framework",
            "D) A database",
          ],
          selectedAnswer: "B) A JavaScript representation of the real DOM",
          correctAnswer: "B) A JavaScript representation of the real DOM",
          isCorrect: true,
          timeSpent: 45,
          marks: 2,
        },
        {
          id: 2,
          question: "Which hook is used for side effects in React?",
          options: ["A) useState", "B) useContext", "C) useEffect", "D) useReducer"],
          selectedAnswer: "A) useState",
          correctAnswer: "C) useEffect",
          isCorrect: false,
          timeSpent: 30,
          marks: 0,
        },
      ],
      subjective: [
        {
          id: 1,
          question:
            "Explain the concept of state management in React applications. Compare useState, useReducer, and Context API.",
          answer:
            "State management in React is crucial for handling dynamic data. useState is for simple local state, useReducer for complex state logic, and Context API for sharing state across components without prop drilling. Each has its use cases depending on complexity and scope.",
          timeSpent: 480,
          marks: 8,
          maxMarks: 10,
          feedback: "Good understanding of concepts, could elaborate more on when to use each approach.",
        },
      ],
      coding: [
        {
          id: 1,
          question: "Implement a function to debounce API calls in JavaScript",
          code: `function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}`,
          timeSpent: 900,
          marks: 13,
          maxMarks: 15,
          testCases: {
            passed: 4,
            total: 5,
          },
        },
      ],
      problemSolving: [
        {
          id: 1,
          question: "Design a scalable architecture for a real-time chat application",
          answer:
            "I would use WebSocket connections for real-time communication, Redis for message queuing, MongoDB for message storage, and implement horizontal scaling with load balancers. The architecture would include API Gateway, microservices for different features, and CDN for media files.",
          timeSpent: 1200,
          marks: 18,
          maxMarks: 20,
          feedback: "Excellent architectural thinking, good consideration of scalability factors.",
        },
      ],
    },
    insights: {
      strengths: ["Problem-solving", "Technical knowledge", "System design thinking"],
      weaknesses: ["Code optimization", "Time management", "React hooks understanding"],
      recommendation:
        "Strong candidate with good fundamentals. Recommend for senior role with some mentoring on React hooks.",
      skillGaps: ["Advanced React patterns", "Performance optimization"],
      overallRating: "Recommended",
      confidenceLevel: 85,
    },
    proctoring: {
      violations: 0,
      suspicious: false,
      webcamActive: true,
      tabSwitches: 2,
      fullScreenExits: 1,
      copyPasteAttempts: 0,
      suspiciousActivity: [],
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
    skillScores: {
      React: 95,
      JavaScript: 92,
      HTML5: 88,
      CSS3: 85,
      TypeScript: 90,
      "Problem Solving": 88,
      "System Design": 85,
      "Code Quality": 95,
    },
    answers: {
      mcq: [],
      subjective: [],
      coding: [],
      problemSolving: [],
    },
    insights: {
      strengths: ["Excellent coding skills", "Strong analytical thinking", "Great problem-solving"],
      weaknesses: ["Communication in written responses"],
      recommendation: "Highly recommended candidate - excellent technical skills",
      skillGaps: ["Technical writing"],
      overallRating: "Highly Recommended",
      confidenceLevel: 95,
    },
    proctoring: {
      violations: 1,
      suspicious: false,
      webcamActive: true,
      tabSwitches: 0,
      fullScreenExits: 0,
      copyPasteAttempts: 0,
      suspiciousActivity: ["Brief webcam disconnection"],
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
    skillScores: {
      React: 45,
      JavaScript: 50,
      HTML5: 60,
      CSS3: 55,
      TypeScript: 30,
      "Problem Solving": 35,
      "System Design": 25,
      "Code Quality": 40,
    },
    answers: {
      mcq: [],
      subjective: [],
      coding: [],
      problemSolving: [],
    },
    insights: {
      strengths: ["Basic understanding", "Willingness to attempt"],
      weaknesses: ["Incomplete submission", "Technical gaps", "Time management"],
      recommendation: "Needs further evaluation - significant skill gaps identified",
      skillGaps: ["React fundamentals", "JavaScript ES6+", "Problem-solving approach"],
      overallRating: "Not Recommended",
      confidenceLevel: 60,
    },
    proctoring: {
      violations: 3,
      suspicious: true,
      webcamActive: false,
      tabSwitches: 15,
      fullScreenExits: 8,
      copyPasteAttempts: 5,
      suspiciousActivity: ["Multiple tab switches", "Webcam disabled", "Copy-paste attempts"],
    },
  },
]

// Radar Chart Component
const RadarChart = ({ data, skills }: { data: Record<string, number>; skills: string[] }) => {
  const size = 200
  const center = size / 2
  const radius = 70
  const angleStep = (2 * Math.PI) / skills.length

  const points = skills.map((skill, index) => {
    const angle = index * angleStep - Math.PI / 2
    const value = data[skill] || 0
    const r = (value / 100) * radius
    const x = center + r * Math.cos(angle)
    const y = center + r * Math.sin(angle)
    return { x, y, value, skill }
  })

  const pathData = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ") + " Z"

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="mb-4">
        {/* Grid circles */}
        {[20, 40, 60, 80, 100].map((percent) => (
          <circle
            key={percent}
            cx={center}
            cy={center}
            r={(percent / 100) * radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {/* Grid lines */}
        {skills.map((_, index) => {
          const angle = index * angleStep - Math.PI / 2
          const x2 = center + radius * Math.cos(angle)
          const y2 = center + radius * Math.sin(angle)
          return <line key={index} x1={center} y1={center} x2={x2} y2={y2} stroke="#e5e7eb" strokeWidth="1" />
        })}

        {/* Data area */}
        <path d={pathData} fill="rgba(77, 49, 236, 0.2)" stroke="#4D31EC" strokeWidth="2" />

        {/* Data points */}
        {points.map((point, index) => (
          <circle key={index} cx={point.x} cy={point.y} r="4" fill="#4D31EC" />
        ))}

        {/* Skill labels */}
        {skills.map((skill, index) => {
          const angle = index * angleStep - Math.PI / 2
          const labelRadius = radius + 20
          const x = center + labelRadius * Math.cos(angle)
          const y = center + labelRadius * Math.sin(angle)
          return (
            <text
              key={skill}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs fill-gray-600"
            >
              {skill}
            </text>
          )
        })}
      </svg>
    </div>
  )
}

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

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "Highly Recommended":
        return "bg-green-100 text-green-800"
      case "Recommended":
        return "bg-blue-100 text-blue-800"
      case "Not Recommended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const downloadInsights = (submission: any) => {
    const insights = {
      candidate: submission.candidateName,
      email: submission.email,
      overallScore: submission.scores.overall,
      skillScores: submission.skillScores,
      insights: submission.insights,
      recommendation: submission.insights.recommendation,
      testDate: submission.submittedAt,
    }

    const dataStr = JSON.stringify(insights, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `${submission.candidateName.replace(/\s+/g, "_")}_insights.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
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
              <Button
                variant="outline"
                className="font-medium bg-transparent"
                onClick={() => downloadInsights(submission)}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Insights
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="insights" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="answers">Answers</TabsTrigger>
                  <TabsTrigger value="proctoring">Proctoring</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                </TabsList>

                <TabsContent value="insights" className="space-y-6">
                  {/* AI Insights */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-medium flex items-center gap-2">
                        <Brain className="w-5 h-5 text-purple-600" />
                        AI-Generated Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                          <div className="text-4xl font-bold text-purple-600 mb-2">
                            {submission.insights.confidenceLevel}%
                          </div>
                          <p className="text-sm text-gray-600">Confidence Level</p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                          <Badge className={`${getRatingColor(submission.insights.overallRating)} text-lg px-4 py-2`}>
                            {submission.insights.overallRating}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-2">Overall Rating</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-green-700 mb-3 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Key Strengths
                          </h4>
                          <ul className="space-y-2">
                            {submission.insights.strengths.map((strength, index) => (
                              <li key={index} className="flex items-start gap-2 font-regular">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-red-700 mb-3 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Areas for Improvement
                          </h4>
                          <ul className="space-y-2">
                            {submission.insights.weaknesses.map((weakness, index) => (
                              <li key={index} className="flex items-start gap-2 font-regular">
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                {weakness}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4 text-blue-600" />
                          Skill Gaps Identified
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {submission.insights.skillGaps.map((gap, index) => (
                            <Badge key={index} variant="outline" className="text-orange-700 border-orange-200">
                              {gap}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Award className="w-4 h-4 text-blue-600" />
                          Recommendation
                        </h4>
                        <p className="font-regular text-gray-700">{submission.insights.recommendation}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="skills" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-medium">Skills Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-medium mb-4 text-center">Skills Radar</h4>
                          <RadarChart data={submission.skillScores} skills={Object.keys(submission.skillScores)} />
                        </div>
                        <div>
                          <h4 className="font-medium mb-4">Detailed Breakdown</h4>
                          <div className="space-y-3">
                            {Object.entries(submission.skillScores).map(([skill, score]) => (
                              <div key={skill}>
                                <div className="flex justify-between mb-1">
                                  <span className="font-regular text-sm">{skill}</span>
                                  <span className={`font-medium text-sm ${getScoreColor(score)}`}>{score}%</span>
                                </div>
                                <Progress value={score} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="answers" className="space-y-6">
                  {/* MCQ Answers */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-medium flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Multiple Choice Questions ({submission.answers.mcq.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {submission.answers.mcq.map((mcq, index) => (
                        <div key={mcq.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-medium">
                              Q{index + 1}. {mcq.question}
                            </h4>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={mcq.isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                              >
                                {mcq.marks}/{mcq.marks || 2} marks
                              </Badge>
                              <span className="text-sm text-gray-500">{mcq.timeSpent}s</span>
                            </div>
                          </div>

                          <div className="space-y-2 mb-3">
                            {mcq.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`p-2 rounded text-sm ${
                                  option === mcq.selectedAnswer
                                    ? mcq.isCorrect
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                    : option === mcq.correctAnswer
                                      ? "bg-green-50 text-green-700 border border-green-200"
                                      : "bg-gray-50"
                                }`}
                              >
                                {option}
                                {option === mcq.selectedAnswer && (
                                  <span className="ml-2 text-xs">{mcq.isCorrect ? "✓ Selected" : "✗ Selected"}</span>
                                )}
                                {option === mcq.correctAnswer && option !== mcq.selectedAnswer && (
                                  <span className="ml-2 text-xs text-green-600">✓ Correct</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Subjective Answers */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-medium flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-purple-600" />
                        Subjective Questions ({submission.answers.subjective.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {submission.answers.subjective.map((subj, index) => (
                        <div key={subj.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-medium">
                              Q{index + 1}. {subj.question}
                            </h4>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-purple-100 text-purple-800">
                                {subj.marks}/{subj.maxMarks} marks
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {Math.floor(subj.timeSpent / 60)}m {subj.timeSpent % 60}s
                              </span>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-3 rounded mb-3">
                            <p className="text-sm font-regular">{subj.answer}</p>
                          </div>

                          {subj.feedback && (
                            <div className="bg-blue-50 p-3 rounded">
                              <p className="text-sm text-blue-800">
                                <strong>Feedback:</strong> {subj.feedback}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Coding Answers */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-medium flex items-center gap-2">
                        <Code className="w-5 h-5 text-green-600" />
                        Coding Questions ({submission.answers.coding.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {submission.answers.coding.map((code, index) => (
                        <div key={code.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-medium">
                              Q{index + 1}. {code.question}
                            </h4>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-100 text-green-800">
                                {code.marks}/{code.maxMarks} marks
                              </Badge>
                              <Badge variant="outline">
                                {code.testCases.passed}/{code.testCases.total} test cases
                              </Badge>
                              <span className="text-sm text-gray-500">{Math.floor(code.timeSpent / 60)}m</span>
                            </div>
                          </div>

                          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                            <pre className="text-sm">
                              <code>{code.code}</code>
                            </pre>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Problem Solving Answers */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-medium flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-orange-600" />
                        Problem Solving Questions ({submission.answers.problemSolving.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {submission.answers.problemSolving.map((prob, index) => (
                        <div key={prob.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-medium">
                              Q{index + 1}. {prob.question}
                            </h4>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-orange-100 text-orange-800">
                                {prob.marks}/{prob.maxMarks} marks
                              </Badge>
                              <span className="text-sm text-gray-500">{Math.floor(prob.timeSpent / 60)}m</span>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-3 rounded mb-3">
                            <p className="text-sm font-regular">{prob.answer}</p>
                          </div>

                          {prob.feedback && (
                            <div className="bg-orange-50 p-3 rounded">
                              <p className="text-sm text-orange-800">
                                <strong>Feedback:</strong> {prob.feedback}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

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

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <span className="font-regular">Tab Switches:</span>
                          <span className="font-medium">{submission.proctoring.tabSwitches}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-regular">Full Screen Exits:</span>
                          <span className="font-medium">{submission.proctoring.fullScreenExits}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-regular">Copy/Paste Attempts:</span>
                          <span className="font-medium">{submission.proctoring.copyPasteAttempts}</span>
                        </div>
                        <div className="flex justify-between items-center">
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

                      {submission.proctoring.suspiciousActivity.length > 0 && (
                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-2">Suspicious Activities</h4>
                          <ul className="space-y-1">
                            {submission.proctoring.suspiciousActivity.map((activity, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-red-700">
                                <AlertCircle className="w-4 h-4" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
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
                  <Button
                    variant="outline"
                    className="w-full font-medium bg-transparent"
                    onClick={() => downloadInsights(submission)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-medium">Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Overall Performance</span>
                      <Badge className={getRatingColor(submission.insights.overallRating)}>
                        {submission.insights.overallRating}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Confidence Level</span>
                      <span className="font-medium">{submission.insights.confidenceLevel}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Top Skill</span>
                      <span className="font-medium">
                        {Object.entries(submission.skillScores).reduce((a, b) => (a[1] > b[1] ? a : b))[0]}
                      </span>
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
