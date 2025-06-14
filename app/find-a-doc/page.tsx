'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Homepage/page';
import Footer from '../components/Footer/page';

// Define interfaces for TypeScript
interface Doctor {
  _id: string;
  name: string;
  specialist: string;
  location: string;
  photo: string;
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

const FindADocPage: React.FC = () => {
  const [location, setLocation] = useState<string>(cities[0]);
  const [alphabets, setAlphabets] = useState<string[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch alphabets on component mount
  useEffect(() => {
    const fetchAlphabets = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/hospital/doctors/alphabets');
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

  // Fetch doctors when a letter is selected
  useEffect(() => {
    if (selectedLetter) {
      const fetchDoctors = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `http://localhost:5000/api/hospital/doctors/alphabets/${selectedLetter}`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch doctors for letter ${selectedLetter}`);
          }
          const data: Doctor[] = await response.json();
          setDoctors(data);
          setError(null);
        } catch (err: unknown) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          setDoctors([]);
        } finally {
          setLoading(false);
        }
      };
      fetchDoctors();
    }
  }, [selectedLetter]);

  // Handle letter button click
  const handleLetterClick = (letter: string): void => {
    setSelectedLetter(letter);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      {/* Breadcrumb */}
      <div className="px-6 md:px-40 mt-6 text-sm text-gray-500">
        Medical Departments & Centers
      </div>

      {/* Title */}
      <h1
        className="px-6 md:px-40 text-3xl md:text-4xl font-semibold mt-2 mb-6"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        Doctors and Medical Staff
      </h1>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-100 to-gray-200 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm opacity-50"
          style={{
            backgroundImage: `url('/find-a-doc-bg.png')`,
          }}
        />
        <div className="relative z-10 px-6 md:px-40 py-20 flex flex-col items-center text-center">
          <div className="text-blue-700 text-6xl mb-8 animate-pulse">🔍</div>
          <h2
            className="text-4xl md:text-5xl font-semibold mb-8 text-gray-800"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Find a Doctor
          </h2>

          {/* Search form */}
          <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3 gap-4 text-base">
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-600 mb-2 uppercase">
                Doctor's name, condition, or procedure
              </label>
              <input
                type="text"
                placeholder="Type in your search term..."
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-600 mb-2 uppercase">
                Location
              </label>
              <select
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={location}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setLocation(e.target.value)
                }
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button className="bg-blue-700 hover:bg-blue-600 text-white font-semibold w-full py-3 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
                SEARCH
              </button>
            </div>
          </div>

          <a
            href="#"
            className="mt-6 text-blue-600 text-sm font-medium underline hover:text-blue-800 transition"
          >
            Search Tips
          </a>
        </div>
      </section>

      {/* Browse and Doctors Section */}
      <section className="px-6 md:px-40 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* A-Z Browsing */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-gray-800">
            👁️ Browse by Last Name
          </h3>
          {loading && !selectedLetter && (
            <p className="text-gray-500 animate-pulse">Loading alphabets...</p>
          )}
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          <div className="grid grid-cols-6 md:grid-cols-5 gap-3">
            {alphabets.map((letter) => (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                className={`border border-gray-300 text-sm font-semibold w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 ${
                  selectedLetter === letter
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-600 hover:bg-blue-50 hover:shadow-md'
                }`}
                aria-pressed={selectedLetter === letter}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors List */}
        <div>
          {selectedLetter && (
            <div className="mt-6">
              <h4
                className="text-xl font-semibold mb-6 text-gray-800"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Doctors Starting with {selectedLetter}
              </h4>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg animate-pulse"
                    >
                      <div className="w-16 h-16 bg-gray-300 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4" />
                        <div className="h-3 bg-gray-300 rounded w-1/2" />
                        <div className="h-3 bg-gray-300 rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : doctors.length > 0 ? (
                <ul className="space-y-4">
                  {doctors.map((doctor) => (
                    <li
                      key={doctor._id}
                      className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      <img
                        src={doctor.photo || '/default-doctor.jpg'}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover border border-gray-200"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
                          (e.currentTarget.src = '/default-doctor.jpg')
                        }
                      />
                      <div>
                        <h5 className="text-base font-semibold text-gray-800">
                          {doctor.name}
                        </h5>
                        <p className="text-sm text-gray-600">{doctor.specialist}</p>
                        <p className="text-sm text-gray-500">{doctor.location}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No doctors found for the letter {selectedLetter}.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FindADocPage;