"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  interface LoginResponse {
    accessToken: string;
    error?: string;
    [key: string]: any;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      // Login request
      const loginResponse = await fetch("http://localhost:5000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const loginData: LoginResponse = await loginResponse.json();
      if (!loginResponse.ok) {
        setError(loginData.error || "Invalid email or password");
        return;
      }

      // Store access token
      localStorage.setItem("accessToken", loginData.accessToken);

      // Fetch user details
      const userResponse = await fetch("http://localhost:5000/api/v1/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${loginData.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const userData = await userResponse.json();
      if (!userResponse.ok) {
        setError(userData.error || "Failed to fetch user details.");
        return;
      }

      // Store user details in localStorage
      localStorage.setItem("username", userData.username);
      localStorage.setItem("email", userData.email);
      localStorage.setItem("isLoggedIn", "true");

      alert("Login successful!");
      router.push(`/?username=${encodeURIComponent(userData.username)}&email=${encodeURIComponent(userData.email)}`);
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Assuming a logout API endpoint exists
      await fetch("http://localhost:5000/api/v1/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        credentials: "include",
      });

      // Clear localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("isLoggedIn");

      alert("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout. Please try again.");
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
        {/* Left Section: Login Form */}
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

          {/* Welcome Text */}
          <h1 className="text-3xl font-bold text-black mb-2" style={{ fontFamily: "Georgia, serif" }}>
            Welcome
          </h1>
          <h2 className="text-lg text-black mb-8" style={{ fontFamily: "Arial, sans-serif" }}>
            Log in to Patient Portal
          </h2>

          {/* Login Form */}
          <form
            onSubmit={handleLogin}
            className="w-full max-w-md bg-white text-black border border-gray-200 rounded-lg p-6 shadow-sm"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {/* Error Message */}
            {error && (
              <p className="mb-4 text-center text-xs text-red-500">{error}</p>
            )}

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm text-black mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 text-black rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-sm text-black mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full border border-gray-300 text-black rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600"
                  disabled={isLoading}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Log in Button */}
            <button
              type="submit"
              className="w-full bg-blue-800 text-white rounded-full py-2 text-sm font-semibold hover:bg-blue-900 transition disabled:bg-blue-400"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>

            {/* Forgot Username/Password Link */}
            <div className="mt-4 text-center">
              <Link href="/forgot-credentials" className="text-blue-600 text-sm hover:underline underline">
                Forgot username or password?
              </Link>
            </div>

            {/* Create Account Link */}
            <div className="mt-2 text-center">
              <p className="text-sm text-gray-700">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:underline underline">
                  Create one now.
                </Link>
              </p>
            </div>
          </form>

          {/* Account Help Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700">
              Online support can be found under{" "}
              <Link href="/account-help" className="text-blue-600 hover:underline underline">
                Account help.
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section: Quick Access and App Links */}
        <div
          className="w-1/3 bg-blue-800 text-white p-8 flex flex-col justify-center"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {/* Quick Access Links */}
          <h3 className="text-sm font-semibold mb-4">QUICK ACCESS</h3>
          <div className="space-y-4">
            <Link href="/pay-bill" className="flex items-center space-x-2 hover:underline">
              <span className="text-xl">💵</span>
              <span>Pay a bill</span>
            </Link>
            <Link href="/refill-prescription" className="flex items-center space-x-2 hover:underline">
              <span className="text-xl">📦</span>
              <span>Refill a prescription</span>
            </Link>
          </div>

          {/* App Download Links */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-4">GET THE Minimalistic CLINIC APP</h3>
            <div className="flex space-x-4">
              <Link href="https://play.google.com/store">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  width={135}
                  height={40}
                />
              </Link>
              <Link href="https://www.apple.com/app-store/">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                />
              </Link>
            </div>
          </div>
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
          <span className="text-gray-400">Use of this site signifies your agreement to the terms of use.</span>
          <span>© 1998 - 2025 Minimalistic Foundation for Medical Education and Research. All rights reserved.</span>
          <span className="text-gray-400">|</span>
          <span>{currentDateTime}</span>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;