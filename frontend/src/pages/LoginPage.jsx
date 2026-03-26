import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 animate-fade-in relative z-10">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center justify-center size-12 rounded-xl bg-primary/10 mb-6">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-text-main mb-2">Welcome back</h1>
            <p className="text-text-muted text-lg">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 mt-8 animate-slide-up">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted ml-0.5">Email address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors">
                  <Mail className="size-5" />
                </div>
                <input
                  type="email"
                  className="w-full bg-surface border border-border rounded-xl pl-11 pr-4 py-3 text-text-main placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder-transparent sm:placeholder-zinc-600"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted ml-0.5">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors">
                  <Lock className="size-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-surface border border-border rounded-xl pl-11 pr-11 py-3 text-text-main placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder-transparent sm:placeholder-zinc-600"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-text-muted hover:text-text-main transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-text-muted text-sm pb-10">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:text-primary-light font-medium transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Abstract UI/Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-surface justify-center items-center">
        {/* Decorative Gradients */}
        <div className="absolute w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -top-32 -right-32 animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] bottom-10 -left-20" />
        
        <div className="relative z-10 max-w-lg text-center mx-auto px-8">
          <div className="w-full aspect-square relative mb-8">
             <div className="absolute inset-0 border border-white/5 rounded-3xl bg-white/5 backdrop-blur-3xl shadow-2xl flex flex-col p-6 items-center justify-center gap-6 transform -rotate-2 hover:rotate-0 transition-transform duration-700">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center shadow-inner">
                   <MessageSquare className="size-10 text-white" />
                </div>
                <div className="space-y-3 w-full max-w-[80%]">
                   <div className="h-4 w-3/4 bg-white/10 rounded-full mx-auto" />
                   <div className="h-4 w-1/2 bg-white/10 rounded-full mx-auto" />
                </div>
             </div>
          </div>
          <h2 className="text-3xl font-bold text-text-main mb-4">Connect Instantly</h2>
          <p className="text-text-muted text-lg">Experience real-time messaging with a premium, focused interface.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
