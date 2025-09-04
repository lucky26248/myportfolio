import React, { useEffect, useState, useRef } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";
import { github, linkedin, email, contact } from "../config/config";

const Contacts = () => {
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

  const contactData = [
    { icon: <FaLinkedin />, label: "LinkedIn", url: linkedin },
    { icon: <FaGithub />, label: "GitHub", url: github },
    { icon: <FaEnvelope />, label: "Email", url: `mailto:${email}` },
    { icon: <FaPhone />, label: "Phone", url: `tel:+91${contact}` },
  ];

  return (
    <section id="contact" className="text-white p-8 flex flex-col items-center">
      <h2 className="text-4xl font-bold neon-glow mb-8 text-center">Contact</h2>
      <style jsx>{`
        .button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 20px;
          border-radius: 8px;
          background-color: #2d3748;
          color: white;
          font-size: 1.25rem;
          text-decoration: none;
          transition: background-color 0.3s, transform 0.2s;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          opacity: 0;
          transform: translateY(10px);
        }
        .button.visible {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .button:hover {
          background-color: rgba(45, 55, 72, 0.8);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }
        .icon {
          margin-right: 8px; /* Space between icon and text */
        }
      `}</style>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 mx-auto">
        {contactData.map((contact, index) => (
          <a
            key={index}
            href={contact.url}
            target="_blank"
            rel="noopener noreferrer"
            data-index={index}
            ref={(el) => (refs.current[index] = el)}
            className={`button ${
              visibleIndexes.includes(index) ? "visible" : ""
            }`}
          >
            <span className="icon">{contact.icon}</span>
            {contact.label}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contacts;
