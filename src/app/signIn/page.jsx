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
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
    });

    if (error) {
      setErrorMsg(error.message || "Invalid email or password.");
      setLoading(false);
    }
    if (data) {
      redirect("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 relative overflow-hidden mt-20">

   

      <div className="relative w-full max-w-md">

        {/* Logo / Bra6nd */}
        <div className="text-center mb-8">
      
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to book your next game</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl shadow-black/40">

          {/* Error messsage */}
          {errorMsg && (
            <div className="mb-5 flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
             
              {errorMsg}
            </div>
          )}

          <Form className="flex flex-col gap-5" onSubmit={onSubmit}>

            {/* Email */}
            <TextField isRequired name="email" type="email" className="w-full">
              <Label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
                Email address
              </Label>
              <Input
                placeholder="akilanjum@example.com"
                className="w-full bg-gray-800/60 border border-gray-700 hover:border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500/30 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
              />
              <FieldError className="text-red-400 text-xs mt-1" />
            </TextField>

            {/* Password */}
            <TextField isRequired minLength={8} name="password" type="password" className="w-full">
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Password
                </Label>
                <Link href="/forgot-password" className="text-xs text-green-500 hover:text-green-400 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <Input
                placeholder="••••••••"
                className="w-full bg-gray-800/60 border border-gray-700 hover:border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500/30 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
              />
              <Description className="text-gray-600 text-xs mt-1">
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError className="text-red-400 text-xs mt-1" />
            </TextField>

            {/* Submit */}
            <div className="flex flex-col gap-3 mt-2">
              <Button
                type="submit"
                isDisabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl px-6 py-3 text-sm transition-all duration-200 shadow-lg shadow-green-900/30"
              >
                {loading ? (
                  <>
                    
                    Signing in...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </Button>

              <Button
                type="reset"
                className="w-full bg-transparent hover:bg-gray-800 border border-gray-700 hover:border-gray-600 text-gray-400 hover:text-gray-300 font-medium rounded-xl px-6 py-3 text-sm transition-all duration-200"
              >
                Reset
              </Button>
            </div>

          </Form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-xs text-gray-600">or</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/signUp" className="text-green-500 hover:text-green-400 font-medium transition-colors">
              Create one free
            </Link>
          </p>

        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-gray-700 mt-6">
          By signing in, you agree to our{" "}
          <span className="text-gray-600 hover:text-gray-500 cursor-pointer transition-colors">Terms</span>
          {" & "}
          <span className="text-gray-600 hover:text-gray-500 cursor-pointer transition-colors">Privacy Policy</span>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;