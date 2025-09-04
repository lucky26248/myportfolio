import React, { useEffect, useState } from "react";
import axios from "axios";
import { SiLeetcode } from "react-icons/si";
import { motion } from "framer-motion";
import { leetcodeApi, profileLink } from "../config/config";

const LeetCodeStats = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        const response = await axios.get(leetcodeApi);
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
    fetchLeetCodeData();
  }, []);

  if (loading) return <LoadingMessage />;
  if (error)
    return (
      <div style={{ textAlign: "center", color: "red" }}>
        {error}
        <br />
        <a
          href={profileLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Go to my LeetCode profile
        </a>
      </div>
    );

  const { totalSolved, easySolved, mediumSolved, hardSolved, totalQuestions } =
    userData;

  const unsolved = totalQuestions - totalSolved; // Remaining problems
  const easyPercentage = (easySolved / totalQuestions) * 100;
  const mediumPercentage = (mediumSolved / totalQuestions) * 100;
  const hardPercentage = (hardSolved / totalQuestions) * 100;
  const unsolvedPercentage = (unsolved / totalQuestions) * 100;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
      }}
    >
      <motion.div
        style={{ display: "flex", alignItems: "center", gap: "8px" }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <a href={profileLink} target="_blank" rel="noopener noreferrer">
          <SiLeetcode style={{ color: "#FFD700", fontSize: "40px" }} />
        </a>
        <h1 style={{ color: "white", fontSize: "32px", fontWeight: "bold" }}>
          LeetCode Dashboard
        </h1>
      </motion.div>

      {/* Circular Progress Bar */}
      <motion.svg
        viewBox="0 0 100 100"
        style={{ width: "200px", height: "200px", transform: "rotate(-90deg)" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Base circle (background for unsolved portion) */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#ccc" // Gray for unsolved
          strokeWidth="8"
          fill="none"
          strokeDasharray="100"
          strokeDashoffset="0"
        />

        {/* Easy (Green) */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#4CAF50" // Green
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${easyPercentage} ${100 - easyPercentage}`}
          strokeDashoffset="0" // Starts at 0 (beginning of the circle)
        />

        {/* Remaining Unsolved (Gray background handles this by default) */}
      </motion.svg>

      {/* Total Solved Display */}
      <motion.div
        style={{
          position: "absolute",
          width: "100%",
          textAlign: "center",
          color: "white",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 style={{ fontSize: "24px", fontWeight: "bold" }}>
          {totalSolved}/{totalQuestions}
        </h3>
        <p style={{ fontSize: "14px", color: "gray" }}>Solved</p>
      </motion.div>
    </div>
  );
};

// Loading Component
const LoadingMessage = () => (
  <div style={{ textAlign: "center", color: "white" }}>
    <div className="ripple-loader"></div>
    <h2 className="loading-text">Fetching data from LeetCode...</h2>
  </div>
);

export default LeetCodeStats;
