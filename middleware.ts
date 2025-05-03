import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/chat",
    "/api/chat/save",
    "/api/auth/check",
    "/sign-in",
    "/sign-up",
  ],
  ignoredRoutes: [
    "/api/webhook",
    "/api/chat/stream",
  ],
  afterAuth: (auth, req) => {
    // Handle CORS for API routes
    if (req.nextUrl.pathname.startsWith('/api/')) {
      const response = NextResponse.next()
      
      // Set CORS headers
      response.headers.set('Access-Control-Allow-Origin', '*')
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      response.headers.set('Access-Control-Max-Age', '86400')
      
      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        return new NextResponse(null, { status: 204 })
      }
      
      return response
    }
    
    return NextResponse.next()
  }
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
} 