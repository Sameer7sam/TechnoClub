
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { Star, Rocket, Moon } from 'lucide-react';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered animation for hero elements
    const titleElement = titleRef.current;
    const subtitleElement = subtitleRef.current;
    const ctaElement = ctaRef.current;

    setTimeout(() => {
      titleElement?.classList.add('opacity-100', 'translate-y-0');
    }, 300);
    
    setTimeout(() => {
      subtitleElement?.classList.add('opacity-100', 'translate-y-0');
    }, 600);
    
    setTimeout(() => {
      ctaElement?.classList.add('opacity-100', 'translate-y-0');
    }, 900);
  }, []);

  // Generate stars for the background
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 2 + 1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const animationDelay = Math.random() * 3;
      
      stars.push(
        <div 
          key={i}
          className="absolute rounded-full bg-white animate-pulse-glow"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            animationDelay: `${animationDelay}s`,
            opacity: Math.random() * 0.7 + 0.3
          }}
        />
      );
    }
    return stars;
  };

  return (
    <section className="relative min-h-[80vh] pt-32 pb-20 overflow-hidden bg-space-black">
      {/* Star background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {renderStars()}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-pink-900/20 rounded-full blur-3xl"></div>
      </div>

      {/* Animated floating objects */}
      <div className="absolute top-1/4 left-1/6 animate-float" style={{animationDelay: '0.5s'}}>
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-70 blur-sm"></div>
      </div>
      <div className="absolute bottom-1/3 right-1/5 animate-float" style={{animationDelay: '1.5s'}}>
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full opacity-70 blur-sm"></div>
      </div>
      <div className="absolute top-2/3 left-1/3 animate-float" style={{animationDelay: '0s'}}>
        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full opacity-70 blur-sm"></div>
      </div>

      <div className="container px-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <div className="inline-block mb-6 opacity-0 translate-y-8 transition-all duration-700 ease-apple" ref={titleRef}>
            <span className="chip mb-3 flex items-center">
              <Star className="w-3 h-3 mr-1.5" />
              The Digital Conundrum
            </span>
          </div>
          
          <h1 
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl opacity-0 translate-y-8 transition-all duration-700 ease-apple"
            ref={titleRef}
          >
            <span className="text-gradient glow-text">Techno Clubs</span> Portal
            <span className="block mt-2 text-lg md:text-xl lg:text-2xl font-medium text-gray-400">
              The next-generation digital infrastructure for student-driven tech communities
            </span>
          </h1>
          
          <p 
            className="text-lg md:text-xl text-gray-300 max-w-3xl mb-10 opacity-0 translate-y-8 transition-all duration-700 ease-apple delay-150"
            ref={subtitleRef}
          >
            A comprehensive digital transformation intelligently orchestrating club dynamics, eliminating inefficiencies through smart automation, unified collaboration frameworks, and real-time visibility.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 opacity-0 translate-y-8 transition-all duration-700 ease-apple delay-300"
            ref={ctaRef}
          >
            <button className="button-shine bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-md font-medium transition-all hover:shadow-neon w-full sm:w-auto flex items-center justify-center border border-purple-500/30">
              <Rocket className="w-5 h-5 mr-2" />
              Explore the Platform
            </button>
            <button className="px-8 py-4 rounded-md font-medium border border-purple-500/30 hover:bg-purple-500/10 transition-all w-full sm:w-auto flex items-center justify-center text-gray-200">
              <Moon className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
