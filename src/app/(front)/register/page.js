"use client";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import NavBar from "@/components/HomePage/Navbar";
import Link from 'next/link';
import axiosInstance from '@/utils/axiosInstance';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify components

// Yup validation schema for sign-up
const signupSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  email: yup.string().required('Email is required').email('Must be a valid email'),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/api/users/signup', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      console.log('User created successfully:', response.data);
      toast.success('User created successfully!'); // Show success message
    } catch (error) {
      console.error('Error creating user:', error.response ? error.response.data : error.message);
      toast.error(error.response?.data?.errors || 'Error creating user.'); // Show error message
    }
  };

  return (
    <>
      <NavBar />

      <div className="flex justify-center items-center min-h-[80vh] py-0 sm:py-10 bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full px-3 py-2 bg-[#F2F2F2] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                {...register('name')}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 bg-[#F2F2F2] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                {...register('email')}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                id="phone"
                className="mt-1 block w-full px-3 py-2 bg-[#F2F2F2] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                {...register('phone')}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 bg-[#F2F2F2] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                {...register('password')}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 block w-full px-3 py-2 bg-[#F2F2F2] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <div className="flex justify-between items-center mb-6">
              <Link href="/login" className="text-sm text-red-600 hover:underline">Already have an account? Login</Link>
              <button
                type="submit"
                className="px-4 py-2 bg-[#BC264B] text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer /> {/* Add ToastContainer to the component */}
    </>
  );
}
