"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logincover from "@/utils/logincover.jpg";

import gicon from "@/public/images/gicon.png";
import giticon from "@/public/images/giticon.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff } from "lucide-react";

// ✅ Validation Schema (same as your reference)
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
const [showPassword, setShowPassword] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const [backendError, setBackendError] = useState("");

  // ▶ react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

 useEffect(() => {
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (token && storedUser) {
    if (storedUser.role === "admin") {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/"); // or stay on same page
    }
  }
}, [router]);


  // ▶ Handle login
  const onSubmit = async (form) => {
    setBackendError("");
    setShowSuccess(false);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Login failed");

      // Success banner
      setShowSuccess(true);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

          setTimeout(() => {
      if (data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        
        router.push("/"); 
      }
    }, 1200);

    } catch (e) {
      setBackendError(e.message);
      setShowSuccess(false);
    }
  };

  return (
  <div className="relative min-h-screen w-full">

    {/* ===== Background Image ===== */}
    <Image
      src={logincover}
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover"
      priority
    />

    {/* ===== Overlay (Optional to darken image) ===== */}
    <div className="absolute inset-0 bg-black/30"></div>

    {/* ===== Centered Form ===== */}
    <div className="relative flex items-center justify-center min-h-screen px-6 py-6">

      <div className="w-full max-w-md bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl p-10 rounded-2xl">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#ae5c83] tracking-tight  text-center">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Login to continue to your dashboard
        </p>

        {/* Success Alert */}
       

        {/* Error Alert */}
        {backendError && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 border border-red-300 p-2 rounded-md text-center">
            {backendError}
          </div>
        )}

        {/* ===== FORM ===== */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <label className="label">Email Address</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="input"
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
  <label className="label">Password</label>

  <input
    type={showPassword ? "text" : "password"}
    {...register("password")}
    placeholder="Enter your password"
    className="input pr-10"
  />

  {/* Toggle Icon */}
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-[42px] text-gray-500 hover:text-black transition"
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>

  {errors.password && (
    <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
  )}
</div>


          {/* Button */}
          <button type="submit" className="btn-primary w-full justify-center">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <span className="text-xs text-gray-500">OR</span>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        {/* Signup */}
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?
          <a href="/signup" className="text-[#ae5c83] font-semibold hover:underline ml-1">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  </div>
);

}

