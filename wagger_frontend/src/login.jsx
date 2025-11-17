import React, { useState } from "react";
import "./login.css";


function LoginPage({ onLogin }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // simple front-end validation
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: replace this with your real API call
      // Example:
      // const res = await fetch("/api/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      // if (!res.ok) throw new Error("Invalid credentials");
      // const data = await res.json();
      // onLogin(data.user);

      // temp fake delay + success
      await new Promise((resolve) => setTimeout(resolve, 700));
      onLogin?.({ email: form.email });

    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="brand">DogWalker</h1>
        <p className="tagline">Swipe. Match. Walk. 🦴</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          {error && <div className="error">{error}</div>}

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="footer-links">
          <button type="button" className="link-btn">
            Forgot password?
          </button>
          <button type="button" className="link-btn">
            New here? Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
