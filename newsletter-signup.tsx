import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Mail, Facebook, Twitter, Github } from "lucide-react"
import Link from "next/link"

export default function NewsletterSignup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-6">
          {/* Logo/Brand Mark */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>

          {/* Headlines */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Subscribe to Nexus</h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              Get the latest insights, tips, and exclusive content delivered straight to your inbox every week.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Social Sign-up Options */}
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" size="sm" className="h-10 bg-transparent">
                <Facebook className="w-4 h-4" />
                <span className="sr-only">Continue with Facebook</span>
              </Button>
              <Button variant="outline" size="sm" className="h-10 bg-transparent">
                <Twitter className="w-4 h-4" />
                <span className="sr-only">Continue with Twitter</span>
              </Button>
              <Button variant="outline" size="sm" className="h-10 bg-transparent">
                <Github className="w-4 h-4" />
                <span className="sr-only">Continue with GitHub</span>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Email Form */}
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </Label>
              <Input id="email" type="email" placeholder="Enter your email" className="h-11" required />
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium"
            >
              Subscribe Now
            </Button>
          </form>

          {/* Additional Links */}
          <div className="flex justify-center space-x-4 text-xs">
            <Link href="/terms" className="text-gray-500 hover:text-gray-700 underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-gray-700 underline">
              Privacy
            </Link>
            <Link href="/help" className="text-gray-500 hover:text-gray-700 underline">
              Help
            </Link>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          {/* Trust Indicators */}
          <div className="w-full text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <Mail className="w-3 h-3" />
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
