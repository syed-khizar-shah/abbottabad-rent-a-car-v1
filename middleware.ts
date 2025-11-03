import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function middleware(request: NextRequest) {
  // You can add authentication/authorization logic here
  // Example: Check for auth token in cookies or headers
  
  const token = request.cookies.get("token")?.value || 
                request.headers.get("authorization")?.replace("Bearer ", "");

  // If you have protected routes, add logic here
  // For now, this is a basic middleware that doesn't block requests

  // Example: Verify token if present
  if (token) {
    try {
      await verifyToken(token);
      // Token is valid, proceed
    } catch (error) {
      // Token is invalid, you can handle this here
      // For example, redirect to login or clear the cookie
    }
  }

  return NextResponse.next();
}

// Configure which routes should run this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
