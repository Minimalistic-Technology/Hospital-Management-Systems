"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    terms: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasErrors = false;
    const newErrors = {
      email: "",
      terms: "",
    };

    // Validate email
    if (!email.trim()) {
      newErrors.email = "This field is mandatory";
      hasErrors = true;
    } else if (!email.includes("@") || !email.toLowerCase().endsWith("@gmail.com")) {
      newErrors.email = "Please enter a valid Gmail address (e.g., example@gmail.com)";
      hasErrors = true;
    }

    // Validate terms acceptance
    if (!acceptTerms) {
      newErrors.terms = "Please accept the terms of service and privacy policy";
      hasErrors = true;
    }

    setErrors(newErrors);

    if (!hasErrors) {
      router.push(`/otp?email=${encodeURIComponent(email)}`);
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
        {/* Left Section: Signup Form */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          {/* Minimalistic Clinic Logo */}
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
          <h1
            className="text-3xl font-bold text-black mb-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Create an Account
          </h1>
          <h2
            className="text-sm text-black mb-8 text-center"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Create your{" "}
            <span className="text-blue-600 hover:underline">
              Patient Online Services Account
            </span>{" "}
            using the form below.
          </h2>

          {/* Signup Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm bg-white"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 text-black rounded-full text-sm focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="accept-terms"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <label
                htmlFor="accept-terms"
                className="ml-2 text-sm text-gray-700"
              >
                By signing up, I accept the Minimalistic Clinic{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and acknowledge the{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>.
              </label>
            </div>
            {errors.terms && (
              <p className="mb-4 text-xs text-red-500">{errors.terms}</p>
            )}

            {/* Sign up Button */}
            <button
              type="submit"
              className="w-full bg-blue-800 text-white rounded-full py-2 text-sm font-semibold hover:bg-blue-900 transition"
            >
              Next
            </button>

            {/* Login Link */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-700">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Log in.
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Right Section: Quick Access and App Links */}
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

export default SignupPage;