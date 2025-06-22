
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

    // Enhanced stars with more realistic properties
    const stars: Array<{ 
      x: number; 
      y: number; 
      size: number; 
      opacity: number; 
      twinkle: number;
      color: string;
      depth: number;
      brightness: number;
    }> = [];
    
    // Distant galaxies and nebulae with enhanced properties
    const nebulae: Array<{
      x: number;
      y: number;
      radius: number;
      opacity: number;
      color: string;
      pulse: number;
      rotation: number;
    }> = [];

    // Particle systems for space dust and cosmic rays
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Create enhanced realistic star field
    for (let i = 0; i < 400; i++) {
      const depth = Math.random();
      const brightness = Math.random();
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: (Math.random() * 2 + 0.3) * (1 - depth * 0.6),
        opacity: (Math.random() * 0.8 + 0.2) * brightness,
        twinkle: Math.random() * 0.015 + 0.003,
        color: ['#E0E0E0', '#1C78C0', '#00E3FF', '#9A6BFF', '#FFD700', '#FF8C42'][Math.floor(Math.random() * 6)],
        depth: depth,
        brightness: brightness
      });
    }

    // Create enhanced distant nebulae
    for (let i = 0; i < 7; i++) {
      nebulae.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 400 + 200,
        opacity: Math.random() * 0.06 + 0.02,
        color: ['#1C78C0', '#9A6BFF', '#00E3FF', '#FF8C42'][Math.floor(Math.random() * 4)],
        pulse: Math.random() * 0.002 + 0.0005,
        rotation: Math.random() * 0.001
      });
    }

    // Create cosmic particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        color: ['#00E3FF', '#9A6BFF', '#1C78C0'][Math.floor(Math.random() * 3)]
      });
    }

    const animate = () => {
      // Create enhanced deep space gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.8
      );
      gradient.addColorStop(0, '#0B0F1A');
      gradient.addColorStop(0.3, '#0A0E18');
      gradient.addColorStop(0.7, '#080C15');
      gradient.addColorStop(1, '#060A12');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw enhanced distant nebulae
      nebulae.forEach(nebula => {
        ctx.save();
        ctx.translate(nebula.x, nebula.y);
        ctx.rotate(nebula.rotation);
        
        const nebulaGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, nebula.radius);
        const alpha = Math.floor(nebula.opacity * 255).toString(16).padStart(2, '0');
        nebulaGradient.addColorStop(0, nebula.color + alpha);
        nebulaGradient.addColorStop(0.4, nebula.color + '20');
        nebulaGradient.addColorStop(0.7, nebula.color + '10');
        nebulaGradient.addColorStop(1, nebula.color + '00');
        
        ctx.fillStyle = nebulaGradient;
        ctx.beginPath();
        ctx.arc(0, 0, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        // Enhanced pulsing and rotation
        nebula.opacity += (Math.random() - 0.5) * nebula.pulse;
        nebula.opacity = Math.max(0.005, Math.min(0.08, nebula.opacity));
        nebula.rotation += 0.0001;
      });
      
      // Draw cosmic particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        const alpha = Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        ctx.fillStyle = particle.color + alpha;
        ctx.fill();
        
        // Add glow effect for particles
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        glowGradient.addColorStop(0, particle.color + '40');
        glowGradient.addColorStop(1, particle.color + '00');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      // Draw enhanced realistic stars
      stars.forEach(star => {
        // Main star body
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        const alpha = Math.floor(star.opacity * 255).toString(16).padStart(2, '0');
        ctx.fillStyle = star.color + alpha;
        ctx.fill();
        
        // Enhanced glow effect
        if (star.brightness > 0.7) {
          const glowGradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 4
          );
          glowGradient.addColorStop(0, star.color + '60');
          glowGradient.addColorStop(0.5, star.color + '20');
          glowGradient.addColorStop(1, star.color + '00');
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Enhanced stellar cross effect for bright stars
        if (star.opacity > 0.7 && star.size > 1.2) {
          ctx.strokeStyle = star.color + '80';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          const crossSize = star.size * 5;
          // Vertical line
          ctx.moveTo(star.x, star.y - crossSize);
          ctx.lineTo(star.x, star.y + crossSize);
          // Horizontal line
          ctx.moveTo(star.x - crossSize, star.y);
          ctx.lineTo(star.x + crossSize, star.y);
          ctx.stroke();
          
          // Add diagonal spikes for very bright stars
          if (star.brightness > 0.9) {
            const spikeSize = crossSize * 0.7;
            ctx.moveTo(star.x - spikeSize, star.y - spikeSize);
            ctx.lineTo(star.x + spikeSize, star.y + spikeSize);
            ctx.moveTo(star.x + spikeSize, star.y - spikeSize);
            ctx.lineTo(star.x - spikeSize, star.y + spikeSize);
            ctx.stroke();
          }
        }
        
        // Enhanced realistic twinkling
        star.opacity += (Math.random() - 0.5) * star.twinkle * star.brightness;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));
      });

      // Draw enhanced cosmic dust lanes with perspective
      for (let i = 0; i < 4; i++) {
        const x1 = (canvas.width / 5) * (i + 1);
        const dustGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        dustGradient.addColorStop(0, '#1C78C0' + '00');
        dustGradient.addColorStop(0.3, '#1C78C0' + '08');
        dustGradient.addColorStop(0.5, '#9A6BFF' + '12');
        dustGradient.addColorStop(0.7, '#00E3FF' + '08');
        dustGradient.addColorStop(1, '#1C78C0' + '00');
        
        ctx.strokeStyle = dustGradient;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([8, 20]);
        ctx.beginPath();
        ctx.moveTo(x1, 0);
        ctx.lineTo(x1 + Math.sin(Date.now() * 0.0001 + i) * 30, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Add subtle aurora-like effects
      const time = Date.now() * 0.001;
      ctx.strokeStyle = `rgba(0, 227, 255, ${0.1 + Math.sin(time) * 0.05})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 20) {
        const y = canvas.height * 0.8 + Math.sin(x * 0.01 + time) * 50;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

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
    />
  );
};

export default SpaceBackground;
