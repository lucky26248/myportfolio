import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { name } from "../config/config";
import ailogo from '../assets/sel.png';
const aiBaseURL = process.env.REACT_APP_AI_BASE_URL;
const authToken = process.env.REACT_APP_AUTH_TOKEN_KEY;

export default function ChatBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [messages, setMessages] = useState([
        { from: "ai", text: `Hello! 👋 I’m your AI assistant. Ask me anything about ${name}.` },
    ]);
    const [input, setInput] = useState("");
    const chatEndRef = useRef(null);

    const handleSend = async () => {
        if (!input.trim()) return;

        // Add user message immediately
        setMessages((prev) => [...prev, { from: "user", text: input }]);
        const userMessage = input;
        setInput("");
        setGenerating(true);
        let url = `${aiBaseURL}/api/chat/prompt?authToken=${authToken}&prompt=${userMessage}`;
        console.log("Fetching AI response from URL:", url);
        try {
            const response = await fetch(
                `${aiBaseURL}/api/chat/prompt?authToken=${authToken}&prompt=${userMessage}`
            );

            const result = await response.json();

            if (result.success && result.data) {
                // Add AI response
                setMessages((prev) => [...prev, { from: "ai", text: result.data.trim() }]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { from: "ai", text: "⚠️ Sorry, I couldn’t generate a response." },
                ]);
            }
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setMessages((prev) => [
                ...prev,
                { from: "ai", text: "❌ Something went wrong. Please try again." },
            ]);
        } finally {
            setGenerating(false);
        }
    };


    // Auto-scroll
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (isOpen) return; // stop when chat is open

        const interval = setInterval(() => {
            setShowHint(true);
            const timeout = setTimeout(() => setShowHint(false), 5000); // visible for 5s
            return () => clearTimeout(timeout);
        }, 30000);

        return () => clearInterval(interval);
    }, [isOpen]);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Collapsed Button */}
            <AnimatePresence>
                {!isOpen && showHint && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4 }}
                        className="text-center text-sm text-gray-600 bg-gradient-to-r from-purple-200 to-blue-200 px-3 py-1 rounded-full shadow-md mb-3"
                    >
                        👇 Ask me anything about {name}
                    </motion.p>
                )}
            </AnimatePresence>
            {!isOpen && (
                <motion.button
                    onClick={() => setIsOpen(true)}
                    className="relative inline-flex p-[2px] rounded-full overflow-hidden shadow-lg hover:scale-105 transition z-50"
                    whileTap={{ scale: 0.95 }}
                >
                    <span
                        aria-hidden
                        className="absolute inset-0 rounded-full animate-spin pointer-events-none"
                        style={{
                            background:
                                "conic-gradient(from 0deg, #a855f7, #ec4899, #3b82f6, #a855f7)",
                            animationDuration: "4s",
                        }}
                    />
                    <div className="relative z-10 flex items-center gap-2 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full px-5 py-3">
                        <img src={ailogo} alt="SelfServe.ai" className="h-8 w-auto" />
                    </div>
                </motion.button>
            )}

            {/* Expanded Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full sm:max-w-sm md:w-96 h-[70vh] sm:h-[28rem] rounded-2xl shadow-xl border bg-white overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg font-semibold px-4 py-3 flex justify-between items-center">
                            SelfServe.ai – Chat
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-gray-200"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 space-y-3 overflow-y-auto flex flex-col">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`px-4 py - 2 rounded - xl text - sm max - w - [80 %] ${msg.from === "ai"
                                        ? "bg-gray-100 text-gray-800 self-start"
                                        : "bg-blue-500 text-white self-end"
                                        } `}
                                >
                                    {msg.text}
                                </div>
                            ))}
                            <div ref={chatEndRef}></div>
                        </div>

                        {/* Input */}
                        <div className="flex items-center border-t px-3 py-2">
                            <input
                                type="text"
                                className="flex-1 outline-none text-sm px-3 py-2 rounded-xl text-black bg-gray-100 focus:ring-2 focus:ring-blue-400 transition"
                                placeholder={`Ask about ${name}...`}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            />
                            <button
                                onClick={handleSend}
                                disabled={input.length <= 5 || generating}
                                className="ml-2 p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                                aria-disabled={input.length <= 5 || generating}
                            >
                                {input.length > 5 && !generating ? (
                                    <span className="text-3xl text-green-500 rounded-full">➤</span>
                                ) : (
                                    <span className="text-3xl text-gray-400 rounded-full">➤</span>
                                )}
                            </button>
                        </div>
                    </motion.div>

                )}
            </AnimatePresence>
        </div>
    );
}
