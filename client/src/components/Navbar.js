import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5.5 9.5V20h13V9.5" />
  </svg>
);

const PenIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M10 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4" />
    <path d="m14 16 4-4-4-4" />
    <path d="M18 12H9" />
  </svg>
);

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 IMPORTANT: re-render on route change
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null); // 🔥 force update
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-30 border-b border-orange-100/80 bg-white/95 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <h1
          onClick={() => navigate(token ? "/home" : "/")}
          className="cursor-pointer text-xl font-semibold tracking-tight text-slate-800 transition hover:text-orange-500"
        >
          Blog<span className="text-orange-400">Sphere</span>
        </h1>

        <div className="flex items-center gap-2 sm:gap-3">
          {token ? (
            <>
              {location.pathname !== "/home" && (
                <Link to="/home" className="secondary-btn !px-3 !py-2 text-sm">
                  <HomeIcon />
                  <span className="hidden sm:inline">Home</span>
                </Link>
              )}

              {location.pathname !== "/create" && (
                <Link to="/create" className="secondary-btn !px-3 !py-2 text-sm">
                  <PenIcon />
                  <span className="hidden sm:inline">Create</span>
                </Link>
              )}

              {location.pathname !== "/profile" && (
                <Link to="/profile" className="secondary-btn !px-3 !py-2 text-sm">
                  <UserIcon />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
              )}

              <button onClick={handleLogout} className="secondary-btn !px-3 !py-2 text-sm text-rose-500">
                <LogoutIcon />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="secondary-btn !px-4 !py-2 text-sm">
                Sign In
              </Link>
              <Link to="/register" className="primary-btn !px-4 !py-2 text-sm">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;