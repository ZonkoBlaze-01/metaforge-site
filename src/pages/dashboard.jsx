import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Get current user session
    async function getUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.push("/auth/login"); // redirect if not logged in
      } else {
        setUser(user);
      }
    }
    getUser();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/auth/login");
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.user_metadata?.full_name || user.email}</h1>
      {user.user_metadata?.avatar_url && (
        <img
          src={user.user_metadata.avatar_url}
          alt="User avatar"
          className="rounded-full w-24 h-24 mb-6"
        />
      )}
      <p className="mb-6">Email: {user.email}</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}
