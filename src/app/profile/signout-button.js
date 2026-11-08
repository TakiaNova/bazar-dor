
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("Logout failed");
      return;
    }

    toast.success("Logged out successfully!");
    router.push("/signin");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignout}
      className="mt-8 w-full rounded-lg bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
    >
      Sign Out
    </button>
  );
}
