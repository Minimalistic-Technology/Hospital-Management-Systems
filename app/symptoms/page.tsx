'use client';

import React, { useState, useEffect } from 'react';
import HomepageHeader from '../components/Homepage/page';
import Footer from '../components/Footer/page';

interface Symptom {
  _id: string;
  name: string;
  description: string;
}

const SymptomsPage = () => {
  const [alphabets, setAlphabets] = useState<string[]>([]);
  const [disabledLetters, setDisabledLetters] = useState<string[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [loadingAlphabets, setLoadingAlphabets] = useState<boolean>(true);
  const [loadingSymptoms, setLoadingSymptoms] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch alphabets on component mount
  useEffect(() => {
    const fetchAlphabets = async () => {
      try {
        setLoadingAlphabets(true);
        setError(null);
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

        // Determine disabled letters (all letters from A-Z and # that are not in the API response)
        const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
        const disabled = allLetters.filter((letter) => !data.includes(letter));
        setDisabledLetters(disabled);

        setLoadingAlphabets(false);
      } catch (err: any) {
        setError(err.message || 'Failed to load alphabets. Please try again later.');
        setLoadingAlphabets(false);
      }
    };
    fetchAlphabets();
  }, []);

  // Fetch symptoms when a letter is selected
  useEffect(() => {
    if (!selectedLetter) return;

    const fetchSymptoms = async () => {
      try {
        setLoadingSymptoms(true);
        setError(null);
        const response = await fetch(`http://localhost:5000/api/event/symptoms/${selectedLetter}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch symptoms for letter ${selectedLetter}`);
        }
        const data = await response.json();
        // Ensure data is an array
        const symptomsArray = Array.isArray(data) ? data : [];
        // Validate that each item matches the Symptom interface
        const validSymptoms = symptomsArray.filter(
          (item: any): item is Symptom =>
            item &&
            typeof item === 'object' &&
            '_id' in item &&
            'name' in item &&
            typeof item.name === 'string' &&
            'description' in item &&
            typeof item.description === 'string'
        );
        setSymptoms(validSymptoms);
        if (symptomsArray.length > 0 && validSymptoms.length === 0) {
          setError(`No valid symptoms found for letter ${selectedLetter}. Data format is incorrect.`);
        }
        setLoadingSymptoms(false);
      } catch (err: any) {
        setError(err.message || `Failed to load symptoms for letter ${selectedLetter}. Please try again later.`);
        setSymptoms([]);
        setLoadingSymptoms(false);
      }
    };
    fetchSymptoms();
  }, [selectedLetter]);

  const handleLetterClick = (letter: string) => {
    if (!disabledLetters.includes(letter)) {
      setSelectedLetter(letter);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black px-10 py-6">
      <HomepageHeader />

      {/* Subheading */}
      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold">Find a symptom by its first letter</h2>
      </div>

      {/* Main Content: Alphabet Left, Advertisement Right */}
      <div className="flex justify-center mt-6 gap-10 px-6 max-w-7xl mx-auto w-full">
        {/* Alphabet Grid aligned left */}
        <div className="flex-1 max-w-[calc(100%_-_320px)]">
          {loadingAlphabets ? (
            <p className="text-gray-600">Loading alphabets...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <div className="grid grid-cols-15 gap-3">
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('').map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleLetterClick(letter)}
                  disabled={disabledLetters.includes(letter)}
                  className={`w-10 h-10 border border-blue-500 font-bold rounded-md text-blue-800 ${
                    disabledLetters.includes(letter) ? 'cursor-not-allowed opacity-40' : 'hover:bg-blue-50'
                  } ${selectedLetter === letter && !disabledLetters.includes(letter) ? 'bg-blue-100' : ''}`}
                >
                  {letter}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Advertisement Sidebar on right */}
        <div className="w-80 bg-gray-50 border rounded-lg p-4 shrink-0">
          <h4 className="text-gray-600 font-semibold text-sm mb-2">Advertisement</h4>
          <div className="text-sm text-blue-700 space-y-2">
            <p>
              Check out these best-sellers and special offers from{' '}
              <a href="#" className="underline">
                Minimalistic Clinic Press
              </a>
              .
            </p>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  NEW: Minimalistic Clinic Guide to Better Sleep
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Listen to Health Matters Podcast
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Minimalistic Clinic on Incontinence
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  The Essential Diabetes Book
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FREE Minimalistic Clinic Diet Assessment
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline font-semibold">
                  Minimalistic Clinic Health Letter - FREE book
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Symptoms List */}
      {selectedLetter && (
        <div className="mt-10 max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-semibold mb-4">
            Symptoms starting with "{selectedLetter}"
          </h3>
          {loadingSymptoms ? (
            <p className="text-gray-600">Loading symptoms...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : symptoms.length === 0 ? (
            <p className="text-gray-600">No symptoms found for letter "{selectedLetter}".</p>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <ul className="space-y-4">
                {symptoms.map((symptom) => (
                  <li key={symptom._id} className="border-b pb-2">
                    <h4 className="text-lg font-medium text-blue-800">{symptom.name}</h4>
                    <p className="text-gray-600">{symptom.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Add margin above footer */}
      <div className="mt-[400px]" />

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default SymptomsPage;