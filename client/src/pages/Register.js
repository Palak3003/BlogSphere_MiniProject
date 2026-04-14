import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        `https://blogsphere-miniproject.onrender.com/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );

      console.log(res.data);
      alert("Registered successfully");
      navigate("/login");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.msg || error.message);
    }
  };

  return (
    <div className="app-shell flex items-center justify-center px-4 py-10">
      <div className="glass-card w-full max-w-md p-6 sm:p-8">
        <h2 className="section-title text-center !text-2xl">Create Account</h2>
        <p className="section-subtitle mb-6 text-center">
          Start sharing your moments with a clean, modern feel.
        </p>

        <input
          placeholder="Full Name"
          className="soft-input mb-3"
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={handleRegister}
          className="primary-btn w-full"
        >
          Create Account
        </button>

        <p className="mt-4 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-orange-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;