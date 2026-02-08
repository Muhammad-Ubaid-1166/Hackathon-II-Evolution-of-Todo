"use server";

import { db } from "@/db";
import { users, passwordResetTokens } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

interface UpdatePasswordResponse {
  success?: string;
  error?: string;
}

export async function updatePassword(formData: FormData): Promise<UpdatePasswordResponse> {
  const token = formData.get("token") as string | null;
  const newPassword = formData.get("password") as string | null;

  if (!token || !newPassword) return { error: "Invalid request." };

  const tokenRecord = await db.query.passwordResetTokens.findFirst({
    where: eq(passwordResetTokens.token, token),
  });

  if (!tokenRecord) return { error: "Invalid or expired token." };
  if (tokenRecord.expires < new Date()) return { error: "Reset link has expired." };

  const hashed = await bcrypt.hash(newPassword, 10);

  await db.update(users).set({ password: hashed }).where(eq(users.email, tokenRecord.email));
  await db.delete(passwordResetTokens).where(eq(passwordResetTokens.token, token));

  return { success: "Password has been reset successfully!" };
}
