const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const navbar = document.querySelector(".navbar");
const parallaxElements = Array.from(document.querySelectorAll("[data-parallax]"));
const pageName = document.body.dataset.page;
const navLinks = Array.from(document.querySelectorAll(".nav-link[data-page]"));

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  });
}

navLinks.forEach((link) => {
  const isActive = link.dataset.page === pageName;
  link.classList.toggle("is-active", isActive);
});

let scrollTicking = false;

const updateScrollMotion = () => {
  const viewportCenter = window.innerHeight / 2;
  const viewportLimit = window.innerHeight;

  parallaxElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const distanceFromCenter = elementCenter - viewportCenter;
    const clampedDistance = Math.max(-viewportLimit, Math.min(viewportLimit, distanceFromCenter));
    const speed = Number(element.dataset.parallaxSpeed ?? 0.03);
    const rotateSpeed = Number(element.dataset.rotateSpeed ?? 0);
    const offsetY = clampedDistance * speed * -1;
    const rotation = clampedDistance * rotateSpeed * -1;

    element.style.setProperty("--parallax-y", `${offsetY.toFixed(2)}px`);
    element.style.setProperty("--parallax-rotate", `${rotation.toFixed(3)}deg`);
  });

  scrollTicking = false;
};

const requestScrollMotionUpdate = () => {
  if (scrollTicking) {
    return;
  }

  scrollTicking = true;
  requestAnimationFrame(updateScrollMotion);
};

if (navbar) {
  window.addEventListener("scroll", () => {
    navbar.style.boxShadow = window.scrollY > 10 ? "0 10px 28px rgba(8, 52, 41, 0.08)" : "none";
  });
}

window.addEventListener("scroll", requestScrollMotionUpdate, { passive: true });
window.addEventListener("resize", requestScrollMotionUpdate);
requestScrollMotionUpdate();

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetSelector = anchor.getAttribute("href");
    const target = document.querySelector(targetSelector);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll("[data-shiny-text]").forEach((element) => {
  const speed = Number(element.dataset.speed ?? 2);
  const delay = Number(element.dataset.delay ?? 0);
  const color = element.dataset.color ?? "#b5b5b5";
  const shineColor = element.dataset.shineColor ?? "#ffffff";
  const spread = Number(element.dataset.spread ?? 120);
  const direction = element.dataset.direction === "right" ? "right" : "left";
  const yoyo = element.dataset.yoyo === "true";
  const pauseOnHover = element.dataset.pauseOnHover === "true";
  const disabled = element.dataset.disabled === "true";
  const animationDuration = speed * 1000;
  const delayDuration = delay * 1000;
  const directionFactor = direction === "left" ? 1 : -1;

  let isPaused = false;
  let elapsed = 0;
  let lastTime = null;

  element.style.backgroundImage = `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`;

  if (pauseOnHover) {
    element.addEventListener("mouseenter", () => {
      isPaused = true;
    });

    element.addEventListener("mouseleave", () => {
      isPaused = false;
      lastTime = null;
    });
  }

  const updateBackgroundPosition = (progress) => {
    const position = 150 - progress * 2;
    element.style.backgroundPosition = `${position}% center`;
  };

  const animate = (time) => {
    if (disabled) {
      updateBackgroundPosition(directionFactor === 1 ? 0 : 100);
      return;
    }

    if (isPaused) {
      lastTime = null;
      requestAnimationFrame(animate);
      return;
    }

    if (lastTime === null) {
      lastTime = time;
      requestAnimationFrame(animate);
      return;
    }

    const deltaTime = time - lastTime;
    lastTime = time;
    elapsed += deltaTime;

    let progress = 0;

    if (yoyo) {
      const cycleDuration = animationDuration + delayDuration;
      const fullCycle = cycleDuration * 2;
      const cycleTime = elapsed % fullCycle;

      if (cycleTime < animationDuration) {
        progress = (cycleTime / animationDuration) * 100;
        progress = directionFactor === 1 ? progress : 100 - progress;
      } else if (cycleTime < cycleDuration) {
        progress = directionFactor === 1 ? 100 : 0;
      } else if (cycleTime < cycleDuration + animationDuration) {
        const reverseTime = cycleTime - cycleDuration;
        progress = 100 - (reverseTime / animationDuration) * 100;
        progress = directionFactor === 1 ? progress : 100 - progress;
      } else {
        progress = directionFactor === 1 ? 0 : 100;
      }
    } else {
      const cycleDuration = animationDuration + delayDuration;
      const cycleTime = elapsed % cycleDuration;

      if (cycleTime < animationDuration) {
        progress = (cycleTime / animationDuration) * 100;
        progress = directionFactor === 1 ? progress : 100 - progress;
      } else {
        progress = directionFactor === 1 ? 100 : 0;
      }
    }

    updateBackgroundPosition(progress);
    requestAnimationFrame(animate);
  };

  updateBackgroundPosition(directionFactor === 1 ? 0 : 100);
  requestAnimationFrame(animate);
});
