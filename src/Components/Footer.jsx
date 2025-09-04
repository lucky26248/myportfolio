import React, { useEffect, useRef, useState } from "react";
import {
  contact,
  email,
  footerAbout,
  github,
  instagram,
  linkedin,
  name,
} from "../config/config";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Gemini from "./Gemini";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Initial check

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Update state on resize
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Start animation when footer is in viewport
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the footer is visible
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const footerStyle = {
    color: "#ffffff",
    padding: "2rem 0",
    textAlign: "center",
    borderTop: "1px solid #e0e0e0",
    transition: "opacity 1.5s ease-out, transform 1.5s ease-out",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(50px)",
  };

  const footerContentStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
  };

  const sectionStyle = {
    margin: "0.3rem 0",
    color: "#555",
    fontSize: "1rem",
    transition: "color 0.3s ease",
  };

  const sectionTitleStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#969696",
    transition: "color 0.3s ease, transform 0.3s ease",
  };

  const linkStyle = {
    color: "#007acc",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "color 0.3s ease, transform 0.3s ease",
  };

  const linkHoverStyle = {
    color: "#005bb5",
    transform: "scale(1.05)",
  };

  const socialLinksContainerStyle = {
    display: "flex",
    gap: "1.5rem",
    justifyContent: "center",
    marginTop: "1rem",
  };

  const footerBottomStyle = {
    marginTop: "1rem",
    fontSize: "0.85rem",
    color: "#777",
  };

  return (
    <footer style={footerStyle} ref={footerRef}>
      <div style={footerContentStyle}>
        <div style={sectionStyle}>
          <h2
            style={sectionTitleStyle}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            About Me
          </h2>
          {/*<p>{footerAbout}</p> */}
          <Gemini message={footerAbout} fontSize={isMobile ? 12 : 17} />
        </div>
        <div style={sectionStyle}>
          <h2
            style={sectionTitleStyle}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Contact
          </h2>
          <p>
            <a
              href={`mailto:${email}`}
              style={linkStyle}
              onMouseOver={(e) => {
                e.target.style.color = linkHoverStyle.color;
                e.target.style.transform = linkHoverStyle.transform;
              }}
              onMouseOut={(e) => {
                e.target.style.color = linkStyle.color;
                e.target.style.transform = "scale(1)";
              }}
            >
              {email}
            </a>
          </p>
          <p>{`+91 ${contact}`}</p>
        </div>
        <div style={sectionStyle}>
          <h2
            style={sectionTitleStyle}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Follow Me
          </h2>
          <div style={socialLinksContainerStyle}>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseOver={(e) => {
                e.target.style.color = linkHoverStyle.color;
                e.target.style.transform = linkHoverStyle.transform;
              }}
              onMouseOut={(e) => {
                e.target.style.color = linkStyle.color;
                e.target.style.transform = "scale(1)";
              }}
            >
              <FaGithub /> GitHub
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseOver={(e) => {
                e.target.style.color = linkHoverStyle.color;
                e.target.style.transform = linkHoverStyle.transform;
              }}
              onMouseOut={(e) => {
                e.target.style.color = linkStyle.color;
                e.target.style.transform = "scale(1)";
              }}
            >
              <FaLinkedin /> LinkedIn
            </a>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseOver={(e) => {
                e.target.style.color = linkHoverStyle.color;
                e.target.style.transform = linkHoverStyle.transform;
              }}
              onMouseOut={(e) => {
                e.target.style.color = linkStyle.color;
                e.target.style.transform = "scale(1)";
              }}
            >
              <FaInstagram /> Instagram
            </a>
          </div>
        </div>
      </div>
      <div style={footerBottomStyle}>
        <p>
          &copy; {new Date().getFullYear()} {name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
