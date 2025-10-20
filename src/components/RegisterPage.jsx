import React, { useState } from "react";
import { auth, setUpRecaptcha } from "./firebase";
 
function App() {
  // 🔹 Mobile states
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmObj, setConfirmObj] = useState(null);
 
  // 🔹 Email states
  const [email, setEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
 
  // Send mobile OTP
  const sendOTP = async () => {
    try {
      const confirmation = await setUpRecaptcha(phone);
      setConfirmObj(confirmation);
      alert("📱 Mobile OTP sent!");
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP: " + err.message);
    }
  };
 
  // Verify mobile OTP
  const verifyOTP = async () => {
    try {
      const result = await confirmObj.confirm(otp);
      const user = result.user;
      const token = await user.getIdToken();
 
      await fetch("http://localhost:8000/verify-mobile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
 
      alert("✅ Mobile OTP Verified!");
    } catch (err) {
      alert("❌ Invalid Mobile OTP: " + err.message);
    }
  };
 
  // Send email OTP
  const sendEmailOTP = async () => {
    const res = await fetch("http://localhost:8000/send-email-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    alert(data.message);
  };
 
  // Verify email OTP
  const verifyEmailOTP = async () => {
    const res = await fetch("http://localhost:8000/verify-email-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp: emailOtp }),
    });
    const data = await res.json();
    alert(data.message);
  };
 
  return (
<div style={{ padding: "20px" }}>
<h2>📱 Mobile OTP (Firebase)</h2>
<input
        type="text"
        placeholder="+91XXXXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
<button onClick={sendOTP}>Send OTP</button>
<div id="recaptcha-container"></div>
<br /><br />
<input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
<button onClick={verifyOTP}>Verify OTP</button>
 
      <hr />
 
      <h2>📧 Email OTP</h2>
<input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
<button onClick={sendEmailOTP}>Send Email OTP</button>
<br /><br />
<input
        type="text"
        placeholder="Enter Email OTP"
        value={emailOtp}
        onChange={(e) => setEmailOtp(e.target.value)}
      />
<button onClick={verifyEmailOTP}>Verify Email OTP</button>
</div>
  );
}
 
export default App;