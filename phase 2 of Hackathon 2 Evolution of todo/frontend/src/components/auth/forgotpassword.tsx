"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2, ArrowLeft, Check } from "lucide-react";
import { resetPassword } from "@/actions/forgot-password";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const ForgotPasswordCard = () => {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsPending(true);

    const formData = new FormData();
    formData.append("email", email);

    try {
      const data = await resetPassword(formData);
      if (data?.error) {
        setError(data.error);
      } else if (data?.success) {
        setSuccess(data.success);
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-white hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Back</span>
          </Link>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-white mb-2">
              Reset password
            </h1>
            <p className="text-sm text-gray-400">
              Enter your email address and we'll send you a reset link.
            </p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-md">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300">{success}</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-md">
              <p className="text-sm text-gray-300">{error}</p>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="h-11 bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500 focus:border-white/20 focus:ring-0"
                disabled={isPending}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 bg-white text-black hover:bg-white/90 font-medium"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send reset link"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Remember your password? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};