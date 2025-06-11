'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Define the type for the form data
interface ReviewFormData {
  patientName: string;
  reviewText: string;
  rating: number;
  department: string;
  consent: boolean;
}

const ReviewForm: React.FC = () => {
  const [formData, setFormData] = useState<ReviewFormData>({
    patientName: '',
    reviewText: '',
    rating: 0,
    department: '',
    consent: false,
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, consent: e.target.checked }));
  };

  // Handle rating selection
  const handleRating = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      !formData.patientName ||
      !formData.reviewText ||
      formData.rating === 0 ||
      !formData.department ||
      !formData.consent
    ) {
      setError('Please fill out all fields, select a rating, and agree to the terms.');
      return;
    }
    setIsLoading(true);
    // Mock submission with delay to simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Replace with actual API call in production, e.g.:
    // await fetch('/api/reviews', { method: 'POST', body: JSON.stringify(formData) });
    console.log('Submitted Review:', formData);
    setSubmitted(true);
    setError('');
    setIsLoading(false);
    // Reset form
    setFormData({ patientName: '', reviewText: '', rating: 0, department: '', consent: false });
  };

  // Handle submitting another review
  const handleAnotherReview = () => {
    setSubmitted(false);
  };

  // Character counter for review text
  const remainingChars = 500 - formData.reviewText.length;

  // Animation variants for form elements
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-bold text-black text-center mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Share Your Experience
        </motion.h2>
        <AnimatePresence>
          {submitted ? (
            <motion.div
              className="bg-green-100 p-6 rounded-xl text-center text-black mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg font-semibold">Thank you for your review!</p>
              <p className="mt-2">It will be posted after moderation.</p>
              <motion.button
                onClick={handleAnotherReview}
                className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-transform transform"
                whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(0, 51, 102, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                Submit Another Review
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              className="bg-[#E5F0FF] p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {error && (
                <motion.div
                  className="bg-red-100 p-4 rounded-xl text-black mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {error}
                </motion.div>
              )}
              <div className="space-y-8">
                <motion.div variants={fadeIn} initial="hidden" animate="visible">
                  <label
                    htmlFor="patientName"
                    className="block text-base font-medium text-black"
                  >
                    Name or Initials
                  </label>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="E.g., John D. or Anonymous"
                    className="mt-2 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base text-black placeholder-gray-500 py-3 transition-all duration-300"
                    maxLength={50}
                    aria-required="true"
                  />
                </motion.div>
                <motion.div variants={fadeIn} initial="hidden" animate="visible">
                  <label
                    htmlFor="department"
                    className="block text-base font-medium text-black"
                  >
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="mt-2 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base text-black py-3 transition-all duration-300"
                    aria-required="true"
                  >
                    <option value="">Select a department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="General Medicine">General Medicine</option>
                  </select>
                </motion.div>
                <motion.div variants={fadeIn} initial="hidden" animate="visible">
                  <label
                    htmlFor="reviewText"
                    className="block text-base font-medium text-black"
                  >
                    Your Review
                  </label>
                  <textarea
                    id="reviewText"
                    name="reviewText"
                    value={formData.reviewText}
                    onChange={handleChange}
                    placeholder="Share your experience with our hospital..."
                    rows={5}
                    className="mt-2 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base text-black placeholder-gray-500 transition-all duration-300"
                    maxLength={500}
                    aria-required="true"
                  />
                  <p className="mt-2 text-sm text-black">
                    {remainingChars} characters remaining
                  </p>
                </motion.div>
                <motion.div variants={fadeIn} initial="hidden" animate="visible">
                  <label className="block text-base font-medium text-black">
                    Rating
                  </label>
                  <div className="flex mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRating(star)}
                        className={`w-8 h-8 focus:outline-none transition-transform transform hover:scale-110 ${formData.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                        aria-label={`Rate ${star} stars`}
                      >
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.994 10.1c-.783-.57-.38-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.518-4.674z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </motion.div>
                <motion.div variants={fadeIn} initial="hidden" animate="visible">
                  <label className="flex items-center text-base font-medium text-black">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleCheckboxChange}
                      className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      aria-required="true"
                    />
                    I agree to the{' '}
                    <a href="/privacy-policy" className="text-blue-600 hover:underline">
                      privacy policy
                    </a>{' '}
                    and allow my review to be published.
                  </label>
                </motion.div>
                <motion.div
                  className="text-center"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`inline-block bg-blue-600 text-white px-8 py-3 rounded-xl transition-transform transform ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(0, 51, 102, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLoading ? 'Submitting...' : 'Submit Review'}
                  </motion.button>
                </motion.div>
              </div>
              <motion.p
                className="mt-6 text-sm text-black text-center"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
              >
                All reviews are moderated for authenticity and compliance with privacy regulations.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ReviewForm;