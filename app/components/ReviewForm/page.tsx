'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Define the type for the form data
interface ReviewFormData {
  patientName: string;
  reviewText: string;
  rating: number;
  department: string;
  consent: boolean;
}

// Define the type for reviews fetched from the backend
interface Review {
  _id: string;
  nameOrInitials: string;
  department: string;
  review: string;
  rating: number;
  privacyAgreed: boolean;
  createdAt: string;
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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Fetch reviews from the backend
  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/hospital/reviews', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews. Please try again later.');
    }
  };

  // Load reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

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
    try {
      const response = await fetch('http://localhost:5000/api/hospital/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nameOrInitials: formData.patientName,
          review: formData.reviewText,
          rating: formData.rating,
          department: formData.department,
          privacyAgreed: formData.consent,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      setSubmitted(true);
      setError('');
      setFormData({ patientName: '', reviewText: '', rating: 0, department: '', consent: false });
      // Refresh reviews after submission
      await fetchReviews();
    } catch (err) {
      setError('Failed to submit review. Please try again.');
      console.error('Error submitting review:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle submitting another review
  const handleAnotherReview = () => {
    setSubmitted(false);
  };

  // Handle carousel navigation
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  // Character counter for review text
  const remainingChars = 500 - formData.reviewText.length;

  // Animation variants for form elements
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  // Animation for review carousel
  const reviewVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.5, ease: 'easeOut' } },
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
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
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

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h3 className="text-2xl font-bold text-black text-center mb-6">
              Patient Reviews
            </h3>
            <div className="relative">
              <div className="flex items-center">
                <button
                  onClick={handlePrev}
                  className="absolute left-0 z-10 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-transform transform hover:scale-110"
                  aria-label="Previous review"
                >
                  &lt;
                </button>
                <div className="overflow-hidden w-full">
                  <motion.div
                    className="flex"
                    animate={{ x: `-${currentIndex * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    {reviews.map((review) => (
                      <motion.div
                        key={review._id}
                        className="min-w-full p-6 bg-white rounded-xl shadow-lg"
                        variants={reviewVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <p className="text-lg font-semibold text-black">
                          {review.nameOrInitials}
                        </p>
                        <p className="text-sm text-gray-600">{review.department}</p>
                        <div className="flex mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-6 h-6 ${review.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
                            </svg>
                          ))}
                        </div>
                        <p className="mt-4 text-black">{review.review}</p>
                        <p className="mt-2 text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
                <button
                  onClick={handleNext}
                  className="absolute right-0 z-10 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-transform transform hover:scale-110"
                  aria-label="Next review"
                >
                  &gt;
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ReviewForm;