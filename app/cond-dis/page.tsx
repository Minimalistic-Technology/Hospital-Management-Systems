'use client';

import React, { useState } from 'react';
import Header from '../components/Homepage/page';
import Footer from '../components/Footer/page';

const letters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G',
  'H', 'I', 'J', 'K', 'L', 'M', 'N',
  'O', 'P', 'R', 'S', 'T', 'U', 'V',
  'W', 'X', 'Y', 'Z', '#'
];

const diseaseData: Record<string, string[]> = {
  A: [
    'A fib — See Atrial fibrillation',
    'Ab — Abdominal aortic aneurysm, Abnormally excessive sweating — See Hyperhidrosis',
    'Abscess, Bartholin\'s — See Bartholin\'s cyst',
    'Absence seizure'
  ],
  B: [
    'Ba — Baby acne, Back pain, Bacterial vaginosis',
    'Bags under eyes, Baker cyst',
    'Baldness — See Hair loss'
  ]
};

const ConditionDirectoryPage = () => {
  const [selectedLetter, setSelectedLetter] = useState<string>('A');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#2962A8] to-[#041E66] text-white">
        <div className="bg-white" >
      <Header />
      </div>

      <main className="flex-grow px-4 md:px-16 py-10">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Side */}
          <div className="col-span-12 md:col-span-9">
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: '"mayo-display", Georgia, serif' }}>
              Diseases & Conditions
            </h1>

            {/* Gradient divider below heading */}
            <div className="h-1 w-36 bg-gradient-to-r from-blue-400 to-blue-800 rounded-full mb-6"></div>

            <p className="text-lg mb-6" style={{ fontFamily: '"mayo-sans", Times, sans-serif' }}>
              Easy-to-understand answers about diseases and conditions
            </p>

            {/* Search */}
            <div className="mb-10 ">
              <label htmlFor="search" className="block text-base mb-1">Search diseases & conditions</label>
              {/* <p className="text-sm mb-2">Type 3 or more letters to display suggested search options.</p> */}
              <div className="relative max-w-xl">
                <input
                  id="search"
                  type="text"
                  placeholder="Search"
                  className="w-full px-5 py-4 bg-white text-black rounded-full text-lg shadow focus:outline-none"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-xl"></span>
              </div>
            </div>

            {/* Conditions List */}
            <div className="bg-white text-black rounded-lg shadow-md p-6" style={{ fontFamily: '"mayo-sans", Times, sans-serif' }}>
              <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: '"mayo-display", Georgia, serif' }}>
                Conditions starting with "{selectedLetter}"
              </h2>
              <ul className="list-disc list-inside space-y-2">
                {(diseaseData[selectedLetter] || []).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side Alphabet Selector */}
          <div className="col-span-12 md:col-span-3">
            <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: '"mayo-display", Georgia, serif' }}>
              Find diseases & conditions by first letter
            </h2>
            <div className="grid grid-cols-7 gap-x-[55px] gap-y-[10px] justify-center">
              {letters.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-sm md:text-base font-semibold transition-all ${
                    selectedLetter === letter
                      ? 'bg-white text-blue-900'
                      : 'bg-blue-700 hover:bg-blue-600'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ConditionDirectoryPage;
