"use server";

import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string || "";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    // Check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      const user = existingUser[0];

      // If user exists but has NO password, they created the account via Google
      if (!user.password) {
        return { error: "Account exists. Please sign in with Google." };
      }

      // If user exists AND has a password, it's a standard "Email taken" error
      return { error: "Email already in use" };
    }

    // Hash and Insert
    const hashedPassword = await bcrypt.hash(password, 10);

    // Explicitly define the fields to insert, avoiding any ID field
    await db.insert(users).values({
      name: name || email.split("@")[0], // Use part of email as name if not provided
      email,
      password: hashedPassword,
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Failed to create account" };
  }
}