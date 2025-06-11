'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Homepage/page';
import Footer from '../components/Footer/page';
import { FaSearch } from 'react-icons/fa';

interface Disease {
  _id: string;
  alphabet: string;
  name: string;
  see: string | null;
  __v: number;
}

const ConditionDirectoryPage = () => {
  const [alphabets, setAlphabets] = useState<string[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loadingAlphabets, setLoadingAlphabets] = useState<boolean>(true);
  const [loadingDiseases, setLoadingDiseases] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch alphabets on component mount
  useEffect(() => {
    const fetchAlphabets = async () => {
      try {
        setLoadingAlphabets(true);
        const response = await fetch('http://localhost:5000/api/event/alphabets', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch alphabets');
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Alphabets API did not return an array');
        }
        setAlphabets(data);
        setLoadingAlphabets(false);
      } catch (err: any) {
        setError(err.message || 'Failed to load alphabets. Please try again later.');
        setLoadingAlphabets(false);
      }
    };
    fetchAlphabets();
  }, []);

  // Fetch diseases when selectedLetter changes
  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        setLoadingDiseases(true);
        setError(null);
        const response = await fetch(`http://localhost:5000/api/event/diseases/${selectedLetter}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch diseases for letter ${selectedLetter}`);
        }
        const data = await response.json();
        const diseasesArray = Array.isArray(data.diseases) ? data.diseases : [];
        const validDiseases = diseasesArray.filter(
          (item: any): item is Disease =>
            item &&
            typeof item === 'object' &&
            '_id' in item &&
            'alphabet' in item &&
            'name' in item &&
            typeof item.name === 'string' &&
            '__v' in item
        );
        setDiseases(validDiseases);
        if (diseasesArray.length > 0 && validDiseases.length === 0) {
          setError(`No valid diseases found for letter ${selectedLetter}. Data format is incorrect.`);
        }
        setLoadingDiseases(false);
      } catch (err: any) {
        setError(err.message || `Failed to load diseases for letter ${selectedLetter}. Please try again later.`);
        setDiseases([]);
        setLoadingDiseases(false);
      }
    };
    fetchDiseases();
  }, [selectedLetter]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#E6F0FA] to-[#B3D4FF] text-gray-900">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-grow px-4 md:px-20 lg:px-32 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Left Side: Diseases & Conditions */}
          <div className="col-span-12 md:col-span-8">
            {/* Heading */}
            <h1
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 animate-fade-in tracking-tight"
              style={{ fontFamily: '"mayo-display", Georgia, serif' }}
            >
              Diseases & Conditions
            </h1>
            <div className="h-1 w-48 bg-gradient-to-r from-blue-600 to-blue-900 rounded-full mb-8 animate-slide-in"></div>
            <p
              className="text-lg md:text-xl text-gray-700 mb-10 animate-fade-in leading-relaxed"
              style={{ fontFamily: '"mayo-sans", Times, sans-serif' }}
            >
              Explore comprehensive, easy-to-understand information about diseases and conditions.
            </p>

            {/* Search Bar */}
            <div className="mb-12">
              <label
                htmlFor="search"
                className="block text-base font-medium text-gray-800 mb-3"
                style={{ fontFamily: '"mayo-sans", Times, sans-serif' }}
              >
                Search diseases & conditions
              </label>
              <div className="relative max-w-2xl">
                <input
                  id="search"
                  type="text"
                  placeholder="Search for a condition..."
                  className="w-full px-6 py-4 pl-14 bg-white text-gray-900 rounded-full text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:shadow-xl transition-all duration-300 ease-in-out placeholder-gray-400"
                />
                <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
              </div>
            </div>

            {/* Conditions List */}
            <div
              className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl"
              style={{ fontFamily: '"mayo-sans", Times, sans-serif' }}
            >
              <h2
                className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900"
                style={{ fontFamily: '"mayo-display", Georgia, serif' }}
              >
                Conditions starting with "{selectedLetter}"
              </h2>
              {loadingDiseases ? (
                <p className="text-gray-600 animate-pulse">Loading conditions...</p>
              ) : error ? (
                <p className="text-red-600 font-medium">{error}</p>
              ) : diseases.length === 0 ? (
                <p className="text-gray-600">No conditions found for letter "{selectedLetter}".</p>
              ) : (
                <ul className="space-y-4">
                  {diseases.map((disease) => (
                    <li
                      key={disease._id}
                      className="text-gray-800 hover:text-blue-700 hover:underline transition-all duration-200 text-lg"
                    >
                      <a href={`/conditions/${disease.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        {disease.name}
                        {disease.see && (
                          <span className="text-gray-500 text-sm"> — See {disease.see}</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right Side: Alphabet Selector */}
          <div className="col-span-12 md:col-span-4">
            <h2
              className="text-xl md:text-2xl font-semibold mb-6 text-gray-900"
              style={{ fontFamily: '"mayo-display", Georgia, serif' }}
            >
              Find by First Letter
            </h2>
            {loadingAlphabets ? (
              <p className="text-gray-600 animate-pulse">Loading alphabets...</p>
            ) : error ? (
              <p className="text-red-600 font-medium">{error}</p>
            ) : (
              <div className="grid grid-cols-7 gap-3 md:gap-4">
                {alphabets.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setSelectedLetter(letter)}
                    className={`rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-base md:text-lg font-semibold transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl ${
                      selectedLetter === letter
                        ? 'bg-blue-600 text-white scale-110'
                        : 'bg-white text-gray-900 hover:bg-blue-500 hover:text-white hover:scale-105'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="bg-white shadow-lg">
        <Footer />
      </div>
    </div>
  );
};

export default ConditionDirectoryPage;