const Gemini = ({ message, fontSize }) => {
  return (
    <div
      style={{
        fontFamily: "'Gamini', serif",
        fontSize: `${fontSize}px`,
        background: "linear-gradient(to right, #FF6F61, #5A189A)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
      }}
    >
      {message}
    </div>
  );
};

export default Gemini;
