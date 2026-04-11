import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="app-shell flex items-center justify-center px-4 py-10 sm:px-6">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2">
        <div className="animate-[fadeIn_.6s_ease]">
          <p className="mb-3 inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold tracking-wide text-orange-500">
            Minimal blogging experience
          </p>

          <h1 className="section-title leading-tight">
            Write beautifully in a
            <span className="block bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
              clean peach space
            </span>
          </h1>

          <p className="section-subtitle max-w-xl">
            BlogSphere helps you capture moments, ideas, and stories in a modern, distraction-free layout.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => navigate("/register")} className="primary-btn">
              Create Account
            </button>

            <button onClick={() => navigate("/login")} className="secondary-btn">
              Sign In
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
            alt="food and coffee"
            className="h-44 w-full rounded-2xl object-cover shadow-sm transition-transform duration-500 hover:-translate-y-1"
          />
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
            alt="mountains"
            className="mt-6 h-44 w-full rounded-2xl object-cover shadow-sm transition-transform duration-500 hover:-translate-y-1"
          />
          <img
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d"
            alt="journal and camera"
            className="h-44 w-full rounded-2xl object-cover shadow-sm transition-transform duration-500 hover:-translate-y-1"
          />
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
            alt="travel landscape"
            className="mt-6 h-44 w-full rounded-2xl object-cover shadow-sm transition-transform duration-500 hover:-translate-y-1"
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;