import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ParticleProps {
  className?: string;
}

export function Particles({ className }: ParticleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const particles = containerRef.current.querySelectorAll('.particle');
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.01;
        const x = (mouseX * speed) % window.innerWidth;
        const y = (mouseY * speed) % window.innerHeight;
        
        (particle as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const particles = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className="particle absolute rounded-full bg-primary opacity-60"
      style={{
        width: Math.random() * 8 + 4,
        height: Math.random() * 8 + 4,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 2,
      }}
    />
  ));

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {particles}
    </div>
  );
}
