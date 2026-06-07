import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard.jsx";
import { toast } from "react-toastify";
import { FiTrendingUp, FiSettings, FiUsers } from "react-icons/fi";
import { FaPlayCircle, FaTicketAlt, FaStar } from "react-icons/fa";

export default function Home() {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example static slider images
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1920&q=80",
      title: "Discover Cinematic Masterpieces",
      subtitle: "Explore thousands of movies reviewed by users worldwide."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1920&q=80",
      title: "Your Personal Movie Vault",
      subtitle: "Add, rate, and manage your favorite movies in one place."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1920&q=80",
      title: "Experience the Magic",
      subtitle: "Dive into our curated collections of all-time classics."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    fetch("/api/movies/featured")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        setFeaturedMovies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Target Static Slider */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-gray-900">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter drop-shadow-lg transform translate-y-0 transition-transform duration-700">
                {slide.title}
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl drop-shadow-md">
                {slide.subtitle}
              </p>
              <Link to="/all-movies" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-indigo-500/50">
                Explore Movies
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Featured Movies */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 tracking-tight mb-4">Featured Movies</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Discover the highest-rated movies recommended by our diverse community of cinema lovers.</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <>
              {featuredMovies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {featuredMovies.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-slate-500 mb-12">No featured movies found. Add some from the database!</div>
              )}
              <div className="flex justify-center">
                 <Link to="/all-movies" className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white rounded-xl font-bold transition-all shadow-lg active:scale-95">
                   See All Movies
                 </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Extra Section 1: Why Join Us */}
      <section className="py-24 relative z-10 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-20">
              <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 tracking-tight mb-4">Why Join CineVault?</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">Enhance your movie-watching experience with powerful tools and a seamless interface tailored for you.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                <div className="mx-auto w-16 h-16 bg-indigo-500/20 flex justify-center items-center rounded-2xl mb-8">
                  <FaPlayCircle className="text-3xl text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Vast Collection</h3>
                <p className="text-slate-400 leading-relaxed">Access thousands of movies across different genres and eras effortlessly from our robust real-time database.</p>
              </div>
              <div className="p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                <div className="mx-auto w-16 h-16 bg-purple-500/20 flex justify-center items-center rounded-2xl mb-8">
                  <FaTicketAlt className="text-3xl text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Curated Favorites</h3>
                <p className="text-slate-400 leading-relaxed">Save and organize the movies you love to watch securely in your profile with our instant-save utility.</p>
              </div>
              <div className="p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                <div className="mx-auto w-16 h-16 bg-blue-500/20 flex justify-center items-center rounded-2xl mb-8">
                  <FaStar className="text-3xl text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Detailed Insights</h3>
                <p className="text-slate-400 leading-relaxed">Keep track of community ratings, precise durations, detailed genre tags, and comprehensive summaries.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Extra Section 2: Newsletter */}
      <section className="py-24 relative z-10 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/10 blur-[100px] rounded-full w-[800px] h-[400px] mx-auto top-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-5xl font-black text-white tracking-tight mb-6">Subscribe to our Newsletter</h2>
          <p className="text-indigo-200 mb-12 text-xl font-medium">Stay updated with the latest releases, top charts, and exclusive movie recommendations.</p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center" onSubmit={(e) => { e.preventDefault(); toast.success("Subscribed successfully!"); }}>
             <input 
               type="email" 
               placeholder="Enter your email address" 
               required
               className="px-6 py-5 rounded-xl w-full sm:w-[400px] focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/5 border border-white/10 text-white placeholder-slate-400 backdrop-blur-md shadow-inner"
             />
             <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95 text-lg">
               Subscribe Now
             </button>
          </form>
        </div>
      </section>

    </div>
  );
}
