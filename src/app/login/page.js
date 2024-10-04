// pages/login.js
"use client"
import { useState } from 'react';
import Header from "@/components/HomePage/Header";
import NavBar from "@/components/HomePage/Navbar";
import Link from 'next/link';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password });
  };

  return (
    <>
    <Header/>
    <NavBar/>

    <div className="flex justify-center items-center min-h-[80vh] py-10 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email/Number</label>
            <input
              type="text"
              id="email"
              className="mt-1 block w-full px-3 py-2 bg-[#F2F2F2] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 bg-[#F2F2F2] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <Link href="forgot-password" className="text-sm text-red-600 hover:underline">Forgot password?</Link>
            <button
              type="submit"
              className="px-4 py-2 bg-[#BC264B] text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <a href="/create-account" className="text-sm text-red-600 hover:underline">
            Create a New Account
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
