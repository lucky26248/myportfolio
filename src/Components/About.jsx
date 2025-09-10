import React, { useEffect, useState, useRef } from "react";
import { aboutMe, profileImage, name, role } from "../config/config";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const checkVisibility = () => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setIsVisible(true);
      }
    }
  };

  useEffect(() => {
    checkVisibility(); // Check visibility on mount
    window.addEventListener("scroll", checkVisibility);
    return () => window.removeEventListener("scroll", checkVisibility);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`text-white p-4 flex items-center justify-center mt-0 bg-opacity-0 transition-transform duration-700 ${
        isVisible
          ? "translate-x-0 opacity-100 ease-out-cubic"
          : "-translate-x-full opacity-0"
      }`}
    >
      <style jsx>{`
        .ease-out-cubic {
          transition-timing-function: cubic-bezier(0.1, 1, 0.1, 1);
        }
      `}</style>
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl mx-auto space-y-6 md:space-y-0 md:space-x-6">
        {/* About Text Section */}
        <div className="text-gray-200 p-6 rounded-lg transform transition-transform duration-300 hover:scale-105 border-4 border-transparent md:w-1/2 md:mb-0">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 animate-pulse text-center md:text-left text-sky-400">
            About Me
          </h2>
          <p className="text-sm sm:text-lg font-medium leading-relaxed transition duration-300 text-center md:text-left">
            {aboutMe}
          </p>
        </div>

        {/* Profile Image and Button Section */}
        <div className="flex flex-col items-center">
          {/* Profile Image Container */}
          <div className="relative flex items-center justify-center group">
            {/* Profile Image */}
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-lg w-40 h-40 sm:w-48 sm:h-48 object-cover shadow-xl border-2 border-sky-400 transform transition-transform duration-500 group-hover:scale-110"
            />

            {/* Name and Role Section */}
            <div className="absolute bottom-0 left-0 w-full text-center opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-300 bg-black bg-opacity-60 text-white p-2 rounded-lg shadow-xl">
              <h3 className="text-lg font-bold">{name}</h3>
              <p className="text-sm font-medium text-sky-400">{role}</p>
            </div>
          </div>
          
          {/* Portfolio Button */}
          <div className="mt-4 animate-pulse hover:scale-105">
            <a
              href="https://meetguddudev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white px-3 py-1 font-semibold border border-sky-500 hover:border-green-700 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
