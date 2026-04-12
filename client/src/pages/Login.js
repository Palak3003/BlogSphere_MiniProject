import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();


    if (!res.ok) {
      alert(data.msg || "Invalid credentials ");
      return;
    }

    localStorage.setItem("token", data.token);

    navigate("/home");

  } catch (error) {
    console.log(error);
    alert("Something went wrong ");
  }
};

  return (
    <div className="app-shell flex items-center justify-center px-4 py-10">
      <div className="glass-card w-full max-w-md p-6 sm:p-8">
        <h2 className="section-title text-center !text-2xl">Welcome Back</h2>
        <p className="section-subtitle mb-6 text-center">Sign in to continue writing.</p>

        <input
          placeholder="Email"
          className="soft-input mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="soft-input mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="primary-btn w-full"
        >
          Sign In
        </button>

        <p className="mt-4 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-semibold text-orange-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;