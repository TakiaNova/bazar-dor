
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SigninForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
        rememberMe,
      });

      console.log("LOGIN RESULT:", result);

      if (result?.error) {
        toast.error(result.error.message || "সাইন ইন করা যায়নি");
        return;
      }

      if (result?.data) {
        toast.success("সফলভাবে সাইন ইন হয়েছে!");
        router.push("/");
        router.refresh();
      } else {
        toast.error("সাইন ইন সম্পন্ন হয়নি। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      console.error(error);
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignin = async (provider) => {
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "লগইন করা যায়নি");
        setSocialLoading("");
      }
    } catch (error) {
      console.error(error);
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setSocialLoading("");
    }
  };

  return (
    <section className="flex justify-center px-4 py-12 md:py-16">
      <div className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-7 shadow-lg sm:p-9">

        <div className="mb-7 text-center">
          <h1 className="text-2xl font-extrabold text-[#202820]">
            সাইন ইন
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <form onSubmit={handleSignin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              ইমেইল ঠিকানা
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                পাসওয়ার্ড
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-green-700 hover:underline"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pr-16 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-green-700"
              >
                {showPassword ? "লুকান" : "দেখুন"}
              </button>
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 accent-green-700"
            />
            আমাকে মনে রাখুন
          </label>

          <button
            type="submit"
            disabled={loading || !!socialLoading}
            className="w-full rounded-lg bg-green-700 py-3.5 text-sm font-bold text-white transition hover:bg-green-800 disabled:opacity-50"
          >
            {loading ? "প্রবেশ করা হচ্ছে..." : "সাইন ইন"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={() => handleSocialSignin("google")}
          disabled={loading || !!socialLoading}
          className="mb-3 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
        >
          <span className="font-bold text-lg text-[#4285F4]">G</span>
          {socialLoading === "google"
            ? "সংযোগ করা হচ্ছে..."
            : "Google দিয়ে সাইন ইন"}
        </button>

        <button
          type="button"
          onClick={() => handleSocialSignin("github")}
          disabled={loading || !!socialLoading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.75-1.32-3.75-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 1.8 3.64 1.38.1-.72.39-1.21.7-1.49-2.48-.28-5.08-1.24-5.08-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.6 5.23-5.09 5.51.4.35.75 1.02.75 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
          </svg>
          {socialLoading === "github"
            ? "সংযোগ করা হচ্ছে..."
            : "GitHub দিয়ে সাইন ইন"}
        </button>

        <p className="mt-7 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-bold text-green-700 hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </section>
  );
}
