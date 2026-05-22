"use client";

import React, { useState } from "react";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient, handleGoogleLogin } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

const RegisterPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name: userData.name,
      email: userData.email,
      image: userData.imageURL,
      password: userData.password,
    });

    if (error) {
      console.log(error);
      setErrorMsg(error.message || "Registration failed.");
      toast.error("Registration failed.");
      setLoading(false);
      return;
    }

    toast.success("Register successful");
    router.push("/signIn");
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 relative overflow-hidden mt-20">
      
      
      <div className="relative w-full max-w-md">
        
        {/* Loogo / Brand */}
        <div className="text-center mb-8">
      

          <h1 className="text-2xl font-bold text-white tracking-tight">
            Create account
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Join now and book your next game
          </p>
        </div>

        {/* Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl shadow-black/40">

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-5 flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
              {errorMsg}
            </div>
          )}

          <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
            
            {/* Name */}
            <TextField isRequired name="name" type="text" className="w-full">
              <Label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
                Full Name
              </Label>

              <Input
                placeholder="John Doe"
                className="w-full bg-gray-800/60 border border-gray-700 hover:border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500/30 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
              />

              <FieldError className="text-red-400 text-xs mt-1" />
            </TextField>

            {/* Email */}
            <TextField isRequired name="email" type="email" className="w-full">
              <Label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
                Email Address
              </Label>

              <Input
                placeholder="john@example.com"
                className="w-full bg-gray-800/60 border border-gray-700 hover:border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500/30 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
              />

              <FieldError className="text-red-400 text-xs mt-1" />
            </TextField>

            {/* Image URL */}
            <TextField
              isRequired
              name="imageURL"
              type="url"
              className="w-full"
            >
              <Label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
                Profile Image URL
              </Label>

              <Input
                placeholder="https://example.com/profile.png"
                className="w-full bg-gray-800/60 border border-gray-700 hover:border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500/30 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
              />

              <FieldError className="text-red-400 text-xs mt-1" />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              className="w-full"
            >
              <Label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
                Password
              </Label>

              <Input
                placeholder="••••••••"
                className="w-full bg-gray-800/60 border border-gray-700 hover:border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500/30 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
              />

              <Description className="text-gray-600 text-xs mt-1">
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>

              <FieldError className="text-red-400 text-xs mt-1" />
            </TextField>

            {/* Buttons */}
            <div className="flex flex-col gap-3 mt-2 w-full">
              <Button
                type="submit"
                isDisabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl px-6 py-3 text-sm transition-all duration-200 shadow-lg shadow-green-900/30"
              >
                {loading ? (
                  <>Creating account...</>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Sign Up
                  </>
                )}
              </Button>
              <Button
              onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl px-6 py-3 text-sm transition-all duration-200 shadow-lg shadow-green-900/30"
              >
               
               <FaGoogle/> Continue With Google
              </Button>

              <Button
                type="reset"
                className="w-full bg-transparent hover:bg-gray-800 border border-gray-700 hover:border-gray-600 text-gray-400 hover:text-gray-300 font-medium rounded-xl px-6 py-3 text-sm transition-all duration-200"
              >
                Reset
              </Button>
            </div>
          </Form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-xs text-gray-600">or</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/signIn"
              className="text-green-500 hover:text-green-400 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Bottom Note */}
        <p className="text-center text-xs text-gray-700 mt-6">
          By creating an account, you agree to our{" "}
          <span className="text-gray-600 hover:text-gray-500 cursor-pointer transition-colors">
            Terms
          </span>
          {" & "}
          <span className="text-gray-600 hover:text-gray-500 cursor-pointer transition-colors">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;