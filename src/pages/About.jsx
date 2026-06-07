import { Link } from "react-router-dom";
import { FaFilm, FaUsers } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-6 tracking-tight">
            About CineVault
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Welcome to CineVault, the ultimate platform designed by movie enthusiasts, for movie enthusiasts. We believe that cinema is more than just entertainment; it's a global language that shapes culture and unites dreamers.
          </p>
        </div>

        {/* Mission grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white/5 backdrop-blur-xl p-10 md:p-14 rounded-3xl shadow-2xl border border-white/10 hover:-translate-y-2 transition-transform duration-300">
             <div className="bg-indigo-500/20 w-16 h-16 flex items-center justify-center rounded-2xl mb-8 border border-indigo-500/30">
                <FaFilm className="text-3xl text-indigo-400" />
             </div>
             <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
             <p className="text-slate-400 leading-relaxed text-lg">
                To create a seamless, beautifully designed vault where audiences can discover profound cinematic experiences, track their favorite films securely, and navigate extensive genre-based databases with unparalleled ease.
             </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl p-10 md:p-14 rounded-3xl shadow-2xl border border-white/10 hover:-translate-y-2 transition-transform duration-300">
             <div className="bg-purple-500/20 w-16 h-16 flex items-center justify-center rounded-2xl mb-8 border border-purple-500/30">
                <FaUsers className="text-3xl text-purple-400" />
             </div>
             <h2 className="text-3xl font-bold text-white mb-4">Community Focused</h2>
             <p className="text-slate-400 leading-relaxed text-lg">
                We thrive on user interactivity. Everything shown on this platform, from featured classics to hidden gems, is powered and rated by our community. Join in to contribute to a growing collective intelligence of cinema!
             </p>
          </div>
        </div>

        {/* Stats / Numbers section */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-16 text-center text-white mb-20 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full w-[500px] h-[500px] mx-auto top-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
             <div>
                <h3 className="text-5xl md:text-6xl font-black mb-3 text-indigo-400">10K+</h3>
                <p className="text-slate-300 font-medium text-lg uppercase tracking-wider">Movies Documented</p>
             </div>
             <div className="hidden md:block w-px h-full bg-white/10 mx-auto"></div>
             <div>
                <h3 className="text-5xl md:text-6xl font-black mb-3 text-purple-400">50K+</h3>
                <p className="text-slate-300 font-medium text-lg uppercase tracking-wider">Active Enthusiasts</p>
             </div>
             <div className="hidden md:block w-px h-full bg-white/10 mx-auto"></div>
             <div>
                <h3 className="text-5xl md:text-6xl font-black mb-3 text-blue-400">4.8/5</h3>
                <p className="text-slate-300 font-medium text-lg uppercase tracking-wider">Average Ratings</p>
             </div>
          </div>
        </div>

        <div className="text-center pb-8 border-t border-white/10 pt-16">
           <h2 className="text-4xl font-bold text-white mb-8 tracking-tight">Ready to start tracking?</h2>
           <Link to="/register" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] text-lg">
              Create Your Vault Today
           </Link>
        </div>

      </div>
    </div>
  );
}
