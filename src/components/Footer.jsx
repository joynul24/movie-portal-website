import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative z-10 px-6 py-12 flex flex-col border-t border-white/10 bg-black/20 w-full mt-auto">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">C</div>
              <Link to="/" className="text-xl font-bold tracking-tight text-white hover:text-indigo-200 transition-colors">
                CineVault
              </Link>
            </div>
            <p className="text-slate-400 mb-8 max-w-md leading-relaxed">
              Your ultimate destination for discovering, tracking, and cataloging the cinematic world. Explore top-rated movies, build your favorites list, and experience the magic of cinema.
            </p>
            <div className="flex space-x-5">
               <a href="https://web.facebook.com/devjoynul" className="text-slate-500 hover:text-white transition-colors bg-white/5 p-3 rounded-full border border-white/5 hover:border-white/20"><FaFacebook size={20} /></a>
               <a href="https://www.linkedin.com/in/devjoynul/" className="text-slate-500 hover:text-white transition-colors bg-white/5 p-3 rounded-full border border-white/5 hover:border-white/20"><FaLinkedinIn></FaLinkedinIn> </a>
               <a href="https://www.instagram.com/devjoynul" className="text-slate-500 hover:text-white transition-colors bg-white/5 p-3 rounded-full border border-white/5 hover:border-white/20"><FaInstagram size={20} /></a>
               <a href="https://github.com/joynul24" className="text-slate-500 hover:text-white transition-colors bg-white/5 p-3 rounded-full border border-white/5 hover:border-white/20"><FaGithub size={20} /></a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-6 text-white tracking-wide">Quick Links</h3>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Home</Link></li>
              <li><Link to="/all-movies" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>All Movies</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-6 text-white tracking-wide">Contact Us</h3>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5"><span className="text-indigo-400">🌐</span></div> 
                 <span>support@cinevault.com</span>
              </li>
              <li className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 text-indigo-400">📞</div> 
                 <span>+880 1301249019</span>
              </li>
              <li className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 text-indigo-400">📍</div> 
                 <span>123 Cinema Street, NY</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-center">
          <div className="flex items-center gap-6 opacity-40 grayscale mb-6 md:mb-0">
            <span className="text-xs font-bold tracking-widest text-white">FIREBASE</span>
            <span className="text-xs font-bold tracking-widest text-white">MONGODB</span>
            <span className="text-xs font-bold tracking-widest text-white">REACT</span>
            <span className="text-xs font-bold tracking-widest text-white">TAILWIND</span>
          </div>
          <div className="text-xs text-slate-500 text-center md:text-right">
             &copy; {new Date().getFullYear()} CineVault Systems. All rights reserved. <br className="md:hidden" />
             <div className="mt-2 md:inline-block md:ml-4 space-x-4">
               <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
