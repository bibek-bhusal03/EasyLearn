"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Invitation {
  id: number
  email: string
  code: string
  status: "pending" | "accepted" | "declined"
  sentAt: string
  acceptedAt?: string
}

export default function InvitationsPage() {
  const params = useParams()
  const classId = params.id as string
  const { toast } = useToast()

  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showBulkInviteModal, setShowBulkInviteModal] = useState(false)
  const [showCodeModal, setShowCodeModal] = useState(false)

  const [inviteEmail, setInviteEmail] = useState("")
  const [bulkEmails, setBulkEmails] = useState("")

  const [invitations, setInvitations] = useState<Invitation[]>([
    {
      id: 1,
      email: "student1@example.com",
      code: "MATH-ABC123",
      status: "accepted",
      sentAt: "2024-01-15",
      acceptedAt: "2024-01-16",
    },
    {
      id: 2,
      email: "student2@example.com",
      code: "MATH-DEF456",
      status: "pending",
      sentAt: "2024-01-18",
    },
    {
      id: 3,
      email: "student3@example.com",
      code: "MATH-GHI789",
      status: "declined",
      sentAt: "2024-01-17",
    },
    {
      id: 4,
      email: "student4@example.com",
      code: "MATH-JKL012",
      status: "pending",
      sentAt: "2024-01-20",
    },
  ])

  const classCode = "MATH101"

  const handleInviteStudent = async () => {
    if (!inviteEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      })
      return
    }

    const generatedCode = `MATH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    const newInvitation: Invitation = {
      id: Math.max(...invitations.map((i) => i.id), 0) + 1,
      email: inviteEmail,
      code: generatedCode,
      status: "pending",
      sentAt: new Date().toISOString().split("T")[0],
    }

    setInvitations([...invitations, newInvitation])
    setInviteEmail("")
    setShowInviteModal(false)
    toast({
      title: "Success",
      description: `Invitation sent to ${inviteEmail}`,
    })
  }

  const handleBulkInvite = async () => {
    const emails = bulkEmails
      .split("\n")
      .map((e) => e.trim())
      .filter((e) => e && e.includes("@"))

    if (emails.length === 0) {
      toast({
        title: "Error",
        description: "Please enter valid email addresses (one per line)",
        variant: "destructive",
      })
      return
    }

    const newInvitations = emails.map((email) => ({
      id: Math.max(...invitations.map((i) => i.id), 0) + 1,
      email,
      code: `MATH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      status: "pending" as const,
      sentAt: new Date().toISOString().split("T")[0],
    }))

    setInvitations([...invitations, ...newInvitations])
    setBulkEmails("")
    setShowBulkInviteModal(false)
    toast({
      title: "Success",
      description: `${emails.length} invitation${emails.length > 1 ? "s" : ""} sent successfully`,
    })
  }

  const handleResendInvitation = (email: string) => {
    toast({
      title: "Resent",
      description: `Invitation resent to ${email}`,
    })
  }

  const handleCancelInvitation = (id: number, email: string) => {
    setInvitations(invitations.filter((i) => i.id !== id))
    toast({
      title: "Cancelled",
      description: `Invitation to ${email} has been cancelled`,
    })
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Copied",
      description: `Code "${code}" copied to clipboard`,
    })
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" }> = {
      pending: { variant: "secondary" },
      accepted: { variant: "default" },
      declined: { variant: "destructive" },
    }
    return statusConfig[status] || { variant: "default" }
  }

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href={`/teacher/classes/${classId}`} className="text-primary hover:underline text-sm mb-2 block">
            ← Back to Class
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Student Invitations</h1>
          <p className="text-muted-foreground">Manage student invitations and track acceptance status</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showCodeModal} onOpenChange={setShowCodeModal}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-border/50 bg-transparent">
                Share Code
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Class Invitation Code</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">Students can use this code to join your class directly:</p>
                <div className="flex gap-2">
                  <div className="flex-1 p-4 rounded-lg bg-muted/50 border border-border/50">
                    <p className="text-2xl font-bold text-foreground text-center font-mono">{classCode}</p>
                  </div>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(classCode)
                      toast({
                        title: "Copied",
                        description: `Code "${classCode}" copied to clipboard`,
                      })
                    }}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <span className="mr-2">+</span>
                Send Invitation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Invitation</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="studentEmail">Student Email</Label>
                  <Input
                    id="studentEmail"
                    type="email"
                    placeholder="student@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="bg-background/50 border-border/50"
                  />
                </div>
                <Button onClick={handleInviteStudent} className="w-full bg-primary hover:bg-primary/90">
                  Send Invitation
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showBulkInviteModal} onOpenChange={setShowBulkInviteModal}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-border/50 bg-transparent">
                Bulk Invite
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bulk Invite Students</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bulkEmails">Email Addresses (one per line)</Label>
                  <textarea
                    id="bulkEmails"
                    placeholder="student1@example.com&#10;student2@example.com&#10;student3@example.com"
                    value={bulkEmails}
                    onChange={(e) => setBulkEmails(e.target.value)}
                    className="w-full h-32 p-3 rounded-lg bg-background/50 border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <p className="text-xs text-muted-foreground">Paste email addresses separated by new lines</p>
                </div>
                <Button onClick={handleBulkInvite} className="w-full bg-primary hover:bg-primary/90">
                  Send Invitations
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm font-medium">Total Invitations</p>
            <p className="text-3xl font-bold text-foreground mt-2">{invitations.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm font-medium">Pending</p>
            <p className="text-3xl font-bold text-foreground mt-2">
              {invitations.filter((i) => i.status === "pending").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm font-medium">Accepted</p>
            <p className="text-3xl font-bold text-primary mt-2">
              {invitations.filter((i) => i.status === "accepted").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm font-medium">Declined</p>
            <p className="text-3xl font-bold text-destructive mt-2">
              {invitations.filter((i) => i.status === "declined").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Invitations Table */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Invitation History</CardTitle>
          <CardDescription>Track all student invitations</CardDescription>
        </CardHeader>
        <CardContent>
          {invitations.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="text-foreground">Email</TableHead>
                  <TableHead className="text-foreground">Code</TableHead>
                  <TableHead className="text-foreground">Status</TableHead>
                  <TableHead className="text-foreground">Sent</TableHead>
                  <TableHead className="text-foreground">Accepted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitations.map((invitation) => (
                  <TableRow key={invitation.id} className="border-border/50">
                    <TableCell className="text-muted-foreground">{invitation.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono text-foreground">{invitation.code}</code>
                        <button
                          onClick={() => handleCopyCode(invitation.code)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          title="Copy code"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(invitation.status).variant}>
                        {invitation.status.charAt(0).toUpperCase() + invitation.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(invitation.sentAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {invitation.acceptedAt ? new Date(invitation.acceptedAt).toLocaleDateString() : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        {invitation.status === "pending" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleResendInvitation(invitation.email)}
                            className="text-primary hover:text-primary"
                          >
                            Resend
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCancelInvitation(invitation.id, invitation.email)}
                          className="text-destructive hover:text-destructive"
                        >
                          Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No invitations sent yet. Start by sending one!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
