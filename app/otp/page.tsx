"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const OtpPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({
    otp: "",
  });
  const [isMounted, setIsMounted] = useState(false);

  // Ensure the component is mounted on the client side
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

  const handleVerifyOtp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let hasErrors = false;
    const newErrors = {
      otp: "",
    };

    // Validate OTP field
    if (!otp.trim()) {
      newErrors.otp = "OTP is required";
      hasErrors = true;
    } else if (!/^\d{6}$/.test(otp)) {
      newErrors.otp = "OTP must be a 6-digit number";
      hasErrors = true;
    }

    setErrors(newErrors);

    if (!hasErrors) {
      // Navigate to password page with email as query parameter
      router.push(`/password?email=${encodeURIComponent(email)}`);
    }
  };

  const handleResendCode = () => {
    console.log("Resending OTP to:", email);
    alert(`A new OTP has been sent to ${email}`);
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
        {/* Left Section: OTP Form */}
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

          {/* Header Text */}
          <h1
            className="text-3xl font-bold text-black mb-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Verify Your Email
          </h1>
          <p
            className="text-sm text-black mb-8 text-center"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Enter the 6-digit code we sent to{" "}
            <span className="font-medium">{email}</span>
          </p>

          {/* OTP Form */}
          <div
            className="w-full max-w-sm bg-white"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {/* OTP Field */}
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-sm text-gray-700 mb-1"
              >
                OTP
              </label>
              <input
                type="text"
                id="otp"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-center"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              {errors.otp && (
                <p className="mt-1 text-xs text-red-500">{errors.otp}</p>
              )}
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-blue-800 text-white rounded-full py-2 text-sm font-semibold hover:bg-blue-700 transition"
            >
              Verify OTP
            </button>

            {/* Resend Code Link */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-700">
                Didn’t receive a code?{" "}
                <button
                  onClick={handleResendCode}
                  className="text-blue-600 hover:underline"
                >
                  Resend code
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Quick Access */}
        <div
          className="w-1/3 bg-blue-800 text-white p-8 flex flex-col justify-center"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {/* Quick Access Links */}
          
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

export default OtpPage;