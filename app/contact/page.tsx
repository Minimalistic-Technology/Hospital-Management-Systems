import React from "react";
import Header from "@/app/components/Homepage/page";
import Footer from "@/app/components/Footer/page";
import Link from "next/link";

// Define an interface for contact details to include an optional note property
interface ContactDetail {
  label: string;
  number: string;
  note?: string;
}

const ContactPage: React.FC = () => {
  const navLinks = [
    { label: "Arizona - Scottsdale/Phoenix", href: "/contact/arizona" },
    { label: "Florida - Jacksonville", href: "/contact/florida" },
    { label: "Minnesota - Rochester", href: "/contact/minnesota" },
    { label: "Staff phone and email directories", href: "/contact/staff-directory" },
  ];

  const arizonaContactDetails: ContactDetail[] = [
    { label: "GENERAL", number: "480-301-8000" },
    { label: "APPOINTMENT OFFICE", number: "480-301-8484" },
    { label: "BILLING AND INSURANCE", number: "844-217-9591 (toll-free)" },
    { label: "INTERNATIONAL PATIENTS CENTER", number: "480-301-7101", note: "507-266-0909 for international callers" },
    { label: "MEDICAL RECORDS AND IMAGING REQUESTS", number: "507-284-4594" },
    { label: "MEDICAL RECORDS REQUESTS FAX", number: "507-284-0161" },
    { label: "OFFICE OF PATIENT EXPERIENCE", number: "844-544-0036 (toll-free)" },
  ];

  const floridaContactDetails: ContactDetail[] = [
    { label: "GENERAL", number: "904-953-2000" },
    { label: "APPOINTMENT OFFICE", number: "904-953-0853" },
    { label: "APPOINTMENT OFFICE FAX", number: "904-953-2898" },
    { label: "BILLING", number: "844-217-9591 (toll-free)", note: "507-266-0909 for international callers" },
    { label: "HOSPITAL-TO-HOSPITAL PATIENT TRANSFERS (ADMISSION TRANSFER CENTER – 24 HOURS A DAY)", number: "904-953-1111" },
    { label: "INSURANCE", number: "904-953-1395", note: "877-956-1820, then option 1 (toll-free outside Jacksonville)" },
    { label: "INTERNATIONAL SERVICES", number: "904-953-7000" },
    { label: "INTERNATIONAL SERVICES FAX", number: "904-953-7329" },
    { label: "MEDICAL RECORDS AND IMAGING REQUESTS", number: "507-284-4594" },
    { label: "MEDICAL RECORDS REQUESTS FAX", number: "507-284-0161" },
    { label: "OFFICE OF PATIENT EXPERIENCE", number: "844-544-0036 (toll-free)" },
  ];

  const minnesotaContactDetails: ContactDetail[] = [
    { label: "GENERAL", number: "507-284-2511" },
    { label: "APPOINTMENT OFFICE", number: "507-538-3270" },
    { label: "BILLING AND INSURANCE", number: "844-217-9591 (toll-free)", note: "507-266-0909 for international callers" },
    { label: "INTERNATIONAL APPOINTMENT OFFICE", number: "507-538-1421" },
    { label: "INTERNATIONAL APPOINTMENT OFFICE FAX", number: "507-538-7803" },
    { label: "MEDICAL RECORDS AND IMAGING REQUESTS", number: "507-284-4594" },
    { label: "MEDICAL RECORDS REQUESTS FAX", number: "507-284-0161" },
  ];

  const minnesotaHospitalContactDetails: ContactDetail[] = [
    { label: "GENERAL", number: "507-266-7890" },
  ];

  const minnesotaChildrensHospitalContactDetails: ContactDetail[] = [
    { label: "GENERAL", number: "507-255-5123" },
    { label: "OFFICE OF PATIENT EXPERIENCE", number: "844-544-0036 (toll-free)" },
  ];

  return (
    <div className="min-h-screen bg-white font-mayoSans" style={{ fontFamily: "'mayo-sans', 'Times', sans-serif" }}>
      {/* Header */}
      <Header />

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-mayoDisplay" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
            Contact us
          </h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 font-mayoDisplay" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
            Addresses and phone numbers
          </h2>

          <div className="flex flex-wrap gap-4 mb-12">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="text-blue-900 hover:underline text-base"
              >
                {link.label} {idx < navLinks.length - 1 && "·"}
              </Link>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 font-mayoDisplay uppercase" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
            Arizona - Scottsdale/Phoenix
          </h3>

          <div className="mb-6">
            <h4 className="text-xl font-bold text-gray-900 mb-2 font-mayoDisplay" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
              Mayo Clinic
            </h4>
            <p className="text-gray-600 text-base">
              13400 E. Shea Blvd.<br />
              Scottsdale, AZ 85259
            </p>
          </div>

          <div className="mb-6">
            {arizonaContactDetails.map((detail, idx) => (
              <div key={idx} className="border-t border-gray-300 py-4 flex justify-between">
                <div>
                  <p className="text-gray-900 text-base font-medium">{detail.label}</p>
                  {detail.note && <p className="text-gray-600 text-sm">{detail.note}</p>}
                </div>
                <p className="text-gray-900 text-base">{detail.number}</p>
              </div>
            ))}
          </div>

          <div>
            <a href="/path-to-records-request-form.pdf" className="text-blue-900 hover:underline text-base">
              Records request form (PDF)
            </a>
          </div>

          <div className="mt-6">
            <h4 className="text-xl font-bold text-gray-900 mb-2 font-mayoDisplay" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
              Mayo Clinic Hospital
            </h4>
            <p className="text-gray-600 text-base">
              5777 E. Mayo Blvd.<br />
              Phoenix, AZ 85054
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 font-mayoDisplay uppercase mt-12" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
            Florida - Jacksonville
          </h3>

          <div className="mb-6">
            <h4 className="text-xl font-bold text-gray-900 mb-2 font-mayoDisplay" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
              Mayo Clinic
            </h4>
            <p className="text-gray-600 text-base">
              4500 San Pablo Road<br />
              Jacksonville, FL 32224
            </p>
          </div>

          <div className="mb-6">
            {floridaContactDetails.map((detail, idx) => (
              <div key={idx} className="border-t border-gray-300 py-4 flex justify-between">
                <div>
                  <p className="text-gray-900 text-base font-medium">{detail.label}</p>
                  {detail.note && <p className="text-gray-600 text-sm">{detail.note}</p>}
                </div>
                <p className="text-gray-900 text-base">{detail.number}</p>
              </div>
            ))}
          </div>

          <div>
            <a href="/path-to-records-request-form.pdf" className="text-blue-900 hover:underline text-base">
              Records request form (PDF)
            </a>
          </div>

          <div className="mt-6">
            <h4 className="text-xl font-bold text-gray-900 mb-2 font-mayoDisplay" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
              Mayo Building and Hospital
            </h4>
            <p className="text-gray-600 text-base">
              4500 San Pablo Road<br />
              Jacksonville, FL 32224
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 font-mayoDisplay uppercase mt-12" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
            Minnesota - Rochester
          </h3>

          <div className="mb-6">
            <h4 className="text-xl font-bold text-gray-900 mb-2 font-mayoDisplay" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
              Mayo Clinic
            </h4>
            <p className="text-gray-600 text-base">
              200 First St. SW<br />
              Rochester, MN 55905
            </p>
          </div>

          <div className="mb-6">
            {minnesotaContactDetails.map((detail, idx) => (
              <div key={idx} className="border-t border-gray-300 py-4 flex justify-between">
                <div>
                  <p className="text-gray-900 text-base font-medium">{detail.label}</p>
                  {detail.note && <p className="text-gray-600 text-sm">{detail.note}</p>}
                </div>
                <p className="text-gray-900 text-base">{detail.number}</p>
              </div>
            ))}
          </div>

          <div>
            <a href="/path-to-records-request-form.pdf" className="text-blue-900 hover:underline text-base">
              Records request form (PDF)
            </a>
          </div>

          <div className="mt-6">
            <h4 className="text-xl font-bold text-gray-900 mb-2 font-mayoDisplay" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
              Mayo Clinic Hospital, Methodist Campus
            </h4>
            <p className="text-gray-600 text-base">
              201 W. Center St.<br />
              Rochester, MN 55902
            </p>
          </div>

          <div className="mb-6 mt-6">
            {minnesotaHospitalContactDetails.map((detail, idx) => (
              <div key={idx} className="border-t border-gray-300 py-4 flex justify-between">
                <div>
                  <p className="text-gray-900 text-base font-medium">{detail.label}</p>
                  {detail.note && <p className="text-gray-600 text-sm">{detail.note}</p>}
                </div>
                <p className="text-gray-900 text-base">{detail.number}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="text-xl font-bold text-gray-900 mb-2 font-mayoDisplay" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
              Mayo Clinic Hospital, Saint Marys Campus including Mayo Eugenio Litta Children's Hospital
            </h4>
            <p className="text-gray-600 text-base">
              1216 Second St. SW<br />
              Rochester, MN 55902
            </p>
          </div>

          <div className="mb-6 mt-6">
            {minnesotaChildrensHospitalContactDetails.map((detail, idx) => (
              <div key={idx} className="border-t border-gray-300 py-4 flex justify-between">
                <div>
                  <p className="text-gray-900 text-base font-medium">{detail.label}</p>
                  {detail.note && <p className="text-gray-600 text-sm">{detail.note}</p>}
                </div>
                <p className="text-gray-900 text-base">{detail.number}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <a href="#top" className="text-blue-900 hover:underline text-base">
              ↟ Back to top
            </a>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 font-mayoDisplay uppercase mt-12" style={{ fontFamily: "'mayo-display', 'Georgia', serif" }}>
            Staff phone and email directories
          </h3>

          <p className="text-gray-600 text-base mb-6">
            Mayo Clinic doesn't have a public directory of staff phone numbers or email addresses. To contact someone, call the general telephone number at a Mayo Clinic location and the operator will connect you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-300 p-4 rounded-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Share your experience <span className="text-blue-900">›</span>
              </h4>
              <p className="text-gray-600 text-base">
                We welcome your feedback in our continued pursuit to improve care at Mayo Clinic. Reach out to the Office of Patient Experience to share any compliments, concerns, or suggestions.
              </p>
            </div>

            <div className="border border-gray-300 p-4 rounded-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Doctors and medical staff <span className="text-blue-900">›</span>
              </h4>
              <p className="text-gray-600 text-base">
                Browse our comprehensive list of doctors by name, condition, procedure, or location. Find their areas of specialty, their patient ratings, background information, and more.
              </p>
            </div>

            <div className="border border-gray-300 p-4 rounded-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Research staff <span className="text-blue-900">›</span>
              </h4>
              <p className="text-gray-600 text-base">
                Our clinical studies are led by a research faculty dedicated to transforming health care. Browse our faculty by last name to find their focus areas and the impact they have on patients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;