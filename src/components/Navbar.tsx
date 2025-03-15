
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-apple px-6 lg:px-10",
        scrolled 
          ? "py-4 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-subtle" 
          : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-techBlue to-[#5E5CE6] flex items-center justify-center">
            <span className="text-white font-medium text-lg">TC</span>
          </div>
          <span className="font-semibold text-lg md:text-xl text-techBlack">Techno Clubs</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#problem" className="text-techGray-dark hover:text-techBlack font-medium transition-colors">Problem</a>
          <a href="#features" className="text-techGray-dark hover:text-techBlack font-medium transition-colors">Features</a>
          <a href="#benefits" className="text-techGray-dark hover:text-techBlack font-medium transition-colors">Benefits</a>
          <a href="#contact" className="text-techGray-dark hover:text-techBlack font-medium transition-colors">Contact</a>
          <button className="button-shine bg-techBlue text-white px-5 py-2 rounded-md font-medium transition-all hover:shadow-md hover:bg-techBlue/90">
            Get Started
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-techGray-dark focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className={cn("w-6 h-6 transition-transform duration-300", menuOpen ? "rotate-90" : "")}
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 bg-white z-40 transition-all duration-400 ease-apple pt-24 px-6",
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <nav className="flex flex-col space-y-6 text-center">
          <a 
            href="#problem" 
            className="text-xl font-medium text-techGray-dark"
            onClick={() => setMenuOpen(false)}
          >
            Problem
          </a>
          <a 
            href="#features" 
            className="text-xl font-medium text-techGray-dark"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#benefits" 
            className="text-xl font-medium text-techGray-dark"
            onClick={() => setMenuOpen(false)}
          >
            Benefits
          </a>
          <a 
            href="#contact" 
            className="text-xl font-medium text-techGray-dark"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
          <button className="button-shine mt-4 bg-techBlue text-white px-6 py-3 rounded-md font-medium transition-all hover:shadow-md hover:bg-techBlue/90 mx-auto">
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
