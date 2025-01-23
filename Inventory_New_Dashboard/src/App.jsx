import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './components/layouts/AppLayout'; // Import the Layout component
import AdminDashboard from './components/admin/pages/AdminDashboard';
import UserDashboard from './components/users/pages/UserDashboard'; // Assuming you have this component
import UserInventory from './components/users/pages/Inventory'; // Assuming you have this component
import AdminInventory from './components/admin/pages/AdminInventory';
import Batch from './components/admin/pages/Batch';
import Location from './components/admin/pages/Location';
import ApproveRequest from './components/admin/pages/ApproveRequest';
import AddDataDashboard from './components/admin/pages/AddDataDashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(''); // Store role here

  return (
    <UserProvider>
        <Router basename="/inventorymanagement">
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Routes */}
          <Route path="/admin" element={isAuthenticated && role === 'Admin' ? <Layout /> : <Navigate to="/login" />}>
            <Route index element={<Navigate to="/admin/dashboard" />} /> {/* Redirect to dashboard on entering /admin */}
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="admin_inventory" element={<AdminInventory />} />
            <Route path="batch" element={<Batch />} />
            <Route path="location" element={<Location />} />
            <Route path="approve_request" element={<ApproveRequest />} />
            <Route path="add_data_dashboard" element={<AddDataDashboard />} />
          </Route>

          {/* User Routes */}
          <Route path="/user" element={isAuthenticated && role === 'User' ? <Layout /> : <Navigate to="/login" />}>
            <Route index element={<Navigate to="/user/dashboard" />} /> {/* Redirect to dashboard on entering /user */}
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="inventory" element={<UserInventory />} />
           
          </Route>

          {/* Redirect to login for unknown routes */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
      <style jsx global>{`
        * {
          font-family: 'CustomFont', system-ui, sans-serif;
        }

        /* Ant Design specific overrides */
        .ant-btn,
        .ant-input,
        .ant-select,
        .ant-modal-title,
        .ant-tabs-tab,
        .ant-menu-item,
        .ant-dropdown-menu-item,
        .ant-statistic-title,
        .ant-statistic-content,
        .ant-card-head-title,
        .ant-tag,
        .ant-badge,
        .ant-divider,
        .ant-modal-content,
        .ant-space,
        .ant-typography {
          font-family: 'CustomFont', system-ui, sans-serif !important;
        }
      `}</style>
    </UserProvider>
  );
};

export default App;
