import { useEffect, useRef } from "react";

// Système de particules sur canvas — léger, performant, futuriste
export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let particles = [];
    let animId;
    let W = window.innerWidth;
    let H = window.innerHeight;

    canvas.width  = W;
    canvas.height = H;

    const COUNT   = Math.min(80, Math.floor((W * H) / 16000));
    const COLORS  = ["rgba(124,58,237,", "rgba(167,139,250,", "rgba(196,181,253,"];

    class Particle {
      constructor() { this.reset(true); }
      reset(init = false) {
        this.x     = Math.random() * W;
        this.y     = init ? Math.random() * H : H + 10;
        this.r     = Math.random() * 1.8 + 0.4;
        this.vx    = (Math.random() - 0.5) * 0.3;
        this.vy    = -(Math.random() * 0.4 + 0.15);
        this.alpha = Math.random() * 0.6 + 0.1;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.pulse = Math.random() * Math.PI * 2;
      }
      update() {
        this.x    += this.vx;
        this.y    += this.vy;
        this.pulse += 0.02;
        this.alpha = (Math.sin(this.pulse) * 0.25 + 0.35);
        if (this.y < -10) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${this.alpha})`;
        ctx.fill();
      }
    }

    // Line connections
    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    for (let i = 0; i < COUNT; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      drawLines();
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
}
