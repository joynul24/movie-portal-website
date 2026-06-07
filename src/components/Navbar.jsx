import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar({ toggleTheme, theme }) {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeLinkStyle = "text-white font-bold border-b-2 border-indigo-500 pb-1";
  const inactiveLinkStyle = "hover:text-white transition-colors pb-1 border-b-2 border-transparent";

  const navLinks = (
    <>
      <li><NavLink to="/" className={({isActive}) => isActive ? activeLinkStyle : inactiveLinkStyle}>Home</NavLink></li>
      <li><NavLink to="/all-movies" className={({isActive}) => isActive ? activeLinkStyle : inactiveLinkStyle}>All Movies</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/add-movie" className={({isActive}) => isActive ? activeLinkStyle : inactiveLinkStyle}>Add Movie</NavLink></li>
          <li><NavLink to="/my-favorites" className={({isActive}) => isActive ? activeLinkStyle : inactiveLinkStyle}>My Favorites</NavLink></li>
        </>
      )}
      <li><NavLink to="/about" className={({isActive}) => isActive ? activeLinkStyle : inactiveLinkStyle}>About Us</NavLink></li>
    </>
  );

  return (
    <header className={`fixed top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 w-full transition-all duration-300 ${isScrolled ? 'backdrop-blur-xl bg-[#0a0a0c]/80 border-b border-white/10 shadow-lg shadow-black/20' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg">C</div>
          <Link to="/" className="text-2xl font-bold tracking-tight text-white hover:text-indigo-200 transition-colors">
            CineVault
          </Link>
        </div>
          
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <ul className="flex space-x-8">
            {navLinks}
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user && user?.email ? (
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <img 
                  src={user?.photoURL || "https://i.ibb.co/M91sBbh/user.png"} 
                  alt="User Avatar" 
                  className="w-10 h-10 rounded-full border border-white/20 object-cover cursor-pointer shadow-md"
                />
                <div className="absolute right-0 top-12 w-max bg-white/10 backdrop-blur-xl border border-white/10 text-white text-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-xl">
                  {user?.displayName || "User"}
                </div>
              </div>
              <button 
                onClick={logOut} 
                className="px-5 py-2.5 text-sm font-semibold bg-white/10 border border-white/10 text-white rounded-xl hover:bg-white/20 transition-all active:scale-95"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="px-4 py-2 text-sm font-medium hover:text-white text-slate-300 transition-colors">Sign In</Link>
              <Link to="/register" className="px-6 py-2.5 text-sm font-semibold bg-white text-black rounded-full hover:bg-slate-200 transition-colors shadow-lg shadow-white/10">Get Started</Link>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-300 hover:text-white transition-colors bg-white/5 rounded-lg border border-white/5">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full left-0 top-full bg-[#0a0a0c]/95 backdrop-blur-xl border-b border-white/10 pb-6 px-6 shadow-2xl">
          <ul className="flex flex-col space-y-6 pt-6 font-medium text-slate-300 text-center">
            {navLinks}
          </ul>
          <div className="mt-8 pt-6 border-t border-white/10">
            {user && user?.email ? (
              <div className="flex flex-col items-center space-y-6">
                <div className="flex items-center space-x-3">
                   <img 
                    src={user?.photoURL || "https://i.ibb.co/M91sBbh/user.png"} 
                    alt="User Avatar" 
                    className="w-12 h-12 rounded-full border border-white/20 object-cover"
                  />
                  <span className="font-semibold text-white">{user?.displayName || "User"}</span>
                </div>
                <button 
                  onClick={logOut} 
                  className="w-full bg-white/10 border border-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl font-bold transition-all"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link to="/login" className="w-full text-center border border-white/10 bg-white/5 hover:bg-white/10 text-white px-4 py-3 rounded-xl font-bold transition-all inline-block">Sign In</Link>
                <Link to="/register" className="w-full text-center bg-white hover:bg-slate-200 text-black px-4 py-3 rounded-xl font-bold transition-all inline-block">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
