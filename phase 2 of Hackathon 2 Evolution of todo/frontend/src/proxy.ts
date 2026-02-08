import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Add custom middleware logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect dashboard routes
        const protectedPaths = ["/dashboard"];
        const { pathname } = req.nextUrl;

        // Check if the path starts with any protected path
        const isProtectedPath = protectedPaths.some((path) =>
          pathname.startsWith(path)
        );

        // If it's a protected path, user must be authenticated
        if (isProtectedPath) {
          return !!token;
        }

        // Allow access to other paths
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};

