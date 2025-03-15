
import React, { useEffect, useRef } from 'react';

// Feature data
const features = [
  {
    icon: "🔹",
    title: "Unified Membership Hub",
    description: "Seamlessly manage multi-chapter enrollments across all organizations with centralized member profiles and permissions.",
  },
  {
    icon: "🔹",
    title: "Event Lifecycle Automation",
    description: "Streamline planning, execution, and post-event analysis with intelligent workflows and attendance tracking.",
  },
  {
    icon: "🔹",
    title: "AI-Driven Credit System",
    description: "Automatically track member contributions and incentivize participation through a transparent point system.",
  },
  {
    icon: "🔹",
    title: "Secured Resource Governance",
    description: "Control access to digital assets and proprietary materials with role-based permissions and usage analytics.",
  },
  {
    icon: "🔹",
    title: "Intelligent Documentation",
    description: "Auto-generate reports, meeting minutes, and archive records with AI-powered content creation tools.",
  },
  {
    icon: "🔹",
    title: "Collaboration Powerhouse",
    description: "Create integrated digital workspaces for teams and committees with real-time collaboration capabilities.",
  },
];

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      featureRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section 
      id="features" 
      className="py-24 bg-techGray-light/50"
      ref={sectionRef}
    >
      <div className="container px-6 mx-auto max-w-7xl">
        <div 
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-apple"
          ref={(el) => featureRefs.current[0] = el}
        >
          <span className="chip mb-3">Core Innovations</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-techGray-dark max-w-2xl mx-auto">
            Discover the tools and capabilities that make Techno Clubs Portal the ultimate platform for student-led tech communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card rounded-xl p-6 shadow-card opacity-0 translate-y-8 transition-all duration-700 ease-apple"
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              ref={(el) => featureRefs.current[index + 1] = el}
            >
              <div className="bg-techBlue/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">{feature.icon.replace("🔹", "")}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-techGray-dark">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center opacity-0 translate-y-8 transition-all duration-700 ease-apple" ref={(el) => featureRefs.current[7] = el}>
          <a href="#" className="inline-flex items-center text-techBlue font-medium hover:underline group">
            Learn more about our features
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
