/* ============================================================
   JHEINI LASER — JavaScript
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ── NAV SCROLL ─────────────────────────────────────────── */
  const nav = document.querySelector("nav");
  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    },
    { passive: true },
  );

  /* ── MOBILE MENU ─────────────────────────────────────────── */
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
    document.body.style.overflow = mobileMenu.classList.contains("open")
      ? "hidden"
      : "";
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  /* ── SCROLL ANIMATIONS ───────────────────────────────────── */
  const fadeEls = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  fadeEls.forEach((el) => observer.observe(el));

  /* ── FAQ ACCORDION ───────────────────────────────────────── */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-question");
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Close all
      faqItems.forEach((i) => i.classList.remove("open"));

      // Toggle clicked
      if (!isOpen) item.classList.add("open");
    });
  });

  /* ── HERO PARALLAX (subtle) ──────────────────────────────── */
  const heroBg = document.querySelector(".hero-bg-pattern");
  if (heroBg) {
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        heroBg.style.transform = `translateY(${y * 0.3}px)`;
      },
      { passive: true },
    );
  }

  /* ── COUNTER ANIMATION (float card) ─────────────────────── */
  const targets = document.querySelectorAll("[data-count]");

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || "";
        const dur = 1800;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          el.textContent = Math.round(ease * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );

  targets.forEach((el) => countObserver.observe(el));

  /* ── SMOOTH ANCHOR SCROLL ────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const offset = 72; // nav height
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  /* ── AREA CHIPS STAGGER ──────────────────────────────────── */
  const chips = document.querySelectorAll(".area-chip");
  chips.forEach((chip, i) => {
    chip.style.transitionDelay = `${i * 0.04}s`;
  });

  /* ── CURSOR SPARKLE (desktop only) ──────────────────────── */
  if (window.matchMedia("(hover: hover)").matches) {
    document.addEventListener("mousemove", (e) => {
      // only sparkle near gold elements occasionally
      if (Math.random() > 0.97) {
        const spark = document.createElement("div");
        spark.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #C6A35A;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%,-50%);
          animation: sparkle 0.7s forwards;
        `;
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 700);
      }
    });
  }

  /* ── HERO BADGE PULSE ────────────────────────────────────── */
  const badge = document.querySelector(".hero-badge");

  if (badge) {
    setInterval(() => {
      badge.classList.add("pulse");
      setTimeout(() => badge.classList.remove("pulse"), 400);
    }, 2400);
  }

});

/* ── SPARKLE KEYFRAME (inject into head) ─────────────────── */
const sparkleStyle = document.createElement("style");
sparkleStyle.textContent = `
  @keyframes sparkle {
    0%   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%,-250%) scale(0); }
  }
`;
document.head.appendChild(sparkleStyle);
