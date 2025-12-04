"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Header = () => {
  const [currentHash, setCurrentHash] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const navLinks = [
    { href: "/#home", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#services", label: "Services" },
    { href: "/#projects", label: "Projects" },
    { href: "/#contact", label: "Contact" },
  ];

  useEffect(() => {
    if (pathname !== "/") {
      setCurrentHash("");
      return;
    }

    const sections = navLinks.map((link) => {
      const id = link.href.split("#")[1];
      return document.getElementById(id);
    });

    if (!sections) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentHash(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => section && observer.observe(section));

    return () => {
      sections.forEach((section) => section && observer.unobserve(section));
    };
  }, [pathname]); // <-- 3. Re-run this effect when the page changes

  // Helper to determine if a link should be "active"
  const getLinkClassName = (href: string) => {
    // On the homepage, use the hash. On other pages, no link is active.
    const hash = href.split("#")[1];
    if (pathname === "/" && `#${hash}` === currentHash) {
      return "text-cyan-500";
    }
    return "text-muted-foreground hover:text-foreground";
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto flex justify-between items-center p-4 py-2">
        <Link href="/#home" className="text-2xl font-bold text-cyan-400">
          Steve Arnold
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-x-6">
          {navLinks.map((link) => (
            // --- 4. Use the <Link> component ---
            <Link
              key={link.label}
              href={link.href}
              className={`transition-colors ${getLinkClassName(link.href)}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Nav with Sheet */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button aria-label="Open menu">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-y-6 mt-8 ml-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`transition-colors ${getLinkClassName(link.href)}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
