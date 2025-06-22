
import { useEffect, useRef } from 'react';

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Cosmic particles and stars
    const stars: Array<{ 
      x: number; 
      y: number; 
      size: number; 
      opacity: number; 
      twinkle: number;
      color: string;
    }> = [];
    
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Create twinkling stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * 0.02 + 0.01,
        color: ['#3A91FF', '#00F6FF', '#A070FF', '#FFD700'][Math.floor(Math.random() * 4)]
      });
    }

    // Create floating particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        color: ['#3A91FF', '#00F6FF', '#A070FF'][Math.floor(Math.random() * 3)]
      });
    }

    // Nebula clouds
    const nebulae: Array<{
      x: number;
      y: number;
      radius: number;
      opacity: number;
      color: string;
      pulse: number;
    }> = [];

    for (let i = 0; i < 8; i++) {
      nebulae.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 200 + 100,
        opacity: Math.random() * 0.1 + 0.05,
        color: ['#3A91FF', '#A070FF', '#00F6FF'][Math.floor(Math.random() * 3)],
        pulse: Math.random() * 0.005 + 0.002
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw nebula clouds
      nebulae.forEach(nebula => {
        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.radius
        );
        gradient.addColorStop(0, nebula.color + Math.floor(nebula.opacity * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, nebula.color + '00');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Pulse effect
        nebula.opacity += (Math.random() - 0.5) * nebula.pulse;
        nebula.opacity = Math.max(0.02, Math.min(0.15, nebula.opacity));
      });
      
      // Draw twinkling stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color + Math.floor(star.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Add cross glow for brighter stars
        if (star.opacity > 0.7) {
          ctx.strokeStyle = star.color + '40';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 3, star.y);
          ctx.lineTo(star.x + star.size * 3, star.y);
          ctx.moveTo(star.x, star.y - star.size * 3);
          ctx.lineTo(star.x, star.y + star.size * 3);
          ctx.stroke();
        }
        
        // Twinkling effect
        star.opacity += (Math.random() - 0.5) * star.twinkle;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));
      });

      // Draw floating particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Move particles
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Subtle opacity variation
        particle.opacity += (Math.random() - 0.5) * 0.01;
        particle.opacity = Math.max(0.05, Math.min(0.4, particle.opacity));
      });

      // Draw data streams (vertical lines)
      for (let i = 0; i < 5; i++) {
        const x = (canvas.width / 6) * (i + 1);
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        const colors = ['#3A91FF', '#00F6FF', '#A070FF'];
        const color = colors[i % colors.length];
        
        gradient.addColorStop(0, color + '00');
        gradient.addColorStop(0.5, color + '40');
        gradient.addColorStop(1, color + '00');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.setLineDash([10, 10]);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'linear-gradient(135deg, #0B0F1A 0%, #0d1421 50%, #0B0F1A 100%)' }}
    />
  );
};

export default SpaceBackground;
