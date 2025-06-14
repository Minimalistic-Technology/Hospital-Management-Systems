'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/app/components/Homepage/page';
import Footer from '@/app/components/Footer/page';
import Link from 'next/link';

interface Test {
  _id: string;
  name: string;
  link?: string;
  seeAlso?: string;
  firstLetter: string;
  __v: number;
}

const TestsProceduresPage = () => {
  const [alphabet, setAlphabet] = useState<string[]>([]);
  const [disabledLetters, setDisabledLetters] = useState<string[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Fetch alphabet letters on component mount
  useEffect(() => {
    const fetchAlphabet = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hospital/symptoms/alphabets', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch alphabet letters');
        }
        const data = await response.json();
        setAlphabet(data);

        // Check which letters have no tests (to disable them)
        const disabled: string[] = [];
        for (const letter of data) {
          const testResponse = await fetch(`http://localhost:5000/api/hospital/tests/${letter}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          if (testResponse.ok) {
            const testsData = await testResponse.json();
            if (testsData.length === 0) {
              disabled.push(letter);
            }
          }
        }
        setDisabledLetters(disabled);
      } catch (err) {
        console.error('Error fetching alphabet:', err);
        setError('Failed to load alphabet letters. Please try again later.');
      }
    };

    fetchAlphabet();
  }, []);

  // Fetch tests/procedures when a letter is clicked
  const handleLetterClick = async (letter: string) => {
    if (disabledLetters.includes(letter)) return;

    setSelectedLetter(letter);
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/hospital/tests/${letter}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch tests for letter ${letter}`);
      }
      const data = await response.json();
      setTests(data);
    } catch (err) {
      console.error(`Error fetching tests for letter ${letter}:`, err);
      setError(`Failed to load tests for letter ${letter}. Please try again.`);
      setTests([]);
    } finally {
      setLoading(false);
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
            {error && (
              <p className="text-red-600 mb-4">{error}</p>
            )}
            {alphabet.length > 0 ? (
              <div className="grid grid-cols-13 gap-3 mb-12">
                {alphabet.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => handleLetterClick(letter)}
                    disabled={disabledLetters.includes(letter)}
                    className={`w-10 h-10 border border-blue-500 font-bold rounded-md text-blue-800
                      ${disabledLetters.includes(letter) ? 'cursor-not-allowed opacity-40' : 'hover:bg-blue-50'}
                      ${selectedLetter === letter ? 'bg-blue-100' : ''}`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 mb-12">Loading alphabet...</p>
            )}

            {/* Display Tests/Procedures */}
            {selectedLetter && (
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 font-mayoDisplay" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
                  Tests and Procedures starting with {selectedLetter}
                </h3>
                {loading ? (
                  <p className="text-gray-600">Loading tests...</p>
                ) : tests.length > 0 ? (
                  <ul className="space-y-2">
                    {tests.map((test) => (
                      <li key={test._id} className="border-b border-gray-200 py-2">
                        {test.link ? (
                          <Link href={test.link} className="text-blue-900 hover:underline">
                            {test.name}
                          </Link>
                        ) : (
                          <span className="text-gray-900">{test.name}</span>
                        )}
                        {test.seeAlso && (
                          <p className="text-sm text-gray-600">
                            See also: {test.seeAlso}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No tests found for letter {selectedLetter}.</p>
                )}
              </div>
            )}

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