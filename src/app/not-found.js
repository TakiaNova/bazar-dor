
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-green-600">
        404
      </h1>

      <h2 className="text-2xl font-semibold">
        Page Not Found!
      </h2>

      <p className="text-gray-500">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
