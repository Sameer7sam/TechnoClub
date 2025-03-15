
import React, { useEffect, useRef } from 'react';

// Benefits data
const benefits = [
  {
    title: "For Students",
    items: [
      "Simplified access to multiple organizations with a single login",
      "Fair recognition of contributions and participation",
      "Enhanced learning through streamlined access to resources",
      "Better networking opportunities across chapters",
      "Transparent event notifications and registration",
      "Digital record of involvement for resume building"
    ]
  },
  {
    title: "For Administrators",
    items: [
      "Reduced administrative overhead and paperwork",
      "Comprehensive analytics on membership and engagement",
      "Streamlined event planning and execution workflows",
      "Secure management of digital assets and permissions",
      "Automated documentation and reporting",
      "Cross-chapter coordination and resource sharing"
    ]
  }
];

const Benefits: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const benefitsRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    benefitsRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="benefits" 
      className="py-24 bg-gradient-to-b from-white to-techGray-light/30"
      ref={sectionRef}
    >
      <div className="container px-6 mx-auto max-w-7xl">
        <div 
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-apple"
          ref={titleRef}
        >
          <span className="chip mb-3">The Ultimate Disruption</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why It Matters</h2>
          <p className="text-lg text-techGray-dark max-w-2xl mx-auto">
            This is not a mere club management tool—it's the next-generation digital infrastructure for student-driven tech communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-card p-8 opacity-0 translate-y-8 transition-all duration-700 ease-apple border border-white"
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              ref={(el) => benefitsRefs.current[index] = el}
            >
              <h3 className="text-2xl font-semibold mb-6 text-center">
                {benefit.title}
              </h3>
              <ul className="space-y-4">
                {benefit.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-techBlue" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-techGray-dark">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div 
          className="mt-20 text-center glass p-10 rounded-xl opacity-0 translate-y-8 transition-all duration-700 ease-apple"
          style={{ transitionDelay: "450ms" }}
          ref={(el) => benefitsRefs.current[2] = el}
        >
          <h3 className="text-2xl font-semibold mb-4">The Vision</h3>
          <p className="text-lg text-techGray-dark max-w-3xl mx-auto mb-8">
            A self-sustaining, autonomous ecosystem where leadership thrives, innovation scales, and impact magnifies.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-techBlue" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Seamless Onboarding</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-techBlue" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Community Growth</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-techBlue" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              <span className="text-sm font-medium">Resource Efficiency</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-techBlue" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Measurable Impact</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-techBlue" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span className="text-sm font-medium">Leadership Development</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
