import React, { useState } from "react";
import {
  name,
  resume,
  profileLink,
  leetcodeProfile,
  profileImage,
  github,
  linkedin,
} from "../config/config";
import {
  FaUser,
  FaTools,
  FaProjectDiagram,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaFileDownload,
  FaBriefcase,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import Gemini from "./Gemini";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-white p-2 fixed top-0 w-full z-50 shadow-lg rounded-b-lg transform transition-transform duration-300 hover:shadow-2xl mb-0">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo/Name */}
        <div className="flex items-center gap-3">
          <img
            src={profileImage}
            alt="Logo"
            className="w-9 h-9 rounded-full border-2 border-x-orange-400 border-y-purple-500 hover:scale-110 transform transition-transform duration-300 "
          />
          <Gemini message={name} fontSize={28} />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a
            href="#about"
            className="flex items-center hover:text-neon transition duration-300"
          >
            <FaUser className="mr-1" /> About
          </a>
          <a
            href="#experience"
            className="flex items-center hover:text-neon transition duration-300"
          >
            <FaBriefcase className="mr-1" /> Experience
          </a>
          <a
            href="#skills"
            className="flex items-center hover:text-neon transition duration-300"
          >
            <FaTools className="mr-1" /> Skills
          </a>
          <a
            href="#projects"
            className="flex items-center hover:text-neon transition duration-300"
          >
            <FaProjectDiagram className="mr-1" /> Projects
          </a>
          <a
            href="#contact"
            className="flex items-center hover:text-neon transition duration-300"
          >
            <FaEnvelope className="mr-1" /> Contact
          </a>
          <a
            href={resume}
            className="flex items-center hover:text-neon transition duration-300"
            target="_blank"
            download
          >
            <FaFileDownload className="mr-1" /> Resume
          </a>
          <a
            href={profileLink}
            className="flex items-center hover:text-neon transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiLeetcode className="mr-1" /> LeetCode
          </a>
        </nav>

        {/* Toggle Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-900 absolute top-16 left-0 w-full flex flex-col space-y-4 p-4 shadow-lg border-t border-gray-700">
          <a
            href="#about"
            className="flex items-center hover:text-neon transition duration-300"
            onClick={toggleMenu}
          >
            <FaUser className="mr-2" /> About
          </a>
          <a
            href="#experience"
            className="flex items-center hover:text-neon transition duration-300"
            onClick={toggleMenu}
          >
            <FaBriefcase className="mr-2" /> Experience
          </a>
          <a
            href="#skills"
            className="flex items-center hover:text-neon transition duration-300"
            onClick={toggleMenu}
          >
            <FaTools className="mr-2" /> Skills
          </a>
          <a
            href="#projects"
            className="flex items-center hover:text-neon transition duration-300"
            onClick={toggleMenu}
          >
            <FaProjectDiagram className="mr-2" /> Projects
          </a>
          <a
            href="#contact"
            className="flex items-center hover:text-neon transition duration-300"
            onClick={toggleMenu}
          >
            <FaEnvelope className="mr-2" /> Contact
          </a>
          <a
            href={resume}
            className="flex items-center hover:text-neon transition duration-300"
            download
            target="_blank"
            onClick={toggleMenu}
          >
            <FaFileDownload className="mr-2" /> Resume
          </a>
          <a
            href={profileLink}
            className="flex items-center hover:text-neon transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
            onClick={toggleMenu}
          >
            <SiLeetcode className="mr-2" /> LeetCode
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
