import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import { Rating } from "react-simple-star-rating";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://movie-portal-website.vercel.app/movies/${id}`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`https://movie-portal-website.vercel.app/movies/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          toast.success("Movie deleted successfully");
          navigate("/all-movies");
        }
      });
  };

  const handleAddFavorite = () => {
    const favoriteData = {
      movieId: movie._id,
      poster: movie.poster,
      title: movie.title,
      genre: movie.genre,
      duration: movie.duration,
      releaseYear: movie.releaseYear,
      rating: movie.rating,
      userEmail: user?.email
    };

    fetch("https://movie-portal-website.vercel.app/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(favoriteData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
           toast.error(data.error);
        } else if (data.acknowledged) {
           toast.success("Added to Favorites!");
        }
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!movie) {
    return <div className="text-center py-20 text-2xl font-bold dark:text-white">Movie Not Found</div>;
  }

  return (
    <div className="min-h-screen py-16 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row shadow-indigo-500/5">
           <div className="md:w-5/12 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-[rgba(0,0,0,0.2)] md:to-[#0a0a0c]/80 z-10 pointer-events-none"></div>
              <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover object-center aspect-[2/3] md:aspect-auto" />
           </div>
           <div className="p-8 md:p-14 md:w-7/12 flex flex-col relative z-20">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 tracking-tight leading-tight drop-shadow-md">{movie.title}</h1>
                 <div className="bg-indigo-600/20 text-indigo-300 font-bold px-4 py-2 rounded-xl border border-indigo-500/30 backdrop-blur-md shadow-inner">
                   {movie.releaseYear}
                 </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 mb-8">
                 <span className="bg-white/10 border border-white/10 text-slate-300 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">{movie.genre}</span>
                 <span className="bg-white/10 border border-white/10 text-slate-300 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">{movie.duration}m</span>
                 <div className="pointer-events-none bg-white/5 px-4 py-1.5 rounded-full border border-white/10 flex items-center">
                    <Rating initialValue={movie.rating} readonly size={22} fillColor="#818cf8" emptyColor="rgba(255,255,255,0.1)" />
                 </div>
              </div>
              
              <div className="mb-12 text-slate-300 leading-relaxed text-lg flex-grow border-t border-white/10 pt-8 border-b pb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Summary
                </h3>
                <p className="opacity-90">{movie.summary}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <button 
                   onClick={handleAddFavorite}
                   className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
                 >
                   Favorite
                 </button>
                 <Link 
                   to={`/update-movie/${movie._id}`}
                   className="block text-center w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98]"
                 >
                   Edit
                 </Link>
                 <button 
                   onClick={handleDelete}
                   className="w-full bg-red-600/20 hover:bg-red-600 border border-red-500/30 text-red-100 font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98]"
                 >
                   Delete
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}