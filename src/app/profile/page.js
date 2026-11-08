
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

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

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Please Sign In</h1>
        <p className="text-gray-500">
          You need to login to view your profile.
        </p>
        <Link
          href="/signin"
          className="rounded-lg bg-green-600 px-6 py-3 text-white"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold">
          My Profile
        </h1>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-semibold">{session.user.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold">{session.user.email}</p>
          </div>
        </div>

        <button
          onClick={handleSignout}
          className="mt-8 w-full rounded-lg bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    </main>
  );
}
