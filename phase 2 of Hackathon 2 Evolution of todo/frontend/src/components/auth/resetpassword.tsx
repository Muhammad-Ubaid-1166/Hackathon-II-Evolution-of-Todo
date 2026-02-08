"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Loader2, ArrowLeft, Eye, EyeOff, Check } from "lucide-react";
import { updatePassword } from "@/actions/reset-password";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export function ResetPasswordCard() {
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? undefined;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!token) return setError("Invalid or missing token.");
    if (password !== confirm) return setError("Passwords do not match.");

    setIsPending(true);
    try {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("password", password);

      const res = await updatePassword(formData);

      if (res.error) setError(res.error);
      if (res.success) setSuccess(res.success);
    } catch {
      setError("Something went wrong.");
    } finally {
      setIsPending(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-[#111] border border-white/10 rounded-lg p-8">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-white mb-2">
                Invalid link
              </h1>
              <p className="text-sm text-gray-400 mb-6">
                This reset link is invalid or has expired.
              </p>
              <Link href="/forgot-password">
                <Button className="w-full h-11 bg-white text-black hover:bg-white/90 font-medium">
                  Request new link
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link 
            href="/login"
            className="inline-flex items-center text-white hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Back to login</span>
          </Link>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-white mb-2">
              Create new password
            </h1>
            <p className="text-sm text-gray-400">
              Enter a new password for your account.
            </p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-md">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm text-gray-300">{success}</p>
                  <Link href="/login">
                    <Button className="h-9 bg-white text-black hover:bg-white/90 font-medium text-sm">
                      Continue to login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-md">
              <p className="text-sm text-gray-300">{error}</p>
            </div>
          )}

          {!success && (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-white">
                  New password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="h-11 bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500 focus:border-white/20 focus:ring-0 pr-10"
                    disabled={isPending}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    tabIndex={-1}
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm" className="text-sm font-medium text-white">
                  Confirm password
                </Label>
                <div className="relative">
                  <Input
                    id="confirm"
                    type={showPw2 ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Confirm new password"
                    className="h-11 bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500 focus:border-white/20 focus:ring-0 pr-10"
                    disabled={isPending}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw2(!showPw2)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    tabIndex={-1}
                  >
                    {showPw2 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 bg-white text-black hover:bg-white/90 font-medium"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Reset password"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}