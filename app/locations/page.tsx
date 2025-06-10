import React from "react";
import Header from "@/app/components/Homepage/page";
import Footer from "@/app/components/Footer/page";
import Link from "next/link";
import Image from "next/image";

const LocationsPage: React.FC = () => {
  const locations = [
    {
      title: "MAYO CLINIC IN ARIZONA",
      subtitle: "Phoenix & Scottsdale",
      image: "/images/loc1.png",
      links: [
        { label: "Patient & visitor guide", href: "/arizona/patient-guide" },
        { label: "Buildings & maps", href: "/arizona/maps" },
        { label: "Contact us", href: "/arizona/contact" },
      ],
    },
    {
      title: "MAYO CLINIC IN FLORIDA",
      subtitle: "Jacksonville",
      image: "/images/loc2.png",
      links: [
        { label: "Patient & visitor guide", href: "/florida/patient-guide" },
        { label: "Buildings & maps", href: "/florida/maps" },
        { label: "Contact us", href: "/florida/contact" },
      ],
    },
    {
      title: "MAYO CLINIC IN MINNESOTA",
      subtitle: "Rochester",
      image: "/images/loc3.png",
      links: [
        { label: "Patient & visitor guide", href: "/minnesota/patient-guide" },
        { label: "Buildings & maps", href: "/minnesota/maps" },
        { label: "Contact us", href: "/minnesota/contact" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white font-mayoSans" style={{ fontFamily: "'mayo-sans', 'Times', sans-serif" }}>
      {/* Header */}
      <Header />

      {/* Locations Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 font-mayoDisplay relative inline-block" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
            LOCATIONS
            {/* <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-200 to-blue-500"></span> */}
          </h1>
          <p className="text-gray-600 text-lg mb-12">
            Mayo Clinic is known around the world for top-quality care and cutting-edge research, with major campuses in Arizona, Florida, and Minnesota.
          </p>
          <div className="space-y-16">
            {locations.map((location, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row gap-8 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                {/* Image */}
                <div className="md:w-1/2 relative">
                  <Image
                    src={location.image}
                    alt={location.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  {/* <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-blue-200 to-blue-500"></div> */}
                </div>
                {/* Details */}
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 font-mayoDisplay relative inline-block" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
                    {location.title}
                    {/* <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-200 to-blue-500"></span> */}
                  </h2>
                  <p className="text-gray-600 text-base mb-4">{location.subtitle}</p>
                  <div className="flex flex-col gap-2">
                    {location.links.map((link, linkIdx) => (
                      <Link
                        key={linkIdx}
                        href={link.href}
                        className="flex items-center text-blue-900 hover:text-blue-600 transition-colors duration-200 text-base"
                      >
                        <span className="mr-2">➔</span> {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="my-12 text-center bg-gray-50 py-6 rounded-lg">
            <p className="text-gray-600 text-lg mb-4 font-semibold">
              SUPPORT GETTING TO MAYO CLINIC'S MAIN CAMPUSES
            </p>
            <p className="text-gray-600 text-lg mb-4">
              Planning your health care journey can be stressful. Let us help.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/patient-travel-services" className="text-blue-900 hover:text-blue-600 transition-colors duration-200 text-base font-medium">
                Patient travel services
              </Link>
              <Link href="/international-patient-services" className="text-blue-900 hover:text-blue-600 transition-colors duration-200 text-base font-medium">
                International patient services
              </Link>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4 font-mayoDisplay uppercase relative inline-block" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
            International locations
            {/* <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-200 to-blue-500"></span> */}
          </h1>
          <p className="text-gray-600 text-lg mb-12">
            Our commitment to care knows no boundaries.
          </p>
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <div className="md:w-1/2 relative">
                <Image
                  src="/images/loc5.png"
                  alt="Mayo Clinic Healthcare London"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                {/* <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-blue-200 to-blue-500"></div> */}
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 font-mayoDisplay relative inline-block" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
                  Mayo Clinic Healthcare
                  {/* <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-200 to-blue-500"></span> */}
                </h2>
                <p className="text-gray-600 text-base mb-4">London, United Kingdom</p>
                <div className="flex flex-col gap-2">
                  <Link href="https://www.mayoclinichealthcare.co.uk" className="flex items-center text-blue-900 hover:text-blue-600 transition-colors duration-200 text-base">
                    <span className="mr-2">🖥️</span> Visit our website
                  </Link>
                  <Link href="/contact/london" className="flex items-center text-blue-900 hover:text-blue-600 transition-colors duration-200 text-base">
                    <span className="mr-2">📞</span> Contact us
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-xl mt-40 text-gray-900 mb-4 font-mayoDisplay relative inline-block" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
            Regional network
            {/* <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-200 to-blue-500"></span> */}
          </h1><br />
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <div className="md:w-1/2 order-last md:order-first">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 font-mayoDisplay relative inline-block" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
                  Mayo Clinic Health System
                  {/* <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-200 to-blue-500"></span> */}
                </h2>
                <p className="text-gray-600 text-base mb-4">
                  Our network of clinics, hospitals, and health care facilities serves communities in southern Minnesota, western Wisconsin, and northern Iowa.
                </p>
                <div className="flex flex-col gap-2">
                  <Link href="https://www.mayoclinichealthsystem.org" className="flex items-center text-blue-900 hover:text-blue-600 transition-colors duration-200 text-base">
                    <span className="mr-2">🖥️</span> Visit our website
                  </Link>
                  <Link href="/contact/health-system" className="flex items-center text-blue-900 hover:text-blue-600 transition-colors duration-200 text-base">
                    <span className="mr-2">📞</span> Contact us
                  </Link>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/loc4.png"
                  alt="Mayo Clinic Health System Map"
                  width={300}
                  height={300}
                />
                {/* <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-blue-200 to-blue-500"></div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LocationsPage;