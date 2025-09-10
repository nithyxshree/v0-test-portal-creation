"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Wand2,
  Eye,
  Plus,
  Sparkles,
  X,
  Target,
  FileText,
  Code,
  MessageSquare,
  Lightbulb,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

const roleTemplates = {
  // Technology Roles
  "Frontend Developer": {
    category: "Technology",
    skills: ["React", "JavaScript", "HTML5", "CSS3", "TypeScript", "Responsive Design"],
    description: "Evaluates frontend development skills including modern frameworks and responsive design",
    targetAudience: ["Frontend Developer", "React Developer", "UI Developer"],
    prerequisites: ["2+ years frontend experience", "Strong JavaScript fundamentals"],
  },
  "Backend Developer": {
    category: "Technology",
    skills: ["Node.js", "Python", "REST APIs", "Database Design", "Authentication", "Security"],
    description: "Comprehensive backend development assessment covering APIs and system design",
    targetAudience: ["Backend Developer", "Full Stack Developer", "API Developer"],
    prerequisites: ["3+ years backend experience", "Database design knowledge"],
  },
  "Data Scientist": {
    category: "Technology",
    skills: ["Python", "Machine Learning", "Statistics", "Data Visualization", "SQL", "Pandas"],
    description: "Advanced data science assessment focusing on ML algorithms and statistical analysis",
    targetAudience: ["Data Scientist", "ML Engineer", "Data Analyst"],
    prerequisites: ["Strong statistics background", "Python/R proficiency"],
  },
  "DevOps Engineer": {
    category: "Technology",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Infrastructure", "Monitoring"],
    description: "DevOps and infrastructure management assessment",
    targetAudience: ["DevOps Engineer", "Site Reliability Engineer", "Cloud Engineer"],
    prerequisites: ["Cloud platform experience", "Container orchestration knowledge"],
  },

  // Design Roles
  "UX Designer": {
    category: "Design",
    skills: ["User Research", "Wireframing", "Prototyping", "Design Thinking", "Usability Testing", "Figma"],
    description: "Comprehensive UX design assessment focusing on user-centered design principles",
    targetAudience: ["UX Designer", "Product Designer", "Interaction Designer"],
    prerequisites: ["Design portfolio", "User research experience"],
  },
  "UI Designer": {
    category: "Design",
    skills: ["Visual Design", "Design Systems", "Typography", "Color Theory", "Adobe Creative Suite", "Figma"],
    description: "Visual design skills assessment including design systems and brand consistency",
    targetAudience: ["UI Designer", "Visual Designer", "Graphic Designer"],
    prerequisites: ["Strong visual design portfolio", "Design tool proficiency"],
  },
  "Product Designer": {
    category: "Design",
    skills: ["Product Strategy", "User Research", "Design Systems", "Prototyping", "A/B Testing", "Analytics"],
    description: "End-to-end product design assessment covering strategy to execution",
    targetAudience: ["Product Designer", "Senior UX Designer", "Design Lead"],
    prerequisites: ["Product design experience", "Cross-functional collaboration"],
  },

  // Marketing Roles
  "Digital Marketing Manager": {
    category: "Marketing",
    skills: ["SEO", "SEM", "Social Media", "Content Strategy", "Analytics", "Campaign Management"],
    description: "Digital marketing expertise assessment covering all major channels",
    targetAudience: ["Digital Marketing Manager", "Marketing Specialist", "Growth Marketer"],
    prerequisites: ["Digital marketing experience", "Analytics proficiency"],
  },
  "Content Marketing Specialist": {
    category: "Marketing",
    skills: ["Content Strategy", "SEO Writing", "Social Media", "Email Marketing", "Analytics", "Brand Voice"],
    description: "Content marketing and strategy assessment",
    targetAudience: ["Content Marketing Specialist", "Content Strategist", "Marketing Writer"],
    prerequisites: ["Content creation experience", "SEO knowledge"],
  },
  "Growth Marketing Manager": {
    category: "Marketing",
    skills: [
      "Growth Hacking",
      "A/B Testing",
      "Analytics",
      "User Acquisition",
      "Conversion Optimization",
      "Data Analysis",
    ],
    description: "Growth marketing and optimization assessment",
    targetAudience: ["Growth Marketing Manager", "Performance Marketer", "Growth Analyst"],
    prerequisites: ["Growth marketing experience", "Data-driven approach"],
  },

  // Sales Roles
  "Sales Development Representative": {
    category: "Sales",
    skills: [
      "Lead Generation",
      "Cold Outreach",
      "CRM Management",
      "Sales Qualification",
      "Communication",
      "Prospecting",
    ],
    description: "Sales development and lead generation assessment",
    targetAudience: ["SDR", "BDR", "Inside Sales Representative"],
    prerequisites: ["Sales experience", "CRM familiarity"],
  },
  "Account Executive": {
    category: "Sales",
    skills: [
      "Solution Selling",
      "Negotiation",
      "Account Management",
      "Sales Process",
      "Relationship Building",
      "Closing",
    ],
    description: "Enterprise sales and account management assessment",
    targetAudience: ["Account Executive", "Sales Manager", "Enterprise Sales"],
    prerequisites: ["B2B sales experience", "Deal closing experience"],
  },
  "Customer Success Manager": {
    category: "Sales",
    skills: [
      "Customer Onboarding",
      "Relationship Management",
      "Upselling",
      "Churn Prevention",
      "Product Knowledge",
      "Analytics",
    ],
    description: "Customer success and retention assessment",
    targetAudience: ["Customer Success Manager", "Account Manager", "Customer Experience"],
    prerequisites: ["Customer-facing experience", "SaaS knowledge"],
  },

  // Business Roles
  "Product Manager": {
    category: "Business",
    skills: [
      "Product Strategy",
      "Market Research",
      "Roadmap Planning",
      "Stakeholder Management",
      "Analytics",
      "User Stories",
    ],
    description: "Product management and strategy assessment",
    targetAudience: ["Product Manager", "Senior Product Manager", "Product Owner"],
    prerequisites: ["Product management experience", "Technical understanding"],
  },
  "Business Analyst": {
    category: "Business",
    skills: [
      "Requirements Analysis",
      "Process Mapping",
      "Data Analysis",
      "Stakeholder Management",
      "Documentation",
      "SQL",
    ],
    description: "Business analysis and requirements gathering assessment",
    targetAudience: ["Business Analyst", "Systems Analyst", "Process Analyst"],
    prerequisites: ["Business analysis experience", "Process improvement knowledge"],
  },
  "Project Manager": {
    category: "Business",
    skills: ["Project Planning", "Risk Management", "Agile", "Scrum", "Stakeholder Management", "Budget Management"],
    description: "Project management and delivery assessment",
    targetAudience: ["Project Manager", "Program Manager", "Scrum Master"],
    prerequisites: ["Project management experience", "Agile methodology knowledge"],
  },
}

export default function CreateTest() {
  const [step, setStep] = useState(1)
  const [testData, setTestData] = useState({
    title: "",
    description: "",
    targetRole: "",
    testGoal: "",
    selectedSkills: [] as string[],
    customSkills: [] as string[],
    prompt: "",
    mcqCount: [10],
    mcqMarks: 2,
    subjectiveCount: [5],
    subjectiveMarks: 10,
    codingCount: [2],
    codingMarks: 15,
    problemSolvingCount: [3],
    problemSolvingMarks: 20,
    duration: [60],
    difficulty: "medium",
    passingScore: 70,
  })

  const [customSkill, setCustomSkill] = useState("")
  const [enhancingField, setEnhancingField] = useState<string | null>(null)
  const [generatingPrompt, setGeneratingPrompt] = useState(false)

  const generatePrompt = async () => {
    setGeneratingPrompt(true)

    // Simulate AI prompt generation
    setTimeout(() => {
      const skills = [...testData.selectedSkills, ...testData.customSkills].join(", ")
      const role = testData.targetRole || "professional"
      const goal = testData.testGoal || "assess technical capabilities"

      const prompt = `Create a comprehensive ${testData.difficulty} difficulty assessment for a ${role} position. The test should ${goal} and focus on evaluating the following key skills: ${skills}. 

The assessment should include practical scenarios and real-world applications relevant to ${role} responsibilities. Questions should test both theoretical knowledge and practical implementation abilities.

Target audience: ${testData.targetRole ? roleTemplates[testData.targetRole as keyof typeof roleTemplates]?.targetAudience.join(", ") : "General professionals"}

Please ensure questions are:
- Industry-relevant and up-to-date
- Progressively challenging
- Focused on practical application
- Suitable for ${testData.difficulty} difficulty level
- Aligned with current industry standards and best practices`

      setTestData((prev) => ({ ...prev, prompt }))
      setGeneratingPrompt(false)
    }, 2000)
  }

  const enhanceWithAI = async (field: string, currentValue: string) => {
    setEnhancingField(field)

    // Simulate AI enhancement
    setTimeout(() => {
      let enhancedValue = ""

      switch (field) {
        case "description":
          enhancedValue = `Comprehensive assessment designed to evaluate ${testData.targetRole || "candidate"} capabilities through practical scenarios and real-world problem-solving. This test measures both technical proficiency and strategic thinking abilities essential for success in the role.`
          break
        case "testGoal":
          enhancedValue = `Assess candidates' ability to excel in ${testData.targetRole || "the target role"} by evaluating core competencies, problem-solving skills, and practical application of knowledge. Identify top performers who can contribute immediately and grow within the organization.`
          break
      }

      setTestData((prev) => ({ ...prev, [field]: enhancedValue }))
      setEnhancingField(null)
    }, 2000)
  }

  const addCustomSkill = () => {
    if (customSkill.trim() && !testData.customSkills.includes(customSkill.trim())) {
      setTestData((prev) => ({
        ...prev,
        customSkills: [...prev.customSkills, customSkill.trim()],
      }))
      setCustomSkill("")
    }
  }

  const removeSkill = (skill: string, isCustom = false) => {
    if (isCustom) {
      setTestData((prev) => ({
        ...prev,
        customSkills: prev.customSkills.filter((s) => s !== skill),
      }))
    } else {
      setTestData((prev) => ({
        ...prev,
        selectedSkills: prev.selectedSkills.filter((s) => s !== skill),
      }))
    }
  }

  const groupedRoles = Object.entries(roleTemplates).reduce(
    (acc, [role, template]) => {
      if (!acc[template.category]) {
        acc[template.category] = []
      }
      acc[template.category].push(role)
      return acc
    },
    {} as Record<string, string[]>,
  )

  if (step === 1) {
    return (
      <div className="flex h-screen bg-[#F6F9FE]" style={{ fontFamily: "Archivo, sans-serif" }}>
        <Sidebar />

        <div className="flex-1 overflow-auto">
          <header className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Create New Test</h1>
                <p className="text-gray-600 mt-1">Build comprehensive AI-powered assessments</p>
              </div>
            </div>
          </header>

          <div className="p-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Test Purpose & Goals */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-bold flex items-center gap-3 text-xl">
                    <div className="w-12 h-12 bg-[#4D31EC] bg-opacity-10 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-[#4D31EC]" />
                    </div>
                    Test Purpose & Goals
                  </CardTitle>
                  <CardDescription className="text-base">
                    Define what you want to assess and who you're targeting
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="font-semibold text-gray-900 text-base">
                      Test Title *
                    </Label>
                    <Input
                      id="title"
                      placeholder="e.g., Senior Frontend Developer Assessment"
                      value={testData.title}
                      onChange={(e) => setTestData((prev) => ({ ...prev, title: e.target.value }))}
                      className="mt-3 h-12 text-base"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label htmlFor="description" className="font-semibold text-gray-900 text-base">
                        Description
                      </Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => enhanceWithAI("description", testData.description)}
                        disabled={enhancingField === "description"}
                        className="text-[#4D31EC] border-[#4D31EC] hover:bg-[#F8F8FF]"
                      >
                        {enhancingField === "description" ? (
                          <>
                            <div className="animate-spin w-3 h-3 border border-[#4D31EC] border-t-transparent rounded-full mr-2"></div>
                            Enhancing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3 h-3 mr-2" />
                            Enhance with AI
                          </>
                        )}
                      </Button>
                    </div>
                    <Textarea
                      id="description"
                      placeholder="Brief description of what this test evaluates"
                      value={testData.description}
                      onChange={(e) => setTestData((prev) => ({ ...prev, description: e.target.value }))}
                      className="min-h-[100px] text-base"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-900 text-base">Target Role</Label>
                    <Select
                      value={testData.targetRole}
                      onValueChange={(value) => {
                        setTestData((prev) => ({ ...prev, targetRole: value }))
                        if (roleTemplates[value as keyof typeof roleTemplates]) {
                          const template = roleTemplates[value as keyof typeof roleTemplates]
                          setTestData((prev) => ({
                            ...prev,
                            selectedSkills: template.skills,
                            description: template.description,
                          }))
                        }
                      }}
                    >
                      <SelectTrigger className="mt-3 h-12 text-base">
                        <SelectValue placeholder="Select target role" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(groupedRoles).map(([category, roles]) => (
                          <div key={category}>
                            <div className="px-2 py-1 text-sm font-semibold text-gray-500 bg-gray-50">{category}</div>
                            {roles.map((role) => (
                              <SelectItem key={role} value={role} className="pl-4">
                                {role}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                        <SelectItem value="custom">Custom Role</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label htmlFor="testGoal" className="font-semibold text-gray-900 text-base">
                        What is the main goal of this test?
                      </Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => enhanceWithAI("testGoal", testData.testGoal)}
                        disabled={enhancingField === "testGoal"}
                        className="text-[#4D31EC] border-[#4D31EC] hover:bg-[#F8F8FF]"
                      >
                        {enhancingField === "testGoal" ? (
                          <>
                            <div className="animate-spin w-3 h-3 border border-[#4D31EC] border-t-transparent rounded-full mr-2"></div>
                            Enhancing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3 h-3 mr-2" />
                            Enhance with AI
                          </>
                        )}
                      </Button>
                    </div>
                    <Textarea
                      id="testGoal"
                      placeholder="e.g., Assess candidates' ability to build scalable React applications with modern best practices"
                      value={testData.testGoal}
                      onChange={(e) => setTestData((prev) => ({ ...prev, testGoal: e.target.value }))}
                      className="min-h-[100px] text-base"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Skills Assessment */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-bold flex items-center gap-3 text-xl">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-blue-600" />
                    </div>
                    Skills to Assess
                  </CardTitle>
                  <CardDescription className="text-base">
                    Select the key skills this test should evaluate
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        placeholder="Add custom skill"
                        value={customSkill}
                        onChange={(e) => setCustomSkill(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addCustomSkill()}
                        className="h-12 text-base"
                      />
                    </div>
                    <Button onClick={addCustomSkill} className="bg-[#4D31EC] hover:bg-[#3D21DC] text-white px-6">
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>

                  {/* Selected Skills */}
                  <div className="space-y-4">
                    {testData.selectedSkills.length > 0 && (
                      <div>
                        <Label className="font-semibold text-gray-900 text-base">Selected Skills</Label>
                        <div className="flex flex-wrap gap-3 mt-3">
                          {testData.selectedSkills.map((skill, index) => (
                            <Badge key={index} className="bg-[#4D31EC] text-white px-3 py-2 text-sm">
                              {skill}
                              <X className="w-3 h-3 ml-2 cursor-pointer" onClick={() => removeSkill(skill)} />
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {testData.customSkills.length > 0 && (
                      <div>
                        <Label className="font-semibold text-gray-900 text-base">Custom Skills</Label>
                        <div className="flex flex-wrap gap-3 mt-3">
                          {testData.customSkills.map((skill, index) => (
                            <Badge
                              key={index}
                              className="bg-green-100 text-green-800 border-green-200 px-3 py-2 text-sm"
                            >
                              {skill}
                              <X className="w-3 h-3 ml-2 cursor-pointer" onClick={() => removeSkill(skill, true)} />
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* AI Prompt Generation */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-bold flex items-center gap-3 text-xl">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Wand2 className="w-6 h-6 text-purple-600" />
                    </div>
                    AI Question Generation Prompt
                  </CardTitle>
                  <CardDescription className="text-base">
                    Generate or customize the AI prompt for intelligent question creation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-3">
                    <Button
                      onClick={generatePrompt}
                      className="bg-[#4D31EC] hover:bg-[#3D21DC] text-white font-semibold px-6"
                      disabled={!testData.title || testData.selectedSkills.length === 0 || generatingPrompt}
                    >
                      {generatingPrompt ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate AI Prompt
                        </>
                      )}
                    </Button>
                  </div>

                  <div>
                    <Label htmlFor="prompt" className="font-semibold text-gray-900 text-base">
                      AI Generation Prompt
                    </Label>
                    <Textarea
                      id="prompt"
                      placeholder="Click 'Generate AI Prompt' to create an intelligent prompt based on your selections, or write a custom prompt..."
                      value={testData.prompt}
                      onChange={(e) => setTestData((prev) => ({ ...prev, prompt: e.target.value }))}
                      className="mt-3 min-h-[150px] text-base"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Continue Button */}
              <div className="flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  size="lg"
                  className="bg-[#4D31EC] hover:bg-[#3D21DC] text-white font-semibold px-8"
                  disabled={!testData.title || testData.selectedSkills.length === 0 || !testData.prompt}
                >
                  Continue to Configuration
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Step 2: Test Configuration
  return (
    <div className="flex h-screen bg-[#F6F9FE]" style={{ fontFamily: "Archivo, sans-serif" }}>
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Setup
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Configure Test Questions</h1>
                <p className="text-gray-600 mt-1">{testData.title}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" className="font-semibold bg-transparent">
                <Eye className="w-4 h-4 mr-2" />
                Preview Test
              </Button>
              <Link href="/create-test/questions">
                <Button size="lg" className="bg-[#4D31EC] hover:bg-[#3D21DC] text-white font-semibold">
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Questions
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Test Settings */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="font-bold flex items-center gap-3 text-xl">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-gray-600" />
                  </div>
                  Test Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label className="font-semibold text-gray-900 text-base">Difficulty Level</Label>
                    <Select
                      value={testData.difficulty}
                      onValueChange={(value) => setTestData((prev) => ({ ...prev, difficulty: value }))}
                    >
                      <SelectTrigger className="mt-3 h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-900 text-base">Duration (minutes)</Label>
                    <div className="mt-3">
                      <Slider
                        value={testData.duration}
                        onValueChange={(value) => setTestData((prev) => ({ ...prev, duration: value }))}
                        max={180}
                        min={15}
                        step={15}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>15 min</span>
                        <span className="font-semibold text-[#4D31EC]">{testData.duration[0]} min</span>
                        <span>180 min</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-900 text-base">Passing Score (%)</Label>
                    <Input
                      type="number"
                      value={testData.passingScore}
                      onChange={(e) =>
                        setTestData((prev) => ({ ...prev, passingScore: Number.parseInt(e.target.value) || 70 }))
                      }
                      className="mt-3 h-12"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question Configuration Sections */}
            <div className="space-y-6">
              {/* MCQ Section */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-bold flex items-center gap-3 text-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    Multiple Choice Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="font-semibold text-gray-900">Number of Questions</Label>
                      <div className="mt-3">
                        <Slider
                          value={testData.mcqCount}
                          onValueChange={(value) => setTestData((prev) => ({ ...prev, mcqCount: value }))}
                          max={30}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>0</span>
                          <span className="font-semibold text-blue-600">{testData.mcqCount[0]} questions</span>
                          <span>30</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="font-semibold text-gray-900">Marks per Question</Label>
                      <Input
                        type="number"
                        value={testData.mcqMarks}
                        onChange={(e) =>
                          setTestData((prev) => ({ ...prev, mcqMarks: Number.parseInt(e.target.value) || 2 }))
                        }
                        className="mt-3 h-12"
                        min="1"
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="p-4 bg-blue-50 rounded-xl w-full text-center">
                        <p className="text-2xl font-bold text-blue-600">{testData.mcqCount[0] * testData.mcqMarks}</p>
                        <p className="text-sm text-blue-700">Total Marks</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Coding Section */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-bold flex items-center gap-3 text-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Code className="w-5 h-5 text-green-600" />
                    </div>
                    Coding Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="font-semibold text-gray-900">Number of Questions</Label>
                      <div className="mt-3">
                        <Slider
                          value={testData.codingCount}
                          onValueChange={(value) => setTestData((prev) => ({ ...prev, codingCount: value }))}
                          max={10}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>0</span>
                          <span className="font-semibold text-green-600">{testData.codingCount[0]} questions</span>
                          <span>10</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="font-semibold text-gray-900">Marks per Question</Label>
                      <Input
                        type="number"
                        value={testData.codingMarks}
                        onChange={(e) =>
                          setTestData((prev) => ({ ...prev, codingMarks: Number.parseInt(e.target.value) || 15 }))
                        }
                        className="mt-3 h-12"
                        min="1"
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="p-4 bg-green-50 rounded-xl w-full text-center">
                        <p className="text-2xl font-bold text-green-600">
                          {testData.codingCount[0] * testData.codingMarks}
                        </p>
                        <p className="text-sm text-green-700">Total Marks</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Subjective Section */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-bold flex items-center gap-3 text-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                    </div>
                    Subjective Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="font-semibold text-gray-900">Number of Questions</Label>
                      <div className="mt-3">
                        <Slider
                          value={testData.subjectiveCount}
                          onValueChange={(value) => setTestData((prev) => ({ ...prev, subjectiveCount: value }))}
                          max={15}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>0</span>
                          <span className="font-semibold text-purple-600">{testData.subjectiveCount[0]} questions</span>
                          <span>15</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="font-semibold text-gray-900">Marks per Question</Label>
                      <Input
                        type="number"
                        value={testData.subjectiveMarks}
                        onChange={(e) =>
                          setTestData((prev) => ({ ...prev, subjectiveMarks: Number.parseInt(e.target.value) || 10 }))
                        }
                        className="mt-3 h-12"
                        min="1"
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="p-4 bg-purple-50 rounded-xl w-full text-center">
                        <p className="text-2xl font-bold text-purple-600">
                          {testData.subjectiveCount[0] * testData.subjectiveMarks}
                        </p>
                        <p className="text-sm text-purple-700">Total Marks</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Problem Solving Section */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-bold flex items-center gap-3 text-lg">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-orange-600" />
                    </div>
                    Problem Solving Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="font-semibold text-gray-900">Number of Questions</Label>
                      <div className="mt-3">
                        <Slider
                          value={testData.problemSolvingCount}
                          onValueChange={(value) => setTestData((prev) => ({ ...prev, problemSolvingCount: value }))}
                          max={10}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>0</span>
                          <span className="font-semibold text-orange-600">
                            {testData.problemSolvingCount[0]} questions
                          </span>
                          <span>10</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="font-semibold text-gray-900">Marks per Question</Label>
                      <Input
                        type="number"
                        value={testData.problemSolvingMarks}
                        onChange={(e) =>
                          setTestData((prev) => ({
                            ...prev,
                            problemSolvingMarks: Number.parseInt(e.target.value) || 20,
                          }))
                        }
                        className="mt-3 h-12"
                        min="1"
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="p-4 bg-orange-50 rounded-xl w-full text-center">
                        <p className="text-2xl font-bold text-orange-600">
                          {testData.problemSolvingCount[0] * testData.problemSolvingMarks}
                        </p>
                        <p className="text-sm text-orange-700">Total Marks</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Test Summary */}
            <Card className="border-0 shadow-sm bg-gradient-to-r from-[#F8F8FF] to-white">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <p className="text-3xl font-bold text-[#4D31EC]">
                      {testData.mcqCount[0] +
                        testData.subjectiveCount[0] +
                        testData.codingCount[0] +
                        testData.problemSolvingCount[0]}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Total Questions</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-green-600">
                      {testData.mcqCount[0] * testData.mcqMarks +
                        testData.subjectiveCount[0] * testData.subjectiveMarks +
                        testData.codingCount[0] * testData.codingMarks +
                        testData.problemSolvingCount[0] * testData.problemSolvingMarks}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Total Marks</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-blue-600">{testData.duration[0]}</p>
                    <p className="text-sm text-gray-600 mt-1">Minutes</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-purple-600">{testData.passingScore}%</p>
                    <p className="text-sm text-gray-600 mt-1">Passing Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <div className="flex justify-end">
              <Link href="/create-test/questions">
                <Button
                  size="lg"
                  className="bg-[#4D31EC] hover:bg-[#3D21DC] text-white font-semibold px-8"
                  disabled={!testData.title || !testData.prompt}
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Test Questions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
