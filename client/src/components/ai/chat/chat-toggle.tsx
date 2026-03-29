"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";

interface ChatToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ChatToggle = ({ isOpen, onClick }: ChatToggleProps) => {
  return (
    <motion.button
      onClick={onClick}
      type="button"
      aria-label={isOpen ? "Close chat" : "Open chat"}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      // Inline style for width/height guarantees a true circle —
      // Tailwind alone can be overridden by parent flex/grid
      style={{
        width: 56,
        height: 56,
        borderRadius: "50%",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        border: "none",
        outline: "none",
        cursor: "pointer",
        backgroundColor: isOpen ? "#1e293b" : "#0f172a",
        boxShadow: isOpen
          ? "0 8px 32px rgba(0,0,0,0.5)"
          : "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(6,182,212,0.3)",
      }}
    >
      {/* Pulsing cyan halo — only when closed */}
      {!isOpen && (
        <span
          style={{
            position: "absolute",
            inset: -3,
            borderRadius: "50%",
            border: "1.5px solid rgba(6,182,212,0.4)",
            animation: "chat-ring 2s ease-out infinite",
            pointerEvents: "none",
          }}
        />
      )}

      <style>{`
        @keyframes chat-ring {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(1.3); opacity: 0; }
          100% { transform: scale(1.3); opacity: 0; }
        }
      `}</style>

      {/* Icon swap with rotation */}
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.span
            key="x"
            initial={{ opacity: 0, rotate: -90, scale: 0.4 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ display: "flex", color: "#94a3b8" }}
          >
            <X size={20} />
          </motion.span>
        ) : (
          <motion.span
            key="msg"
            initial={{ opacity: 0, rotate: 90, scale: 0.4 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ display: "flex", position: "relative" }}
          >
            <MessageSquare size={22} color="#22d3ee" />

            {/* Notification dot */}
            <span
              style={{
                position: "absolute",
                top: -3,
                right: -3,
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#22d3ee",
                border: "2px solid #0f172a",
                boxShadow: "0 0 6px rgba(34,211,238,0.8)",
              }}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};