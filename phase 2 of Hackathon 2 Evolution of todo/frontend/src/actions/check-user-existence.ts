"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function checkEmailStatus(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (user && !user.password) {
    // User exists but has no password => They used Google
    return { error: "Account exists. Please sign in with Google." };
  }

  // Otherwise, safe to proceed with standard login attempt
  return { success: true };
}
