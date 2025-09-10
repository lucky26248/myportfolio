import React, { useEffect, useState } from "react";
import { toolsList } from "../config/config";

const Tools = () => {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const toolContainers = document.querySelectorAll(".tool-container");
      toolContainers.forEach((container, index) => {
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
    <section id="tools" className="text-white p-8 flex flex-col items-center">
      <h2 className="text-4xl font-bold neon-glow mb-8 text-center">Tools</h2>
      <style jsx>{`
        .tool-container {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
        }
        .tool-container.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 mx-auto">
        {toolsList.map((tool, index) => (
          <div
            key={index}
            className={`tool-container flex flex-col items-center ${
              visible.includes(index) ? "visible" : ""
            }`}
            style={{
              transitionDelay: `${index * 0.1}s`,
            }}
          >
            <div className="text-5xl hover:text-neon transition-all duration-300 mb-2">
              {tool.icon}
            </div>
            <p>{tool.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tools;
