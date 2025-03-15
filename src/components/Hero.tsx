
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered animation for hero elements
    const titleElement = titleRef.current;
    const subtitleElement = subtitleRef.current;
    const ctaElement = ctaRef.current;
    const decorationElement = decorationRef.current;

    setTimeout(() => {
      titleElement?.classList.add('opacity-100', 'translate-y-0');
    }, 300);
    
    setTimeout(() => {
      subtitleElement?.classList.add('opacity-100', 'translate-y-0');
    }, 600);
    
    setTimeout(() => {
      ctaElement?.classList.add('opacity-100', 'translate-y-0');
    }, 900);
    
    setTimeout(() => {
      decorationElement?.classList.add('opacity-100', 'scale-100');
    }, 1200);
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-techBlue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#5E5CE6]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <div className="inline-block mb-6 opacity-0 translate-y-8 transition-all duration-700 ease-apple" ref={titleRef}>
            <span className="chip mb-3">The Digital Conundrum</span>
          </div>
          
          <h1 
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl opacity-0 translate-y-8 transition-all duration-700 ease-apple"
            ref={titleRef}
          >
            <span className="text-gradient">Techno Clubs</span> Portal
            <span className="block mt-2 text-lg md:text-xl lg:text-2xl font-medium text-techGray-medium">
              The next-generation digital infrastructure for student-driven tech communities
            </span>
          </h1>
          
          <p 
            className="text-lg md:text-xl text-techGray-dark max-w-3xl mb-10 opacity-0 translate-y-8 transition-all duration-700 ease-apple delay-150"
            ref={subtitleRef}
          >
            A comprehensive digital transformation intelligently orchestrating club dynamics, eliminating inefficiencies through smart automation, unified collaboration frameworks, and real-time visibility.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-20 opacity-0 translate-y-8 transition-all duration-700 ease-apple delay-300"
            ref={ctaRef}
          >
            <button className="button-shine bg-techBlue text-white px-8 py-4 rounded-md font-medium transition-all hover:shadow-md hover:bg-techBlue/90 w-full sm:w-auto">
              Explore the Platform
            </button>
            <button className="px-8 py-4 rounded-md font-medium border border-techGray-medium/30 hover:bg-techGray-light transition-all w-full sm:w-auto">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div 
        className="relative mx-auto max-w-5xl opacity-0 scale-95 transition-all duration-1000 ease-apple delay-500"
        ref={decorationRef}
      >
        <div className="aspect-video bg-gradient-to-br from-white to-techGray-light rounded-lg shadow-card overflow-hidden p-1">
          <div className="w-full h-full rounded-md bg-white relative">
            {/* Dashboard mockup */}
            <div className="flex absolute top-0 left-0 right-0 h-10 bg-techGray-light/50 items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="mx-auto h-6 w-1/3 bg-white rounded-full"></div>
            </div>

            <div className="pt-12 px-4 grid grid-cols-12 gap-4 h-full">
              {/* Sidebar */}
              <div className="col-span-3 h-full bg-techGray-light/30 rounded-md p-3">
                <div className="h-10 bg-white rounded-md shadow-sm mb-3"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "h-8 rounded-md", 
                        i === 1 ? "bg-techBlue/10" : "bg-white/80"
                      )}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Main content */}
              <div className="col-span-9 grid grid-cols-6 gap-4">
                {/* Header */}
                <div className="col-span-6 h-10 bg-white shadow-sm rounded-md"></div>
                
                {/* Stats */}
                <div className="col-span-2 h-24 bg-white shadow-sm rounded-md"></div>
                <div className="col-span-2 h-24 bg-white shadow-sm rounded-md"></div>
                <div className="col-span-2 h-24 bg-white shadow-sm rounded-md"></div>
                
                {/* Content */}
                <div className="col-span-4 row-span-2 bg-white shadow-sm rounded-md h-64"></div>
                <div className="col-span-2 bg-white shadow-sm rounded-md h-40"></div>
                <div className="col-span-2 bg-white shadow-sm rounded-md h-20"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-techBlue/80 to-[#5E5CE6]/80 rounded-2xl rotate-12 shadow-lg opacity-90 backdrop-blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-white/90 to-techGray-light/90 rounded-2xl -rotate-12 shadow-md border border-white/50 backdrop-blur-xl"></div>
      </div>
    </section>
  );
};

export default Hero;
