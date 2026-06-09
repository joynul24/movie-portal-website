import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../providers/AuthProvider";

export default function AddMovie() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);

  const handleRating = (rate) => setRating(rate);

  const onSubmit = (data) => {
    if (rating === 0) {
      toast.error("Please select a rating to add a movie.");
      return;
    }

    // Ensure link
    if (!data.poster.startsWith("http")) {
      toast.error("Poster must be a valid link");
      return;
    }

    const movieData = {
      ...data,
      rating,
      creatorEmail: user?.email,
    };

    fetch("https://movie-portal-website.vercel.app/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movieData),
    })
      .then(res => res.json())
      .then(result => {
        if (result.acknowledged) {
          toast.success("Movie added successfully!");
          reset();
          setRating(0);
        }
      })
      .catch(err => toast.error(err.message));
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(50), (val, index) => currentYear - index);

  return (
    <div className="min-h-screen py-12 relative z-10 p-4">
      <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-3">Add a New Movie</h2>
          <p className="text-slate-400 text-lg">Share your cinematic discoveries with the world.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Movie Title</label>
              <input 
                type="text" 
                {...register("title", { required: "Title is required", minLength: { value: 2, message: "Must be at least 2 characters" } })}
                className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Enter movie title"
              />
              {errors.title && <p className="text-red-400 text-xs mt-2">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Movie Poster URL</label>
              <input 
                type="text" 
                {...register("poster", { required: "Cover image link is required", pattern: { value: /^https?:\/\/.+/, message: "Must be a valid link" } })}
                className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="https://example.com/image.jpg"
              />
              {errors.poster && <p className="text-red-400 text-xs mt-2">{errors.poster.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Genre</label>
              <select 
                {...register("genre", { required: "Genre is required" })}
                className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
              >
                <option value="" className="bg-gray-900 text-white">Select a Genre</option>
                <option value="Comedy" className="bg-gray-900 text-white">Comedy</option>
                <option value="Drama" className="bg-gray-900 text-white">Drama</option>
                <option value="Horror" className="bg-gray-900 text-white">Horror</option>
                <option value="Action" className="bg-gray-900 text-white">Action</option>
                <option value="Sci-Fi" className="bg-gray-900 text-white">Sci-Fi</option>
                <option value="Romance" className="bg-gray-900 text-white">Romance</option>
                <option value="Thriller" className="bg-gray-900 text-white">Thriller</option>
              </select>
              {errors.genre && <p className="text-red-400 text-xs mt-2">{errors.genre.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Duration (minutes)</label>
              <input 
                type="number" 
                {...register("duration", { required: "Duration is required", min: { value: 61, message: "Must be greater than 60 minutes" } })}
                className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="e.g., 120"
              />
              {errors.duration && <p className="text-red-400 text-xs mt-2">{errors.duration.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Release Year</label>
              <select 
                {...register("releaseYear", { required: "Release year is required" })}
                className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
              >
                <option value="" className="bg-gray-900 text-white">Select Year</option>
                {years.map(year => (
                  <option key={year} value={year} className="bg-gray-900 text-white">{year}</option>
                ))}
              </select>
              {errors.releaseYear && <p className="text-red-400 text-xs mt-2">{errors.releaseYear.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Community Rating</label>
              <div className="pt-2 bg-white/5 p-4 rounded-xl border border-white/10 inline-block">
                <Rating 
                  onClick={handleRating} 
                  initialValue={rating}
                  size={30}
                  fillColor="#818cf8"
                  emptyColor="rgba(255,255,255,0.1)"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Summary</label>
            <textarea 
              {...register("summary", { required: "Summary is required", minLength: { value: 10, message: "Must be at least 10 characters" } })}
              className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all h-32"
              placeholder="Write a brief summary of the movie..."
            ></textarea>
            {errors.summary && <p className="text-red-400 text-xs mt-2">{errors.summary.message}</p>}
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98] text-lg"
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
}
