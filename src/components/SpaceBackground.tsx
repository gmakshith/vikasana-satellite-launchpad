
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

    // Realistic stars with depth
    const stars: Array<{ 
      x: number; 
      y: number; 
      size: number; 
      opacity: number; 
      twinkle: number;
      color: string;
      depth: number;
    }> = [];
    
    // Distant galaxies and nebulae
    const nebulae: Array<{
      x: number;
      y: number;
      radius: number;
      opacity: number;
      color: string;
      pulse: number;
    }> = [];

    // Create realistic star field
    for (let i = 0; i < 300; i++) {
      const depth = Math.random();
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: (Math.random() * 1.5 + 0.5) * (1 - depth * 0.7),
        opacity: Math.random() * 0.9 + 0.1,
        twinkle: Math.random() * 0.02 + 0.005,
        color: ['#E0E0E0', '#1C78C0', '#00E3FF', '#9A6BFF', '#FFD700'][Math.floor(Math.random() * 5)],
        depth: depth
      });
    }

    // Create distant nebulae
    for (let i = 0; i < 5; i++) {
      nebulae.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 300 + 150,
        opacity: Math.random() * 0.08 + 0.02,
        color: ['#1C78C0', '#9A6BFF', '#00E3FF'][Math.floor(Math.random() * 3)],
        pulse: Math.random() * 0.003 + 0.001
      });
    }

    const animate = () => {
      // Create deep space gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, '#0B0F1A');
      gradient.addColorStop(0.5, '#0A0E18');
      gradient.addColorStop(1, '#060A12');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw distant nebulae first
      nebulae.forEach(nebula => {
        const nebulaGradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.radius
        );
        const alpha = Math.floor(nebula.opacity * 255).toString(16).padStart(2, '0');
        nebulaGradient.addColorStop(0, nebula.color + alpha);
        nebulaGradient.addColorStop(0.6, nebula.color + '10');
        nebulaGradient.addColorStop(1, nebula.color + '00');
        
        ctx.fillStyle = nebulaGradient;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Subtle pulsing
        nebula.opacity += (Math.random() - 0.5) * nebula.pulse;
        nebula.opacity = Math.max(0.01, Math.min(0.1, nebula.opacity));
      });
      
      // Draw realistic stars with depth
      stars.forEach(star => {
        // Main star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        const alpha = Math.floor(star.opacity * 255).toString(16).padStart(2, '0');
        ctx.fillStyle = star.color + alpha;
        ctx.fill();
        
        // Add stellar cross effect for brighter stars
        if (star.opacity > 0.6 && star.size > 1) {
          ctx.strokeStyle = star.color + '60';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          const crossSize = star.size * 4;
          ctx.moveTo(star.x - crossSize, star.y);
          ctx.lineTo(star.x + crossSize, star.y);
          ctx.moveTo(star.x, star.y - crossSize);
          ctx.lineTo(star.x, star.y + crossSize);
          ctx.stroke();
        }
        
        // Realistic twinkling
        star.opacity += (Math.random() - 0.5) * star.twinkle;
        star.opacity = Math.max(0.05, Math.min(1, star.opacity));
      });

      // Draw subtle cosmic dust lanes
      for (let i = 0; i < 3; i++) {
        const x1 = (canvas.width / 4) * (i + 1);
        const dustGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        dustGradient.addColorStop(0, '#1C78C0' + '00');
        dustGradient.addColorStop(0.5, '#1C78C0' + '15');
        dustGradient.addColorStop(1, '#1C78C0' + '00');
        
        ctx.strokeStyle = dustGradient;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 15]);
        ctx.beginPath();
        ctx.moveTo(x1, 0);
        ctx.lineTo(x1 + 50, canvas.height);
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
    />
  );
};

export default SpaceBackground;
