import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

export default function MovieCard({ movie }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full">
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
          <Link 
            to={`/movie/${movie._id}`} 
            className="block w-full text-center bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
}
