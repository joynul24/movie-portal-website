import { Link } from "react-router-dom";
import { FaGhost } from "react-icons/fa";

export default function ErrorPage() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4 relative z-10 w-full mb-10">
      <div className="w-full max-w-lg bg-white/5 backdrop-blur-xl rounded-3xl p-10 md:p-14 shadow-2xl border border-white/10 flex flex-col items-center">
        <FaGhost className="text-indigo-400 w-28 h-28 mb-8 animate-bounce drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]" />
        <h1 className="text-8xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 tracking-tighter mb-4 drop-shadow-md">404</h1>
        <p className="text-xl md:text-2xl font-bold text-slate-300 mb-8 max-w-md">
          Oops! We couldn't find the page you're searching for.
        </p>
        <Link 
          to="/" 
          className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
