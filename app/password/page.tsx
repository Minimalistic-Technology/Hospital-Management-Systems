"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
// import { Eye, EyeOff } from "lucide-react";

const PasswordPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    password: "",
    apiError: "",
  });
  const [isMounted, setIsMounted] = useState(false);

  // Ensure the component is mounted on the client side before accessing hooks
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Extract email and handle redirection after mounting
  useEffect(() => {
    if (!isMounted) return;

    const emailFromParams = searchParams.get("email") || "";
    setEmail(emailFromParams);

    // If no email is provided, redirect back to signup page
    if (!emailFromParams) {
      router.push("/signup");
    }
  }, [isMounted, searchParams, router]);

  // Prevent rendering until the component is mounted
  if (!isMounted) {
    return null;
  }

  interface PasswordStrength {
    label: string;
    width: string;
    color: string;
  }

  const getPasswordStrength = (pwd: string): PasswordStrength => {
    if (pwd.length === 0) return { label: "", width: "0%", color: "" };

    let types = 0;
    if (/[a-z]/.test(pwd)) types++;
    if (/[A-Z]/.test(pwd)) types++;
    if (/[0-9]/.test(pwd)) types++;
    if (/[^a-zA-Z0-9]/.test(pwd)) types++;

    if (types === 1) {
      if (pwd.length >= 14) return { label: "Good", width: "60%", color: "bg-yellow-500" };
      else if (pwd.length >= 10) return { label: "Poor", width: "40%", color: "bg-orange-500" };
      else if (pwd.length >= 8) return { label: "Very Poor", width: "20%", color: "bg-red-500" };
    }

    if (types === 2 && pwd.length >= 8) return { label: "Good", width: "60%", color: "bg-yellow-500" };
    if (types === 3 && pwd.length >= 8) return { label: "Strong", width: "80%", color: "bg-blue-500" };
    if (types === 4 && pwd.length >= 8) return { label: "Very Strong", width: "100%", color: "bg-green-500" };

    return { label: "Very Poor", width: "20%", color: "bg-red-500" };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleContinue = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let hasErrors = false;
    const newErrors = {
      fullName: "",
      password: "",
      apiError: "",
    };

    // Validate PasswordPage fields
    if (!fullName.trim()) {
      newErrors.fullName = "This field is mandatory";
      hasErrors = true;
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      hasErrors = true;
    }

    setErrors(newErrors);

    if (!hasErrors) {
      try {
        console.log("Sending signup request with payload:", { username: fullName, email, password });
        const response = await fetch("http://localhost:5000/api/v1/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: fullName.trim().toLowerCase(),
            email,
            password,
          }),
        });

        const data = await response.json();
        console.log("Signup response:", response.status, data);
        if (!response.ok) {
          setErrors((prev) => ({
            ...prev,
            apiError: data.message || "Signup failed. Please try again.",
          }));
          return;
        }

        // On successful signup, redirect to login
        alert("Account created successfully! Please log in.");
        router.push("/login");
      } catch (error) {
        console.error("Signup error:", error);
        setErrors((prev) => ({
          ...prev,
          apiError: "An error occurred during signup. Please try again.",
        }));
      }
    }
  };

  // Get current date and time in IST
  const currentDateTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Section: Password Form */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          {/* Mayo Clinic Logo */}
          <div className="mb-8">
            <Link href="/">
              <Image
                src="https://assets.mayoclinic.org/content/dam/mayoclinic/images/logos/mayo-clinic-logo.svg"
                alt="Minimalistic Clinic Logo"
                width={40}
                height={40}
                priority
              />
            </Link>
          </div>

          {/* Header Text */}
          <h1
            className="text-3xl font-bold text-black mb-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Set Up Your Account
          </h1>
          <p
            className="text-sm text-black mb-8 text-center"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Finish setting up your account
          </p>

          {/* Password Form */}
          <div
            className="w-full max-w-sm bg-white"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {/* Email Address Field (Disabled) */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="text"
                id="email"
                value={email}
                disabled
                className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 text-gray-700"
              />
            </div>

            {/* Legal Full Name Field */}
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-sm text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter full name"
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600"
                >
                  {showPassword }
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-1">
                  Password Strength:
                </label>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${passwordStrength.color}`}
                    style={{ width: passwordStrength.width }}
                  />
                </div>
                <p className="text-sm text-gray-700 mt-1">
                  {passwordStrength.label}
                </p>
              </div>
            )}

            {/* API Error Message */}
            {errors.apiError && (
              <p className="mb-4 text-center text-xs text-red-500">
                {errors.apiError}
              </p>
            )}

            {/* Terms and Privacy */}
            <p className="text-center text-sm text-gray-700 mb-4">
              By signing up, I accept the Minimalistic Clinic{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and acknowledge the{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </p>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full bg-blue-800 text-white rounded-full py-2 text-sm font-semibold hover:bg-blue-700 transition"
            >
              Continue
            </button>
          </div>
        </div>

        {/* Right Section: Quick Access */}
        <div
          className="w-1/3 bg-blue-800 text-white p-8 flex flex-col justify-center"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          
        </div>
      </div>

      {/* Footer with Dynamic Date */}
      <footer
        className="w-full border-t border-gray-200 py-4 text-center text-sm text-gray-700"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        <div className="flex flex-col items-center space-y-1">
          <span className="font-semibold uppercase text-md underline">
            Legal restrictions and terms of use applicable to this site
          </span>
          <span className="text-gray-400">
            Use of this site signifies your agreement to the terms of use.
          </span>
          <span>
            © 1998 - 2025 Minimalistic Foundation for Medical Education and Research.
            All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default PasswordPage;