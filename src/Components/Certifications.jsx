import React, { useEffect, useState, useRef } from "react";
import { certifications } from "../config/config";

const Certifications = () => {
  const [visibleIndexes, setVisibleIndexes] = useState([]);
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting && !visibleIndexes.includes(index)) {
            setVisibleIndexes((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    refs.current.forEach((ref) => ref && observer.observe(ref));

    return () => {
      refs.current.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, [visibleIndexes]);

  return (
    <div className="p-8 rounded-lg text-center">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white">
        Certifications
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {certifications.map((cert, index) => (
          <a
            key={index}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            data-index={index}
            ref={(el) => (refs.current[index] = el)}
            className={`${
              visibleIndexes.includes(index)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            } bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 transform transition-all duration-500 w-full sm:w-auto border-b border-sky-400`}
          >
            <span className="text-base sm:text-lg">{cert.icon}</span>
            <span className="font-medium text-sm sm:text-base md:text-lg">
              {cert.title}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
