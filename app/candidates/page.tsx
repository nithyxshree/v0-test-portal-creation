"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  Download,
  Eye,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react"
import { Sidebar } from "@/components/sidebar"

const mockCandidates = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatar: "",
    totalTests: 3,
    completedTests: 2,
    avgScore: 85,
    lastTestDate: "2024-01-22",
    status: "active",
    skills: ["React", "TypeScript", "Node.js", "System Design"],
    tests: [
      {
        id: 1,
        title: "Senior Frontend Developer",
        score: 87,
        status: "completed",
        date: "2024-01-22",
        duration: 85,
        skillsAssessed: ["React", "TypeScript", "CSS"],
        strengths: ["Component Architecture", "State Management"],
        weaknesses: ["Performance Optimization"],
      },
      {
        id: 2,
        title: "System Design Assessment",
        score: 82,
        status: "completed",
        date: "2024-01-15",
        duration: 120,
        skillsAssessed: ["System Design", "Scalability", "Architecture"],
        strengths: ["Database Design", "API Architecture"],
        weaknesses: ["Caching Strategies"],
      },
    ],
    overallRating: 4.5,
    recommendation: "Strong candidate with excellent technical skills",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    avatar: "",
    totalTests: 2,
    completedTests: 2,
    avgScore: 92,
    lastTestDate: "2024-01-20",
    status: "active",
    skills: ["Python", "Machine Learning", "Data Analysis", "SQL"],
    tests: [
      {
        id: 3,
        title: "Data Scientist Assessment",
        score: 94,
        status: "completed",
        date: "2024-01-20",
        duration: 110,
        skillsAssessed: ["Python", "ML", "Statistics"],
        strengths: ["Algorithm Implementation", "Data Visualization"],
        weaknesses: ["Deep Learning"],
      },
      {
        id: 4,
        title: "SQL & Analytics Test",
        score: 89,
        status: "completed",
        date: "2024-01-18",
        duration: 75,
        skillsAssessed: ["SQL", "Data Analysis", "Statistics"],
        strengths: ["Complex Queries", "Data Modeling"],
        weaknesses: ["Query Optimization"],
      },
    ],
    overallRating: 4.8,
    recommendation: "Exceptional candidate with strong analytical skills",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    avatar: "",
    totalTests: 1,
    completedTests: 0,
    avgScore: 0,
    lastTestDate: "2024-01-23",
    status: "in-progress",
    skills: ["UX Design", "Figma", "User Research"],
    tests: [
      {
        id: 5,
        title: "UX Designer Assessment",
        score: 0,
        status: "in-progress",
        date: "2024-01-23",
        duration: 45,
        skillsAssessed: ["UX Design", "Prototyping", "User Research"],
        strengths: [],
        weaknesses: [],
      },
    ],
    overallRating: 0,
    recommendation: "Assessment in progress",
  },
]

export default function CandidatesPage() {
  const [candidates] = useState(mockCandidates)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTestStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || candidate.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const totalCandidates = candidates.length
  const activeCandidates = candidates.filter((c) => c.status === "active").length
  const avgScore = candidates.reduce((sum, c) => sum + c.avgScore, 0) / candidates.length

  if (selectedCandidate) {
    const candidate = candidates.find((c) => c.id === selectedCandidate)!

    return (
      <div className="flex h-screen bg-[#F6F9FE]" style={{ fontFamily: "Archivo, sans-serif" }}>
        <Sidebar />

        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => setSelectedCandidate(null)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Candidates
                </Button>
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[#4D31EC] text-white font-semibold">
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{candidate.name}</h1>
                    <p className="text-gray-600">{candidate.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={getStatusColor(candidate.status)}>
                  {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                </Badge>
                <Button variant="outline" className="font-medium bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </div>
          </header>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Performance Overview */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-bold">Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <div className="text-center p-4 bg-[#F8F8FF] rounded-xl">
                        <p className="text-3xl font-bold text-[#4D31EC]">{candidate.avgScore}%</p>
                        <p className="text-sm text-gray-600 mt-1">Average Score</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-xl">
                        <p className="text-3xl font-bold text-green-600">{candidate.completedTests}</p>
                        <p className="text-sm text-gray-600 mt-1">Tests Completed</p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-xl">
                        <div className="flex items-center justify-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(candidate.overallRating)
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Overall Rating</p>
                      </div>
                    </div>

                    {/* Skills Radar Chart Placeholder */}
                    <div className="p-8 bg-gray-50 rounded-xl text-center">
                      <div className="w-48 h-48 mx-auto bg-white rounded-full flex items-center justify-center border-4 border-[#4D31EC] border-dashed">
                        <div className="text-center">
                          <Award className="w-12 h-12 text-[#4D31EC] mx-auto mb-2" />
                          <p className="text-sm font-semibold text-gray-900">Skills Radar Chart</p>
                          <p className="text-xs text-gray-600">Interactive visualization</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Test History */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-bold">Test History</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {candidate.tests.map((test, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-gray-900">{test.title}</h4>
                              {getTestStatusIcon(test.status)}
                              {test.score > 0 && <Badge className="bg-[#4D31EC] text-white">{test.score}%</Badge>}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>Date: {test.date}</span>
                              <span>Duration: {test.duration} mins</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-900 mb-2">Skills Assessed</p>
                            <div className="flex flex-wrap gap-1">
                              {test.skillsAssessed.map((skill, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          {test.strengths.length > 0 && (
                            <div>
                              <p className="text-sm font-semibold text-green-700 mb-2">Strengths</p>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {test.strengths.map((strength, i) => (
                                  <li key={i} className="flex items-center gap-2">
                                    <CheckCircle className="w-3 h-3 text-green-600" />
                                    {strength}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {test.weaknesses.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm font-semibold text-red-700 mb-2">Areas for Improvement</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {test.weaknesses.map((weakness, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <AlertCircle className="w-3 h-3 text-red-600" />
                                  {weakness}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Candidate Info */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-bold">Candidate Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{candidate.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{candidate.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{candidate.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Last test: {candidate.lastTestDate}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-bold">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill, index) => (
                        <Badge key={index} className="bg-[#4D31EC] text-white">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Recommendation */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-bold">AI Recommendation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <p className="text-sm text-blue-900 font-medium mb-2">Assessment Summary</p>
                      <p className="text-sm text-blue-800">{candidate.recommendation}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-bold">Quick Actions</CardTitle>
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
                    <Button className="w-full bg-[#4D31EC] hover:bg-[#3D21DC] text-white font-medium">
                      <Download className="w-4 h-4 mr-2" />
                      Download Full Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#F6F9FE]" style={{ fontFamily: "Archivo, sans-serif" }}>
      <Sidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
              <p className="text-gray-600 mt-1">Manage and evaluate candidate performance</p>
            </div>
            <Button variant="outline" className="font-medium bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Candidates</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{totalCandidates}</p>
                  </div>
                  <div className="w-12 h-12 bg-[#4D31EC] bg-opacity-10 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#4D31EC]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Candidates</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{activeCandidates}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average Score</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{Math.round(avgScore)}%</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">This Week</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">5</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-0 shadow-sm mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search candidates by name, email, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48 h-12">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Candidates List */}
          <div className="grid gap-6">
            {filteredCandidates.map((candidate) => (
              <Card
                key={candidate.id}
                className="border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedCandidate(candidate.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-[#4D31EC] text-white font-semibold text-lg">
                          {candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                          <Badge className={getStatusColor(candidate.status)}>
                            {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            <span>{candidate.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{candidate.location}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.slice(0, 4).map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 4 && (
                            <Badge variant="outline" className="bg-gray-50 text-gray-600">
                              +{candidate.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#4D31EC]">{candidate.avgScore}%</p>
                        <p className="text-sm text-gray-600">Avg Score</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{candidate.completedTests}</p>
                        <p className="text-sm text-gray-600">Tests</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(candidate.overallRating)
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">Rating</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCandidates.length === 0 && (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No candidates found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
