"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, BarChart3, Clock, Share2, Edit3, TrendingUp, Target } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

const mockTests = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    description: "Comprehensive React, TypeScript, and system design assessment",
    questions: { mcq: 15, subjective: 5, coding: 3, problemSolving: 2 },
    submissions: 24,
    status: "active",
    createdAt: "2024-01-15",
    duration: 90,
    skills: ["React", "TypeScript", "System Design", "Performance"],
    targetRoles: ["Frontend Developer", "React Developer"],
    avgScore: 73,
    completionRate: 85,
  },
  {
    id: 2,
    title: "UX Designer Assessment",
    description: "Design thinking, user research, and prototyping skills",
    questions: { mcq: 20, subjective: 8, coding: 0, problemSolving: 5 },
    submissions: 12,
    status: "draft",
    createdAt: "2024-01-20",
    duration: 120,
    skills: ["Design Thinking", "User Research", "Prototyping", "Figma"],
    targetRoles: ["UX Designer", "Product Designer"],
    avgScore: 0,
    completionRate: 0,
  },
]

export default function Dashboard() {
  const [tests, setTests] = useState(mockTests)

  const totalSubmissions = tests.reduce((sum, test) => sum + test.submissions, 0)
  const activeTests = tests.filter((test) => test.status === "active").length
  const avgCompletionRate = tests.reduce((sum, test) => sum + test.completionRate, 0) / tests.length

  return (
    <div className="flex h-screen bg-[#F6F9FE]" style={{ fontFamily: "Archivo, sans-serif" }}>
      <Sidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Good morning, Sarah! 👋</h1>
              <p className="text-gray-600 mt-1">Here's what's happening with your assessments today</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800 px-3 py-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% this week
              </Badge>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Tests</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{tests.length}</p>
                    <p className="text-xs text-green-600 mt-2">+2 this month</p>
                  </div>
                  <div className="w-12 h-12 bg-[#4D31EC] bg-opacity-10 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#4D31EC]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Tests</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{activeTests}</p>
                    <p className="text-xs text-blue-600 mt-2">Currently running</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{totalSubmissions}</p>
                    <p className="text-xs text-green-600 mt-2">+8 today</p>
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
                    <p className="text-sm font-medium text-gray-600">Avg. Completion</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{Math.round(avgCompletionRate)}%</p>
                    <p className="text-xs text-green-600 mt-2">+5% vs last month</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Tests */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Recent Tests</h2>
              <Link href="/tests">
                <Button variant="outline" className="font-medium bg-transparent">
                  View All Tests
                </Button>
              </Link>
            </div>

            <div className="grid gap-6">
              {tests.slice(0, 3).map((test) => (
                <Card key={test.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold text-gray-900">{test.title}</h3>
                          <Badge
                            className={
                              test.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-gray-600">{test.description}</p>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {test.skills.slice(0, 4).map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {skill}
                            </Badge>
                          ))}
                          {test.skills.length > 4 && (
                            <Badge variant="outline" className="bg-gray-50 text-gray-600">
                              +{test.skills.length - 4} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                          <Target className="w-4 h-4" />
                          <span>Target: {test.targetRoles.join(", ")}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-[#4D31EC] hover:bg-[#F8F8FF]">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-[#F8F8FF] rounded-xl">
                        <p className="text-2xl font-bold text-[#4D31EC]">{test.questions.mcq}</p>
                        <p className="text-sm text-gray-600">MCQ</p>
                      </div>
                      <div className="text-center p-3 bg-[#F8F8FF] rounded-xl">
                        <p className="text-2xl font-bold text-[#4D31EC]">{test.questions.subjective}</p>
                        <p className="text-sm text-gray-600">Subjective</p>
                      </div>
                      <div className="text-center p-3 bg-[#F8F8FF] rounded-xl">
                        <p className="text-2xl font-bold text-[#4D31EC]">{test.questions.coding}</p>
                        <p className="text-sm text-gray-600">Coding</p>
                      </div>
                      <div className="text-center p-3 bg-[#F8F8FF] rounded-xl">
                        <p className="text-2xl font-bold text-[#4D31EC]">{test.questions.problemSolving}</p>
                        <p className="text-sm text-gray-600">Problem Solving</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span>Duration: {test.duration} mins</span>
                        <span>Created: {test.createdAt}</span>
                        {test.avgScore > 0 && <span>Avg Score: {test.avgScore}%</span>}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{test.submissions} submissions</span>
                        </div>
                        {test.submissions > 0 && (
                          <Link href={`/submissions/${test.id}`}>
                            <Button size="sm" className="bg-[#4D31EC] hover:bg-[#3D21DC] text-white font-medium">
                              View Details
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
