"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { useSteveBot } from "@/hooks/use-steve-bot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const TechnicalTwin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { messages, isTyping, sendMessage } = useSteveBot();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Proactive Trigger: Pop up after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setIsOpen(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[350px] h-[500px] bg-card border border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center border-b">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-semibold text-sm">Steve Arnold (AI Twin)</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/20" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4 text-white" />
              </Button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground text-xs py-10 px-4">
                  Ask Steve's AI Twin about his experience, projects like GradeHub, or his tech stack.
                </div>
              )}
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-muted text-foreground rounded-tl-none border border-border"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-2xl rounded-tl-none animate-pulse flex gap-1">
                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t bg-muted/30 flex gap-2">
              <Input
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="bg-background"
              />
              <Button size="icon" onClick={handleSend} disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center text-primary-foreground relative"
      >
        <MessageSquare className="h-6 w-6" />
        {!isOpen && (
           <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-background rounded-full" />
        )}
      </motion.button>
    </div>
  );
};