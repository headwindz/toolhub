"use client"

import { useState } from "react"
import { Mail, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// WeChat icon component
function WeChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
    </svg>
  )
}

export function LoginModal() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(provider)
    try {
      await signIn(provider.toLowerCase(), { callbackUrl: "/" })
    } catch (error) {
      console.error("Sign in error:", error)
    } finally {
      setIsLoading(null)
    }
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
    setOpen(false)
  }

  if (session?.user) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
              <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline">{session.user.name}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm p-0">
          <Card className="border-0 shadow-none">
            <CardHeader className="space-y-3 pb-4 text-center">
              <Avatar className="mx-auto h-16 w-16">
                <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                <AvatarFallback className="text-2xl">{session.user.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">{session.user.name}</CardTitle>
                <CardDescription>{session.user.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button onClick={handleSignOut} variant="outline" className="w-full gap-2 bg-transparent">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Mail className="h-4 w-4" />
          <span className="hidden sm:inline">Sign In</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-0">
        <Card className="border-0 shadow-none">
          <CardHeader className="space-y-3 pb-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome to ToolBox</CardTitle>
            <CardDescription className="text-base">
              Sign in to save your preferences and access premium tools
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full gap-3 border-2 py-6 text-base font-medium transition-all hover:border-primary hover:bg-primary/5 bg-transparent"
                onClick={() => handleSocialLogin("Google")}
                disabled={isLoading !== null || status === "loading"}
              >
                {isLoading === "Google" ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                Continue with Google
              </Button>

              <Card className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/30">
                <CardContent className="p-3">
                  <p className="text-xs text-orange-800 dark:text-orange-200">
                    <strong>Note:</strong> GitHub and WeChat sign-in require additional provider configuration. Google
                    OAuth is ready to use.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Separator className="my-4" />

            <p className="text-center text-xs text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>

            <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30">
              <CardContent className="p-3">
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  <strong>Setup Required:</strong> Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables
                  to enable Google sign-in.
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
