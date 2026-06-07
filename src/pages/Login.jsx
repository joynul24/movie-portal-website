import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const { loginUser, loginWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    loginUser(email, password)
      .then((result) => {
        toast.success("Successfully logged in!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Invalid Email or Password");
      });
  };

  const handleGoogleSignIn = () => {
    loginWithGoogle()
      .then((result) => {
        toast.success("Successfully logged in with Google!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center px-4 relative z-10 my-10">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl p-8md:p-10 shadow-2xl border border-white/10 p-8">
        <h2 className="text-4xl font-black text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-2 tracking-tight">Welcome Back</h2>
        <p className="text-center text-slate-400 mb-8 font-medium">Log in to your continuous cinematic journey.</p>
        
        {error && <p className="text-red-400 text-center mb-4 font-semibold p-3 bg-red-900/20 border border-red-500/30 rounded-xl">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="hello@example.com" 
              className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <div className="text-right mt-2">
              <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Forgot Password?</a>
            </div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98] text-lg">
            Log In Securely
          </button>
        </form>

        <div className="my-8 flex items-center justify-center space-x-4">
           <div className="h-px bg-white/10 w-full"></div>
           <span className="text-slate-500 font-medium text-sm">OR</span>
           <div className="h-px bg-white/10 w-full"></div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          className="w-full flex justify-center items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-4 rounded-xl transition-all shadow-lg"
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>

        <p className="text-center text-slate-400 mt-8 font-medium">
          New to CineVault? <Link to="/register" className="text-indigo-400 font-bold hover:underline hover:text-indigo-300 transition-colors">Register here</Link>
        </p>
      </div>
    </div>
  );
}
