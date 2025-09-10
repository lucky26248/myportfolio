import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { name } from "../config/config";
import ailogo from '../assets/sel.png';
const aiBaseURL = process.env.REACT_APP_AI_BASE_URL;
const authToken = process.env.REACT_APP_AUTH_TOKEN_KEY;

export default function ChatBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [messages, setMessages] = useState([
        { from: "ai", text: `Hello! 👋 I’m your AI assistant. Ask me anything about ${name}.` },
    ]);
    const [input, setInput] = useState("");
    const chatEndRef = useRef(null);
    const showHintTimeout = useRef(null);
    const inputRef = useRef(null);

    const handleFocus = () => {
        setTimeout(() => {
            inputRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            inputRef.current?.focus();
        }, 300); // 0.3 sec delay
    };

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
        let focusTimeOut = null;
        if (isOpen) {
            //scrolling input into view when chat is opened
            handleFocus();
            return;
        }
        // stop when chat is open
        const interval = setInterval(() => {
            if (showHintTimeout.current) return;
            setShowHint(true);
            showHintTimeout.current = setTimeout(() => setShowHint(false), 5000);
        }, 10000);

        return () => {
            clearInterval(interval);
            clearTimeout(showHintTimeout.current);
            if (focusTimeOut) clearTimeout(focusTimeOut);
        };
    }, [isOpen]);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Collapsed Button */}
            {!isOpen ? (
                <div className="flex flex-col items-end">
                    {showHint &&
                        <AnimatePresence>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                                className="text-center text-sm text-gray-600 bg-gradient-to-r from-purple-200 to-blue-200 px-3 py-1 rounded-full shadow-md mb-4"
                            >
                                Ask anything about {name} 👇
                            </motion.p>
                        </AnimatePresence>
                    }
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
                            <img src={ailogo} alt="SelfServe.ai" className="h-8 w-auto cursor-pointer hover:scale-105 duration-200" />
                        </div>
                    </motion.button>
                </div>
            ) : <AnimatePresence onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}>
                {(
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="
                            w-[100vw] h-[90vh] sm:max-w-sm md:w-96 md:h-[75vh]
                            rounded-none sm:rounded-2xl
                            shadow-xl border bg-white
                            fixed inset-0 sm:relative
                            flex flex-col
                            overflow-y-hidden
                            child-scroll overscroll-contain
                        "
                    >
                        {/* Header (always visible at top) */}
                        <div className="bg-gradient-to-r from-purple-400 to-blue-400 text-white text-lg font-semibold px-4 py-3 flex justify-between items-center sticky top-0 z-10">
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
                                                className="text-blue-300 hover:underline"
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

                        {/* Input (sticks to bottom, moves above keyboard on mobile) */}
                        <div className="flex items-center border-t px-3 py-2 bg-white sticky bottom-0">
                            <input
                                type="text"
                                className="flex-1 outline-none text-sm px-3 py-2 rounded-xl text-black bg-gray-100 focus:ring-1 focus:ring-blue-400 transition"
                                placeholder={`Ask about ${name}...`}
                                value={input}
                                ref={inputRef}
                                onFocus={handleFocus}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button
                                onClick={handleSend}
                                disabled={input.length <= 5 || generating}
                                className="ml-3 text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
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
        </div >
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
