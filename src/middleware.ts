import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  const { pathname, origin } = req.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    token
  ) {
    return NextResponse.next()
  }

  if (!token && pathname !== "/login") {
    const url = req.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(`${origin}/login`)
  }
}
