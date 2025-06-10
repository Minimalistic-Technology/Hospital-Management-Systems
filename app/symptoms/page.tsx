'use client';

import React, { useState } from 'react';
import HomepageHeader from '../components/Homepage/page';
import Footer from '../components/Footer/page';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
const disabled = ['O', 'Q', 'X', 'Z', '#'];

const SymptomsPage = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleLetterClick = (letter: string) => {
    if (!disabled.includes(letter)) {
      setSelected(letter);
      // Future: fetch symptoms for `letter`
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
          <div className="grid grid-cols-15 gap-3">
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


      {/* Add 50px margin above footer */}
      <div className="mt-[400px]" />

    <div>
        <Footer />
        </div>  
    </div>
    
  );
};

export default SymptomsPage;
