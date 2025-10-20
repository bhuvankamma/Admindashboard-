import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LockClosedIcon,
    HomeIcon,
    UserIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    KeyIcon,
    XMarkIcon,
    EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { FaGooglePlay, FaApple } from 'react-icons/fa';

// ----------------------------------------------------
// !!! IMPORTANT: Set your Flask Backend URL here !!!
// ----------------------------------------------------
const API_BASE_URL = 'http://127.0.0.1:5000/api';
// ----------------------------------------------------

// ====================================================================
// === UPDATED COMPONENT: ResetPasswordPage (Token Verification FIX) ===
// ====================================================================

/**
 * Component to handle the password reset process after a user clicks the link
 * from their email (e.g., accessed via route /reset-password?token=XYZ).
 * It verifies the token and allows the user to set a new password.
 */
const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    // 1. Get the token from the URL query string: /reset-password?token=XYZ
    const token = searchParams.get('token');

    const [isLoading, setIsLoading] = useState(false);
    // 'verifying' -> 'ready' (show form) -> 'success' (password updated) / 'error'
    const [pageStatus, setPageStatus] = useState('verifying'); 
    const [message, setMessage] = useState('');

    // State to hold user info (table/email) verified by the token, and the new passwords
    const [resetData, setResetData] = useState({ table: '', email: '', newPassword: '', confirmPassword: '' });

    // --- STEP 2: Verify Token on Load ---
    useEffect(() => {
        if (!token) {
            setPageStatus('error');
            setMessage('Invalid or missing password reset link.');
            return;
        }

        const verifyToken = async () => {
            setIsLoading(true);
            // DEBUG: Log token verification start
            console.log('Attempting to verify token:', token); 
            
            try {
                const response = await fetch(`${API_BASE_URL}/verify-reset-token`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token }),
                });

                // Add robust error check for network/HTTP status issues
                if (!response.ok) {
                    // This handles 404, 500, etc. responses before JSON parsing
                    setPageStatus('error');
                    setMessage(`Server responded with status ${response.status}. The link might be broken.`);
                    // Attempt to log response text if possible for better debug
                    try {
                        const errorData = await response.text();
                        console.error('Verify Token Failed HTTP Error:', response.status, errorData);
                    } catch (e) {
                        console.error('Verify Token Failed HTTP Status:', response.status);
                    }
                    return; 
                }

                const data = await response.json();
                // DEBUG: Log the successful response data
                console.log('Token Verification Response:', data);

                if (data.success) {
                    // Token is valid! Prepare the form for password update
                    setPageStatus('ready');
                    // Set a helpful message to guide the user
                    setMessage('The reset link is valid. Please enter and confirm your new password.');
                    setResetData(prev => ({
                        ...prev,
                        // Store the table/email received from the backend payload
                        table: data.table,
                        email: data.email
                    }));
                } else {
                    setPageStatus('error');
                    setMessage(data.message || 'The reset link is invalid or has expired.');
                }
            } catch (error) {
                // This handles network failures (CORS, server down, etc.)
                setPageStatus('error');
                setMessage('Failed to connect to the server to verify the link. Check console for details.');
                console.error('Network/CORS Error during token verification:', error);
            } finally {
                setIsLoading(false);
            }
        };

        verifyToken();
    }, [token]);

    // --- STEP 3: Update Password Submission ---
    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        // Basic client-side validation
        if (resetData.newPassword !== resetData.confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        if (resetData.newPassword.length < 6) {
            setMessage('Password must be at least 6 characters long.');
            return;
        }

        setIsLoading(true);
        setMessage(''); // Clear previous error message

        try {
            const response = await fetch(`${API_BASE_URL}/update-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    table: resetData.table,
                    email: resetData.email,
                    // Send the token for re-verification to prevent race conditions/security issues
                    token: token, 
                    new_password: resetData.newPassword, // Matches backend key 'new_password'
                }),
            });

            // Ensure response is OK before parsing
            if (!response.ok) {
                 setPageStatus('error');
                 setMessage(`Server error during update: ${response.status}.`);
                 console.error('Password Update Failed HTTP Status:', response.status);
                 return;
            }

            const data = await response.json();

            if (data.success) {
                setPageStatus('success');
                setMessage(data.message || 'Password successfully updated!');
                // Redirect to login after a delay
                setTimeout(() => navigate('/login', { replace: true }), 3000);
            } else {
                // Keep the status as 'ready' to allow another attempt, but display the error message
                setPageStatus('ready'); 
                setMessage(data.message || 'Failed to update password. Please check your password strength.');
            }
        } catch (error) {
            setPageStatus('ready'); // Keep the form open for another attempt
            setMessage('Failed to communicate with the server during password update.');
            console.error('Network Error during password update:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper function to render different content based on pageStatus
    const renderContent = () => {
        switch (pageStatus) {
            case 'verifying':
                return (
                    <div className="flex flex-col items-center">
                        <svg className="animate-spin h-8 w-8 text-indigo-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Verifying reset link...</p>
                    </div>
                );
            case 'error':
                // *** FIX: Ensure error state is clearly visible and provides navigation back ***
                return (
                    <div className="text-center p-6 bg-red-100 rounded-lg dark:bg-red-900 border border-red-300">
                        <ExclamationCircleIcon className="h-10 w-10 text-red-500 mx-auto mb-3" />
                        <h4 className="text-lg font-semibold text-red-700 dark:text-red-200">Reset Failed</h4>
                        <p className="text-sm text-red-600 dark:text-red-300 mt-2">{message}</p>
                        <Link to="/login" className="mt-4 inline-block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium text-sm transition-colors">Go back to Login</Link>
                    </div>
                );
            case 'success':
                return (
                    <div className="text-center p-6 bg-green-100 rounded-lg dark:bg-green-900 border border-green-300">
                        <CheckCircleIcon className="h-10 w-10 text-green-500 mx-auto mb-3" />
                        <h4 className="text-lg font-semibold text-green-700 dark:text-green-200">Success!</h4>
                        <p className="text-sm text-green-600 dark:text-green-300 mt-2">{message} Redirecting to login...</p>
                    </div>
                );
            case 'ready':
                // *** FIX: The form to update the password is returned here ***
                return (
                    <form className="space-y-4" onSubmit={handlePasswordUpdate}>
                         <h3 className="text-md text-gray-700 dark:text-gray-300 text-center mb-2 font-semibold">Set New Password for: {resetData.email}</h3>
                         
                        {/* Message/Error Box */}
                        {(message) && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className={`p-3 rounded-lg text-sm ${message.includes('match') || message.includes('Failed') ? 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200' : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'}`}
                            >
                                {message}
                            </motion.div>
                        )}
                        
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1 dark:text-gray-400" htmlFor="newPassword">New Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={resetData.newPassword}
                                    onChange={(e) => setResetData(prev => ({ ...prev, newPassword: e.target.value }))}
                                    required
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-indigo-500 text-sm pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Enter new password (min 6 chars)"
                                />
                                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1 dark:text-gray-400" htmlFor="confirmPassword">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={resetData.confirmPassword}
                                    onChange={(e) => setResetData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                    required
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-indigo-500 text-sm pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Confirm new password"
                                />
                                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full py-2 rounded-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-md text-sm flex items-center justify-center disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Updating...' : 'Set New Password'}
                        </motion.button>
                    </form>
                );
            default:
                // Fallback to display the current message if status is undefined or unexpected
                return (
                    <div className="text-center p-6 text-sm text-gray-500 dark:text-gray-400">
                        {message || 'An unknown state occurred. Please check the URL.'}
                        <Link to="/login" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium text-sm">Go to Login</Link>
                    </div>
                );
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 dark:bg-gray-800"
            >
                <div className="flex justify-center mb-6">
                    <KeyIcon className="h-10 w-10 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 dark:text-white">
                    Reset Your Password
                </h2>
                {renderContent()}
            </motion.div>
        </div>
    );
};

// ====================================================================


// --- New Component: RequestResetModal (STEP 1: Request Email Link) ---
const RequestResetModal = ({ isOpen, onClose, onRequestSubmit, isLoading, message }) => {
    const [emailOrId, setEmailOrId] = useState('');
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onRequestSubmit(emailOrId);
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white rounded-xl shadow-2xl w-full max-w-sm dark:bg-gray-800"
                    initial={{ scale: 0.9, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 50 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                                <EnvelopeIcon className="h-6 w-6 mr-2 text-indigo-600" />
                                Request Password Reset
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-4 dark:text-gray-400">
                            Enter your registered email or ID to receive a password reset link.
                        </p>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1 dark:text-gray-400" htmlFor="resetIdentifier">Email or ID</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="resetIdentifier"
                                        value={emailOrId}
                                        onChange={(e) => setEmailOrId(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-indigo-500 text-sm pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="Enter your registered email or ID"
                                    />
                                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            {message.text && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={`p-3 rounded-lg text-sm ${message.type === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200' : 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200'}`}
                                >
                                    {message.text}
                                </motion.div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full py-2 rounded-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-md text-sm flex items-center justify-center disabled:opacity-50"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center space-x-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Sending Link...</span>
                                    </span>
                                ) : (
                                    <span>Send Reset Link</span>
                                )}
                            </motion.button>

                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full py-2 rounded-lg font-semibold text-sm transition-colors duration-300 border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};


// --- Login Component (exported at the end of the file) ---
const Login = () => {
    const navigate = useNavigate();

    const [globalMessage, setGlobalMessage] = useState({ type: '', text: '' });
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // States for the password reset functionality
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [resetMessage, setResetMessage] = useState({ type: '', text: '' });
    const [isResetLoading, setIsResetLoading] = useState(false);

    // ----------------------------------------------------
    // !!! Forgot Password API Call !!!
    // ----------------------------------------------------
    const handleForgotPasswordRequest = async (emailOrId) => {
        setIsResetLoading(true);
        setResetMessage({ type: '', text: '' });
        setGlobalMessage({ type: '', text: '' });

        try {
            const response = await fetch(`${API_BASE_URL}/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // *** FIX: Use 'identifier' to match the Flask backend's preferred key ***
                body: JSON.stringify({ identifier: emailOrId }),
            });

            const data = await response.json();

            if (data.success) {
                // SUCCESS: Close the request modal and show the global success message
                setIsRequestModalOpen(false);
                setGlobalMessage({
                    type: 'success',
                    // *** FIX: Update message to reflect that a LINK was sent ***
                    text: data.message || "A password reset link has been successfully sent to your email. Check your inbox.",
                });
            } else {
                // FAILURE: Show error inside the request modal
                setResetMessage({
                    type: 'error',
                    text: data.message,
                });
            }

        } catch (error) {
            setResetMessage({
                type: 'error',
                text: 'Failed to communicate with the server. Check your network or server status.',
            });
        } finally {
            setIsResetLoading(false);
            // Clear messages after a delay
            setTimeout(() => {
                setGlobalMessage({ type: '', text: '' });
                setResetMessage({ type: '', text: '' });
            }, 7000);
        }
    };

    // Function called when user clicks 'Forgot Password?' link
    const openRequestModal = (e) => {
        e.preventDefault();
        setIsRequestModalOpen(true);
        setResetMessage({ type: '', text: '' });
        setGlobalMessage({ type: '', text: '' });
    };

    // ----------------------------------------------------
    // !!! Login API Call and Role-Based Routing !!!
    // ----------------------------------------------------
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setGlobalMessage({ type: '', text: '' });

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password }), // Send identifier and password
            });

            const data = await response.json();

            if (data.success) {
                const role = data.user_role.toLowerCase(); // Role will be 'admins', 'employers', or 'employees'
                setGlobalMessage({ type: 'success', text: `${data.message} Redirecting...` });

                let redirectPath = '/';

                // Determine the dashboard path based on the role received from the backend
                switch (role) {
                    case 'admins':
                        redirectPath = '/admindashboard';
                        break;
                    case 'employers':
                        redirectPath = '/employerdashboard';
                        break;
                    case 'employees':
                        redirectPath = '/dashboard';
                        break;
                    default:
                        redirectPath = '/';
                }

                // Wait for the message to show, then navigate
                setTimeout(() => {
                    navigate(redirectPath, { replace: true });
                }, 1500);
            } else {
                // Login failed - display the error message from the backend
                setGlobalMessage({ type: 'error', text: data.message });
            }
        } catch (error) {
            // Network or server connection failure
            setGlobalMessage({ type: 'error', text: 'Login failed. Please check your server and network connection.' });
        } finally {
            setIsLoading(false);
            // Clear message after a delay
            setTimeout(() => {
                setGlobalMessage({ type: '', text: '' });
            }, 5000);
        }
    };


    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-4 antialiased bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-sm p-6 z-10 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
            >

                {/* Home Button */}
                <div className="absolute top-4 left-4 z-20">
                    <Link to="/">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-gray-100 rounded-full shadow-md cursor-pointer dark:bg-gray-700"
                        >
                            <HomeIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        </motion.div>
                    </Link>
                </div>

                <div className="flex justify-center mb-4">
                    <div className="bg-indigo-600 p-3 rounded-full shadow-lg">
                        <LockClosedIcon className="h-6 w-6 text-white" />
                    </div>
                </div>

                <h2 className="text-xl font-bold text-gray-800 text-center mb-1 dark:text-white">
                    Welcome Back
                </h2>
                <p className="text-center text-gray-500 mb-4 text-xs dark:text-gray-400">
                    Sign in to your account to continue.
                </p>

                <form className="space-y-3" onSubmit={handleLoginSubmit}>
                    {/* Identifier Field */}
                    <div>
                        <label
                            className="block text-xs font-medium text-gray-600 mb-1 dark:text-gray-400"
                            htmlFor="identifier"
                        >
                            Email or ID
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="identifier"
                                name="identifier"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-300 text-sm pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Enter your email or ID"
                            />
                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label
                            className="block text-xs font-medium text-gray-600 mb-1 dark:text-gray-400"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-300 text-sm pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Enter your password"
                            />
                            <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                className="h-3 w-3 text-indigo-600 bg-white border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor="rememberMe" className="ml-2 text-gray-600 dark:text-gray-400">
                                Remember me
                            </label>
                        </div>
                        <a
                            href="#"
                            onClick={openRequestModal} // Opens the RequestResetModal
                            className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-300 dark:text-indigo-400"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full py-2 rounded-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-md text-sm flex items-center justify-center"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center space-x-2">
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                <span>Signing in...</span>
                            </span>
                        ) : (
                            <span>Sign In</span>
                        )}
                    </motion.button>
                </form>

                {/* Global Message Alert */}
                <AnimatePresence>
                    {globalMessage.text && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className={`mt-4 p-3 rounded-lg text-xs font-semibold ${globalMessage.type === 'error' ? 'bg-red-100 text-red-700 border border-red-300 dark:bg-red-800 dark:text-red-200' : 'bg-green-100 text-green-700 border border-green-300 dark:bg-green-800 dark:text-green-200'}`}
                        >
                            {globalMessage.text}
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {/* Register link */}
                <p className="mt-4 text-center text-gray-500 text-xs dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-300 dark:text-indigo-400"
                    >
                        Register
                    </Link>
                </p>

                {/* App download links */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500 font-medium mb-2 dark:text-gray-400">
                        Get the app on:
                    </p>
                    <div className="flex justify-center space-x-4">
                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center space-x-2 bg-gray-800 text-white px-3 py-1 rounded-lg text-xs shadow-lg hover:bg-gray-900 transition-colors dark:bg-gray-700"
                        >
                            <FaGooglePlay className="h-4 w-4" />
                            <span>Google Play</span>
                        </motion.a>
                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center space-x-2 bg-gray-800 text-white px-3 py-1 rounded-lg text-xs shadow-lg hover:bg-gray-900 transition-colors dark:bg-gray-700"
                        >
                            <FaApple className="h-4 w-4" />
                            <span>App Store</span>
                        </motion.a>
                    </div>
                </div>
            </motion.div>
            
            {/* Modal for Password Reset Request */}
            <RequestResetModal
                isOpen={isRequestModalOpen}
                onClose={() => setIsRequestModalOpen(false)}
                onRequestSubmit={handleForgotPasswordRequest}
                isLoading={isResetLoading}
                message={resetMessage}
            />
        </div>
    );
};


export { Login, ResetPasswordPage };