
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ProfileContent() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const user = session?.user;

  useEffect(() => {
    if (user) {
      setName(user.name || "");
    }
  }, [user]);

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/signin");
    }
  }, [isPending, user, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: name.trim(),
      });

      if (result?.error) {
        toast.error(result.error.message || "তথ্য আপডেট করা যায়নি");
        return;
      }

      toast.success("আপনার তথ্য সফলভাবে আপডেট হয়েছে!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const result = await authClient.signOut();

      if (result?.error) {
        toast.error(result.error.message || "সাইন আউট করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  if (isPending || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-gray-500">তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <section className="mx-auto min-h-[75vh] max-w-4xl px-4 py-10 md:py-14">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#202820] md:text-3xl">
          আমার প্রোফাইল
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-green-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100 text-2xl font-bold text-green-800">
            {user.image ? (
              <img
                src={user.image}
                alt="প্রোফাইল ছবি"
                className="h-full w-full object-cover"
              />
            ) : (
              user.name?.charAt(0)?.toUpperCase() || "👤"
            )}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-gray-800">
              {user.name || "ব্যবহারকারী"}
            </h2>
            <p className="truncate text-sm text-gray-500">
              {user.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-red-100 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          সাইন আউট
        </button>
      </div>

      <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#202820]">
        তথ্য
          </h2>
        </div>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              নাম
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-10"
          >
            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-sm font-semibold text-green-700 hover:underline"
        >
          ← হোমপেজে ফিরে যান
        </Link>
      </div>
    </section>
  );
}
