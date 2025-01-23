import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Card, Typography, message } from 'antd';
import { motion } from 'framer-motion'; // Import motion for animations
import { useUser } from '../components/UserContext';
import cmtilogo from '../../public/images/cmti_logo.png'

const { Text } = Typography;

const Login = ({ setIsAuthenticated, setRole }) => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const shopFloorBg =
    'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTEyL3Jhd3BpeGVsX29mZmljZV8zMF9hX2xhcmdlX3dhcmVob3VzZV93aXRoX251bWVyb3VzX2l0ZW1zLV9yb3dzX18yNTczODc0OC00ZTlhLTQ4MDgtOTMwOS05MzgzYWZhY2JmNTRfMS5qcGc.jpg';

  const handleLogin = () => {
    // Default credentials
    const adminCredentials = { username: 'cmti', password: 'cmti' };
    const userCredentials = { username: 'user', password: 'user' };

    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    // Check credentials
    if (username === adminCredentials.username && password === adminCredentials.password) {
      const userRole = 'Admin';
      setUser({ username, role: userRole }); // Update user context
      setRole(userRole); // Set role in state
      message.success('Login successful');
      setIsAuthenticated(true);
      navigate('/admin/dashboard', { replace: true });
    } else if (username === userCredentials.username && password === userCredentials.password) {
      const userRole = 'User';
      setUser({ username, role: userRole }); // Update user context
      setRole(userRole); // Set role in state
      message.success('Login successful');
      setIsAuthenticated(true);
      navigate('/user/dashboard', { replace: true });
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${shopFloorBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <Card
        className="backdrop-blur-md bg-white/90 shadow-2xl rounded-2xl overflow-hidden border-0 w-full max-w-lg p-6"
        bordered={false}
      >
        {/* Header with Logos */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center"
        >
          <div className="bg-sky-50 text-white py-6 -mt-6 -mx-6 rounded-t-xl">

            <div className="flex items-center justify-center text-left">
              <Text className="text-slate-700 text-xl font-bold">
                Inventory Management System
              </Text>
            </div>

            {/* Divider */}
            <div className="w-3/4 mx-auto border-t border-sky-400/30 my-4" />

            {/* Powered By Section */}
            <div className="flex items-center justify-center gap-2">
              <Text className="text-slate-700 text-sm">Powered by</Text>
              <img
                src={cmtilogo}
                alt="CMTI Logo"
                className="h-8 object-contain"
              />
            </div>
          </div>
        </motion.div>

        {/* Login Form */}
        <div className="mt-6">
          <Input
            placeholder="Username"
            className="mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input.Password
            placeholder="Password"
            className="mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Button
            className="text-white hover:text-sky-500 bg-sky-600 w-full"
            onClick={handleLogin}
          >
            Login
          </Button>
          <div className="text-center mt-4">
            <Link to="/signup" className="text-sky-500 hover:text-sky-800">
              Don't have an account? Signup
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
