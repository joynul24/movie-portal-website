import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard.jsx";

export default function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchMovies = (searchQuery = "") => {
    setLoading(true);
    let url = "/api/movies";
    if (searchQuery) {
      url += `?search=${searchQuery}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(search);
  };

  return (
    <div className="min-h-screen py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-12 gap-6 bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div>
              <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 tracking-tight mb-2">All Movies</h1>
              <p className="text-slate-400">Browse our complete collection of cinematic entries.</p>
            </div>
            <form onSubmit={handleSearch} className="w-full md:w-96 flex">
              <input 
                type="text" 
                placeholder="Search by Movie Title..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-5 py-4 rounded-l-xl border border-white/10 border-r-0 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:bg-white/10 transition-all"
              />
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-4 rounded-r-xl font-bold transition-colors border border-indigo-500 shadow-lg">
                 Search
              </button>
            </form>
         </div>

         {loading ? (
            <div className="flex justify-center items-center h-64">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            movies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {movies.map((movie) => (
                  <MovieCard key={movie._id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center bg-white/5 backdrop-blur-xl p-16 rounded-3xl border border-white/10 shadow-2xl">
                <div className="text-6xl mb-6 opacity-50">🔍</div>
                <h3 className="text-3xl font-bold text-white mb-4">No movies found</h3>
                <p className="text-slate-400">Try adjusting your search criteria.</p>
              </div>
            )
          )}
      </div>
    </div>
  );
}
