import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
  const { createUser, loginWithGoogle, updateUserProfile, setUserState } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    if (pass.length < 6) return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(pass)) return "Password must have an Uppercase letter.";
    if (!/[a-z]/.test(pass)) return "Password must have a Lowercase letter.";
    return null;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const passError = validatePassword(password);
    if (passError) {
      setError(passError);
      toast.error(passError);
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(name, photo)
          .then(() => {
             // Keep state sync
             setUserState({ ...user, displayName: name, photoURL: photo });
             toast.success("Registration successful!");
             navigate("/");
          });
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    loginWithGoogle()
      .then((result) => {
        toast.success("Successfully registered with Google!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-12 relative z-10 w-full mb-10">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 md:p-10">
        <h2 className="text-4xl font-black text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-2 tracking-tight">Join CineVault</h2>
        <p className="text-center text-slate-400 mb-8 font-medium">Create your private movie tracking space.</p>
        
        {error && <p className="text-red-400 text-center mb-4 font-semibold p-3 bg-red-900/20 border border-red-500/30 rounded-xl">{error}</p>}
        
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
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
            <label className="block text-sm font-semibold text-slate-300 mb-2">Photo URL</label>
            <input 
              type="text" 
              placeholder="https://example.com/photo.png" 
              className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
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
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98] mt-2 text-lg">
            Create Account
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
          Already have an account? <Link to="/login" className="text-indigo-400 font-bold hover:underline hover:text-indigo-300 transition-colors">Log in</Link>
        </p>
      </div>
    </div>
  );
}
