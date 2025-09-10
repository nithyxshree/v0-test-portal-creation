"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Square, RotateCcw } from "lucide-react"

interface CodeEditorProps {
  language: string
  value: string
  onChange: (value: string) => void
  onRun?: () => void
  onTest?: () => void
}

export function CodeEditor({ language, value, onChange, onRun, onTest }: CodeEditorProps) {
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = async () => {
    setIsRunning(true)
    setOutput("Running code...")

    // Simulate code execution
    setTimeout(() => {
      setOutput(`// Code executed successfully\n// Language: ${language}\n// Output: Hello World!`)
      setIsRunning(false)
    }, 1500)
  }

  const handleTest = async () => {
    setIsRunning(true)
    setOutput("Running tests...")

    // Simulate test execution
    setTimeout(() => {
      setOutput(
        `// Test Results\n✅ Test 1: Passed\n✅ Test 2: Passed\n❌ Test 3: Failed - Expected 'hello', got 'Hello'\n\n2/3 tests passed`,
      )
      setIsRunning(false)
    }, 2000)
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-800 text-white p-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Code Editor</span>
          <span className="text-xs bg-gray-700 px-2 py-1 rounded">{language}</span>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-white border-gray-600 hover:bg-gray-700 bg-transparent"
            onClick={handleRun}
            disabled={isRunning}
          >
            <Play className="w-4 h-4 mr-1" />
            Run
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-white border-gray-600 hover:bg-gray-700 bg-transparent"
            onClick={handleTest}
            disabled={isRunning}
          >
            <Square className="w-4 h-4 mr-1" />
            Test
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-white border-gray-600 hover:bg-gray-700 bg-transparent"
            onClick={() => {
              onChange("")
              setOutput("")
            }}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`// Write your ${language} code here...\n\nfunction solution() {\n    // Your code here\n    return result;\n}`}
        className="w-full h-64 p-4 font-mono text-sm bg-gray-900 text-gray-100 border-none outline-none resize-none"
        style={{ letterSpacing: "1px" }}
      />
      {output && (
        <div className="border-t bg-gray-100 p-3">
          <h4 className="font-medium text-gray-900 mb-2 text-sm">Output:</h4>
          <div className="bg-white p-3 rounded border font-mono text-sm whitespace-pre-wrap">
            {isRunning ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-[#4D31EC] border-t-transparent rounded-full"></div>
                <span className="text-gray-600">Executing...</span>
              </div>
            ) : (
              output
            )}
          </div>
        </div>
      )}
    </div>
  )
}
