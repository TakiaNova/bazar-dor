
export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-center md:flex-row md:text-left">
        {/* Left Side */}
        <p className="text-sm font-semibold text-gray-800">
          বাজার দর
          <span className="ml-2 font-normal text-gray-500">
            — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </span>
        </p>

        {/* Right Side */}
        <p className="text-xs text-gray-500">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
