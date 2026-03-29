"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, ExternalLink } from "lucide-react";
import { useSteveBot } from "@/hooks/use-steve-bot";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatHeader } from "./chat/chat-header";
import { ChatInput } from "./chat/chat-input";
import { ChatToggle } from "./chat/chat-toggle";

// Modular Imports
// import { ChatHeader } from "./chat/ChatHeader";
// import { ChatInput } from "./chat/ChatInput";

export const TechnicalTwin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { messages, isTyping, sendMessage } = useSteveBot();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => { if (!isOpen) setIsOpen(true); }, 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            /* RESPONSIVE FIX: Max width for desktop, full width minus padding for mobile */
            className="w-[calc(100vw-32px)] sm:w-[400px] h-[500px] sm:h-[600px] max-h-[80vh] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl flex flex-col overflow-hidden mb-4"
          >
            <ChatHeader onClose={() => setIsOpen(false)} />

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30 dark:bg-transparent scroll-smooth">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center p-6 opacity-60">
                   <p className="text-xs font-medium">Welcome to Steve's Technical Brain</p>
                </div>
              )}

              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[90%] p-3 rounded-2xl text-sm shadow-sm ${
                    msg.role === "user" ? "bg-slate-900 text-white rounded-tr-none" : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-800"
                  }`}>
                    {msg.role === "ai" ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                        a: ({ ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" className="font-bold text-cyan-600 underline" />,
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        code: ({ ...props }) => <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-pink-600" {...props} />
                      }}>{msg.content}</ReactMarkdown>
                    ) : (
                      <span className="whitespace-pre-wrap">{msg.content}</span>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-1.5 p-3 bg-white dark:bg-slate-900 w-fit rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-800">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            <ChatInput value={inputValue} onChange={setInputValue} onSend={handleSend} disabled={!inputValue.trim()} />
          </motion.div>
        )}
      </AnimatePresence>

       <div className="pointer-events-auto">
        <ChatToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </div>
    </div>
  );
};