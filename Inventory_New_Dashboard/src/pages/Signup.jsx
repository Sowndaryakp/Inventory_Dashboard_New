import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Select, message } from 'antd';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import motion for animations

const { Option } = Select;

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User'); // Default role is 'user'
  const [passkey, setPasskey] = useState(''); // Passkey input for Admin

  const shopFloorBg =
    'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTEyL3Jhd3BpeGVsX29mZmljZV8zMF9hX2xhcmdlX3dhcmVob3VzZV93aXRoX251bWVyb3VzX2l0ZW1zLV9yb3dzX18yNTczODc0OC00ZTlhLTQ4MDgtOTMwOS05MzgzYWZhY2JmNTRfMS5qcGc.jpg';

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRoleChange = (value) => {
    setRole(value);
    // Reset passkey if switching to 'user'
    if (value === 'User') {
      setPasskey('');
    }
  };

  const handleSignup = async () => {
    if (!username || !email || !password) {
      message.error('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      message.error('Please enter a valid email address (e.g., example@example.com).');
      return;
    }

    // If the role is 'Admin', ensure the passkey is provided
    if (role === 'Admin' && !passkey) {
      message.error('Passkey is required for admin registration.');
      return;
    }

    try {
      const response = await axios.post('http://172.18.7.93:7002/register', {
        username: username,
        email: email,
        password: password,
        role: role,
        passkey: role === 'Admin' ? passkey : null, // Use passkey only for admin
      });

      if (response.status === 201 || response.status === 200) {
        message.success(response.data.message);
        navigate('/login');
      }
    } catch (error) {
      message.error('Signup failed. Please try again.');
      console.error('There was an error during the signup process:', error);
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
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="bg-white shadow-xl p-8 rounded w-full max-w-md border border-gray-200 backdrop-blur-md bg-white/90"
      >
        <h2 className="text-2xl mb-6 text-center text-sky-950">Signup</h2>
        
        <Input
          placeholder="Username"
          className="mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Email"
          className="mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input.Password
          placeholder="Password"
          className="mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Select
          className="mb-4 w-full"
          value={role}
          onChange={handleRoleChange}
        >
          <Option value="User">User</Option>
          <Option value="Admin">Admin</Option>
        </Select>
        {role === 'Admin' && (
          <Input.Password
            placeholder="Enter Admin Passkey"
            className="mb-6"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
          />
        )}
        <Button
          className="text-white hover:text-sky-500 bg-sky-600 w-full"
          onClick={handleSignup}
        >
          Signup
        </Button>
        <div className="text-center mt-4">
          <Link to="/login" className="text-sky-500 hover:text-sky-800">
            Already have an account? Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
