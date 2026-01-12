"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Home, User, Server, FolderOpen, Mail } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/#home", label: "Home", icon: Home },
  { href: "/#about", label: "About", icon: User },
  { href: "/#services", label: "Expertise", icon: Server }, // 👈 Renamed label
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

  const getLinkClassName = (href: string) => {
    const hash = href.split("#")[1];
    if (pathname === "/" && `#${hash}` === currentHash) {
      return "text-cyan-600 font-semibold";
    }
    return "text-slate-600 hover:text-cyan-600 transition-colors";
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 py-4">
        <Link href="/#home" className="text-xl font-bold tracking-tight text-slate-900 hover:text-cyan-600 transition-colors">
          Steve<span className="text-cyan-600">.Architect</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-x-8">
          {navLinks.map((link) => {
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm flex items-center gap-2 ${getLinkClassName(link.href)}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button aria-label="Open menu" className="p-2 text-slate-600">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="text-left font-bold text-lg mb-6">Menu</SheetTitle>
              <nav className="flex flex-col gap-y-4">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                    >
                      <Icon size={20} className="text-cyan-600" />
                      <span className="font-medium">{link.label}</span>
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