import React from "react";

const EmployerLogin = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "Segoe UI, Roboto, sans-serif",
    padding: "1rem",
  };

  const formWrapperStyle = {
    width: "100%",
    maxWidth: "420px",
    background: "rgba(255,255,255,0.98)",
    borderRadius: "1rem",
    boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
    padding: "2.5rem",
    display: "flex",
    flexDirection: "column",
  };

  const titleStyle = {
    fontSize: "1.8rem",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "1.8rem",
    color: "#1e293b",
  };

  const inputStyle = {
    padding: "0.9rem 1rem",
    borderRadius: "0.6rem",
    border: "1px solid #cbd5e1",
    marginBottom: "1.2rem",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.2s ease",
  };

  const inputFocusStyle = {
    border: "1px solid #6366f1",
    boxShadow: "0 0 0 3px rgba(99,102,241,0.25)",
  };

  const buttonStyle = {
    padding: "0.9rem 1rem",
    borderRadius: "0.6rem",
    border: "none",
    background: "linear-gradient(90deg,#2563eb,#7c3aed)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "0.5rem",
    transition: "all 0.3s ease",
  };

  const buttonHoverStyle = {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
  };

  const switchStyle = {
    marginTop: "1rem",
    fontSize: "0.9rem",
    textAlign: "center",
    color: "#475569",
  };

  const linkStyle = {
    color: "#2563eb",
    fontWeight: "600",
    cursor: "pointer",
    marginLeft: "0.3rem",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login submitted!");
  };

  return (
    <div style={containerStyle}>
      <form style={formWrapperStyle} onSubmit={handleSubmit}>
        <h2 style={titleStyle}>Employer Login</h2>

        <input
          type="email"
          placeholder="Email Address"
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, inputStyle, inputFocusStyle)}
          onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, inputStyle, inputFocusStyle)}
          onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          required
        />

        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => Object.assign(e.target.style, buttonStyle, buttonHoverStyle)}
          onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
        >
          Login
        </button>

        <div style={switchStyle}>
          Don’t have an account?
          <span
            style={linkStyle}
            onClick={() => (window.location.href = "/employer-register")}
          >
            Register here
          </span>
        </div>
      </form>
    </div>
  );
};

export default EmployerLogin;
