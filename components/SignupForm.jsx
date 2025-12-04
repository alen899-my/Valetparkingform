"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff } from "lucide-react"; 
import { useState } from "react";

// Validation Schema
const schema = yup.object().shape({
  name: yup.string().trim()
    .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, "Enter a valid full name")
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  email: yup.string()
    .trim()
    .lowercase()
    .required("Email is required")
    .email("Enter a valid email address")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Invalid email format"
    ),
    

  phone: yup.string()
    .matches(/^\d{8,14}$/, "Phone number must be between 8 to 14 digits")
    .required("Phone is required"),

  password: yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm Password is required"),
});


export default function SignupForm({ asPopup = false, closePopup }) {
  const router = useRouter();
  const search = useSearchParams();
  const [err, setErr] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);


  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (form) => {
    setErr("");
    setSuccess(false);

    try {
      const endpoint = asPopup ? "/api/admin/add-user" : "/api/auth/signup";
      
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Signup failed");

      if (!asPopup) setSuccess(true);

      if (asPopup && closePopup) {
        closePopup();
      }
    } catch (e) {
      setErr(e.message);
    }
  };

  // --- POPUP OVERLAY WRAPPER ---
  if (asPopup) {
    return (
      <div
        id="signup-popup-overlay"
        onClick={(e) => e.target.id === "signup-popup-overlay" && closePopup()}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[9999] p-4"
      >
        <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-2xl relative animate-in fade-in zoom-in duration-200">
          <button
            onClick={closePopup}
            className="absolute right-5 top-5 text-gray-400 hover:text-gray-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Add New User</h2>
          {renderContent()}
        </div>
      </div>
    );
  }

  // --- STANDARD PAGE WRAPPER ---
  return (
    <div className="w-full max-w-md mx-auto">
      {renderContent()}
      
      <p className="text-sm text-gray-500 text-center mt-6">
        Already have an account?{" "}
        <a href="/login" className="text-[#ae5c83] font-semibold hover:underline">
          Log in
        </a>
      </p>
    </div>
  );

  // --- CORE FORM CONTENT ---
  function renderContent() {
    return (
      <>
        {/* Alerts */}
        {success && !asPopup && (
          <div className=" rounded-xl bg-green-200 border border-green-200 text-green-700 flex flex-col items-center animate-in fade-in slide-in-from-top-2">
            <span className="font-semibold">Account created successfully!</span>
            <button onClick={() => router.push("/login")} className="text-sm underline mt-1">
              Proceed to Login
            </button>
          </div>
        )}

        {err && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center animate-in fade-in slide-in-from-top-2">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* Name Field */}
          <div>
            <label className="label">Full Name:</label>
            <input 
              {...register("name")} 
              className={`input ${errors.name ? "input-error" : ""}`} 
              placeholder="e.g. John Doe" 
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="label">Email Address:</label>
            <input 
              {...register("email")} 
              className={`input ${errors.email ? "input-error" : ""}`} 
              placeholder="john@example.com" 
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
          </div>

          {/* Phone Field */}
          <div>
            <label className="label">Phone Number:</label>
            <input 
              {...register("phone")} 
              className={`input ${errors.phone ? "input-error" : ""}`} 
              placeholder="Enter Your mobile number" 
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone.message}</p>}
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 gap-4">

  {/* Password */}
  <div className="relative">
    <label className="label">Password:</label>
    <input
      type={showPassword ? "text" : "password"}
      {...register("password")}
      className={`input pr-10 ${errors.password ? "input-error" : ""}`}
      placeholder="Password"
    />

    {/* Toggle Icon */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-[42px] text-gray-500 hover:text-black"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>

    {errors.password && (
      <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>
    )}
  </div>


  {/* Confirm Password */}
  <div className="relative">
    <label className="label">Confirm Password:</label>
    <input
      type={showConfirm ? "text" : "password"}
      {...register("confirmPassword")}
      className={`input pr-10 ${errors.confirmPassword ? "input-error" : ""}`}
      placeholder="Confirm Password"
    />

    {/* Toggle Icon */}
    <button
      type="button"
      onClick={() => setShowConfirm(!showConfirm)}
      className="absolute right-3 top-[42px] text-gray-500 hover:text-black"
    >
      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>

    {errors.confirmPassword && (
      <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword.message}</p>
    )}
  </div>

</div>


          {/* Submit Button - CENTERED HERE */}
          <div className="pt-2 flex justify-center">
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="btn-primary justify-center w-full sm:w-auto min-w-[200px]"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 flex border-white/30 border-t-white text-center rounded-full animate-spin" />
              ) : (
                asPopup ? "Add User" : "Create Account"
              )}
            </button>
          </div>
        </form>
      </>
    );
  }
}