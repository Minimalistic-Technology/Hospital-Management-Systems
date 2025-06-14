"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ENewsPage: React.FC = () => {
  // State to manage checkbox selections
  const [healthTopics, setHealthTopics] = useState({
    minimalisticClinicHealth: false,
    arthritis: false,
    osteoporosis: false,
    cancer: false,
    painManagement: false,
    caregiving: false,
    parenting: false,
    diabetes: false,
    digestiveHealthInfant: false,
    digestiveHealthToddler: false,
    digestiveHealthElementary: false,
    digestiveHealthTweenTeen: false,
    generalHealth: false,
    heart: false,
    lgbtqHealth: false,
    mentalHealth: false,
    womenHealth: false,
    orthopedicsSports: false,
    philanthropyNews: false, // Changed from philanthropyNewsletter to philanthropyNews to match the UI
    philanthropyEvents: false,
    philanthropyWaysToGive: false,
    unsubscribe: false,
  });

  // State to manage collapsible sections
  const [isDigestiveHealthOpen, setIsDigestiveHealthOpen] = useState(false);
  const [isPhilanthropyOpen, setIsPhilanthropyOpen] = useState(false);

  // Handle checkbox change
  const handleCheckboxChange = (topic: keyof typeof healthTopics) => {
    setHealthTopics((prev) => ({
      ...prev,
      [topic]: !prev[topic],
    }));
  };

  // Toggle collapsible sections
  const toggleDigestiveHealth = () => setIsDigestiveHealthOpen((prev) => !prev);
  const togglePhilanthropy = () => setIsPhilanthropyOpen((prev) => !prev);

  // Handle form submission (for demonstration purposes)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with selections:", healthTopics);
    // Here you would typically send the data to an API or backend service
  };

  return (
    <div className="min-h-screen bg-gray-100 font-mayoClinicSerif">
      {/* Container */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/logo.png"
            alt="Minimalistic Clinic Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Which Minimalistic Clinic emails do you want to receive?
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-base mb-4">
          What health and wellness subjects interest you? From the options below, check the box next to each area of interest. Give one or more a try. They’re free and you can unsubscribe at any time.
        </p>

        {/* Disclaimer */}
        <p className="text-gray-600 text-base mb-6">
          If you are a Minimalistic Clinic patient, this does not impact your clinical email communications.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email and First Name Inputs */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your first name"
              />
            </div>
          </div>

          {/* Opt-in Text */}
          <p className="text-blue-900 text-sm mb-4 hover:underline cursor-pointer">
            <Link href="#">Click here to opt in to all Minimalistic Clinic email communications listed</Link>
          </p>

          {/* Minimalistic Clinic Health and Research Checkbox */}
          <div className="mb-4">
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={healthTopics.minimalisticClinicHealth}
                onChange={() => handleCheckboxChange("minimalisticClinicHealth")}
                className="mt-1 h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="ml-3">
                <span className="text-gray-900 font-semibold text-base">
                  Minimalistic Clinic — Health and Research
                </span>
                <p className="text-gray-600 text-sm mt-1">
                  Stay connected through up-to-date health information, products, and services. Learn more about Minimalistic Clinic’s mission and receive special offers.
                </p>
              </div>
            </label>
          </div>

          {/* Health Topics Section */}
          <div className="mb-6">
            <p className="text-gray-900 font-semibold text-base mb-2">
              Health Topics (Click to expand or collapse. Check the box to customize the type of content you receive.)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={healthTopics.arthritis}
                  onChange={() => handleCheckboxChange("arthritis")}
                  className="h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900 text-sm">Arthritis</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={healthTopics.osteoporosis}
                  onChange={() => handleCheckboxChange("osteoporosis")}
                  className="h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900 text-sm">Osteoporosis</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={healthTopics.cancer}
                  onChange={() => handleCheckboxChange("cancer")}
                  className="h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900 text-sm">Cancer</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={healthTopics.painManagement}
                  onChange={() => handleCheckboxChange("painManagement")}
                  className="h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900 text-sm">Pain Management</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={healthTopics.caregiving}
                  onChange={() => handleCheckboxChange("caregiving")}
                  className="h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900 text-sm">Caregiving (including dementia)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={healthTopics.parenting}
                  onChange={() => handleCheckboxChange("parenting")}
                  className="h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900 text-sm">Parenting and Children’s Health</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={healthTopics.diabetes}
                  onChange={() => handleCheckboxChange("diabetes")}
                  className="h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900 text-sm">Diabetes</span>
              </label>
              <div>
                <button
                  type="button"
                  onClick={toggleDigestiveHealth}
                  className="flex items-center text-blue-900 text-sm hover:underline focus:outline-none"
                >
                  <input
                    type="checkbox"
                    checked={
                      healthTopics.digestiveHealthInfant ||
                      healthTopics.digestiveHealthToddler ||
                      healthTopics.digestiveHealthElementary ||
                      healthTopics.digestiveHealthTweenTeen
                    }
                    onChange={() => {}}
                    className="h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-900">Digestive Health</span>
                  <span className="ml-1">{isDigestiveHealthOpen ? "▼" : "▶"}</span>
                </button>
                {isDigestiveHealthOpen && (
                  <div className="ml-8 mt-2 flex flex-col gap-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={healthTopics.digestiveHealthInfant}
                        onChange={() => handleCheckboxChange("digestiveHealthInfant")}
                        className="h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-900 text-sm">Infant’s First Year (0-1)</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={healthTopics.digestiveHealthToddler}
                        onChange={() => handleCheckboxChange("digestiveHealthToddler")}
                        className="h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-900 text-sm">Toddler (2-4)</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={healthTopics.digestiveHealthElementary}
                        onChange={() => handleCheckboxChange("digestiveHealthElementary")}
                        className="h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-900 text-sm">Elementary Children (5-10)</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={healthTopics.digestiveHealthTweenTeen}
                        onChange={() => handleCheckboxChange("digestiveHealthTweenTeen")}
                        className="h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-900 text-sm">Tween & Teen (11-17)</span>
                    </label>
                  </div>
                )}
              </div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={healthTopics.generalHealth}
                  onChange={() => handleCheckboxChange("generalHealth")}
                  className="h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900 text-sm">General Health and Wellness</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={healthTopics.heart}
                  onChange={() => handleCheckboxChange("heart")}
                  className="h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900 text-sm">Heart</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={healthTopics.lgbtqHealth}
                  onChange={() => handleCheckboxChange("lgbtqHealth")}
                  className="h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900 text-sm">LGBTQ+ Health</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={healthTopics.mentalHealth}
                  onChange={() => handleCheckboxChange("mentalHealth")}
                  className="h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900 text-sm">Mental Health</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={healthTopics.womenHealth}
                  onChange={() => handleCheckboxChange("womenHealth")}
                  className="h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900 text-sm">Women's Health</span>
              </label>
            </div>
          </div>

          {/* Orthopedics and Sports Medicine */}
          <div className="mb-6">
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={healthTopics.orthopedicsSports}
                onChange={() => handleCheckboxChange("orthopedicsSports")}
                className="mt-1 h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="ml-3">
                <span className="text-gray-900 font-semibold text-base">
                  Orthopedics and Sports Medicine
                </span>
                <p className="text-gray-600 text-sm mt-1">
                  Be the first to know about news and events and receive tips and information from Minimalistic Clinic Sports Medicine experts.
                </p>
              </div>
            </label>
          </div>

          {/* Minimalistic Clinic Philanthropy */}
          <div className="mb-6">
            <div className="flex items-start">
              <button
                type="button"
                onClick={togglePhilanthropy}
                className="flex items-center text-blue-900 text-sm hover:underline focus:outline-none"
              >
                <input
                  type="checkbox"
                  checked={
                    healthTopics.philanthropyNews ||
                    healthTopics.philanthropyEvents ||
                    healthTopics.philanthropyWaysToGive
                  }
                  onChange={() => {}}
                  className="mt-1 h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="ml-3">
                  <span className="text-gray-900 font-semibold text-base">
                    Minimalistic Clinic — Philanthropy (Check the box for all philanthropy news, or choose which topic you would like to receive more information about below.)
                  </span>
                </div>
                <span className="ml-1">{isPhilanthropyOpen ? "▼" : "▶"}</span>
              </button>
            </div>
            <p className="text-gray-600 text-sm mt-1 ml-8">
              Stay informed to see how philanthropy is making a difference for patients every day, and learn about ways you can support Minimalistic Clinic’s vision to revolutionize health care.
            </p>
            {isPhilanthropyOpen && (
              <div className="ml-8 mt-2 flex flex-col gap-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={healthTopics.philanthropyNews}
                    onChange={() => handleCheckboxChange("philanthropyNews")}
                    className="h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <span className="text-gray-900 text-sm">Newsletter and Announcement</span>
                    <p className="text-gray-600 text-sm mt-1">
                      A behind-the-scenes look at Minimalistic Clinic’s vision for the future through our priorities in clinical practice, research and education
                    </p>
                  </div>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={healthTopics.philanthropyEvents}
                    onChange={() => handleCheckboxChange("philanthropyEvents")}
                    className="h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <span className="text-gray-900 text-sm">Event Invitations</span>
                    <p className="text-gray-600 text-sm mt-1">
                      Exclusive invitations to hear the latest from Minimalistic Clinic experts in clinical practice, research and education
                    </p>
                  </div>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={healthTopics.philanthropyWaysToGive}
                    onChange={() => handleCheckboxChange("philanthropyWaysToGive")}
                    className="h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <span className="text-gray-900 text-sm">Ways to Give</span>
                    <p className="text-gray-600 text-sm mt-1">
                      Opportunities to support Minimalistic Clinic’s mission and patients everywhere
                    </p>
                  </div>
                </label>
              </div>
            )}
          </div>

          {/* Required Fields Note */}
          <p className="text-gray-600 text-sm mb-4">
            At least one of these fields is required.
          </p>

          {/* Unsubscribe Section */}
          <div className="mb-6">
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={healthTopics.unsubscribe}
                onChange={() => handleCheckboxChange("unsubscribe")}
                className="mt-1 h-5 w-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="ml-3">
                <span className="text-gray-900 font-semibold text-base">
                  Unsubscribe from Minimalistic Clinic email marketing and philanthropic communications listed above.
                </span>
                <p className="text-gray-600 text-sm mt-1">
                  (Check the box to unsubscribe from the emails above.)
                </p>
              </div>
            </label>
          </div>

          {/* Additional Communications Section */}
          <div className="mb-6">
            <p className="text-gray-900 font-semibold text-base mb-2">
              Additional Minimalistic Clinic communications:
            </p>
            <p className="text-gray-600 text-sm">
              To stop receiving other communications, send an email message to{" "}
              <a href="mailto:minimalisticsupport@service.minimalistic.org" className="text-blue-900 hover:underline">
                minimalisticsupport@service.minimalistic.org
              </a>{" "}
              or send regular mail to the following postal address:
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Minimalistic Privacy Officer<br />
              MinimalisticClinic.org<br />
              200 First St. SW<br />
              Rochester, MN 55905
            </p>
          </div>

          {/* Privacy Policy Notice */}
          <p className="text-gray-600 text-sm mb-6">
            By subscribing, you agree to Minimalistic Clinic’s use of your data to send you email. For more information, please review our{" "}
            <a href="#" className="text-blue-900 hover:underline">
              Privacy Policy
            </a>.
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ENewsPage;