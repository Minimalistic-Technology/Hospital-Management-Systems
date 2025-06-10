'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Define a more flexible interface for LabDetails
interface LabDetails {
  _id: string;
  name: string;
  researchArea?: string;
  researchers?: string[];
  contact?: string;
  publications?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

const LabDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lab, setLab] = useState<LabDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch lab details on mount
  useEffect(() => {
    const fetchLabDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/event/lab/alphabets/${encodeURIComponent(id)}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch lab details: ${response.statusText}`);
        }
        const data: LabDetails = await response.json();
        setLab(data);
        setError(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching lab details');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchLabDetails();
    } else {
      setError('Invalid lab ID');
      setLoading(false);
    }
  }, [id]);

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

      {/* Main Content */}
      <main className="flex-1 py-10 px-6 md:px-40">
        <nav className="mb-6">
          <Link
            href="/laboratories"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-2 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Laboratories
          </Link>
        </nav>
        {loading ? (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
          </div>
        ) : error ? (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-500 text-sm font-medium">{error}</p>
            <Link
              href="/laboratories"
              className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
            >
              Return to Laboratories
            </Link>
          </div>
        ) : lab ? (
          <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 animate-fade-in">
            <h1
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {lab.name}
            </h1>
            <p className="text-base text-gray-600 mb-4">
              <span className="font-semibold">Research Area:</span>{' '}
              {lab.researchArea || 'Not specified'}
            </p>
            <p className="text-base text-gray-600 mb-4">
              <span className="font-semibold">Researchers:</span>{' '}
              {lab.researchers?.length ? lab.researchers.join(', ') : 'None listed'}
            </p>
            <p className="text-base text-gray-600 mb-4">
              <span className="font-semibold">Contact:</span>{' '}
              {lab.contact ? (
                <a href={`mailto:${lab.contact}`} className="text-blue-600 hover:text-blue-800">
                  {lab.contact}
                </a>
              ) : (
                'Not available'
              )}
            </p>
            <p className="text-base text-gray-600 mb-4">
              <span className="font-semibold">Publications:</span>{' '}
              {lab.publications?.length ? lab.publications.join(', ') : 'None listed'}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Last Updated:</span>{' '}
              {lab.updatedAt ? new Date(lab.updatedAt).toLocaleDateString() : 'Not available'}
            </p>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-500 text-sm font-medium">No lab details available.</p>
            <Link
              href="/laboratories"
              className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
            >
              Return to Laboratories
            </Link>
          </div>
        )}
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

export default LabDetailsPage;