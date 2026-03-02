"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    platformName: "EasyLearn AI",
    maxUsersPerClass: "50",
    quizTimeout: "30",
    enableNotifications: true,
    maintenanceMode: false,
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-8 p-6 md:p-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">System Settings</h1>
        <p className="text-muted-foreground">Configure platform behavior and policies</p>
      </div>

      {/* Notification */}
      {saved && (
        <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-6 py-3 rounded-lg">
          Settings saved successfully!
        </div>
      )}

      {/* Platform Settings */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Platform Settings</CardTitle>
          <CardDescription>General platform configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="platformName" className="text-foreground font-medium mb-2 block">
              Platform Name
            </Label>
            <Input
              id="platformName"
              value={settings.platformName}
              onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
              className="bg-background/50 border-border/50"
            />
          </div>

          <div>
            <Label htmlFor="maxUsers" className="text-foreground font-medium mb-2 block">
              Max Students Per Class
            </Label>
            <Input
              id="maxUsers"
              type="number"
              value={settings.maxUsersPerClass}
              onChange={(e) => setSettings({ ...settings, maxUsersPerClass: e.target.value })}
              className="bg-background/50 border-border/50"
            />
          </div>

          <div>
            <Label htmlFor="quizTimeout" className="text-foreground font-medium mb-2 block">
              Default Quiz Timeout (minutes)
            </Label>
            <Input
              id="quizTimeout"
              type="number"
              value={settings.quizTimeout}
              onChange={(e) => setSettings({ ...settings, quizTimeout: e.target.value })}
              className="bg-background/50 border-border/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Feature Toggles */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Feature Toggles</CardTitle>
          <CardDescription>Enable or disable platform features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
            <div>
              <p className="font-semibold text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Send email alerts to users</p>
            </div>
            <input
              type="checkbox"
              checked={settings.enableNotifications}
              onChange={(e) => setSettings({ ...settings, enableNotifications: e.target.checked })}
              className="w-5 h-5 rounded"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
            <div>
              <p className="font-semibold text-foreground">Maintenance Mode</p>
              <p className="text-sm text-muted-foreground">Restrict access to platform</p>
            </div>
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
              className="w-5 h-5 rounded"
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Configure security policies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-background/50 rounded-lg border border-border/50">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-foreground">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Required for all admin accounts</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                Enabled
              </span>
            </div>
          </div>

          <div className="p-4 bg-background/50 rounded-lg border border-border/50">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-foreground">SSL Certificate</p>
                <p className="text-sm text-muted-foreground">Valid until December 31, 2025</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">Valid</span>
            </div>
          </div>

          <div className="p-4 bg-background/50 rounded-lg border border-border/50">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-foreground">Data Encryption</p>
                <p className="text-sm text-muted-foreground">AES-256 encryption enabled</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                Active
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
          Save Changes
        </Button>
        <Button variant="outline" className="border-border/50 bg-transparent">
          Reset to Defaults
        </Button>
      </div>
    </div>
  )
}
