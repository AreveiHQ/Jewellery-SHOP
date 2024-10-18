"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "@/components/HomePage/Header";
import NavBar from "@/components/HomePage/Navbar";

import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';

// Yup validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email or Phone number is required")
    .test("emailOrPhone", "Must be a valid email or phone number", (value) => {
      const isValidEmail = yup.string().email().isValidSync(value);
      const isValidPhone = /^[0-9]{10}$/.test(value);
      return isValidEmail || isValidPhone;
    }),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/api/users/login", {
        email: data.email,
        password: data.password,
      });

      console.log("Login successful:", response.data);
      toast.success("Login successful!");
      localStorage.setItem('token', response.data.token);
      router.push("/");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        "Error logging in: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <>
      <Header />
      <NavBar />

      <div className="flex justify-center items-center min-h-[80vh] py-10 bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email/Number
              </label>
              <input
                type="email"
                id="email"
                autocomplete="email"
                className="mt-1 block w-full px-3 py-2 bg-[#F2F2F2] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                autocomplete="current-password"
                className="mt-1 block w-full px-3 py-2 bg-[#F2F2F2] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center mb-6">
              <Link
                href="/forgot-password"
                className="text-sm text-red-600 hover:underline"
              >
                Forgot password?
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-[#BC264B] text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-center">
            <Link
              href="/register"
              className="text-sm text-red-600 hover:underline"
            >
              Create a New Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
