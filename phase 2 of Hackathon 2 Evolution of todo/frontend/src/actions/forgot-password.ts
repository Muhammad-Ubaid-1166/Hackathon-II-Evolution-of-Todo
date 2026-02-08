"use server";

import { db } from "@/db";
import { users, passwordResetTokens } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { sendPasswordResetEmail } from "@/lib/mail";

export const resetPassword = async (formData: FormData) => {
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Email is required" };
  }

  // 1. Check if user exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!existingUser) {
    // Security: Don't reveal if email exists or not
    return { error: "your email does not exist on this website." };
  }

  // 2. Generate Token
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour from now

  // 3. Delete existing tokens for this email (optional cleanup)
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.email, email));

  // 4. Insert new token
  await db.insert(passwordResetTokens).values({
    email,
    token,
    expires,
  });

  // 5. Send Email
  try {
    await sendPasswordResetEmail(email, token);
    return { success: "If an account exists, a reset email has been sent." };
  } catch (error) {
    return { error: "Failed to send email currently" };
  }
};
