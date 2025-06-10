'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Define interfaces for TypeScript
interface Lab {
  id: string;
  name: string;
}

const cities: string[] = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Chennai',
  'Hyderabad',
  'Kolkata',
  'Ahmedabad',
  'Pune',
  'Jaipur',
  'Surat',
];

const LaboratoriesPage: React.FC = () => {
  const [alphabets, setAlphabets] = useState<string[]>([]);
  const [labs, setLabs] = useState<Lab[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch alphabets on component mount
  useEffect(() => {
    const fetchAlphabets = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/event/alphabets');
        if (!response.ok) {
          throw new Error('Failed to fetch alphabets');
        }
        const data: string[] = await response.json();
        setAlphabets(data);
        setError(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchAlphabets();
  }, []);

  // Fetch labs when a letter is selected
  useEffect(() => {
    const fetchLabs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/event/labs/alphabets/${selectedLetter}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch labs for letter ${selectedLetter}`);
        }
        const data: Lab[] = await response.json();
        setLabs(data);
        setError(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLabs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLabs();
  }, [selectedLetter]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center border-b border-gray-200 py-4 px-6 md:px-10 bg-white shadow-sm">
        <div className="flex items-center space-x-4">
          <img
            src="/images/logo.png"
            alt="Minimalistic Clinic Logo"
            className="h-12"
          />
          <input
            type="text"
            placeholder="Search Minimalistic Clinic"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="border border-gray-300 rounded-lg px-4 py-2 w-64 md:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <div className="flex space-x-6 items-center text-sm font-medium">
          <Link href="/reqappointment" className="text-blue-600 hover:text-blue-800 transition">
            Request an Appointment
          </Link>
          <Link href="/find-a-doc" className="text-blue-600 hover:text-blue-800 transition">
            Find a Doctor
          </Link>
          <Link href="#" className="text-blue-600 hover:text-blue-800 transition">
            Find a Job
          </Link>
          <Link href="#" className="text-blue-600 hover:text-blue-800 transition">
            Give Now
          </Link>
          <select className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
            <option>English</option>
          </select>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-100 to-gray-200 py-16 text-center">
        <h1
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Explore Our Laboratories
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover cutting-edge research labs driving innovation in medical science.
        </p>
      </section>

      {/* Main Content */}
      <main className="flex flex-1 py-10 px-6 md:px-40 gap-12">
        {/* Alphabet Grid */}
        <div className="w-1/4">
          <h3
            className="text-2xl font-semibold mb-6 text-gray-800"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Browse Labs
          </h3>
          {loading && !selectedLetter && (
            <p className="text-gray-500 animate-pulse">Loading alphabets...</p>
          )}
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
            {alphabets.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`border border-gray-300 text-sm font-semibold w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 ${
                  selectedLetter === letter
                    ? 'bg-red-700 text-white'
                    : 'text-blue-600 hover:bg-blue-50 hover:shadow-md'
                }`}
                aria-pressed={selectedLetter === letter}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Labs List */}
        <div className="flex-1 max-w-2xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Laboratories
          </h2>
          {loading && selectedLetter ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="h-16 bg-gray-200 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : labs.length > 0 ? (
            <ul className="space-y-4 animate-fade-in">
              {labs.map((lab) => (
                <li
                  key={lab.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <Link
                    href={`/labs/${lab.id}`}
                    className="text-red-700 hover:text-red-800 text-base font-medium transition"
                  >
                    {lab.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic text-center">
              No labs found for the letter {selectedLetter}.
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-sm mt-auto border-t border-gray-200 py-8 px-6 md:px-10 text-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-xl mx-auto">
          <div>
            <p>
              Any use of this site constitutes your agreement to the Terms and
              Conditions and Privacy Policy linked below.
            </p>
            <ul className="mt-2 space-y-1">
              <li>
                <Link href="#" className="text-blue-600 hover:text-blue-800 transition">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-600 hover:text-blue-800 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-600 hover:text-blue-800 transition">
                  Notice of Privacy Practices
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-600 hover:text-blue-800 transition">
                  Notice of Nondiscrimination
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-600 hover:text-blue-800 transition">
                  Manage Cookies
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p>
              Minimalistic Clinic is a nonprofit organization and proceeds from Web
              advertising help support our mission. Minimalistic Clinic does not
              endorse any of the third party products and services advertised.
            </p>
            <ul className="mt-2">
              <li>
                <Link href="#" className="text-blue-600 hover:text-blue-800 transition">
                  Advertising and sponsorship policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-600 hover:text-blue-800 transition">
                  Advertising and sponsorship opportunities
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p>
              A single copy of these materials may be reprinted for noncommercial
              personal use only. "Minimalistic," "Minimalistic Clinic,"
              "MinimalisticClinic.org," "Minimalistic Clinic Healthy Living," and the
              triple-shield Minimalistic Clinic logo are trademarks of Minimalistic
              Foundation for Medical Education and Research.
            </p>
          </div>
        </div>
        <p className="text-center mt-6">
          © 1998-2025 Minimalistic Foundation for Medical Education and Research
          (MFMER). All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LaboratoriesPage;