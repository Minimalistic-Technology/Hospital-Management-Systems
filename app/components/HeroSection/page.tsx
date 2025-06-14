// HeroSection.tsx
"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { FaPlay, FaPause } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./HeroSection.module.css";
import { useRouter } from "next/navigation"; // Import useRouter

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const togglePlayPause = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleAlphabetClick = (letter: string) => {
    if (letter === "A") {
      router.push("/cond-dis"); // Navigate to the new page
    } else {
      // Handle other letters or search functionality if needed
      console.log(`Clicked letter: ${letter}`);
      // In a real application, you might navigate to a dynamic route like /diseases/A or /diseases?letter=A
    }
  };

  return (
    <div className={styles.container}>
      {/* Video Section */}
      <div className={styles.videoSection}>
        <video
          ref={videoRef}
          src="/images/main.mp4"
          className={styles.video}
          loop
          muted
        />
        <motion.button
          onClick={togglePlayPause}
          className={styles.playPauseButton}
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? (
            <FaPause className={styles.icon} />
          ) : (
            <FaPlay className={styles.icon} />
          )}
        </motion.button>
        <motion.div
          className={styles.videoText}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1>Transforming Your Care</h1>
          <div className={styles.videoLinks}>
            <Link href="/innovation" className={styles.link}>
              Learn how we drive innovation
            </Link>
            <Link href="/request-appointment" className={styles.ctaButton}>
              Request Appointment
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Limited Disclosure Section */}
      <div className={styles.disclosureSection}>
        <div className={styles.disclosureContent}>
          <motion.div
            className={styles.disclosure}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.infoIcon}>ⓘ</span>
            <a href="#" className={styles.disclosureLink}>
              Limited disclosure of patient information among those participating in liver study
            </a>
            <span className={styles.arrowIcon}>➔</span>
          </motion.div>
        </div>
      </div>

      {/* Find Diseases Section */}
      <div className={styles.findDiseasesSection}>
        <div className={styles.findDiseasesContent}>
          <div className={styles.alphabetSection}>
            <h2>Find Diseases & Conditions by First Letter</h2>
            <div className={styles.alphabetGrid}>
              {"ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("").map((letter) => (
                <motion.button
                  key={letter}
                  className={styles.alphabetButton}
                  whileHover={{ scale: 1.1, backgroundColor: "#e6f0ff" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAlphabetClick(letter)} // Added onClick handler
                >
                  {letter}
                </motion.button>
              ))}
            </div>
          </div>
          <div className={styles.searchSection}>
            <p>Search Diseases & Conditions</p>
            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Search diseases & conditions"
                className={styles.searchInput}
              />
              <span className={styles.searchIcon}>🔍</span>
            </div>
          </div>
        </div>
      </div>

      {/* Healing Starts Here Section */}
      <div className={styles.healingSection}>
        <div className={styles.healingContent}>
          <motion.div
            className={styles.healingText}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Healing Starts Here</h2>
            <p className={styles.subheading}>The Right Answers the First Time</p>
            <p>
              Effective treatment depends on getting the right diagnosis. Our experts diagnose and treat the toughest medical challenges.
            </p>
            <p className={styles.subheading}>Top-Ranked in the U.S.</p>
            <p>
              Minimalistic Clinic has more No. 1 rankings than any other hospital in the nation according to U.S. News & World Report.{" "}
              <a href="#" className={styles.link}>
                Learn more about our top-ranked specialties.
              </a>
            </p>
            <motion.button
              className={styles.actionButton}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0, 51, 102, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Why Choose Minimalistic Clinic
            </motion.button>
          </motion.div>
          <motion.div
            className={styles.healingImage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="https://assets.mayoclinic.org/content/dam/media/global/images/2023/12/28/healing-starts-here-MC11REJU-600x800.jpg"
              alt="Healing starts here"
            />
          </motion.div>
        </div>
      </div>

      {/* World-class Care Section */}
      <div className={styles.worldClassSection}>
        <div className={styles.worldClassContent}>
          <motion.div
            className={styles.worldClassImage}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://assets.mayoclinic.org/content/dam/media/global/images/2023/12/28/world-class%20care-MC1XASH-600x800.jpg"
              alt="World-class care"
            />
          </motion.div>
          <motion.div
            className={styles.worldClassText}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2>World-Class Care for Global Patients</h2>
            <p>
              We make it easy for patients around the world to get care from Minimalistic Clinic.
            </p>
            <motion.button
              className={styles.actionButton}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0, 51, 102, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              International Services
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Locations Section */}
      <div className={styles.locationsSection}>
        <div className={styles.locationsContent}>
          <motion.div
            className={styles.locationsText}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Locations</h2>
            <p>
              Learn more about Minimalistic Clinic locations or choose a specific location.
            </p>
            <motion.button
              className={styles.actionButton}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0, 51, 102, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Explore All Locations
            </motion.button>
          </motion.div>
          {[
            {
              title: "Minimalistic Clinic in Arizona",
              location: "Phoenix & Scottsdale",
              img: "/images/mayo1.jpeg",
            },
            {
              title: "Minimalistic Clinic in Florida",
              location: "Jacksonville",
              img: "/images/mayo2.jpeg",
            },
            {
              title: "Minimalistic Clinic in Minnesota",
              location: "Rochester",
              img: "/images/mayo3.jpeg",
            },
            {
              title: "Minimalistic Clinic Health System",
              location: "Iowa, Minnesota, Wisconsin",
              img: "/images/mayo4.jpeg",
            },
            {
              title: "Minimalistic Clinic Healthcare",
              location: "London, United Kingdom",
              img: "/images/mayo5.jpeg",
            },
          ].map((loc, idx) => (
            <motion.div
              key={idx}
              className={styles.locationCard}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
            >
              <img src={loc.img} alt={loc.title} className={styles.locationImage} />
              <div className={styles.locationOverlay}>
                <h3>{loc.title}</h3>
                <p>{loc.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Care Areas Section */}
      <div className={styles.careAreasSection}>
        <div className={styles.careAreasContent}>
          <motion.div
            className={styles.careAreasText}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Featured Care Areas</h2>
            <p>
              We solve the world’s most serious and complex medical challenges.
            </p>
          </motion.div>
          <div className={styles.careAreasLinks}>
            <div className={styles.careColumn}>
              {[
                { title: "Bone Marrow Transplant", href: "/bone-marrow-transplant" },
                { title: "Brain Aneurysm", href: "/brain-aneurysm" },
                { title: "Brain Tumor", href: "/brain-tumor" },
                { title: "Breast Cancer", href: "/breast-cancer" },
                { title: "Colon Cancer", href: "/colon-cancer" },
                { title: "Congenital Heart Disease", href: "/congenital-heart-disease" },
                { title: "Glioma", href: "/glioma" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className={styles.careLink}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                >
                  <Link href={item.href} className={styles.link}>
                    {item.title}
                  </Link>
                  <span className={styles.arrowIcon}>➔</span>
                </motion.div>
              ))}
            </div>
            <div className={styles.careColumn}>
              {[
                { title: "Heart Arrhythmia", href: "/heart-arrhythmia" },
                { title: "Heart Valve Disease", href: "/heart-valve-disease" },
                { title: "Living-Donor Transplant", href: "/living-donor-transplant" },
                { title: "Lung Transplant", href: "/lung-transplant" },
                { title: "Sarcoma", href: "/sarcoma" },
                { title: "Testicular Cancer", href: "/testicular-cancer" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className={styles.careLink}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                >
                  <Link href={item.href} className={styles.link}>
                    {item.title}
                  </Link>
                  <span className={styles.arrowIcon}>➔</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;