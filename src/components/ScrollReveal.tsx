
import React, { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  threshold = 0.1,
  delay = 0,
  direction = 'up',
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    // Configure initial styles based on direction
    let initialTransform = '';
    switch (direction) {
      case 'up':
        initialTransform = 'translateY(20px)';
        break;
      case 'down':
        initialTransform = 'translateY(-20px)';
        break;
      case 'left':
        initialTransform = 'translateX(20px)';
        break;
      case 'right':
        initialTransform = 'translateX(-20px)';
        break;
      case 'none':
        initialTransform = 'none';
        break;
    }

    element.style.opacity = '0';
    element.style.transform = initialTransform;
    element.style.transition = `opacity 0.6s ease-out, transform 0.6s ease-out`;
    element.style.transitionDelay = `${delay}ms`;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate(0, 0)';
          }, 100);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, delay, direction]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
