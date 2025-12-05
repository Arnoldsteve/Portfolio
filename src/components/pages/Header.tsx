"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Home, User, Briefcase, FolderOpen, Mail } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


  const navLinks = [
    { href: "/#home", label: "Home", icon: Home },
    { href: "/#about", label: "About", icon: User },
    { href: "/#services", label: "Services", icon: Briefcase },
    { href: "/#projects", label: "Projects", icon: FolderOpen },
    { href: "/#contact", label: "Contact", icon: Mail },
  ];

export const Header = () => {
  const [currentHash, setCurrentHash] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
  }, [pathname]);

  // Helper to determine if a link should be "active"
  const getLinkClassName = (href: string) => {
    const hash = href.split("#")[1];
    if (pathname === "/" && `#${hash}` === currentHash) {
      return "text-cyan-500";
    }
    return "text-muted-foreground hover:text-foreground";
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-background/100 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto flex justify-between items-center p-4 py-4">
        <Link href="/#home" className="font-bold text-cyan-400">
          Steve Arnold
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-x-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-colors flex items-center gap-2 ${getLinkClassName(link.href)}`}
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </Link>
            );
          })}
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
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`transition-colors flex items-center gap-3 ${getLinkClassName(link.href)}`}
                    >
                      <Icon size={20} />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};