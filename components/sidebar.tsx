"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, FileText, BarChart3, Settings, HelpCircle, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: FileText, label: "Tests", href: "/tests" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help & Support", href: "/help" },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } flex flex-col h-screen`}
      style={{ fontFamily: "Archivo, sans-serif" }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <img src="/workcrew-logo.jpg" alt="Workcrew.ai" className="h-8" />
            <div>
              <h2 className="font-semibold text-gray-900">Test Portal</h2>
              <p className="text-xs text-gray-600">AI-Powered Assessments</p>
            </div>
          </div>
        )}
        {collapsed && <img src="/workcrew-logo.jpg" alt="Workcrew.ai" className="h-8 mx-auto" />}
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="p-1 h-8 w-8">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Create Test Button */}
      <div className="p-4">
        <Link href="/create-test">
          <Button className="w-full bg-[#4D31EC] hover:bg-[#3D21DC] text-white font-medium">
            <Plus className="w-4 h-4 mr-2" />
            {!collapsed && "Create New Test"}
          </Button>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-[#F8F8FF] text-[#4D31EC] border border-[#E5E3FF]" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {!collapsed && (
          <div className="text-center">
            <p className="text-xs text-gray-600">© 2024 Workcrew.ai</p>
            <p className="text-xs text-gray-500">Version 2.1.0</p>
          </div>
        )}
      </div>
    </div>
  )
}
