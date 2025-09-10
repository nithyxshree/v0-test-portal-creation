"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Camera, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "bg-green-100 text-green-800 border-green-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "hard":
      return "bg-red-100 text-red-800 border-red-200"
    case "mixed":
      return "bg-purple-100 text-purple-800 border-purple-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getDifficultyIcon = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "●"
    case "medium":
      return "●●"
    case "hard":
      return "●●●"
    case "mixed":
      return "●○●"
    default:
      return "●"
  }
}

const mockTestData = {
  id: 1,
  title: "Frontend Developer Assessment",
  description: "React, JavaScript, and CSS fundamentals",
  duration: 90,
  questions: { mcq: 15, subjective: 5, coding: 3, problemSolving: 2 },
  generatedQuestions: {
    mcq: [
      {
        id: 1,
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correct: 1,
        difficulty: "medium",
        points: 2,
      },
      {
        id: 2,
        question: "Which design pattern is used for creating objects?",
        options: ["Observer", "Factory", "Strategy", "Decorator"],
        correct: 1,
        difficulty: "easy",
        points: 2,
      },
    ],
    subjective: [
      {
        id: 1,
        question: "Explain the concept of microservices architecture and its benefits.",
        points: 10,
        difficulty: "hard",
      },
    ],
    coding: [
      {
        id: 1,
        question: "Write a function to reverse a linked list.",
        language: "javascript",
        points: 15,
        difficulty: "medium",
      },
    ],
    problemSolving: [
      {
        id: 1,
        question: "How would you design a scalable chat application?",
        points: 20,
        difficulty: "hard",
      },
    ],
  },
  proctoring: {
    webcam: true,
    screenShare: true,
    tabSwitching: true,
    copyPaste: true,
    fullscreen: true,
  },
}

export default function TestPreview({ params }: { params: { testId: string } }) {
  const [test, setTest] = useState(mockTestData)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(89 * 60 + 54) // 89:54
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false)

  useEffect(() => {
    // Load test data from localStorage if available
    if (params.testId === "preview") {
      const previewData = JSON.parse(localStorage.getItem("previewTest") || "{}")
      if (previewData.id) {
        setTest(previewData)
        setTimeRemaining(previewData.duration * 60)
      }
    } else {
      const publishedTests = JSON.parse(localStorage.getItem("publishedTests") || "[]")
      const foundTest = publishedTests.find((t: any) => t.id.toString() === params.testId)
      if (foundTest) {
        setTest(foundTest)
        setTimeRemaining(foundTest.duration * 60)
      }
    }
  }, [params.testId])

  useEffect(() => {
    // Timer countdown
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          handleAutoSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Get all questions in a flat array
  const allQuestions = [
    ...test.generatedQuestions.mcq.map((q) => ({ ...q, type: "mcq" })),
    ...test.generatedQuestions.subjective.map((q) => ({ ...q, type: "subjective" })),
    ...test.generatedQuestions.coding.map((q) => ({ ...q, type: "coding" })),
    ...test.generatedQuestions.problemSolving.map((q) => ({ ...q, type: "problemSolving" })),
  ]

  const currentQuestion = allQuestions[currentQuestionIndex]
  const totalQuestions = allQuestions.length

  const handleAnswer = (answer: any) => {
    const key = `${currentQuestion?.type}_${currentQuestion?.id}`
    setAnswers((prev) => ({ ...prev, [key]: answer }))
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    const answeredQuestions = Object.keys(answers).length
    const timeLeft = Math.floor(timeRemaining / 60)

    if (timeLeft > 10 || answeredQuestions < totalQuestions / 2) {
      setShowSubmitConfirm(true)
    } else {
      confirmSubmit()
    }
  }

  const confirmSubmit = () => {
    alert("Test submitted successfully! 🎉")
    window.location.href = "/"
  }

  const handleAutoSubmit = () => {
    alert("Time's up! Your test has been automatically submitted.")
    window.location.href = "/"
  }

  const handleLeaveTest = () => {
    setShowLeaveConfirm(true)
  }

  const confirmLeaveTest = () => {
    // Mark test as incomplete
    const testResult = {
      testId: params.testId,
      status: "incomplete",
      leftAt: new Date().toISOString(),
      answers: answers,
    }
    localStorage.setItem(`test_result_${params.testId}`, JSON.stringify(testResult))

    alert("You have left the test. This will be marked as incomplete.")
    window.location.href = "/"
  }

  const renderQuestion = () => {
    if (!currentQuestion) return null

    const answerKey = `${currentQuestion.type}_${currentQuestion.id}`
    const currentAnswer = answers[answerKey]

    switch (currentQuestion.type) {
      case "mcq":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-[#4D31EC] text-white px-3 py-1 rounded-full text-sm font-medium">MCQ</Badge>
              <span
                className={`text-xs px-2 py-1 rounded border font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}
              >
                {getDifficultyIcon(currentQuestion.difficulty)} {currentQuestion.difficulty.toUpperCase()}
              </span>
              <h2 className="text-2xl font-bold text-gray-900">Question {currentQuestionIndex + 1}</h2>
              <div className="ml-auto text-sm text-gray-600">{currentQuestion.points} points</div>
            </div>
            <p className="text-lg text-gray-700 mb-8">{currentQuestion.question}</p>
            <div className="space-y-4">
              {currentQuestion.options?.map((option: string, index: number) => (
                <label
                  key={index}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    currentAnswer === index
                      ? "border-[#4D31EC] bg-[#F8F8FF]"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                  onClick={() => handleAnswer(index)}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                      currentAnswer === index ? "border-[#4D31EC] bg-[#4D31EC]" : "border-gray-300"
                    }`}
                  >
                    {currentAnswer === index && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <span className="text-lg">
                    {String.fromCharCode(65 + index)}. {option}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )

      case "subjective":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">SUBJECTIVE</Badge>
              <span
                className={`text-xs px-2 py-1 rounded border font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}
              >
                {getDifficultyIcon(currentQuestion.difficulty)} {currentQuestion.difficulty.toUpperCase()}
              </span>
              <h2 className="text-2xl font-bold text-gray-900">Question {currentQuestionIndex + 1}</h2>
              <div className="ml-auto text-sm text-gray-600">{currentQuestion.points} points</div>
            </div>
            <p className="text-lg text-gray-700 mb-8">{currentQuestion.question}</p>
            <textarea
              placeholder="Type your answer here..."
              value={currentAnswer || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg resize-none focus:border-blue-500 focus:outline-none text-lg"
            />
          </div>
        )

      case "coding":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">CODING</Badge>
              <span
                className={`text-xs px-2 py-1 rounded border font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}
              >
                {getDifficultyIcon(currentQuestion.difficulty)} {currentQuestion.difficulty.toUpperCase()}
              </span>
              <h2 className="text-2xl font-bold text-gray-900">Question {currentQuestionIndex + 1}</h2>
              <div className="ml-auto text-sm text-gray-600">{currentQuestion.points} points</div>
            </div>
            <p className="text-lg text-gray-700 mb-8">{currentQuestion.question}</p>
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-800 text-white p-3 flex items-center justify-between">
                <span className="text-sm font-medium">Code Editor - {currentQuestion.language}</span>
              </div>
              <textarea
                value={currentAnswer || ""}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder={`// Write your ${currentQuestion.language} code here...\n\nfunction solution() {\n    // Your code here\n}`}
                className="w-full h-64 p-4 font-mono text-sm bg-gray-900 text-gray-100 border-none outline-none resize-none"
              />
            </div>
          </div>
        )

      case "problemSolving":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                PROBLEM SOLVING
              </Badge>
              <span
                className={`text-xs px-2 py-1 rounded border font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}
              >
                {getDifficultyIcon(currentQuestion.difficulty)} {currentQuestion.difficulty.toUpperCase()}
              </span>
              <h2 className="text-2xl font-bold text-gray-900">Question {currentQuestionIndex + 1}</h2>
              <div className="ml-auto text-sm text-gray-600">{currentQuestion.points} points</div>
            </div>
            <p className="text-lg text-gray-700 mb-8">{currentQuestion.question}</p>
            <textarea
              placeholder="Describe your approach, methodology, and solution..."
              value={currentAnswer || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg resize-none focus:border-orange-500 focus:outline-none text-lg"
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F9FE]" style={{ fontFamily: "Archivo, sans-serif" }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Exit Preview
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">Assessment: {test.title}</h1>
              <span className="text-lg text-gray-600">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-green-500" />
              <span className="text-green-600 font-medium">Camera Active</span>
            </div>
            <div className="flex items-center gap-2 text-red-500 font-bold text-xl">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              {formatTime(timeRemaining)}
            </div>
            <Button
              variant="outline"
              onClick={handleLeaveTest}
              className="text-red-600 border-red-200 hover:bg-red-50 font-medium bg-transparent"
            >
              Leave Test
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#4D31EC] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg p-8 shadow-sm min-h-[600px]">{renderQuestion()}</div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 border-gray-300 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex gap-3">
                {currentQuestionIndex === totalQuestions - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Submit Test
                  </Button>
                ) : (
                  <Button
                    onClick={nextQuestion}
                    className="flex items-center gap-2 px-6 py-3 bg-[#4D31EC] hover:bg-[#3D21DC] text-white"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Camera Feed */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Camera className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Camera Feed</h3>
              </div>
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Camera className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm opacity-75">Live Camera Feed</p>
                </div>
              </div>
            </div>

            {/* Questions Grid */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Questions</h3>
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: totalQuestions }, (_, index) => {
                  const isAnswered = answers[`${allQuestions[index]?.type}_${allQuestions[index]?.id}`] !== undefined
                  const isCurrent = index === currentQuestionIndex

                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                        isCurrent
                          ? "bg-[#4D31EC] text-white"
                          : isAnswered
                            ? "bg-[#F8F8FF] text-[#4D31EC] border border-[#4D31EC]"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Test?</h3>
            <div className="space-y-2 mb-6">
              <p className="text-gray-600">
                You still have <strong>{Math.floor(timeRemaining / 60)} minutes</strong> remaining.
              </p>
              <p className="text-gray-600">
                You've answered <strong>{Object.keys(answers).length}</strong> out of <strong>{totalQuestions}</strong>{" "}
                questions.
              </p>
              <p className="text-gray-600">Are you sure you want to submit your test?</p>
            </div>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowSubmitConfirm(false)}
                className="font-medium bg-transparent"
              >
                Continue Test
              </Button>
              <Button onClick={confirmSubmit} className="bg-green-600 hover:bg-green-700 text-white font-medium">
                Yes, Submit
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Leave Test Confirmation Modal */}
      {showLeaveConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Leave Test?</h3>
            <div className="space-y-2 mb-6">
              <p className="text-gray-600">
                If you leave this test, you <strong>cannot</strong> return to complete it.
              </p>
              <p className="text-gray-600">
                Your test will be marked as <strong>incomplete</strong> and visible to the recruiter.
              </p>
              <p className="text-gray-600">Are you sure you want to leave?</p>
            </div>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowLeaveConfirm(false)}
                className="font-medium bg-transparent"
              >
                Stay in Test
              </Button>
              <Button onClick={confirmLeaveTest} className="bg-red-600 hover:bg-red-700 text-white font-medium">
                Yes, Leave Test
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
