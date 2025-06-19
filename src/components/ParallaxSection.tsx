
import { ReactNode, useEffect, useRef } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

const ParallaxSection = ({ children, className = '', speed = 0.5 }: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrolled = window.pageYOffset;
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionTop = scrolled + rect.top;
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const translateY = (scrolled - sectionTop) * speed;
        section.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={sectionRef} className={`relative ${className}`}>
      {children}
    </div>
  );
};

export default ParallaxSection;
