import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    LockClosedIcon,
    BuildingOfficeIcon,
    UserIcon,
    ArrowPathIcon,
    EyeIcon,
    EyeSlashIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    HomeIcon,
    PhoneIcon,
    IdentificationIcon,
    ShieldCheckIcon,
    EnvelopeIcon,
    KeyIcon,
} from "@heroicons/react/24/outline";

// --- Configuration ---
const BASE_URL = 'http://127.0.0.1:5000/api'; // Your Flask backend URL

// =================================================================
// --- NEW COMPONENT: OtpInput (No changes needed) ---
// =================================================================

const OtpInput = ({ length = 6, otp, onChange }) => {
    const inputRefs = useRef([]);

    // Split the OTP string into an array of individual digits
    const otpDigits = otp.padEnd(length, ' ').split('').slice(0, length);

    const handleKeyDown = (e, index) => {
        // Handle backspace for previous field
        if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/[^0-9]/.test(value)) return; // Only allow numbers

        let newOtp = [...otpDigits];
        newOtp[index] = value.charAt(value.length - 1); // Get the last entered character (for quick paste)

        const newOtpString = newOtp.join('');
        onChange(newOtpString.replace(/\s/g, '')); // Pass the cleaned string back

        // Auto-focus to the next input field
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text');
        if (/[^0-9]/.test(paste)) return; // Only allow numbers
        e.preventDefault();

        const newOtp = paste.slice(0, length);
        onChange(newOtp);

        // Focus the last input box or the one after the pasted digits
        const focusIndex = Math.min(length - 1, newOtp.length - 1);
        inputRefs.current[focusIndex]?.focus();
    };

    return (
        <div className="flex justify-between space-x-2 md:space-x-3" onPaste={handlePaste}>
            {otpDigits.map((digit, index) => (
                <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    maxLength="1"
                    inputMode="numeric"
                    autoComplete="off"
                    value={digit.trim() === '' ? '' : digit} // Display empty string if ' ' placeholder
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-10 h-10 md:w-12 md:h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:ring-teal-500 transition shadow-sm"
                    style={{ caretColor: 'transparent' }} // Hides the blinking cursor for better UX
                />
            ))}
        </div>
    );
};

// =================================================================
// --- Component: PasswordStrength (No changes needed) ---
// =================================================================
const PasswordStrength = ({ password }) => {
    const [strength, setStrength] = useState(0);

    useEffect(() => {
        let score = 0;
        if (!password || typeof password !== 'string') {
            setStrength(0);
            return;
        }
        if (password.length >= 8) score += 1;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) score += 1;
        if (password.match(/[0-9]/)) score += 1;
        if (password.match(/[^a-zA-Z0-9]/)) score += 1;
        setStrength(score);
    }, [password]);

    const strengthText = ["Weak", "Fair", "Good", "Strong"];
    const strengthColor = ["bg-red-500", "bg-yellow-500", "bg-green-500", "bg-teal-500"];

    return (
        <div className="w-full mt-1">
            <div className="h-1 bg-gray-300 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full transition-all duration-300 ${strengthColor[strength]}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(strength / 4) * 100}%` }}
                />
            </div>
            {password && (
                <p className="text-xs text-gray-500 mt-1">
                    Password strength: <span className={`font-semibold text-xs text-teal-500`}>{strengthText[strength]}</span>
                </p>
            )}
        </div>
    );
};

// =================================================================
// --- Component: NotificationPopup (No changes needed) ---
// =================================================================
const NotificationPopup = ({ message, type, onClose }) => {
    const isSuccess = type === "success";
    const bgColor = isSuccess ? "bg-green-500" : "bg-red-500";
    const Icon = isSuccess ? CheckCircleIcon : ExclamationCircleIcon;

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-5 right-5 z-50 p-4 rounded-lg shadow-xl text-white flex items-center space-x-3 max-w-sm w-full ${bgColor}`}
        >
            <Icon className="h-6 w-6 flex-shrink-0" />
            <p className="font-medium text-sm flex-grow">{message}</p>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </motion.div>
    );
};

// =================================================================
// --- Component: Register (Main logic updated for automatic verification) ---
// =================================================================
const Register = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("employee");
    const [formData, setFormData] = useState({
        fullName: "", email: "", password: "", confirmPassword: "", phoneNumber: "",
        companyName: "", department: "", employeeId: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [isAwaitingOtp, setIsAwaitingOtp] = useState(false);
    const [otp, setOtp] = useState(""); // State for the entire 6-digit OTP string

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleRoleChange = (newRole) => {
        setRole(newRole);
        setFormData((prev) => ({ ...prev, companyName: "", department: "", employeeId: "" }));
        setMessage({ type: "", text: "" });
    };

    const getPayload = () => {
        const payload = {
            role: role.charAt(0).toUpperCase() + role.slice(1),
            full_name: formData.fullName, email: formData.email,
            password: formData.password, phone: formData.phoneNumber,
        };
        if (role === "employee") {
            payload.identifier = formData.employeeId;
            payload.department = formData.department;
        } else if (role === "employer") {
            payload.identifier = formData.employeeId || null;
            payload.company = formData.companyName;
            payload.department = formData.department;
        } else if (role === "admin") {
            payload.identifier = null;
            payload.company = formData.companyName;
        }
        return payload;
    };

    const handleRegister = async () => {
        if (formData.password !== formData.confirmPassword) {
            setMessage({ type: "error", text: "Passwords do not match." });
            return;
        }
        setIsLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const response = await fetch(`${BASE_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(getPayload()),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: data.message || "Registration complete! Check your email for an OTP." });
                setIsAwaitingOtp(true);
            } else {
                setMessage({ type: "error", text: data.message || "Registration failed. Please check your details." });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Network error. Could not connect to the server." });
        } finally {
            setIsLoading(false);
        }
    };

    // NOTE: This function is now also triggered automatically by the useEffect below
    const handleVerifyOtp = async (otpToVerify) => {
        // Prevent manual or multiple calls if already loading
        if (isLoading) return; 

        if (!otpToVerify || otpToVerify.length !== 6) { // Check for exact 6 digits
            // We only show an error if the user tries to manually submit an incomplete OTP
            if (otpToVerify.length !== 6) { 
                setMessage({ type: "error", text: "Please enter a valid 6-digit OTP." });
            }
            return;
        }
        
        setIsLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const response = await fetch(`${BASE_URL}/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, otp: otpToVerify }),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: "Verification successful! Redirecting to login..." });
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setMessage({ type: "error", text: data.message || "Invalid OTP. Please try again." });
                setOtp(''); // Clear OTP on failure for easier re-entry
            }
        } catch (error) {
            setMessage({ type: "error", text: "Verification failed. Check your network." });
        } finally {
            setIsLoading(false);
        }
    };

    // >>> NEW: Auto-Verification Logic <<<
    useEffect(() => {
        if (isAwaitingOtp && otp.length === 6) {
            handleVerifyOtp(otp);
        }
    }, [otp, isAwaitingOtp]); // Dependency array watches for changes in otp and isAwaitingOtp

    const handlePrimaryAction = (e) => {
        e.preventDefault();
        // Manual submission is only needed for the registration step.
        // OTP verification is now handled by the useEffect.
        if (!isAwaitingOtp) {
            handleRegister();
        }
        // If awaiting OTP, and they click the button, we trigger the manual verify (for incomplete OTP)
        // This is a safety net if they don't fill all fields
        else if (isAwaitingOtp && otp.length < 6) {
             handleVerifyOtp(otp);
        }
    };

    const isRequired = (field) => {
        const base = ["fullName", "email", "password", "confirmPassword", "phoneNumber"];
        if (role === "employer") return [...base, "companyName", "department"].includes(field);
        if (role === "admin") return [...base, "companyName"].includes(field);
        return [...base, "department", "employeeId"].includes(field);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-200 p-4 relative antialiased">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-black opacity-30"></div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, type: "spring", stiffness: 100 }} className="bg-gray-100 rounded-xl shadow-2xl p-6 md:p-10 w-full max-w-md relative z-10 border border-gray-300">
                <div className="absolute top-4 left-4 z-20">
                    <Link to="/"><motion.div whileHover={{ scale: 1.1, backgroundColor: "#e2e8f0" }} whileTap={{ scale: 0.9 }} className="p-2 bg-gray-200 rounded-full shadow-md cursor-pointer"><HomeIcon className="h-5 w-5 text-gray-600" /></motion.div></Link>
                </div>
                <div className="flex justify-center mb-6"><div className="bg-teal-500 p-3 rounded-full shadow-lg"><ShieldCheckIcon className="h-6 w-6 text-white" /></div></div>
                <h1 className="text-2xl font-bold mb-1 text-center text-gray-800">Create Account</h1>
                <p className="text-sm text-gray-500 text-center mb-6">Join our platform with your professional details.</p>

                <form onSubmit={handlePrimaryAction} className="space-y-4">
                    <fieldset disabled={isAwaitingOtp || isLoading} className="space-y-4 group">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Role</label>
                            <div className="flex bg-gray-200 rounded-lg p-1 space-x-1 group-disabled:opacity-50">
                                {["employee", "employer", "admin"].map((item) => (
                                    <button key={item} type="button" className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${role === item ? "bg-teal-500 text-white shadow-md" : "text-gray-600 hover:bg-gray-300"}`} onClick={() => handleRoleChange(item)}>
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 group-disabled:opacity-50">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
                                <div className="relative"><input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full border p-2.5 pl-10 rounded-lg text-sm disabled:bg-gray-200" required /><UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" /></div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                                <div className="relative"><input type="email" name="email" placeholder="Professional Email" value={formData.email} onChange={handleChange} className="w-full border p-2.5 pl-10 rounded-lg text-sm disabled:bg-gray-200" required /><EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" /></div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Password</label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} name="password" placeholder="Secure Password" value={formData.password} onChange={handleChange} className="w-full border p-2.5 pl-10 pr-10 rounded-lg text-sm disabled:bg-gray-200" required />
                                    <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}</button>
                                </div>
                                <PasswordStrength password={formData.password} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Confirm Password</label>
                                <div className="relative"><input type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Re-enter Password" value={formData.confirmPassword} onChange={handleChange} className={`w-full border p-2.5 pl-10 rounded-lg text-sm disabled:bg-gray-200 ${formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-500' : 'border-gray-300'}`} required /><LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" /></div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Phone Number</label>
                                <div className="relative"><input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="w-full border p-2.5 pl-10 rounded-lg text-sm disabled:bg-gray-200" required={isRequired("phoneNumber")} /><PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" /></div>
                            </div>
                            {(role === "employer" || role === "admin") && <div><label className="block text-xs font-medium text-gray-500 mb-1">Company Name</label><div className="relative"><input type="text" name="companyName" placeholder="Your Company" value={formData.companyName} onChange={handleChange} className="w-full border p-2.5 pl-10 rounded-lg text-sm disabled:bg-gray-200" required={isRequired("companyName")} /><BuildingOfficeIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" /></div></div>}
                            {(role === "employee" || role === "employer") && <div><label className="block text-xs font-medium text-gray-500 mb-1">Department</label><div className="relative"><input type="text" name="department" placeholder="Your Department" value={formData.department} onChange={handleChange} className="w-full border p-2.5 pl-10 rounded-lg text-sm disabled:bg-gray-200" required={isRequired("department")} /><BuildingOfficeIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" /></div></div>}
                            {(role === "employee" || role === "employer") && <div><label className="block text-xs font-medium text-gray-500 mb-1">{role === 'employee' ? 'Employee ID' : 'Employer ID (Opt.)'}</label><div className="relative"><input type="text" name="employeeId" placeholder={role === 'employee' ? 'Employee ID' : 'Employer ID'} value={formData.employeeId} onChange={handleChange} className="w-full border p-2.5 pl-10 rounded-lg text-sm disabled:bg-gray-200" required={isRequired("employeeId")} /><IdentificationIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" /></div></div>}
                        </div>
                    </fieldset>

                    <AnimatePresence>
                        {isAwaitingOtp && (
                            <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="pt-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">Enter 6-Digit Verification Code</label>
                                <div className="flex justify-center">
                                    <OtpInput length={6} otp={otp} onChange={setOtp} />
                                </div>
                                <p className="text-xs text-center text-gray-500 mt-2">Check your email for the code.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full bg-teal-500 text-white p-3 rounded-lg font-bold hover:bg-teal-600 transition-colors shadow-lg text-sm flex items-center justify-center disabled:opacity-50" disabled={isLoading}>
                        {isLoading ? (<ArrowPathIcon className="h-5 w-5 animate-spin" />) : isAwaitingOtp ? (otp.length === 6 ? 'Verifying...' : 'Complete Verification') : ('Register & Verify')}
                    </motion.button>
                </form>
                <p className="mt-6 text-xs text-center text-gray-500">Already have an account? <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-800">Sign In</Link></p>
            </motion.div>
            <AnimatePresence>
                {message.text && (<NotificationPopup message={message.text} type={message.type} onClose={() => setMessage({ type: "", text: "" })} />)}
            </AnimatePresence>
        </div>
    );
};

export default Register;