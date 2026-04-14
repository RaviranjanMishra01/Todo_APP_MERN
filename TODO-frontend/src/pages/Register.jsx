import { useState } from "react";
import API from "../api/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");


  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleRegister = async () => {
    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed.");
        return;
      }
      window.location.href = "/login";
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 font-mono">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-1">
            Get started
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Create<span className="text-amber-400">.</span>
          </h1>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRegister()}
            className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-4 py-3 rounded-lg outline-none placeholder-zinc-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-200"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRegister()}
            onBlur={()=>{
              if (email && !validateEmail(email)) {
                setEmailError("Invalid email format.");
              } else {
                setEmailError("");
              }
            }}
            className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-4 py-3 rounded-lg outline-none placeholder-zinc-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-200"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRegister()}
            className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-4 py-3 rounded-lg outline-none placeholder-zinc-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-200"
          />

          {/* Error */}
          {error && (
            <p className="text-red-400 text-xs pt-1">{error}</p>
          )}

          {/* Submit */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-zinc-950 font-bold text-sm py-3 rounded-lg transition-all duration-200 active:scale-95 cursor-pointer mt-2"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </div>

        {/* Footer link */}
        <p className="text-xs text-zinc-600 text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-amber-400 hover:text-amber-300 transition-colors">
            Sign in
          </a>
        </p>

      </div>
    </div>
  );
}