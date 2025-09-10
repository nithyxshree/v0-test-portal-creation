"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Bell,
  Shield,
  Palette,
  Zap,
  Save,
  Upload,
  Key,
  Smartphone,
  Mail,
  Slack,
  Calendar,
  Users,
} from "lucide-react"
import { Sidebar } from "@/components/sidebar"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    title: "HR Manager",
    company: "TechCorp Inc.",
    bio: "Passionate about finding the right talent and building great teams.",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    testSubmissions: true,
    candidateUpdates: true,
    weeklyReports: true,
    marketingEmails: false,
    systemUpdates: true,
  })

  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "en",
    timezone: "UTC-5",
    dateFormat: "MM/DD/YYYY",
    defaultTestDuration: 60,
  })

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    sessionTimeout: 30,
    loginNotifications: true,
  })

  const [integrations, setIntegrations] = useState({
    slack: { connected: true, workspace: "TechCorp" },
    googleCalendar: { connected: false },
    microsoftTeams: { connected: true, tenant: "techcorp.com" },
    zapier: { connected: false },
  })

  return (
    <div className="flex h-screen bg-[#F6F9FE]" style={{ fontFamily: "Archivo, sans-serif" }}>
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-1">Manage your account and application preferences</p>
            </div>
            <Button className="bg-[#4D31EC] hover:bg-[#3D21DC] text-white font-semibold">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </header>

        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-gray-100">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="preferences" className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Preferences
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="integrations" className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Integrations
                </TabsTrigger>
              </TabsList>

              {/* Profile Settings */}
              <TabsContent value="profile" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-bold">Profile Information</CardTitle>
                    <CardDescription>Update your personal information and profile details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <img
                          src={profile.avatar || "/placeholder.svg"}
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <Button
                          size="sm"
                          className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-[#4D31EC] hover:bg-[#3D21DC]"
                        >
                          <Upload className="w-3 h-3" />
                        </Button>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{profile.name}</h3>
                        <p className="text-gray-600">{profile.title}</p>
                        <Badge className="mt-1 bg-green-100 text-green-800">Active</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="font-semibold">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="font-semibold">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="title" className="font-semibold">
                          Job Title
                        </Label>
                        <Input
                          id="title"
                          value={profile.title}
                          onChange={(e) => setProfile((prev) => ({ ...prev, title: e.target.value }))}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company" className="font-semibold">
                          Company
                        </Label>
                        <Input
                          id="company"
                          value={profile.company}
                          onChange={(e) => setProfile((prev) => ({ ...prev, company: e.target.value }))}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio" className="font-semibold">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                        className="mt-2"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-bold">Notification Preferences</CardTitle>
                    <CardDescription>Choose how you want to be notified about important events</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-blue-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Email Notifications</h4>
                            <p className="text-sm text-gray-600">Receive notifications via email</p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.emailNotifications}
                          onCheckedChange={(checked) =>
                            setNotifications((prev) => ({ ...prev, emailNotifications: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-green-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Test Submissions</h4>
                            <p className="text-sm text-gray-600">Get notified when candidates submit tests</p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.testSubmissions}
                          onCheckedChange={(checked) =>
                            setNotifications((prev) => ({ ...prev, testSubmissions: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Bell className="w-5 h-5 text-purple-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Candidate Updates</h4>
                            <p className="text-sm text-gray-600">Updates about candidate progress and status</p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.candidateUpdates}
                          onCheckedChange={(checked) =>
                            setNotifications((prev) => ({ ...prev, candidateUpdates: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-orange-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Weekly Reports</h4>
                            <p className="text-sm text-gray-600">Weekly summary of test performance and analytics</p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.weeklyReports}
                          onCheckedChange={(checked) =>
                            setNotifications((prev) => ({ ...prev, weeklyReports: checked }))
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences */}
              <TabsContent value="preferences" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-bold">Application Preferences</CardTitle>
                    <CardDescription>Customize your application experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="font-semibold">Theme</Label>
                        <Select
                          value={preferences.theme}
                          onValueChange={(value) => setPreferences((prev) => ({ ...prev, theme: value }))}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="font-semibold">Language</Label>
                        <Select
                          value={preferences.language}
                          onValueChange={(value) => setPreferences((prev) => ({ ...prev, language: value }))}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="font-semibold">Timezone</Label>
                        <Select
                          value={preferences.timezone}
                          onValueChange={(value) => setPreferences((prev) => ({ ...prev, timezone: value }))}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                            <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                            <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                            <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="font-semibold">Date Format</Label>
                        <Select
                          value={preferences.dateFormat}
                          onValueChange={(value) => setPreferences((prev) => ({ ...prev, dateFormat: value }))}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="md:col-span-2">
                        <Label className="font-semibold">Default Test Duration (minutes)</Label>
                        <Input
                          type="number"
                          value={preferences.defaultTestDuration}
                          onChange={(e) =>
                            setPreferences((prev) => ({
                              ...prev,
                              defaultTestDuration: Number.parseInt(e.target.value) || 60,
                            }))
                          }
                          className="mt-2"
                          min="15"
                          max="300"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-bold">Security Settings</CardTitle>
                    <CardDescription>Manage your account security and privacy</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Smartphone className="w-5 h-5 text-green-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={security.twoFactorEnabled}
                            onCheckedChange={(checked) =>
                              setSecurity((prev) => ({ ...prev, twoFactorEnabled: checked }))
                            }
                          />
                          {!security.twoFactorEnabled && (
                            <Button size="sm" variant="outline" className="font-medium bg-transparent">
                              Setup
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Bell className="w-5 h-5 text-blue-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Login Notifications</h4>
                            <p className="text-sm text-gray-600">Get notified of new login attempts</p>
                          </div>
                        </div>
                        <Switch
                          checked={security.loginNotifications}
                          onCheckedChange={(checked) =>
                            setSecurity((prev) => ({ ...prev, loginNotifications: checked }))
                          }
                        />
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <Key className="w-5 h-5 text-purple-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Session Timeout</h4>
                            <p className="text-sm text-gray-600">Automatically log out after inactivity</p>
                          </div>
                        </div>
                        <Select
                          value={security.sessionTimeout.toString()}
                          onValueChange={(value) =>
                            setSecurity((prev) => ({ ...prev, sessionTimeout: Number.parseInt(value) }))
                          }
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="240">4 hours</SelectItem>
                            <SelectItem value="480">8 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Button
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50 font-medium bg-transparent"
                      >
                        Change Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Integrations */}
              <TabsContent value="integrations" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-bold">Third-Party Integrations</CardTitle>
                    <CardDescription>Connect with your favorite tools and services</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Slack className="w-5 h-5 text-purple-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Slack</h4>
                            <p className="text-sm text-gray-600">
                              {integrations.slack.connected
                                ? `Connected to ${integrations.slack.workspace}`
                                : "Get notifications in Slack"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {integrations.slack.connected && (
                            <Badge className="bg-green-100 text-green-800">Connected</Badge>
                          )}
                          <Button
                            size="sm"
                            variant={integrations.slack.connected ? "outline" : "default"}
                            className={
                              integrations.slack.connected
                                ? "font-medium bg-transparent"
                                : "bg-[#4D31EC] hover:bg-[#3D21DC] text-white font-medium"
                            }
                          >
                            {integrations.slack.connected ? "Disconnect" : "Connect"}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Google Calendar</h4>
                            <p className="text-sm text-gray-600">Schedule interviews and sync events</p>
                          </div>
                        </div>
                        <Button size="sm" className="bg-[#4D31EC] hover:bg-[#3D21DC] text-white font-medium">
                          Connect
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-blue-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Microsoft Teams</h4>
                            <p className="text-sm text-gray-600">
                              {integrations.microsoftTeams.connected
                                ? `Connected to ${integrations.microsoftTeams.tenant}`
                                : "Collaborate with your team"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {integrations.microsoftTeams.connected && (
                            <Badge className="bg-green-100 text-green-800">Connected</Badge>
                          )}
                          <Button
                            size="sm"
                            variant={integrations.microsoftTeams.connected ? "outline" : "default"}
                            className={
                              integrations.microsoftTeams.connected
                                ? "font-medium bg-transparent"
                                : "bg-[#4D31EC] hover:bg-[#3D21DC] text-white font-medium"
                            }
                          >
                            {integrations.microsoftTeams.connected ? "Disconnect" : "Connect"}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Zap className="w-5 h-5 text-orange-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Zapier</h4>
                            <p className="text-sm text-gray-600">Automate workflows with 5000+ apps</p>
                          </div>
                        </div>
                        <Button size="sm" className="bg-[#4D31EC] hover:bg-[#3D21DC] text-white font-medium">
                          Connect
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
