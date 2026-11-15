
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UserMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const handleLogout = async () => {
    setLoading(true);

    try {
      const result = await authClient.signOut();

      if (result?.error) {
        toast.error(result.error.message || "লগআউট করা যায়নি");
        return;
      }

      toast.success("সফলভাবে লগআউট হয়েছে!");
      setOpen(false);
      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="h-10 w-24 animate-pulse rounded-full bg-green-100" />
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-green-50"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition hover:bg-green-50"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-800">
          {user.name?.charAt(0)?.toUpperCase() || "👤"}
        </span>

        <span className="max-w-32 truncate">
          {user.name || user.email}
        </span>

        <span className="text-xs text-gray-500">
          {open ? "⌃" : "⌄"}
        </span>
      </button>

      
{open && (
  <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-green-100 bg-white p-3 shadow-xl">
    <div className="border-b border-gray-100 px-3 py-3">
      <p className="font-bold text-gray-800">
        {user.name || "ব্যবহারকারী"}
      </p>

      <p className="mt-1 break-all text-xs text-gray-500">
        {user.email}
      </p>
    </div>

    <Link
      href="/profile"
      onClick={() => setOpen(false)}
      className="mt-2 block rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-green-50"
    >
    👤 আমার প্রোফাইল
    </Link>

    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
    >
      {loading ? "সাইন আউট হচ্ছে..." : "↩ সাইন আউট"}
    </button>
  </div>
)}

    </div>
  );
}
