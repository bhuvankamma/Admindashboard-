// ResetPassword.js - MINIMALIST, PROFESSIONAL DESIGN (Tailwind CSS) & HARDCODED API URL
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Password validation state
  const isLengthValid = newPassword.length >= 8;
  const passwordsMatch = newPassword === confirmPassword;

  // Extract the token from the URL immediately
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlToken = params.get('token');
    
    if (urlToken) {
        setToken(urlToken);
    } else {
        setMessage("Error: Reset token is missing from the link.");
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLengthValid) {
        setMessage("Error: New Password must be at least 8 characters long.");
        return;
    }
    if (!passwordsMatch) {
      setMessage("Error: New and Confirm Passwords do not match.");
      return;
    }

    // Client-side check for old password reuse
    if (oldPassword && oldPassword === newPassword) {
      setMessage("Error: The New Password cannot be the same as the Old Password.");
      return;
    }
    
    setMessage("Resetting password...");
    setLoading(true);

    try {
      // *** HARDCODED URL FIX for Network Issue ***
      // IMPORTANT: If your backend is not on http://localhost:5000, change this URL!
      const response = await fetch('http://localhost:5000/api/reset-password-final', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            token, 
            oldPassword, // Server MUST check this against the current hash!
            newPassword: newPassword 
        }),
      });

      const data = await response.json();
      const isError = !response.ok;

      if (!isError) {
        setMessage("✅ Password reset successful! Redirecting to login...");
        setTimeout(() => navigate('/login'), 3000); 
      } else {
        // This will catch backend errors (e.g., "Invalid Token" or "Passwords Match")
        setMessage(`Error: ${data.message || 'Failed to reset password. Link may be expired.'}`);
      }

    } catch (error) {
      // This catches true network failures (e.g., server not running, CORS issues)
      console.error("Fetch error:", error); // Log the actual error for debugging
      setMessage(`Error: Network issue or server communication failure. (Please ensure your backend server is running on http://localhost:5000, and check its console for errors. CORS might be an issue if nothing shows on server console.)`);
    } finally {
        setLoading(false);
    }
  };

  const isError = message.includes('Error');
  const isSuccess = message.includes('successful');
  // Form submission is disabled if loading, success, or any required fields are empty
  const isSubmitDisabled = loading || isSuccess || !newPassword || !confirmPassword || !oldPassword || !token;
  
  // Tailwind classes for conditional message styling
  const messageClasses = isError 
    ? "p-3 mb-4 rounded-md border border-red-300 bg-red-50 text-red-700 text-sm font-medium text-center" 
    : "p-3 mb-4 rounded-md border border-green-300 bg-green-50 text-green-700 text-sm font-medium text-center";

  const validationTextClasses = (isValid) => 
    `text-xs mt-1 ${isValid ? 'text-green-600' : 'text-red-600'}`;

  return (
    // Page Wrapper: No specific background color (transparent/system default), Full Screen, Centered
    <div className="min-h-screen flex items-center justify-center p-4">
      
      {/* Card: Compact, White Background, Subtle Shadow, Responsive Padding */}
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl transition-all duration-300 transform scale-100 md:scale-105">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Set New Password</h2>
        
        {/* Status Message */}
        {message && <p className={messageClasses}>{message}</p>}

        {/* Form */}
        {token && !isSuccess && (
          <form onSubmit={handleSubmit}>
            
            {/* Old Password Field */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="oldPassword">Old Password</label>
              <input 
                id="oldPassword"
                type="password" 
                value={oldPassword} 
                onChange={(e) => {setOldPassword(e.target.value); setMessage('');}} 
                required 
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-150"
              />
            </div>

            {/* New Password Field */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="newPassword">New Password</label>
              <input 
                id="newPassword"
                type="password" 
                value={newPassword} 
                onChange={(e) => {setNewPassword(e.target.value); setMessage('');}} 
                required 
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-150"
              />
              <p className={validationTextClasses(isLengthValid)}>
                {isLengthValid ? "✅ Minimum 8 characters" : "❌ Minimum 8 characters"}
              </p>
            </div>

            {/* Confirm New Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="confirmPassword">Confirm New Password</label>
              <input 
                id="confirmPassword"
                type="password" 
                value={confirmPassword} 
                onChange={(e) => {setConfirmPassword(e.target.value); setMessage('');}} 
                required 
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-150"
              />
              <p className={validationTextClasses(passwordsMatch)}>
                {passwordsMatch ? "✅ Passwords match" : "❌ Passwords must match"}
              </p>
            </div>

            {/* Submit Button: Professional Blue, Disabled State */}
            <button 
              type="submit" 
              disabled={isSubmitDisabled}
              className={`w-full py-2.5 text-lg font-semibold rounded-md transition duration-300 ease-in-out 
                ${isSubmitDisabled 
                  ? 'bg-gray-400 cursor-not-allowed text-gray-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.99]'
                }`}
            >
              {loading ? 'Processing...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;