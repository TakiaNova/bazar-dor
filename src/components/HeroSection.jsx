import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const today = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <section className="mx-auto max-w-7xl px-5 py-7 md:py-10">
      <div className="grid items-center gap-8 rounded-2xl border border-green-100 bg-white px-6 py-10 shadow-sm md:grid-cols-2 md:px-12 md:py-14">

        {/* Hero Text */}
        <div>
          <span className="inline-flex rounded-lg bg-[#e8f4e9] px-4 py-2 text-sm font-semibold text-green-800">
            {today}
          </span>

          <h1 className="mt-5 max-w-xl text-3xl font-extrabold leading-tight text-[#202820] md:text-3xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-7 text-gray-500 md:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#products"
            className="mt-7 inline-flex items-center rounded-lg bg-green-700 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* Hero Banner */}
<div className="flex items-center justify-center">
  <Image
    src="/bazar-hero.png"
    alt="বাজার দর"
    width={600}
    height={450}
    priority
    className="h-auto w-full max-w-lg object-contain"
  />
</div>

      </div>
    </section>
  );
}
