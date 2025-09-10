"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  FileText,
  Clock,
  Share2,
  Edit3,
  Trash2,
  Search,
  Filter,
  Plus,
  Eye,
  BarChart3,
  Target,
} from "lucide-react"
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
    totalMarks: 100,
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
    totalMarks: 150,
  },
  {
    id: 3,
    title: "Digital Marketing Manager",
    description: "SEO, SEM, analytics, and campaign management evaluation",
    questions: { mcq: 25, subjective: 10, coding: 0, problemSolving: 8 },
    submissions: 18,
    status: "ended",
    createdAt: "2024-01-10",
    duration: 75,
    skills: ["SEO", "SEM", "Analytics", "Campaign Management"],
    targetRoles: ["Marketing Manager", "Digital Marketing Specialist"],
    avgScore: 68,
    completionRate: 92,
    totalMarks: 120,
  },
]

export default function TestsPage() {
  const [tests, setTests] = useState(mockTests)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "ended":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredTests = tests
    .filter((test) => {
      const matchesSearch =
        test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesStatus = statusFilter === "all" || test.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "submissions":
          return b.submissions - a.submissions
        case "score":
          return b.avgScore - a.avgScore
        default:
          return 0
      }
    })

  return (
    <div className="flex h-screen bg-[#F6F9FE]" style={{ fontFamily: "Archivo, sans-serif" }}>
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tests</h1>
              <p className="text-gray-600 mt-1">Manage and monitor your assessments</p>
            </div>
            <Link href="/create-test">
              <Button className="bg-[#4D31EC] hover:bg-[#3D21DC] text-white font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                Create New Test
              </Button>
            </Link>
          </div>
        </header>

        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Filters and Search */}
            <Card className="border-0 shadow-sm mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search tests by title, description, or skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40 h-12">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="ended">Ended</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40 h-12">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="submissions">Most Submissions</SelectItem>
                        <SelectItem value="score">Highest Score</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tests Grid */}
            <div className="grid gap-6">
              {filteredTests.map((test) => (
                <Card key={test.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold text-gray-900">{test.title}</h3>
                          <Badge className={getStatusColor(test.status)}>
                            {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-gray-600">{test.description}</p>

                        <div className="flex flex-wrap gap-2">
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

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Target className="w-4 h-4" />
                          <span>Target: {test.targetRoles.join(", ")}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Link href={`/preview/${test.id}`}>
                          <Button variant="ghost" size="sm" className="text-[#4D31EC] hover:bg-[#F8F8FF]">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
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
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{test.duration} mins</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span>{test.totalMarks} marks</span>
                        </div>
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
                              <BarChart3 className="w-4 h-4 mr-1" />
                              View Analytics
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTests.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tests found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Create your first test to get started"}
                </p>
                <Link href="/create-test">
                  <Button className="bg-[#4D31EC] hover:bg-[#3D21DC] text-white font-medium">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Test
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
