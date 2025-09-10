"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Eye,
  Plus,
  Edit3,
  Trash2,
  FileText,
  Code,
  MessageSquare,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Rocket,
  Save,
} from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { CodeEditor } from "@/components/ui/code-editor"

const mockQuestions = {
  mcq: [
    {
      id: 1,
      question: "What is the primary purpose of React's useEffect hook?",
      options: [
        "To manage component state",
        "To handle side effects in functional components",
        "To create reusable components",
        "To optimize component rendering",
      ],
      correctAnswer: 1,
      difficulty: "medium",
      marks: 2,
      skills: ["React", "Hooks"],
    },
    {
      id: 2,
      question: "Which CSS property is used to create a flexbox container?",
      options: ["display: flex", "flex-direction: row", "justify-content: center", "align-items: center"],
      correctAnswer: 0,
      difficulty: "easy",
      marks: 2,
      skills: ["CSS", "Flexbox"],
    },
  ],
  coding: [
    {
      id: 1,
      question: "Implement a function that reverses a string without using built-in reverse methods.",
      description:
        "Write a JavaScript function called `reverseString` that takes a string as input and returns the reversed string. You should implement this without using the built-in `reverse()` method.",
      starterCode: `function reverseString(str) {
  // Your code here
  
}

// Test cases
console.log(reverseString("hello")); // Should output: "olleh"
console.log(reverseString("world")); // Should output: "dlrow"`,
      testCases: [
        { input: "hello", expected: "olleh" },
        { input: "world", expected: "dlrow" },
        { input: "JavaScript", expected: "tpircSavaJ" },
      ],
      difficulty: "easy",
      marks: 15,
      skills: ["JavaScript", "Problem Solving"],
      language: "javascript",
    },
  ],
  subjective: [
    {
      id: 1,
      question: "Explain the concept of responsive web design and its importance in modern web development.",
      description:
        "Provide a comprehensive explanation of responsive web design, including key principles, techniques, and why it's crucial for modern websites.",
      maxWords: 300,
      difficulty: "medium",
      marks: 10,
      skills: ["Web Design", "CSS", "User Experience"],
    },
  ],
  problemSolving: [
    {
      id: 1,
      question: "Design a scalable architecture for a social media platform",
      description:
        "You are tasked with designing the backend architecture for a social media platform that needs to handle 1 million daily active users. Describe your approach to database design, caching strategies, and how you would handle real-time features like notifications and messaging.",
      maxWords: 500,
      difficulty: "hard",
      marks: 20,
      skills: ["System Design", "Architecture", "Scalability"],
    },
  ],
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState(mockQuestions)
  const [activeTab, setActiveTab] = useState("mcq")
  const [editingQuestion, setEditingQuestion] = useState<any>(null)
  const [showAddQuestion, setShowAddQuestion] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    type: "mcq",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    difficulty: "medium",
    marks: 2,
    skills: [],
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const deleteQuestion = (type: string, id: number) => {
    setQuestions((prev) => ({
      ...prev,
      [type]: prev[type as keyof typeof prev].filter((q: any) => q.id !== id),
    }))
  }

  const addNewQuestion = () => {
    const questionId = Date.now()
    const questionData = {
      id: questionId,
      ...newQuestion,
    }

    setQuestions((prev) => ({
      ...prev,
      [newQuestion.type]: [...prev[newQuestion.type as keyof typeof prev], questionData],
    }))

    setNewQuestion({
      type: "mcq",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      difficulty: "medium",
      marks: 2,
      skills: [],
    })
    setShowAddQuestion(false)
  }

  const totalQuestions =
    questions.mcq.length + questions.coding.length + questions.subjective.length + questions.problemSolving.length

  return (
    <div className="flex h-screen bg-[#F6F9FE]" style={{ fontFamily: "Archivo, sans-serif" }}>
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/create-test">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Configuration
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Review & Edit Questions</h1>
                <p className="text-gray-600 mt-1">AI-generated questions ready for your review</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowPreviewModal(true)}
                className="font-semibold bg-transparent"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview Test
              </Button>
              <Button
                size="lg"
                onClick={() => setShowPublishModal(true)}
                className="bg-[#4D31EC] hover:bg-[#3D21DC] text-white font-semibold"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Publish Test
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            {/* Questions Overview */}
            <Card className="border-0 shadow-sm mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
                  <div>
                    <p className="text-3xl font-bold text-[#4D31EC]">{totalQuestions}</p>
                    <p className="text-sm text-gray-600 mt-1">Total Questions</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{questions.mcq.length}</p>
                    <p className="text-sm text-gray-600 mt-1">MCQ</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{questions.coding.length}</p>
                    <p className="text-sm text-gray-600 mt-1">Coding</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{questions.subjective.length}</p>
                    <p className="text-sm text-gray-600 mt-1">Subjective</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">{questions.problemSolving.length}</p>
                    <p className="text-sm text-gray-600 mt-1">Problem Solving</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Questions Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="flex items-center justify-between">
                <TabsList className="grid w-fit grid-cols-4 bg-gray-100">
                  <TabsTrigger value="mcq" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    MCQ ({questions.mcq.length})
                  </TabsTrigger>
                  <TabsTrigger value="coding" className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Coding ({questions.coding.length})
                  </TabsTrigger>
                  <TabsTrigger value="subjective" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Subjective ({questions.subjective.length})
                  </TabsTrigger>
                  <TabsTrigger value="problemSolving" className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Problem Solving ({questions.problemSolving.length})
                  </TabsTrigger>
                </TabsList>

                <Button
                  onClick={() => setShowAddQuestion(true)}
                  className="bg-[#4D31EC] hover:bg-[#3D21DC] text-white font-semibold"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Custom Question
                </Button>
              </div>

              {/* MCQ Questions */}
              <TabsContent value="mcq" className="space-y-6">
                {questions.mcq.map((question, index) => (
                  <Card key={question.id} className="border-0 shadow-sm">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <Badge className="bg-blue-100 text-blue-800">Question {index + 1}</Badge>
                            <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                            <Badge variant="outline">{question.marks} marks</Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {question.skills.map((skill: string, skillIndex: number) => (
                              <Badge key={skillIndex} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setEditingQuestion(question)}>
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => deleteQuestion("mcq", question.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold text-gray-900 mb-4">{question.question}</h3>
                      <div className="space-y-2">
                        {question.options.map((option: string, optionIndex: number) => (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg border ${
                              optionIndex === question.correctAnswer
                                ? "bg-green-50 border-green-200 text-green-800"
                                : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {optionIndex === question.correctAnswer && (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              )}
                              <span className="font-medium">
                                {String.fromCharCode(65 + optionIndex)}. {option}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Coding Questions */}
              <TabsContent value="coding" className="space-y-6">
                {questions.coding.map((question, index) => (
                  <Card key={question.id} className="border-0 shadow-sm">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <Badge className="bg-green-100 text-green-800">Question {index + 1}</Badge>
                            <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                            <Badge variant="outline">{question.marks} marks</Badge>
                            <Badge variant="outline">{question.language}</Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {question.skills.map((skill: string, skillIndex: number) => (
                              <Badge key={skillIndex} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setEditingQuestion(question)}>
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => deleteQuestion("coding", question.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{question.question}</h3>
                        <p className="text-gray-600">{question.description}</p>
                      </div>
                      <div>
                        <Label className="font-semibold text-gray-900">Starter Code</Label>
                        <CodeEditor
                          language={question.language}
                          value={question.starterCode}
                          onChange={() => {}}
                          onRun={() => {}}
                          onTest={() => {}}
                        />
                      </div>
                      <div>
                        <Label className="font-semibold text-gray-900">Test Cases</Label>
                        <div className="mt-2 space-y-2">
                          {question.testCases.map((testCase: any, testIndex: number) => (
                            <div key={testIndex} className="p-3 bg-gray-50 rounded-lg">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">Input:</span> {JSON.stringify(testCase.input)}
                                </div>
                                <div>
                                  <span className="font-medium">Expected:</span> {JSON.stringify(testCase.expected)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Subjective Questions */}
              <TabsContent value="subjective" className="space-y-6">
                {questions.subjective.map((question, index) => (
                  <Card key={question.id} className="border-0 shadow-sm">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <Badge className="bg-purple-100 text-purple-800">Question {index + 1}</Badge>
                            <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                            <Badge variant="outline">{question.marks} marks</Badge>
                            <Badge variant="outline">Max {question.maxWords} words</Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {question.skills.map((skill: string, skillIndex: number) => (
                              <Badge key={skillIndex} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setEditingQuestion(question)}>
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => deleteQuestion("subjective", question.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold text-gray-900 mb-2">{question.question}</h3>
                      <p className="text-gray-600">{question.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Problem Solving Questions */}
              <TabsContent value="problemSolving" className="space-y-6">
                {questions.problemSolving.map((question, index) => (
                  <Card key={question.id} className="border-0 shadow-sm">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <Badge className="bg-orange-100 text-orange-800">Question {index + 1}</Badge>
                            <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                            <Badge variant="outline">{question.marks} marks</Badge>
                            <Badge variant="outline">Max {question.maxWords} words</Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {question.skills.map((skill: string, skillIndex: number) => (
                              <Badge key={skillIndex} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setEditingQuestion(question)}>
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => deleteQuestion("problemSolving", question.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold text-gray-900 mb-2">{question.question}</h3>
                      <p className="text-gray-600">{question.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Add Question Modal */}
      {showAddQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add Custom Question</h3>

            <div className="space-y-4">
              <div>
                <Label className="font-semibold">Question Type</Label>
                <Select
                  value={newQuestion.type}
                  onValueChange={(value) => setNewQuestion((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mcq">Multiple Choice</SelectItem>
                    <SelectItem value="coding">Coding</SelectItem>
                    <SelectItem value="subjective">Subjective</SelectItem>
                    <SelectItem value="problemSolving">Problem Solving</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="font-semibold">Question</Label>
                <Textarea
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion((prev) => ({ ...prev, question: e.target.value }))}
                  className="mt-2"
                  placeholder="Enter your question..."
                />
              </div>

              {newQuestion.type === "mcq" && (
                <div>
                  <Label className="font-semibold">Options</Label>
                  <div className="space-y-2 mt-2">
                    {newQuestion.options.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...newQuestion.options]
                            newOptions[index] = e.target.value
                            setNewQuestion((prev) => ({ ...prev, options: newOptions }))
                          }}
                          placeholder={`Option ${index + 1}`}
                        />
                        <Button
                          variant={newQuestion.correctAnswer === index ? "default" : "outline"}
                          size="sm"
                          onClick={() => setNewQuestion((prev) => ({ ...prev, correctAnswer: index }))}
                        >
                          {newQuestion.correctAnswer === index ? "Correct" : "Mark Correct"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Difficulty</Label>
                  <Select
                    value={newQuestion.difficulty}
                    onValueChange={(value) => setNewQuestion((prev) => ({ ...prev, difficulty: value }))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-semibold">Marks</Label>
                  <Input
                    type="number"
                    value={newQuestion.marks}
                    onChange={(e) =>
                      setNewQuestion((prev) => ({ ...prev, marks: Number.parseInt(e.target.value) || 2 }))
                    }
                    className="mt-2"
                    min="1"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAddQuestion(false)}
                className="font-medium bg-transparent"
              >
                Cancel
              </Button>
              <Button onClick={addNewQuestion} className="bg-[#4D31EC] hover:bg-[#3D21DC] text-white font-medium">
                <Save className="w-4 h-4 mr-2" />
                Add Question
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Preview Test</h3>
            <p className="text-gray-600 mb-6">
              Open the test preview in a new tab to see how candidates will experience your assessment.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowPreviewModal(false)}
                className="font-medium bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  window.open("/preview/test", "_blank")
                  setShowPreviewModal(false)
                }}
                className="bg-[#4D31EC] hover:bg-[#3D21DC] text-white font-medium"
              >
                <Eye className="w-4 h-4 mr-2" />
                Open Preview
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Publish?</h3>
              <p className="text-gray-600">
                Your test is ready to go live. Once published, candidates can start taking the assessment.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <p className="font-bold text-2xl text-[#4D31EC]">{totalQuestions}</p>
                  <p className="text-gray-600">Questions</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-2xl text-green-600">
                    {questions.mcq.reduce((sum, q) => sum + q.marks, 0) +
                      questions.coding.reduce((sum, q) => sum + q.marks, 0) +
                      questions.subjective.reduce((sum, q) => sum + q.marks, 0) +
                      questions.problemSolving.reduce((sum, q) => sum + q.marks, 0)}
                  </p>
                  <p className="text-gray-600">Total Marks</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg mb-6">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-blue-900">Before publishing:</p>
                <ul className="text-blue-700 mt-1 space-y-1">
                  <li>• Review all questions for accuracy</li>
                  <li>• Verify correct answers and test cases</li>
                  <li>• Check difficulty levels and marks distribution</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowPublishModal(false)}
                className="font-medium bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Handle publish logic
                  setShowPublishModal(false)
                  // Redirect to dashboard or test management
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-medium"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Publish Test
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
