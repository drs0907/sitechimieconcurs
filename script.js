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

const additiveSearchForm = document.getElementById("additiveSearchForm");
const additiveSearchInput = document.getElementById("additiveSearchInput");
const additiveResult = document.getElementById("additiveResult");
const additiveSearchMeta = document.getElementById("additiveSearchMeta");
const additivesData = Array.isArray(window.ADDITIVES_DATA) ? window.ADDITIVES_DATA : [];

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character] ?? character;
  });

const normalizeQuery = (value) => value.trim().replace(/\s+/g, " ");
const normalizeCodeQuery = (value) => normalizeQuery(value).toUpperCase().replace(/\s+/g, "");

const findAdditiveMatches = (rawQuery) => {
  const query = normalizeQuery(rawQuery);

  if (!query) {
    return [];
  }

  const normalizedCode = normalizeCodeQuery(query);
  const normalizedText = query.toLowerCase();
  const exactCodeMatches = [];
  const partialMatches = [];

  additivesData.forEach((additive) => {
    const code = additive.code.toUpperCase();
    const name = additive.name.toLowerCase();
    const type = additive.type.toLowerCase();
    const description = additive.description.toLowerCase();
    const effect = additive.effect.toLowerCase();
    const isExactCodeMatch = code === normalizedCode;
    const isPartialMatch =
      code.includes(normalizedCode) ||
      name.includes(normalizedText) ||
      type.includes(normalizedText) ||
      description.includes(normalizedText) ||
      effect.includes(normalizedText);

    if (isExactCodeMatch) {
      exactCodeMatches.push(additive);
      return;
    }

    if (isPartialMatch) {
      partialMatches.push(additive);
    }
  });

  return [...exactCodeMatches, ...partialMatches];
};

const renderAdditiveEmptyState = (title, message) => {
  if (!additiveResult) {
    return;
  }

  additiveResult.innerHTML = `
    <div class="additive-result-empty">
      <span class="section-tag">Rezultat</span>
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(message)}</p>
    </div>
  `;

  requestScrollMotionUpdate();
};

const updateAdditiveMeta = (message) => {
  if (additiveSearchMeta) {
    additiveSearchMeta.textContent = message;
  }
};

const renderAdditiveResult = (selectedAdditive, matches, query) => {
  if (!additiveResult) {
    return;
  }

  const alternateMatches = matches.filter((additive) => additive.code !== selectedAdditive.code).slice(0, 6);
  const relatedMarkup = alternateMatches.length
    ? `
      <div class="additive-related">
        <span class="additive-related-title">Alte potriviri apropiate</span>
        <div class="additive-related-list">
          ${alternateMatches
            .map(
              (additive) => `
                <button class="additive-chip additive-chip-muted" type="button" data-additive-code="${escapeHtml(additive.code)}">
                  ${escapeHtml(additive.code)} / ${escapeHtml(additive.name)}
                </button>
              `
            )
            .join("")}
        </div>
      </div>
    `
    : "";

  additiveResult.innerHTML = `
    <div class="additive-result-head">
      <div>
        <div class="additive-code-badge">${escapeHtml(selectedAdditive.code)}</div>
        <h2>${escapeHtml(selectedAdditive.name)}</h2>
        <p class="additive-result-summary">${escapeHtml(selectedAdditive.type)}</p>
      </div>
      <div class="additive-result-stat">
        <strong>${matches.length}</strong>
        <span>${matches.length === 1 ? "potrivire" : "potriviri"} pentru "${escapeHtml(query)}"</span>
      </div>
    </div>
    <div class="additive-meta-grid">
      <div class="additive-meta-block">
        <span>Tip</span>
        <p>${escapeHtml(selectedAdditive.type)}</p>
      </div>
      <div class="additive-meta-block">
        <span>Efect</span>
        <p>${escapeHtml(selectedAdditive.effect)}</p>
      </div>
      <div class="additive-meta-block additive-meta-block-wide">
        <span>Descriere</span>
        <p>${escapeHtml(selectedAdditive.description)}</p>
      </div>
    </div>
    ${relatedMarkup}
  `;

  updateAdditiveMeta(
    matches.length === 1
      ? `Am gasit un rezultat pentru "${query}".`
      : `Am gasit ${matches.length} rezultate pentru "${query}". Este afisat primul rezultat.`
  );

  requestScrollMotionUpdate();
};

const runAdditiveSearch = (rawQuery) => {
  const query = normalizeQuery(rawQuery);

  if (!additiveResult) {
    return;
  }

  if (!additivesData.length) {
    renderAdditiveEmptyState("Date indisponibile", "Fisierul cu aditivi nu a fost incarcat corect pe aceasta pagina.");
    updateAdditiveMeta("Nu exista date disponibile pentru cautare.");
    return;
  }

  if (!query) {
    renderAdditiveEmptyState("Introdu un cod sau un nume", "Poti incepe cu un exemplu simplu, cum ar fi E100 sau E330.");
    updateAdditiveMeta(`Baza de date contine ${additivesData.length} aditivi.`);
    return;
  }

  const matches = findAdditiveMatches(query);

  if (!matches.length) {
    renderAdditiveEmptyState("Nu am gasit acest aditiv", `Nu exista potriviri pentru "${query}". Incearca un alt cod sau un alt nume.`);
    updateAdditiveMeta(`Nu exista potriviri pentru "${query}".`);
    return;
  }

  renderAdditiveResult(matches[0], matches, query);
};

if (additiveSearchForm && additiveSearchInput && additiveResult) {
  additiveSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    runAdditiveSearch(additiveSearchInput.value);
  });

  const handleAdditiveQuickSelect = (event) => {
    const trigger = event.target.closest("[data-additive-example], [data-additive-code]");

    if (!trigger) {
      return;
    }

    const nextQuery = trigger.dataset.additiveExample ?? trigger.dataset.additiveCode ?? "";
    additiveSearchInput.value = nextQuery;
    runAdditiveSearch(nextQuery);
    additiveSearchInput.focus();
  };

  document.getElementById("additiveExamples")?.addEventListener("click", handleAdditiveQuickSelect);
  additiveResult.addEventListener("click", handleAdditiveQuickSelect);

  const initialQuery = "E100";
  additiveSearchInput.value = initialQuery;
  runAdditiveSearch(initialQuery);
}
