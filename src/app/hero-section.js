
import Link from "next/link";

export default function HeroSection() {
  const today = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
  }).format(new Date());

  return (
    <section className="mx-auto max-w-7xl px-5 pt-5">
      <div className="grid min-h-[250px] items-center gap-6 overflow-hidden rounded-2xl border border-green-100 bg-[#f9fdf9] px-6 py-8 shadow-sm md:grid-cols-[1.5fr_1fr] md:px-10">
        {/* Hero Text */}
        <div>
          <span className="inline-flex rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-800">
            {today}
          </span>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#202820] md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 md:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ
            এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#products"
            className="mt-5 inline-flex items-center rounded-lg bg-green-700 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* Fruit Basket Illustration */}
        <div className="flex items-center justify-center">
          <svg
            viewBox="0 0 340 230"
            className="w-full max-w-[320px]"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="ফলের ঝুড়ি"
          >
            {/* Shadow */}
            <ellipse
              cx="170"
              cy="207"
              rx="120"
              ry="10"
              fill="#dce8dc"
            />

            {/* Leaves */}
            <path
              d="M170 65 C145 30 155 15 170 10 C190 35 184 50 170 65"
              fill="#159447"
            />
            <path
              d="M185 68 C195 30 222 28 232 38 C220 62 203 68 185 68"
              fill="#20a45a"
            />
            <path
              d="M153 70 C125 42 110 48 105 62 C120 80 139 79 153 70"
              fill="#2aaf62"
            />

            {/* Apple */}
            <circle cx="116" cy="108" r="31" fill="#e94d45" />
            <path
              d="M116 79 Q113 65 125 60"
              stroke="#74502b"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path d="M120 67 Q137 55 143 68 Q131 77 120 67" fill="#23974d" />

            {/* Orange */}
            <circle cx="218" cy="112" r="28" fill="#f49a27" />
            <path d="M218 83 Q214 72 224 68" stroke="#74502b" strokeWidth="4" fill="none" />
            <path d="M220 70 Q235 61 239 73 Q229 80 220 70" fill="#23974d" />

            {/* Green Apple */}
            <circle cx="170" cy="90" r="33" fill="#24ad55" />
            <path d="M170 59 Q165 45 176 39" stroke="#74502b" strokeWidth="5" fill="none" />
            <path d="M175 44 Q191 32 199 45 Q187 56 175 44" fill="#178d45" />

            {/* Grapes */}
            <circle cx="85" cy="132" r="13" fill="#a65acb" />
            <circle cx="102" cy="143" r="13" fill="#a65acb" />
            <circle cx="73" cy="149" r="12" fill="#9148bb" />

            {/* Basket */}
            <path
              d="M62 135 L278 135 L255 198 Q170 218 85 198 Z"
              fill="#a95719"
            />
            <path
              d="M62 135 Q170 150 278 135 L273 150 Q170 166 67 150 Z"
              fill="#c47a32"
            />

            {/* Basket Stripes */}
            <path d="M105 151 L113 197" stroke="#814012" strokeWidth="5" />
            <path d="M145 155 L148 203" stroke="#814012" strokeWidth="5" />
            <path d="M185 155 L185 205" stroke="#814012" strokeWidth="5" />
            <path d="M225 151 L218 201" stroke="#814012" strokeWidth="5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
