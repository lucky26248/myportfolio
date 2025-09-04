import React, { useEffect, useState } from "react";
import { skills } from "../config/config";

const Skills = () => {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const skillContainers = document.querySelectorAll(".skill-container");
      skillContainers.forEach((container, index) => {
        const rect = container.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          setVisible((prevVisible) => [...new Set([...prevVisible, index])]);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger on load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="skills" className="text-white p-8 flex flex-col items-center">
      <h2 className="text-4xl font-bold neon-glow mb-8 text-center">Skills</h2>
      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .cube {
          width: 160px;
          height: 160px;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.8s ease-in-out, opacity 0.6s ease-in-out;
          opacity: 0;
        }
        .cube.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
        }
        .front {
          background-color: #2d3748;
        }
        .back {
          background: linear-gradient(45deg, #6b46c1, #e53e3e);
          transform: rotateY(180deg);
        }
      `}</style>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`skill-container perspective flex justify-center`}
          >
            <div
              className={`cube ${
                visible.includes(index) ? "visible" : ""
              } translate-y-10`}
              style={{
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              {/* Front Face */}
              <div className="face front">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-4xl text-primary">{skill.icon}</div>
                  <p className="text-center text-lg font-semibold mt-4">
                    {skill.name}
                  </p>
                </div>
              </div>
              {/* Back Face */}
              <div className="face back">
                <p className="text-center text-lg font-bold text-white">
                  Mastered
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
