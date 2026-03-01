import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Added state for password visibility
  const [loading, setLoading] = useState(false); // Added loading state
  

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          toast.success('Admin login successful!');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });
        if (data.success) {
          localStorage.setItem('dToken', data.token);
          setDToken(data.token);
          toast.success('Doctor login successful!');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center bg-gray-50"
    >
      <div className="flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-[400px] border rounded-xl bg-white text-[#333] shadow-lg">
        <p className="text-2xl font-bold text-center w-full">
          {state} <span className="text-blue-400">Login</span>
        </p>
        <div className="w-full">
          <label className="block text-sm font-medium">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-gray-300 rounded w-full p-2 mt-1 focus:outline-blue-600"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="w-full relative">
          <label className="block text-sm font-medium">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-gray-300 rounded w-full p-2 mt-1 focus:outline-blue-600"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            required
          />
          <span
            className="absolute mt-3 right-3 top-[50%] translate-y-[-50%] text-gray-600 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
          </span>
        </div>
        <button
          disabled={loading}
          className={`w-full py-2 rounded-md text-white text-base ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary cursor-pointer'
          }`}
        >
          {loading ? 'Processing...' : 'Login'}
        </button>
        {state === 'Admin' ? (
          <p className="text-sm text-gray-600">
            Doctor Login?{' '}
            <span
              className="text-blue-600 underline cursor-pointer"
              onClick={() => setState('Doctor')}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Admin Login?{' '}
            <span
              className="text-blue-400 underline cursor-pointer"
              onClick={() => setState('Admin')}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
