
import React, { useEffect, useRef } from 'react';

const Problem: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    contentRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      contentRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section 
      id="problem" 
      className="py-24 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-techBlue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-[#5E5CE6]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-6 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left column - Problem statement */}
          <div className="lg:w-1/2">
            <div 
              className="opacity-0 translate-y-8 transition-all duration-700 ease-apple"
              ref={(el) => contentRefs.current[0] = el}
            >
              <span className="chip mb-3">The Grand Challenge</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The Digital Conundrum</h2>
              <p className="text-lg text-techGray-dark mb-6">
                Multi-chapter student organizations like IEEE, ACM, AWS, GDG, and STIC suffer from a structurally inefficient ecosystem leading to administrative bottlenecks and an overall lack of transparency in operations.
              </p>
            </div>

            <div 
              className="space-y-6 opacity-0 translate-y-8 transition-all duration-700 ease-apple delay-150"
              ref={(el) => contentRefs.current[1] = el}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-techBlue/10 rounded-lg flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-techBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Fragmented Communication</h3>
                  <p className="text-techGray-dark">
                    Siloed communication channels create information gaps and hinder collaboration between different chapters and teams.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-techBlue/10 rounded-lg flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-techBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Disjointed Credit Systems</h3>
                  <p className="text-techGray-dark">
                    Inconsistent methods for tracking member contributions and recognizing participation create inequity.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-techBlue/10 rounded-lg flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-techBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Tedious Event Logistics</h3>
                  <p className="text-techGray-dark">
                    Manual planning and coordination processes consume excessive time and resources, limiting event quality and frequency.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Visual representation */}
          <div 
            className="lg:w-1/2 opacity-0 translate-y-8 transition-all duration-700 ease-apple delay-300"
            ref={(el) => contentRefs.current[2] = el}
          >
            <div className="relative perspective-wrapper">
              {/* Main diagram */}
              <div className="bg-white rounded-xl shadow-card p-6 z-10 relative">
                <div className="border-2 border-dashed border-techGray-medium/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-center mb-6">Current Fragmented Ecosystem</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {["IEEE", "ACM", "AWS", "GDG"].map((org, index) => (
                      <div key={index} className="bg-techGray-light/50 rounded-md p-4 text-center">
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-2">
                          <span className="font-semibold text-sm">{org}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-white/80 rounded-full w-3/4 mx-auto"></div>
                          <div className="h-3 bg-white/80 rounded-full w-1/2 mx-auto"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-full h-px bg-techGray-medium/30"></div>
                      <span className="text-techGray-medium whitespace-nowrap text-sm">Disconnected Systems</span>
                      <div className="w-full h-px bg-techGray-medium/30"></div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {["Communication", "Events", "Resources"].map((system, index) => (
                      <div key={index} className="bg-techGray-light/50 rounded-md p-3 text-center">
                        <span className="text-sm font-medium">{system}</span>
                        <div className="h-2 bg-white/80 rounded-full w-3/4 mx-auto mt-2"></div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-center">
                    <div className="px-4 py-2 bg-techGray-medium/20 rounded-md">
                      <span className="text-sm text-techGray-dark">Inefficient Workflow</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 rotate-6 w-40 h-40 bg-red-100/50 rounded-xl border border-red-200/50 flex items-center justify-center">
                <span className="text-red-500 font-medium">Bottlenecks</span>
              </div>
              <div className="absolute -bottom-4 -right-4 -rotate-6 w-32 h-32 bg-yellow-100/50 rounded-xl border border-yellow-200/50 flex items-center justify-center">
                <span className="text-yellow-600 font-medium">Silos</span>
              </div>
            </div>
          </div>
        </div>

        <div 
          className="mt-16 text-center opacity-0 translate-y-8 transition-all duration-700 ease-apple delay-450"
          ref={(el) => contentRefs.current[3] = el}
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-4">The Paradigm Shift</h3>
          <p className="text-lg text-techGray-dark max-w-3xl mx-auto">
            Traditional methodologies fail to scale, leading to administrative bottlenecks and an overall lack of transparency in operations. 
            It's time for a comprehensive digital transformation.
          </p>
          <button className="mt-8 button-shine bg-techBlue text-white px-6 py-3 rounded-md font-medium transition-all hover:shadow-md hover:bg-techBlue/90">
            Discover the Solution
          </button>
        </div>
      </div>
    </section>
  );
};

export default Problem;
