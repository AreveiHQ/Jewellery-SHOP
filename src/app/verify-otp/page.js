"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    if (e.target.value.length <= 6) {
      setOtp(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy OTP validation logic
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
    } else {
      setError('');
      // Call API to verify OTP
      router.push('/reset-password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
            <input
              type="text"
              id="otp"
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              value={otp}
              onChange={handleChange}
              maxLength={6}
              placeholder='XXXXXX'
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            Reset Password
          </button>
        </form>
        <p className="text-center mt-4 text-red-600">
          Still having trouble? <a href="/contact-support" className="underline">Contact Admin</a>
        </p>
      </div>
    </div>
  );
}
