import { useSession, signIn, signOut } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status, update } = useSession();

  return {
    user: session?.user || null,
    session,
    status,
    isLoading: status === "loading",
    isAuthenticated: !!session,
    signIn,
    signOut,
    update,
  };
};
