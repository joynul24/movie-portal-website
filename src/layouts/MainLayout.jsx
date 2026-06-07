import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useState, useEffect } from "react";

export default function MainLayout() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("theme", "dark");
  }, []);

  const toggleTheme = () => {
    // Theme toggle disabled for frosted glass theme
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0c] text-white relative font-sans overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]"></div>
      </div>
      <Navbar toggleTheme={toggleTheme} theme="dark" />
      <main className={`relative z-10 flex-grow ${location.pathname === '/' ? '' : 'pt-24'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
