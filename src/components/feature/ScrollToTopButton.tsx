"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 group">
      {isVisible && (
        <div className="relative flex items-center">
          {/* Tooltip to the left */}
          <span className="absolute right-full mr-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Scroll to top
          </span>

          <Button onClick={scrollToTop} size="icon">
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
