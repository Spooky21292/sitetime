(function () {
  const canvas = document.getElementById('nebula-canvas');
  if (!canvas) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const context = canvas.getContext('2d', { alpha: true });

  if (!context) {
    canvas.style.display = 'none';
    return;
  }

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let rafId;

  const particles = [];
  const particleCount = reduceMotion ? 24 : 52;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * (reduceMotion ? 0.02 : 0.09),
        vy: (Math.random() - 0.5) * (reduceMotion ? 0.02 : 0.09),
        alpha: Math.random() * 0.4 + 0.08
      });
    }
  }

  function draw(time) {
    context.clearRect(0, 0, width, height);

    const pulse = reduceMotion ? 0.4 : 0.52 + Math.sin(time * 0.00025) * 0.16;

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -8) p.x = width + 8;
      if (p.x > width + 8) p.x = -8;
      if (p.y < -8) p.y = height + 8;
      if (p.y > height + 8) p.y = -8;

      context.beginPath();
      context.fillStyle = `rgba(117, 200, 255, ${p.alpha * pulse})`;
      context.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      context.fill();
    }

    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const maxDistance = 110;

        if (distance < maxDistance) {
          const opacity = ((maxDistance - distance) / maxDistance) * (reduceMotion ? 0.08 : 0.16);
          context.strokeStyle = `rgba(102, 194, 172, ${opacity})`;
          context.lineWidth = 0.5;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }
    }

    rafId = window.requestAnimationFrame(draw);
  }

  resize();
  createParticles();

  if (!reduceMotion) {
    rafId = window.requestAnimationFrame(draw);
  } else {
    draw(0);
  }

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  window.addEventListener('beforeunload', () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
    }
  });
})();
