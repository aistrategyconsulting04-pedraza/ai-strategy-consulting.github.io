// Partículas
const particlesContainer = document.getElementById("particles");
if (particlesContainer) {
  const particleCount = 50;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = 15 + Math.random() * 10 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Navbar sticky
const navbar = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 24) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  },
  { passive: true }
);

// Mobile menu
const mobileToggle = document.getElementById("mobileMenuToggle");
const mobileMenu = document.getElementById("mobileMenu");
if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  mobileMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => mobileMenu.classList.remove("open"));
  });
}

// Intersection Observer para reveals
const revealElements = document.querySelectorAll(".reveal-on-scroll, .animated-element");
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("animated-element")) {
        entry.target.classList.add("animate-in");
      } else {
        entry.target.classList.add("revealed");
      }
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((el) => observer.observe(el));

// Contadores animados
function animateCounter(element, target, duration = 2000) {
  const increment = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.round(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current);
    }
  }, 16);
}

const counters = document.querySelectorAll(".counter");
const countersObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-target"), 10);
        animateCounter(el, target);
        countersObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.4 }
);

counters.forEach((c) => countersObserver.observe(c));

// Flip cards en mobile: click/tap para rotar
const serviceCards = document.querySelectorAll(".service-card-flip");
serviceCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 1023px)").matches) {
      const inner = card.querySelector(".service-card-inner");
      inner.style.transform =
        inner.style.transform === "rotateY(180deg)" ? "rotateY(0deg)" : "rotateY(180deg)";
    }
  });
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    }
  });
});
