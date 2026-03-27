"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, ExternalLink, Sparkles } from "lucide-react";
import { useSteveBot } from "@/hooks/use-steve-bot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const TechnicalTwin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { messages, isTyping, sendMessage } = useSteveBot();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Proactive Trigger: Pop up after 8 seconds of browsing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setIsOpen(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll logic for streaming responses
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
              transformOrigin: "bottom right",
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[360px] sm:w-[400px] h-[550px] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header: Senior Branding */}
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="text-[13px] font-bold leading-none">
                    Steve.Architect (AI)
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Technical Twin • Online
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat Body: Rich Text Support */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30 dark:bg-transparent"
            >
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-2">
                  <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-full">
                    <MessageSquare className="h-6 w-6 text-cyan-600" />
                  </div>
                  <p className="text-xs font-medium text-slate-900 dark:text-slate-100">
                    Welcome to Steve's Technical Brain
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Ask me about GradeHub, my experience at iTravel, or my
                    engineering philosophy.
                  </p>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] p-3 rounded-2xl text-sm shadow-sm ${
                      msg.role === "user"
                        ? "bg-slate-900 text-white rounded-tr-none"
                        : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-800"
                    }`}
                  >
                    {msg.role === "ai" ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ ...props }) => (
                            <a
                              {...props}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-bold text-cyan-600 dark:text-cyan-400 underline decoration-cyan-500/30 hover:decoration-cyan-500 transition-all"
                            >
                              {props.children}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ),
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0">{children}</p>
                          ),
                          code: ({ ...props }) => (
                            <code
                              className="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono text-[12px] text-pink-600 dark:text-pink-400"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      <span className="whitespace-pre-wrap">{msg.content}</span>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex gap-2 items-center">
              <Input
                placeholder="Ask technical question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-1 focus-visible:ring-cyan-500 text-sm h-10"
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="rounded-full bg-slate-900 hover:bg-slate-800 text-white h-10 w-10 shrink-0 shadow-lg"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle: Circular Badge */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-slate-900 dark:bg-white rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex items-center justify-center text-white dark:text-slate-900 relative group"
      >
        {isOpen ? (
          <X className="h-7 w-7" />
        ) : (
          <MessageSquare className="h-7 w-7" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-cyan-500 border-2 border-white dark:border-slate-900"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
};
