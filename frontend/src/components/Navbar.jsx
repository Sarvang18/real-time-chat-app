import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogOut, MessageSquare, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-surface/80 border-b border-border fixed w-full top-0 z-40 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="size-9 rounded-xl bg-primary/20 flex items-center justify-center">
            <MessageSquare className="size-5 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-text-main tracking-tight">ChatApp</h1>
        </Link>

        <div className="flex items-center gap-1 sm:gap-3">
          {authUser && (
            <>
              <Link to="/profile" className="px-3 py-2 rounded-lg text-text-muted hover:text-text-main hover:bg-white/5 transition-all flex items-center gap-2">
                <User className="size-5" />
                <span className="hidden sm:inline font-medium">Profile</span>
              </Link>
              <button 
                onClick={logout}
                className="px-3 py-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-all flex items-center gap-2"
              >
                <LogOut className="size-5" />
                <span className="hidden sm:inline font-medium">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
