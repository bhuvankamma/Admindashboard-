import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  
  const isEmail = (input) => /\S+@\S+\.\S+/.test(input);

  const handleGenerateOtp = async () => {
    setMessage(null);
    setLoading(true);

    if (!email.trim() || !isEmail(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/generate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: result.message || 'OTP has been sent to your email.' });
        setOtpSent(true);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to send OTP. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please check your connection.' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    if (!email.trim() || !otp.trim()) {
      setMessage({ type: 'error', text: 'Please enter both email and OTP.' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: result.message || 'Login successful!' });
        console.log('User data:', result.user);
        navigate('/dashboard'); // Redirect on successful login
      } else {
        setMessage({ type: 'error', text: result.message || 'Invalid email or OTP.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
     
      <div className="absolute inset-0 flex overflow-hidden">
        <div
          aria-hidden="true"
          className="w-full h-full bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center animate-slideLeftRight"
          style={{ flexShrink: 0 }}
        />
        <div
          aria-hidden="true"
          className="w-full h-full bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center animate-slideRightLeft"
          style={{ flexShrink: 0 }}
        />
        <div
          aria-hidden="true"
          className="w-full h-full bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center animate-slideLeftRight"
          style={{ flexShrink: 0 }}
        />
        <div
          aria-hidden="true"
          className="w-full h-full bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center animate-slideRightLeft"
          style={{ flexShrink: 0 }}
        />
      </div>

     
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

     
      <div className="relative z-10 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8 w-full max-w-md mx-4 sm:mx-0">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Login to Yuva Saathi
        </h2>
        
        {message && (
          <div className={`p-3 rounded-lg text-center mb-4 font-semibold ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="mt-1 flex space-x-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your email"
              />
              <button
                type="button"
                onClick={handleGenerateOtp}
                disabled={loading}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading && message?.type !== 'success' ? 'Generating OTP...' : 'Generate OTP'}
              </button>
            </div>
          </div>

          {otpSent && (
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter OTP"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={!otpSent || loading}
            className="w-full bg-orange-600 text-white py-2 px-20 rounded-md hover:bg-orange-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          Don't have an account?{' '}
          <a
            href="/register"
            className="text-orange-600 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;