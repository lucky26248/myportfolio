import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { name } from "../config/config";
import ailogo from '../assets/sel.png';
const aiBaseURL = process.env.REACT_APP_AI_BASE_URL;
const authToken = process.env.REACT_APP_AUTH_TOKEN_KEY;

export default function ChatBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const timerRef = useRef(null);
    const [generating, setGenerating] = useState(false);
    const inputRef = useRef(null);
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
        if (isOpen) {
            clearTimer();
            return;
        }
        startCycle();

        return () => clearTimer();
    }, [isOpen]);

    const clearTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    function startCycle() {
        clearTimer();
        // hide first
        setShowHint(false);

        // after 20s → show for 4s
        timerRef.current = setTimeout(() => {
            setShowHint(true);

            // after 4s → restart the cycle
            timerRef.current = setTimeout(() => startCycle(), 8000);
        }, 20000);
    }

    const handleFocus = () => {
        setTimeout(() => {
            inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Collapsed Button */}
            {!isOpen ? (
                <div className="flex flex-col items-end gap-2">
                    {showHint && <AnimatePresence>
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 12 }}
                            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                            className="text-center text-sm text-gray-600 bg-gradient-to-r from-purple-200 to-blue-200 px-3 py-1 rounded-full shadow-md mb-3"
                        >
                            Ask anything about {name} 👇
                        </motion.p>
                    </AnimatePresence>}
                    <motion.button
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => setIsOpen(true)}
                        className="relative inline-flex items-end p-[2px] rounded-full overflow-hidden shadow-lg hover:scale-105 transition z-50"
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
                            <img src={ailogo} alt="SelfServe.ai" className="h-8 w-auto transition duration-100 hover:scale-105" />
                        </div>
                    </motion.button>
                </div>
            ) : <AnimatePresence>
                {(
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-50 flex flex-col bg-white h-[100dvh] sm:static sm:w-full sm:max-w-sm sm:rounded-2xl sm:shadow-xl sm:border sm:overflow-hidden md:w-96 md:h-[75vh] sm:h-[28rem]"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-400 to-blue-400 text-white text-lg font-semibold px-3 py-3 flex justify-between items-center">
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
                                    className={`px-4 py-2 rounded-xl max-w-[80%] ${msg.from === "ai"
                                        ? "bg-gray-100 text-gray-800 self-start border border-gray-300"
                                        : "bg-blue-500 text-white self-end border border-blue-800"
                                        }`}
                                >
                                    {msg.text.split(/(https?:\/\/[^\s]+)/).map((part, j) =>
                                        /^https?:\/\/[^\s]+$/.test(part) ? (
                                            <a
                                                key={j}
                                                href={part}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-300 cursor-pointer"
                                            >
                                                link
                                            </a>
                                        ) : (
                                            <span key={j}>{part}</span>
                                        )
                                    )}
                                </div>
                            ))}
                            <div ref={chatEndRef}></div>
                        </div>

                        {/* Input */}
                        <div className="flex items-center justify-center border-t px-3 py-2">
                            <input
                                type="text"
                                className="flex-1 outline-none text-sm px-3 py-2 rounded-xl text-black bg-gray-100 focus:ring-1 focus:ring-blue-400 transition"
                                placeholder={`Ask about ${name}...`}
                                value={input}
                                ref={inputRef}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                onFocus={handleFocus}
                            />
                            <button
                                onClick={handleSend}
                                disabled={input.length <= 5 || generating}
                                className="ml-3 text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed "
                                aria-disabled={input.length <= 5 || generating}
                            >
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: input.length > 5 && !generating ? 1 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {input.length > 5 && !generating && (
                                        <ArrowIcon active={input.length > 5 && !generating} />
                                    )}
                                </motion.div>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            }
        </div>
    );
}


const ArrowIcon = ({ active }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-7 h-7 ${active ? "text-blue-500" : "text-gray-400"} transition duration-300 hover:text-green-600`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
    </svg>
);