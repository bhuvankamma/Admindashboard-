import React from 'react';
// 1. Import necessary components for routing
import { Routes, Route } from 'react-router-dom';

// 2. Import your components using the paths from your original code
import AdminLogin from './components/AdminLogin';
import AdminDashboardPage from './components/AdminDashboard'; 
// If you don't have AdminDashboardPage yet, you'll need to create a simple file for it.

// (Optional imports, uncomment as needed)
// import UserDashboardPage from './components/UserDashboard';
// import AdditionalPage from './components/AdditionalPage'
// import EmployersLogin from './components/EmployersLogin'
// import EmployerRegister from './components/EmployersRegister';


function App() {
  return (
    <div className="App">
      {/* 3. Define the routes using <Routes> and <Route> */}
      <Routes>
        {/* Route for the Login Form (The component that was fixed with useNavigate) */}
        <Route path="/" element={<AdminLogin />} />
        {/* <AdditionalPage/> */}
        {/* Route for the Admin Dashboard (The successful login target) */}
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        
        {/* Add other routes here, uncommenting their imports above */}
        {/* <Route path="/user-dashboard" element={<UserDashboardPage />} /> */}
        {/* <Route path="/employers/login" element={<EmployersLogin />} /> */}
        {/* <Route path="/employers/register" element={<EmployerRegister />} /> */}
        
      </Routes>
    </div>
  );
}
export default App;