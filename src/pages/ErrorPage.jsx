import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-black to-slate-900 px-4">

      <div className="text-center max-w-xl">

        {/* BIG 404 */}
        <h1 className="text-[120px] md:text-[160px] font-black text-white leading-none">
          404
        </h1>

        {/* MESSAGE */}
        <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mt-4">
          Page Not Found
        </h2>

        <p className="text-slate-400 mt-3">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">

          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg transition"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/10 transition"
          >
            Go Back
          </button>

        </div>

        {/* SMALL DECOR TEXT */}
        <p className="text-xs text-slate-600 mt-10">
          “Even the best explorers get lost sometimes.”
        </p>

      </div>
    </div>
  );
}