import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Import useNavigate
import * as yup from "yup";

const API_ENDPOINT = "https://qtccb2p2hb.execute-api.eu-north-1.amazonaws.com/DEV/Admin_Registration";

export default function AuthForm() {
  const navigate = useNavigate(); // 👈 Initialize useNavigate

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fadingErrors, setFadingErrors] = useState(false);
  const [fadingSuccess, setFadingSuccess] = useState(false);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: "url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1350&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "Segoe UI, Tahoma, sans-serif",
    padding: "1rem",
  };

  const cardStyle = (isLogin) => ({
    width: "100%",
    maxWidth: isLogin ? "360px" : "600px",
    background: "rgba(255, 255, 255, 0.9)",
    padding: "1.8rem",
    borderRadius: "20px",
    boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
    textAlign: "center",
    backdropFilter: "blur(8px)",
    overflow: "hidden",
  });

  const titleStyle = {
    fontSize: "1.6rem",
    fontWeight: "700",
    marginBottom: "1rem",
    color: "#1d2b64",
  };

  const loginFormStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    width: "100%",
  };

  const formGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "0.8rem",
    width: "100%",
    boxSizing: "border-box",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "0.95rem",
    outline: "none",
    transition: "0.2s",
    boxSizing: "border-box",
  };

  const errorStyle = {
    fontSize: "0.8rem",
    color: "red",
    textAlign: "left",
    gridColumn: "1 / -1",
    opacity: fadingErrors ? 0 : 1,
    transition: "opacity 1s ease-out",
  };

  const successStyle = {
    fontSize: "0.9rem",
    color: "green",
    marginBottom: "0.5rem",
    gridColumn: "1 / -1",
    opacity: fadingSuccess ? 0 : 1,
    transition: "opacity 1s ease-out",
  };

  const passwordStrengthStyle = {
    fontSize: "0.8rem",
    marginTop: "0.2rem",
    color:
      passwordStrength === "Strong"
        ? "green"
        : passwordStrength === "Medium"
        ? "orange"
        : "red",
    textAlign: "left",
    gridColumn: "1 / -1",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.9rem",
    marginTop: "0.5rem",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg,#ff6b6b,#f8cdda)",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    gridColumn: "1 / -1",
  };

  const buttonHover = {
    background: "linear-gradient(90deg,#e63946,#ff6b6b)",
    transform: "translateY(-2px)",
  };

  const toggleText = {
    marginTop: "0.9rem",
    fontSize: "0.85rem",
    color: "#333",
  };

  const linkStyle = {
    color: "#ff6b6b",
    cursor: "pointer",
    fontWeight: "600",
  };

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const registerSchema = yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    department: yup.string().required("Department is required"),
    designation: yup.string().required("Designation is required"),
    mobile: yup.string().matches(/^\d{10}$/, "Mobile number must be 10 digits").required("Mobile number is required"),
    govtId: yup.string().required("Govt ID / Employee Code is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required").matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain 8+ characters, uppercase, lowercase, number, and special character"
    ),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const checkPasswordStrength = (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*\d))|((?=.*[A-Z])(?=.*\d)))[A-Za-z\d@$!%*?&]{6,}$/;

    if (strongRegex.test(password)) setPasswordStrength("Strong");
    else if (mediumRegex.test(password)) setPasswordStrength("Medium");
    else setPasswordStrength("Medium");
  };

  const displayMessage = (message, isError = false) => {
    if (isError) {
      setErrors({ apiError: message });
      setFadingErrors(false);
      setTimeout(() => setFadingErrors(true), 4000);
      setTimeout(() => setErrors({}), 5000);
    } else {
      setSuccessMessage(message);
      setFadingSuccess(false);
      setTimeout(() => setFadingSuccess(true), 2000);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleApiCall = async (payload) => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        displayMessage(data.detail || "API error", true);
        return null;
      }
      return data;
    } catch (e) {
      console.error("Fetch Error:", e);
      displayMessage("Network error or server unreachable.", true);
      return null;
    }
  };

  const handleRegistration = async () => {
    const registrationPayload = {
      action: "register",
      full_name: formData.fullName,
      department: formData.department,
      designation: formData.designation,
      mobile_number: formData.mobile,
      govt_id: formData.govtId,
      official_email: formData.email,
      password: formData.password,
      confirm_password: formData.confirmPassword,
      education_qualification: "Not Specified",
      current_location: "Not Specified",
    };

    const result = await handleApiCall(registrationPayload);
    if (result) {
      displayMessage(result.message);
      setFormData({});
      setPasswordStrength("");
      setIsLogin(true);
    }
  };

  const handleLogin = async () => {
    const loginPayload = {
      action: "login",
      official_email: formData.email,
      password: formData.password,
    };

    const result = await handleApiCall(loginPayload);
    if (result) {
      displayMessage(result.message);
      navigate("/admin-dashboard"); // Navigate on successful login
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    try {
      if (isLogin) await loginSchema.validate(formData, { abortEarly: false });
      else await registerSchema.validate(formData, { abortEarly: false });
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((err) => (newErrors[err.path] = err.message));
      setErrors(newErrors);
      setFadingErrors(false);
      setTimeout(() => setFadingErrors(true), 4000);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    if (!isLogin) await handleRegistration();
    else await handleLogin();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password") checkPasswordStrength(value);
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormData({});
    setErrors({});
    setSuccessMessage("");
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle(isLogin)}>
        <h2 style={titleStyle}>{isLogin ? "Official Login" : "Register Official"}</h2>
        {successMessage && <span style={successStyle}>{successMessage}</span>}
        {errors.apiError && <span style={errorStyle}>{errors.apiError}</span>}

        <form style={!isLogin ? formGrid : loginFormStyle} onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input name="fullName" type="text" placeholder="Full Name" style={inputStyle} onChange={handleChange} value={formData.fullName || ""} />
              {errors.fullName && <span style={errorStyle}>{errors.fullName}</span>}

              <input name="department" type="text" placeholder="Department" style={inputStyle} onChange={handleChange} value={formData.department || ""} />
              {errors.department && <span style={errorStyle}>{errors.department}</span>}

              <input name="designation" type="text" placeholder="Designation" style={inputStyle} onChange={handleChange} value={formData.designation || ""} />
              {errors.designation && <span style={errorStyle}>{errors.designation}</span>}

              <input name="mobile" type="tel" placeholder="Mobile Number" style={inputStyle} onChange={handleChange} value={formData.mobile || ""} />
              {errors.mobile && <span style={errorStyle}>{errors.mobile}</span>}

              <input name="govtId" type="text" placeholder="Govt ID / Employee Code" style={inputStyle} onChange={handleChange} value={formData.govtId || ""} />
              {errors.govtId && <span style={errorStyle}>{errors.govtId}</span>}

              <input name="email" type="email" placeholder="Official Email" style={inputStyle} onChange={handleChange} value={formData.email || ""} />
              {errors.email && <span style={errorStyle}>{errors.email}</span>}

              <input name="password" type="password" placeholder="Password" style={inputStyle} onChange={handleChange} value={formData.password || ""} />
              {passwordStrength && <span style={passwordStrengthStyle}>Password strength: {passwordStrength}</span>}
              {errors.password && <span style={errorStyle}>{errors.password}</span>}

              <input name="confirmPassword" type="password" placeholder="Confirm Password" style={inputStyle} onChange={handleChange} value={formData.confirmPassword || ""} />
              {errors.confirmPassword && <span style={errorStyle}>{errors.confirmPassword}</span>}
            </>
          )}

          {isLogin && (
            <>
              <input name="email" type="email" placeholder="Official Email" style={inputStyle} onChange={handleChange} value={formData.email || ""} />
              {errors.email && <span style={errorStyle}>{errors.email}</span>}

              <input name="password" type="password" placeholder="Password" style={inputStyle} onChange={handleChange} value={formData.password || ""} />
              {errors.password && <span style={errorStyle}>{errors.password}</span>}
            </>
          )}

          <button type="submit" style={buttonStyle} onMouseOver={(e) => Object.assign(e.target.style, buttonHover)} onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}>
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p style={toggleText}>
          {isLogin ? "New Official? " : "Already registered? "}
          <span style={linkStyle} onClick={handleToggle}>
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
}
