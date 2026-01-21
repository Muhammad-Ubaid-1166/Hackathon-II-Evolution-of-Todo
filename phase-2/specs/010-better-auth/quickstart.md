# Quickstart: Better Auth Implementation

## Prerequisites

- Node.js 18+ installed
- Next.js 13.4+ (App Router enabled)
- TypeScript configured
- Existing frontend project structure in `phase-II/frontend`

## Installation

1. Install Better Auth and related dependencies:

```bash
cd phase-II/frontend
npm install better-auth
```

2. Install type definitions if needed:

```bash
npm install -D @types/node
```

## Configuration

1. Create the Better Auth configuration file at `frontend/src/lib/auth.ts`:

```typescript
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: {
    provider: "sqlite", // or your preferred database
    url: process.env.DATABASE_URL!,
  },
  secret: process.env.AUTH_SECRET!,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true if email verification needed
  },
  socialProviders: {
    // Add social providers if needed
  },
});

export const { signIn, signUp, signOut } = nextCookies(auth);
```

2. Add required environment variables to `.env.local`:

```env
AUTH_SECRET="your-super-secret-auth-key-here"
DATABASE_URL="file:./db.sqlite"  # or your database URL
```

## Route Protection

1. Create middleware for route protection at `frontend/middleware.ts`:

```typescript
import { auth } from "./src/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Define protected routes
  const protectedPaths = [
    "/protected",
    "/dashboard",
    // Add other protected routes
  ];

  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    const session = await auth.$getServerSession();

    if (!session) {
      // Redirect to sign-in page if not authenticated
      const signInUrl = new URL("/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

## Component Implementation

1. Create reusable authentication components in `frontend/src/components/auth/`:

**AuthForm.tsx** - Base authentication form component
**SignupForm.tsx** - Signup form with validation
**SigninForm.tsx** - Signin form with validation
**ProtectedRoute.tsx** - Component wrapper for client-side protection

2. Example SignupForm implementation:

```tsx
"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth";

interface SignupFormProps {
  onSuccess?: () => void;
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signUp.email({
        email,
        password,
        callbackURL: "/dashboard", // Redirect after successful signup
      });

      if (result.error) {
        setError(result.error.message);
      } else if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError("An error occurred during signup");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}
```

## API Routes

1. Create Better Auth API routes in `frontend/src/app/api/auth/[...nextauth]/route.ts`:

```typescript
import { auth } from "@/lib/auth";

export const { GET, POST } = auth.$nextAuth;
```

## Environment Setup

1. Create or update `.env.local` in the frontend directory:

```env
# Authentication
AUTH_SECRET="generate-a-secure-random-string-here"

# Database (if using database)
DATABASE_URL="file:./db.sqlite"

# For development
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

## Testing the Implementation

1. Start the development server:

```bash
cd phase-II/frontend
npm run dev
```

2. Navigate to the signup page and test user registration
3. Test signin with the registered account
4. Verify that protected routes redirect unauthenticated users
5. Test the signout functionality

## Next Steps

1. Implement password reset functionality if needed
2. Add email verification if required
3. Customize the authentication UI components
4. Add additional security measures (2FA, etc.)
5. Set up proper error handling and user feedback