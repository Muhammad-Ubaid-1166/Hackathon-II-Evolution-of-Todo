"use client";

import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Hook for handling login
export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return { success: false, error: result.error };
      }

      router.push("/dashboard");
      router.refresh();
      return { success: true };
    } catch (err) {
      setError("An error occurred. Please try again.");
      return { success: false, error: "An error occurred" };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      setError("Failed to sign in with Google");
      setIsLoading(false);
    }
  };

  const loginWithGitHub = async () => {
    setIsLoading(true);
    try {
      await signIn("github", { callbackUrl: "/dashboard" });
    } catch (err) {
      setError("Failed to sign in with GitHub");
      setIsLoading(false);
    }
  };

  return {
    login,
    loginWithGoogle,
    loginWithGitHub,
    isLoading,
    error,
  };
}

// Hook for handling logout
export function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: "/" });
    } catch (err) {
      setIsLoading(false);
    }
  };

  return { logout, isLoading };
}

// Helper function to check if user is authenticated
export function useAuth() {
  // This is a simple check - in production, use useSession from next-auth/react
  const isAuthenticated = () => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("auth-token");
    }
    return false;
  };

  return { isAuthenticated };
}

