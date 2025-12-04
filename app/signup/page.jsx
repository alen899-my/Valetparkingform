"use client";

import Image from "next/image";
import cover from "@/utils/cover.jpg";
import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    // 1. Main Container: Relative to hold the image, Flex to center the form
    <div className="relative flex min-h-screen w-full items-center justify-center p-4">

      {/* 2. Background Image Layer */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={cover} 
          fill 
          className="object-cover" 
          alt="Background" 
          priority 
        />
        {/* Optional: Dark Overlay to make the white form pop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      {/* 3. Foreground Form Card */}
      {/* z-10 ensures it sits on top of the image */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        <div className="flex flex-col items-center px-8 py-5">
          <h1 className="text-3xl font-bold text-[#ae5c83] ">Create Account</h1>
          <h3 className="text-gray-500  text-center">
            Enter your details below to get started
          </h3>

          {/* Render the Form */}
          <div className="w-full">
            <SignupForm />
          </div>
        </div>
        
      </div>

    </div>
  );
}