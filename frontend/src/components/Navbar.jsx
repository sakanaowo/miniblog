import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, User, Plus, FileText, Home, Settings } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo + Home */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">MiniBlog</h1>
            </Link>
            <Link to="/" className="btn btn-sm gap-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </div>

          {/* Right-side buttons */}
          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`btn btn-sm gap-2 transition-colors`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            {authUser ? (
              <>
                <Link to="/createPost" className="btn btn-sm gap-2">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Create</span>
                </Link>

                <Link to="/profile" className="btn btn-sm gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="btn btn-sm btn-outline gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-sm btn-outline">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-sm btn-primary">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
