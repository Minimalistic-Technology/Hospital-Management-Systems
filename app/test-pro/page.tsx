
// test-pro/page.tsx
'use client';

import React, { useState } from 'react';
import Header from '@/app/components/Homepage/page';
import Footer from '@/app/components/Footer/page';
import Link from 'next/link';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
const disabled = [ 'Q', 'Y', 'Z'];

const TestsProceduresPage = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleLetterClick = (letter: string) => {
    if (!disabled.includes(letter)) {
      setSelected(letter);
      // Future: fetch tests/procedures for `letter`
    }
  };

  const advertisementLinks = [
    { label: "NEW: Mayo Clinic Guide to Better Sleep", href: "#" },
    { label: "Listen to Health Matters Podcast", href: "#" },
    { label: "Mayo Clinic on Incontinence", href: "#" },
    { label: "The Essential Diabetes Book", href: "#" },
    { label: "FREE Mayo Clinic Diet Assessment", href: "#" },
    { label: "Mayo Clinic Health Letter - FREE book", href: "#", bold: true },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-black px-10 py-6 font-mayoSans" style={{ fontFamily: "'mayo-sans', 'Times', sans-serif" }}>
      {/* Header */}
      <Header />

      {/* Tests and Procedures Section */}
      <section className="max-w-7xl mx-auto w-full">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 font-mayoDisplay" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
          Tests and Procedures
        </h1>
        <p className="text-gray-600 text-lg mb-12">
          What it is, how it’s done, how to prepare, risks and results.
        </p>

        {/* Main Content: Alphabet Left, Advertisement Right */}
        <div className="flex justify-center gap-10 w-full">
          {/* Alphabet Grid and Sections aligned left */}
          <div className="flex-1 max-w-[calc(100%_-_320px)]">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 font-mayoDisplay" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
              Find a test or procedure by its first letter
            </h2>
            <div className="grid grid-cols-13 gap-3 mb-12">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleLetterClick(letter)}
                  disabled={disabled.includes(letter)}
                  className={`w-10 h-10 border border-blue-500 font-bold rounded-md text-blue-800
                    ${disabled.includes(letter) ? 'cursor-not-allowed opacity-40' : 'hover:bg-blue-50'}`}
                >
                  {letter}
                </button>
              ))}
            </div>

            {/* Appointments and Clinical Trials Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-mayoDisplay" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
                  Appointments
                </h3>
                <p className="text-gray-600 text-base mb-4">
                  Mayo Clinic accepts appointments in Arizona, Florida and Minnesota and at Mayo Clinic Health System sites.
                </p>
                <Link href="/request-appointment" className="text-blue-900 hover:underline text-base">
                  Request an Appointment
                </Link>
              </div>
              <div className="bg-gray-50 border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-mayoDisplay" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
                  Clinical trials at Mayo Clinic
                </h3>
                <p className="text-gray-600 text-base mb-4">
                  Mayo Clinic conducts thousands of clinical trials and research studies each year.
                </p>
                <Link href="/clinical-trials" className="text-blue-900 hover:underline text-base">
                  Find active clinical trials
                </Link>
              </div>
            </div>
          </div>

          {/* Advertisement Sidebar on right */}
          <div className="w-80 bg-gray-50 border rounded-lg p-4 shrink-0">
            <h4 className="text-gray-600 font-semibold text-sm mb-2">Advertisement</h4>
            <h5 className="text-gray-900 font-semibold text-base mb-2">Mayo Clinic Press</h5>
            <p className="text-sm text-gray-600 mb-2">
              Check out these best-sellers and special offers on books and newsletters from Mayo Clinic Press.
            </p>
            <ul className="space-y-1">
              {advertisementLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className={`text-blue-700 hover:underline text-sm ${link.bold ? 'font-semibold' : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Add margin above footer */}
        <div className="mt-[400px]" />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TestsProceduresPage;
