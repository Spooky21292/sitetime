(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const thoughtElement = document.getElementById('thoughtText');
  const thoughtPool = Array.isArray(window.THOUGHTS) ? window.THOUGHTS : [];

  if (thoughtElement && thoughtPool.length) {
    const randomThought = thoughtPool[Math.floor(Math.random() * thoughtPool.length)];
    thoughtElement.textContent = randomThought;
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const enterBtn = document.querySelector('[data-scroll-target]');
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      const target = document.querySelector(enterBtn.getAttribute('data-scroll-target'));
      if (!target) return;
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  }

  const fragments = gsap.utils.toArray('.code-fragment');
  const random = gsap.utils.random;

  fragments.forEach((fragment, index) => {
    gsap.set(fragment, {
      x: random(3, 92) + 'vw',
      y: random(4, 92) + 'vh',
      rotate: random(-10, 10),
      opacity: random(0.1, 0.22)
    });

    if (!reduceMotion) {
      gsap.to(fragment, {
        x: `+=${random(-80, 80)}`,
        y: `+=${random(-60, 60)}`,
        rotate: random(-14, 14),
        duration: random(24, 42),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.15
      });
    }
  });

  const breathingTargets = ['.bg-base', '.hero h1', '.thought-card'];
  if (!reduceMotion) {
    gsap.to(breathingTargets, {
      filter: 'drop-shadow(0 0 12px rgba(122, 236, 211, 0.24))',
      duration: 5.8,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });
  }

  gsap.registerPlugin(ScrollTrigger);

  const revealItems = gsap.utils.toArray('.reveal');
  revealItems.forEach((item) => {
    if (reduceMotion) {
      gsap.set(item, { clearProps: 'all', opacity: 1, y: 0, filter: 'none' });
      return;
    }

    gsap.fromTo(
      item,
      { opacity: 0, y: 26, filter: 'blur(8px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%'
        }
      }
    );
  });

  const cards = gsap.utils.toArray('.fragment-card');
  cards.forEach((card) => {
    const strength = reduceMotion ? 0 : 8;

    card.addEventListener('mousemove', (event) => {
      if (reduceMotion) return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        x: x * strength,
        y: y * strength,
        rotateY: x * 4,
        rotateX: -y * 4,
        duration: 0.35,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.45,
        ease: 'power3.out'
      });
    });
  });
})();
