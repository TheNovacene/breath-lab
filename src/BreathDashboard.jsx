import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Zap,
  Moon,
  Anchor,
  Sunrise,
  Wind,
  Flame,
  Shield,
} from "lucide-react";

const BreathDashboard = () => {
  const [selectedBreath, setSelectedBreath] = useState(null);
  const [phase, setPhase] = useState("inhale");
  const [progress, setProgress] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const canvasRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const breathPatterns = [
    {
      id: "calming",
      name: "4-4-6 Calming",
      icon: Heart,
      color: "#60a5fa",
      description: "Gentle regulation",
      timing: { inhale: 4, hold1: 4, exhale: 6, hold2: 0 },
      visual: "spiral",
    },
    {
      id: "tranquilizer",
      name: "4-7-8 Sleep",
      icon: Moon,
      color: "#a78bfa",
      description: "Deep relaxation",
      timing: { inhale: 4, hold1: 7, exhale: 8, hold2: 0 },
      visual: "moon",
    },
    {
      id: "box",
      name: "4-4-4-4 Box",
      icon: Anchor,
      color: "#34d399",
      description: "Steady focus",
      timing: { inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
      visual: "box",
    },
    {
      id: "energizer",
      name: "Power Breath",
      icon: Zap,
      color: "#fbbf24",
      description: "Quick activation",
      timing: { inhale: 2, hold1: 0, exhale: 2, hold2: 0 },
      visual: "lightning",
    },
    {
      id: "sigh",
      name: "Quick Reset",
      icon: Wind,
      color: "#38bdf8",
      description: "Instant relief",
      timing: { inhale: 2, hold1: 1, exhale: 4, hold2: 0 },
      visual: "wave",
    },
    {
      id: "coherent",
      name: "5-5 Coherent",
      icon: Sunrise,
      color: "#fb923c",
      description: "Heart-brain sync",
      timing: { inhale: 5, hold1: 0, exhale: 5, hold2: 0 },
      visual: "heart",
    },
    {
      id: "fire",
      name: "Breath of Fire",
      icon: Flame,
      color: "#ef4444",
      description: "Energizing",
      timing: { inhale: 0.5, hold1: 0, exhale: 0.5, hold2: 0 },
      visual: "fire",
    },
    {
      id: "anxiety",
      name: "4-2-6-2 Anxiety",
      icon: Shield,
      color: "#8b5cf6",
      description: "Panic relief",
      timing: { inhale: 4, hold1: 2, exhale: 6, hold2: 2 },
      visual: "shield",
    },
  ];

  const getCurrentPhase = (elapsed, timing) => {
    const { inhale, hold1, exhale, hold2 } = timing;
    const cycleDuration = inhale + hold1 + exhale + hold2 || 1;
    const cyclePosition = elapsed % cycleDuration;

    if (cyclePosition < inhale) {
      return {
        phase: "inhale",
        progress: inhale ? cyclePosition / inhale : 1,
      };
    } else if (cyclePosition < inhale + hold1) {
      return {
        phase: "hold",
        progress: hold1 ? (cyclePosition - inhale) / hold1 : 1,
      };
    } else if (cyclePosition < inhale + hold1 + exhale) {
      return {
        phase: "exhale",
        progress: exhale ? (cyclePosition - inhale - hold1) / exhale : 1,
      };
    } else {
      return {
        phase: "hold2",
        progress: hold2 ? (cyclePosition - inhale - hold1 - exhale) / hold2 : 1,
      };
    }
  };

  const drawVisualization = (ctx, canvas, currentPhase, currentProgress, pattern) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(canvas.width, canvas.height) * 0.3;

    ctx.fillStyle = "rgba(10, 14, 39, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let scale;
    let opacity;

    if (currentPhase === "inhale") {
      scale = 0.3 + currentProgress * 0.7;
      opacity = 0.4 + currentProgress * 0.4;
    } else if (currentPhase === "hold") {
      scale = 1;
      opacity = 0.8;
    } else if (currentPhase === "exhale") {
      scale = 1 - currentProgress * 0.7;
      opacity = 0.8 - currentProgress * 0.4;
    } else {
      scale = 0.3;
      opacity = 0.4;
    }

    const color = pattern.color;

    switch (pattern.visual) {
      case "spiral":
        drawSpiral(ctx, centerX, centerY, maxRadius, scale, opacity, color);
        break;
      case "moon":
        drawMoon(ctx, centerX, centerY, maxRadius, scale, opacity, color);
        break;
      case "box":
        drawBox(ctx, centerX, centerY, maxRadius, scale, opacity, color);
        break;
      case "lightning":
        drawLightning(ctx, centerX, centerY, maxRadius, scale, opacity, color);
        break;
      case "wave":
        drawWave(ctx, centerX, centerY, maxRadius, scale, opacity, color);
        break;
      case "heart":
        drawHeart(ctx, centerX, centerY, maxRadius, scale, opacity, color);
        break;
      case "fire":
        drawFire(ctx, centerX, centerY, maxRadius, scale, opacity, color);
        break;
      case "shield":
        drawShield(ctx, centerX, centerY, maxRadius, scale, opacity, color);
        break;
      default:
        break;
    }

    ctx.beginPath();
    ctx.arc(centerX, centerY, 10 * scale, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      10 * scale
    );
    gradient.addColorStop(
      0,
      `${color}${Math.floor(opacity * 255)
        .toString(16)
        .padStart(2, "0")}`
    );
    gradient.addColorStop(1, `${color}00`);
    ctx.fillStyle = gradient;
    ctx.fill();
  };

  const drawSpiral = (ctx, cx, cy, maxR, scale, opacity, color) => {
    const numPoints = 200;
    ctx.beginPath();
    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 4;
      const radius = (maxR * scale * t) / (Math.PI * 4);
      const angle = t + Date.now() / 3000;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `${color}${Math.floor(opacity * 255)
      .toString(16)
      .padStart(2, "0")}`;
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  const drawMoon = (ctx, cx, cy, maxR, scale, opacity, color) => {
    const radius = maxR * scale;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = `${color}${Math.floor(opacity * 255)
      .toString(16)
      .padStart(2, "0")}`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx + radius * 0.3, cy, radius * 0.85, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(10, 14, 39, ${opacity * 0.5})`;
    ctx.fill();
  };

  const drawBox = (ctx, cx, cy, maxR, scale, opacity, color) => {
    const size = maxR * scale * 2;
    const rotation = Date.now() / 4000;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.strokeStyle = `${color}${Math.floor(opacity * 255)
      .toString(16)
      .padStart(2, "0")}`;
    ctx.lineWidth = 4;
    ctx.strokeRect(-size / 2, -size / 2, size, size);
    ctx.restore();
  };

  const drawLightning = (ctx, cx, cy, maxR, scale, opacity, color) => {
    const height = maxR * scale * 2;
    ctx.save();
    ctx.translate(cx, cy - height / 2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-15, height * 0.3);
    ctx.lineTo(5, height * 0.3);
    ctx.lineTo(-10, height * 0.6);
    ctx.lineTo(10, height * 0.6);
    ctx.lineTo(0, height);
    ctx.strokeStyle = `${color}${Math.floor(opacity * 255)
      .toString(16)
      .padStart(2, "0")}`;
    ctx.lineWidth = 3;
    ctx.shadowBlur = 20;
    ctx.shadowColor = color;
    ctx.stroke();
    ctx.restore();
  };

  const drawWave = (ctx, cx, cy, maxR, scale, opacity, color) => {
    const amplitude = maxR * scale;
    const wavelength = 50;
    const offset = Date.now() / 500;
    ctx.beginPath();
    for (let x = -maxR; x < maxR; x += 2) {
      const y = cy + Math.sin((x + offset) / wavelength) * amplitude;
      if (x === -maxR) ctx.moveTo(cx + x, y);
      else ctx.lineTo(cx + x, y);
    }
    ctx.strokeStyle = `${color}${Math.floor(opacity * 255)
      .toString(16)
      .padStart(2, "0")}`;
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  const drawHeart = (ctx, cx, cy, maxR, scale, opacity, color) => {
    const size = maxR * scale;
    ctx.save();
    ctx.translate(cx, cy - size * 0.3);
    ctx.beginPath();
    ctx.moveTo(0, size * 0.3);
    ctx.bezierCurveTo(
      -size * 0.6,
      -size * 0.2,
      -size * 0.6,
      size * 0.4,
      0,
      size * 0.8
    );
    ctx.bezierCurveTo(
      size * 0.6,
      size * 0.4,
      size * 0.6,
      -size * 0.2,
      0,
      size * 0.3
    );
    ctx.fillStyle = `${color}${Math.floor(opacity * 255)
      .toString(16)
      .padStart(2, "0")}`;
    ctx.fill();
    ctx.restore();
  };

  const drawFire = (ctx, cx, cy, maxR, scale, opacity, color) => {
    const flames = 5;
    for (let i = 0; i < flames; i++) {
      const angle = (i / flames) * Math.PI * 2 + Date.now() / 200;
      const flameHeight = maxR * scale * (0.8 + Math.random() * 0.4);
      const x = cx + Math.cos(angle) * (maxR * scale * 0.3);
      const y = cy;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(
        x + 10,
        y - flameHeight * 0.5,
        x,
        y - flameHeight
      );
      ctx.quadraticCurveTo(
        x - 10,
        y - flameHeight * 0.5,
        x,
        y
      );
      ctx.fillStyle = `${color}${Math.floor(opacity * 255)
        .toString(16)
        .padStart(2, "0")}`;
      ctx.fill();
    }
  };

  const drawShield = (ctx, cx, cy, maxR, scale, opacity, color) => {
    const size = maxR * scale;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size * 0.7, -size * 0.3);
    ctx.lineTo(size * 0.7, size * 0.3);
    ctx.lineTo(0, size);
    ctx.lineTo(-size * 0.7, size * 0.3);
    ctx.lineTo(-size * 0.7, -size * 0.3);
    ctx.closePath();
    ctx.strokeStyle = `${color}${Math.floor(opacity * 255)
      .toString(16)
      .padStart(2, "0")}`;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();
  };

  const getPhaseText = (phase) => {
    switch (phase) {
      case "inhale":
        return "Breathe In";
      case "hold":
        return "Hold";
      case "exhale":
        return "Breathe Out";
      case "hold2":
        return "Hold";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (!selectedBreath) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pattern = breathPatterns.find((p) => p.id === selectedBreath);
    if (!pattern) return;

    startTimeRef.current = Date.now();

    let animationFrameId;

    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const { phase: currentPhase, progress: currentProgress } =
        getCurrentPhase(elapsed, pattern.timing);

      setPhase(currentPhase);
      setProgress(currentProgress);

      const duration = Object.values(pattern.timing).reduce(
        (a, b) => a + b,
        0
      );
      const newCycleCount = Math.floor(elapsed / (duration || 1));
      setCycleCount(newCycleCount);

      drawVisualization(ctx, canvas, currentPhase, currentProgress, pattern);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [selectedBreath]);

  if (selectedBreath) {
    const pattern = breathPatterns.find((p) => p.id === selectedBreath);
    if (!pattern) return null;

    return (
      <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <canvas ref={canvasRef} className="absolute inset-0" />

        <button
          onClick={() => setSelectedBreath(null)}
          className="absolute top-6 left-6 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-all z-10"
        >
          ← Back to Dashboard
        </button>

        <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white z-10">
          <div className="text-sm opacity-70">Cycles</div>
          <div className="text-2xl font-bold">{cycleCount}</div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
          <h1
            className="text-5xl font-light text-white mb-2 drop-shadow-lg"
            style={{
              opacity: 0.4 + Math.sin(Date.now() / 500) * 0.2,
            }}
          >
            {getPhaseText(phase)}
          </h1>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white/70 z-10">
          <div className="text-sm">{pattern.name}</div>
          <div className="text-xs opacity-60 mt-1">
            In: {pattern.timing.inhale}s
            {pattern.timing.hold1 > 0 && ` • Hold: ${pattern.timing.hold1}s`}
            {` • Out: ${pattern.timing.exhale}s`}
            {pattern.timing.hold2 > 0 && ` • Hold: ${pattern.timing.hold2}s`}
          </div>
        </div>

        <div className="absolute bottom-4 right-4 text-[10px] text-white/40 text-right pointer-events-none">
          <div>The Novacene · Breath Lab</div>
          <div>CC BY-NC-SA 4.0</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light text-white mb-3">Breath Lab</h1>
          <p className="text-white/60 text-lg">
            Your nervous system control center
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {breathPatterns.map((pattern) => {
            const Icon = pattern.icon;
            return (
              <button
                key={pattern.id}
                onClick={() => setSelectedBreath(pattern.id)}
                className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all hover:scale-105 hover:shadow-2xl text-left"
                style={{
                  boxShadow: `0 0 30px ${pattern.color}20`,
                }}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: `${pattern.color}20`,
                    boxShadow: `0 0 20px ${pattern.color}30`,
                  }}
                >
                  <Icon size={32} style={{ color: pattern.color }} />
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  {pattern.name}
                </h3>

                <p className="text-white/60 text-sm mb-3">
                  {pattern.description}
                </p>

                <div className="text-xs text-white/40">
                  {pattern.timing.inhale}s in
                  {pattern.timing.hold1 > 0 &&
                    ` • ${pattern.timing.hold1}s hold`}
                  {` • ${pattern.timing.exhale}s out`}
                  {pattern.timing.hold2 > 0 &&
                    ` • ${pattern.timing.hold2}s hold`}
                </div>

                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${pattern.color}10 0%, transparent 70%)`,
                  }}
                />
              </button>
            );
          })}
        </div>

        <div className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-light text-white mb-4">Quick Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/70">
            <div>
              <div className="font-semibold text-white mb-2">For Calming:</div>
              <div>• 4-4-6 Calming (daily use)</div>
              <div>• 4-7-8 Sleep (bedtime)</div>
              <div>• 4-2-6-2 Anxiety (panic relief)</div>
            </div>
            <div>
              <div className="font-semibold text-white mb-2">For Energy:</div>
              <div>• Power Breath (quick boost)</div>
              <div>• Breath of Fire (morning)</div>
              <div>• Quick Reset (between tasks)</div>
            </div>
            <div>
              <div className="font-semibold text-white mb-2">For Balance:</div>
              <div>• Box Breathing (focus)</div>
              <div>• Coherent (meditation)</div>
            </div>
            <div>
              <div className="font-semibold text-white mb-2">Pro Tips:</div>
              <div>• Start with 5 cycles minimum</div>
              <div>• Practice daily for best results</div>
              <div>• Listen to your body's signals</div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-white/40">
          <p>
            Made with verse-al love{" "}
            <span role="img" aria-label="heart">
              ♥
            </span>{" "}
            from The Novacene.
          </p>
          <p className="mt-1 italic">
            "Your breath is the smallest pattern that can rewrite your whole
            day."
          </p>
          <p className="mt-1">
            Shared under CC BY-NC-SA 4.0. If this helps, share it with a friend
            or learner who might need it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreathDashboard;
