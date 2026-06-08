import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";

export default function MyFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchFavorites = () => {
    if (user && user.email) {
      fetch(`http://localhost:3000/favorites/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setFavorites(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const handleDeleteFavorite = (id) => {
    fetch(`http://localhost:3000/favorites/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          toast.success("Removed from favorites");
          fetchFavorites();
        }
      });
  };

  return (
    <div className="min-h-screen py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="mb-12 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 tracking-tight mb-4">My Favorites</h1>
            <p className="text-slate-400 text-lg">Manage and view your carefully curated collection of favorites.</p>
         </div>

         {loading ? (
            <div className="flex justify-center items-center h-64">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {favorites.map((movie) => (
                  <div key={movie._id} className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full object-cover">
                    <div className="relative overflow-hidden aspect-[2/3] w-full">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                      <img 
                        src={movie.poster} 
                        alt={movie.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 z-20">
                         <span className="bg-black/50 backdrop-blur-md text-yellow-400 font-bold px-3 py-1 rounded-full border border-white/10 flex items-center gap-1 shadow-lg text-sm">
                            ★ {movie.rating}
                         </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow relative z-20 -mt-8">
                      <h3 className="text-xl font-bold text-white leading-tight mb-3 line-clamp-1 group-hover:text-indigo-400 transition-colors drop-shadow-md">{movie.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full">
                          {movie.genre}
                        </span>
                        <span className="bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full">
                          {movie.duration}m
                        </span>
                        <span className="bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full">
                          {movie.releaseYear}
                        </span>
                      </div>
                      <div className="mt-auto">
                        <button 
                          onClick={() => handleDeleteFavorite(movie._id)}
                          className="w-full bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 py-3 rounded-xl font-bold transition-colors duration-300 shadow-lg"
                        >
                          Delete Favorite
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center bg-white/5 backdrop-blur-xl p-16 rounded-3xl border border-white/10 shadow-2xl">
                <div className="text-6xl mb-6 opacity-50">🎬</div>
                <h3 className="text-3xl font-bold text-white mb-4">Your collection is empty</h3>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">Looks like you haven't added any movies to your favorites yet. Start exploring!</p>
                <Link to="/all-movies" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-lg shadow-indigo-500/20">
                   Browse Movies
                </Link>
              </div>
            )
          )}
      </div>
    </div>
  );
}
