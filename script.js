const visualDetails = {
  bread: {
    title: "Știința Coacerii",
    description: "Când pâinea intră în cuptor, are loc o transformare dramatică. Căldura determină evaporarea apei de la suprafață, permițând temperaturii să crească peste 140°C, punctul unde începe magia chimică.",
    image: "assets/images/bread-crust.jpg",
    examples: [
      { name: "Expansiunea gazelor", text: "Dioxidul de carbon produs de drojdie se dilată rapid, făcând pâinea să crească." },
      { name: "Formarea crustei", text: "Reacția Maillard creează sute de arome noi și culoarea brună specifică." }
    ]
  },
  liquid: {
    title: "Chimia apei",
    description: "Apa este un solvent polar, ceea ce inseamna ca poate dizolva usor anumite substante, dar interactioneaza greu cu grasimile. Tocmai aceasta diferenta explica de ce unele amestecuri raman omogene, iar altele se separa rapid.",
    image: "assets/images/water-pouring.png",
    examples: [
      { name: "Polaritatea", text: "Molecula de apa are o distributie inegala a sarcinilor, iar asta o face foarte buna pentru dizolvare si transport." },
      { name: "Tensiunea superficială", text: "Forta de la suprafata lichidului influenteaza forma picaturilor si felul in care apa se distribuie pe alte materiale." }
    ]
  },
  fruit: {
    title: "Biochimia Fructelor",
    description: "Fructele sunt organisme vii care respiră. Atunci când tăiem un măr, distrugem celulele și eliberăm enzime care, în contact cu oxigenul, încep un proces de auto-apărare vizibil prin schimbarea culorii.",
    image: "assets/images/sliced-apple.jpg",
    examples: [
      { name: "Polifenoloxidaza", text: "Enzima principală responsabilă pentru 'ruginirea' fructelor." },
      { name: "Antioxidanții naturali", text: "Vitamina C poate opri acest proces prin sacrificarea propriilor electroni." }
    ]
  }
};

const buildDetailImageHtml = (data) => {
  if (!data.image) {
    return `<div class="detail-image-placeholder-text">Loc gol pentru imagine<br>(${data.title})</div>`;
  }

  const imageClass = data.imageFit === "contain" ? ` class="detail-image-fit-contain"` : "";
  return `<img src="${data.image}" alt="${data.title}"${imageClass}>`;
};

window.openVisualDetail = (key) => {
  const data = visualDetails[key];
  if (!data) return;

  const overlay = document.getElementById("detailOverlay");
  const body = document.getElementById("detailBody");

  body.innerHTML = `
    <div class="detail-header">
      <h2>${data.title}</h2>
      <span class="section-tag">Ghid Vizual Detaliat</span>
    </div>
    <div class="detail-image-container">
      ${buildDetailImageHtml(data)}
    </div>
    <div class="detail-body">
      <p>${data.description}</p>
      <h3>Ce observăm în imagine?</h3>
      <div class="detail-examples">
        ${data.examples.map(ex => `
          <div class="detail-example-card">
            <h4>${ex.name}</h4>
            <p>${ex.text}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
};

const conceptDetails = {
  apa: {
    title: "Apa în alimente",
    description: "Apa nu este doar un ingredient, ci mediul în care au loc toate interacțiunile chimice. Ea influențează direct textura (suculența), stabilitatea și modul în care căldura este transferată în interiorul alimentului.",
    image: "assets/images/water-pouring.png",
    examples: [
      { name: "Activitatea apei (aw)", text: "Reprezintă apa 'liberă' care poate fi folosită de microorganisme pentru a se dezvolta." },
      { name: "Hidratarea", text: "Procesul prin care proteinele și amidonul absorb apa, esențial în formarea aluatului." }
    ]
  },
  glucide: {
    title: "Carbohidrații (Zaharurile)",
    description: "Sunt compuși organici formați din carbon, hidrogen și oxigen. În bucătărie, carbohidrații sunt responsabili pentru gustul dulce, pentru structura oferită de amidon și pentru culoarea brună obținută prin caramelizare.",
    image: "assets/images/carbohydrates-foods.png",
    examples: [
      { name: "Amidonul", text: "La încălzire în prezența apei, granulele de amidon se umflă și gelifică sosurile." },
      { name: "Zaharurile reducătoare", text: "Sunt cele care participă la reacția Maillard, oferind aroma de copt." }
    ]
  },
  lipide: {
    title: "Lipidele (Grăsimile)",
    description: "Grăsimile sunt esențiale pentru transportul aromelor (multe arome sunt solubile doar în ulei) și pentru crearea texturilor fine. Ele oferă energie concentrată și ajută la transferul termic uniform în timpul prăjirii.",
    image: "assets/images/lipid-foods.png",
    examples: [
      { name: "Punctul de fum", text: "Temperatura la care o grăsime începe să se descompună și să scoată fum." },
      { name: "Auto-oxidarea", text: "Procesul chimic prin care grăsimile reacționează cu oxigenul, ducând la râncezire." }
    ]
  },
  proteine: {
    title: "Proteinele",
    description: "Sunt molecule gigant formate din lanțuri de aminoacizi. În chimie alimentară, proteinele sunt cele care dau structură (prin coagulare) și care permit formarea spumelor (ca în cazul albușului de ou bătut).",
    image: "assets/images/protein-foods.png",
    examples: [
      { name: "Glutenul", text: "O rețea proteică elastică formată în aluat care reține gazele de fermentație." },
      { name: "Denaturarea", text: "Procesul prin care proteinele își pierd structura nativă sub influența căldurii sau acizilor." }
    ]
  }
};

window.openConcept = (key) => {
  const data = conceptDetails[key];
  if (!data) return;

  const overlay = document.getElementById("detailOverlay");
  const body = document.getElementById("detailBody");

  body.innerHTML = `
    <div class="detail-header">
      <h2>${data.title}</h2>
      <span class="section-tag">Concept Fundamental</span>
    </div>
    <div class="detail-image-container">
      ${buildDetailImageHtml(data)}
    </div>
    <div class="detail-body">
      <p>${data.description}</p>
      <h3>Detalii Tehnice & Exemple</h3>
      <div class="detail-examples">
        ${data.examples.map(ex => `
          <div class="detail-example-card">
            <h4>${ex.name}</h4>
            <p>${ex.text}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
};

const reactionDetails = {
  maillard: {
    title: "Reacția Maillard",
    description: "Este o reacție chimică complexă între aminoacizi și zaharuri reducătoare, care are loc de obicei la temperaturi ridicate. Aceasta conferă alimentelor gătite culoarea lor brună caracteristică și aromele irezistibile de 'prăjit' sau 'copt'.",
    image: "assets/images/maillard-diagram.png",
    imageFit: "contain",
    examples: [
      { name: "Pâinea proaspătă", text: "Coaja maronie și mirosul specific sunt rezultatul direct al acestei reacții." },
      { name: "Friptura", text: "Rumenirea cărnii la suprafață eliberează sute de compuși aromatici noi." }
    ]
  },
  caramelizare: {
    title: "Caramelizarea",
    description: "Spre deosebire de Maillard, caramelizarea implică doar descompunerea zaharurilor sub acțiunea căldurii intense. Procesul elimină apa și creează polimeri complecși cu gust dulce-amărui și culoare aurie spre maro închis.",
    image: "assets/images/sugar-liquid-detail.png",
    examples: [
      { name: "Zahărul ars", text: "Exemplul clasic unde zahărul alb devine un lichid brun și aromat." },
      { name: "Legumele sote", text: "Ceapa devine dulce și maronie când este gătită lent datorită caramelizării propriilor zaharuri." }
    ]
  },
  denaturare: {
    title: "Denaturarea și Coagularea",
    description: "Denaturarea reprezintă modificarea structurii tridimensionale a proteinelor sub influența căldurii, acizilor sau forței mecanice. Coagularea este etapa următoare, unde proteinele 'desfăcute' se leagă între ele formând o rețea solidă.",
    image: "assets/images/egg-food.jpg",
    examples: [
      { name: "Oul prăjit", text: "Albușul devine alb și solid deoarece proteinele se denaturează termic și coagulează." },
      { name: "Brânza", text: "Acidul adăugat în lapte denaturează cazeina, ducând la formarea cheagului." }
    ]
  },
  fermentatie: {
    title: "Fermentația",
    description: "Un proces metabolic prin care microorganismele (precum drojdiile sau bacteriile) transformă glucidele în alcool, acizi sau gaze. Este esențială pentru conservare și pentru dezvoltarea unor arome complexe.",
    image: "assets/images/bread-loaves.png",
    examples: [
      { name: "Iaurtul", text: "Bacteriile lactice transformă lactoza în acid lactic, îngroșând laptele." },
      { name: "Dospirea aluatului", text: "Drojdia produce dioxid de carbon, care creează bulele de aer din pâine." }
    ]
  },
  oxidare: {
    title: "Oxidarea",
    description: "Reacția substanțelor din alimente cu oxigenul. În bucătărie, ne întâlnim cel mai des cu oxidarea enzimatică (închiderea la culoare a fructelor) și râncezirea grăsimilor.",
    image: "assets/images/sliced-apple.jpg",
    examples: [
      { name: "Mărul tăiat", text: "Enzimele din măr reacționează cu aerul și produc pigmenți bruni (melanine)." },
      { name: "Uleiul rânced", text: "Grăsimile expuse la lumină și aer se descompun în compuși cu miros neplăcut." }
    ]
  },
  emulsificare: {
    title: "Emulsificarea",
    description: "Procesul de amestecare a două lichide care în mod normal nu se combină (ca apa și uleiul). Un agent emulsificator (ca lecitina din gălbenuș) ajută la stabilizarea picăturilor mici de ulei în apă.",
    image: "assets/images/water-polarity.png",
    imageFit: "contain",
    examples: [
      { name: "Maioneza", text: "O emulsie stabilă de ulei în suc de lămâie/oțet, legată de gălbenușul de ou." },
      { name: "Laptele", text: "O emulsie naturală de grăsimi în apă, stabilizată de proteinele laptelui." }
    ]
  }
};

window.openDetail = (key) => {
  const data = reactionDetails[key];
  if (!data) return;

  const overlay = document.getElementById("detailOverlay");
  const body = document.getElementById("detailBody");

  body.innerHTML = `
    <div class="detail-header">
      <h2>${data.title}</h2>
      <span class="section-tag">Explicație detaliată</span>
    </div>
    <div class="detail-image-container">
      ${buildDetailImageHtml(data)}
    </div>
    <div class="detail-body">
      <p>${data.description}</p>
      <h3>Exemple practice</h3>
      <div class="detail-examples">
        ${data.examples.map(ex => `
          <div class="detail-example-card">
            <h4>${ex.name}</h4>
            <p>${ex.text}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
};

window.closeDetail = () => {
  const overlay = document.getElementById("detailOverlay");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
};

// Inchide la click in exterior
document.getElementById("detailOverlay")?.addEventListener("click", (e) => {
  if (e.target.id === "detailOverlay") closeDetail();
});

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
    const bodyEffect = (additive.bodyEffect || "").toLowerCase();
    const isExactCodeMatch = code === normalizedCode;
    const isPartialMatch =
      code.includes(normalizedCode) ||
      name.includes(normalizedText) ||
      type.includes(normalizedText) ||
      description.includes(normalizedText) ||
      effect.includes(normalizedText) ||
      bodyEffect.includes(normalizedText);

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
        <span>Efect in aliment</span>
        <p>${escapeHtml(selectedAdditive.effect)}</p>
      </div>
      <div class="additive-meta-block additive-meta-block-wide">
        <span>Efect asupra corpului</span>
        <p>${escapeHtml(selectedAdditive.bodyEffect || "Nu este disponibil momentan.")}</p>
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
      ? `Am găsit un rezultat pentru "${query}".`
      : `Am găsit ${matches.length} rezultate pentru "${query}". Este afișat primul rezultat.`
  );

  requestScrollMotionUpdate();
};

const runAdditiveSearch = (rawQuery) => {
  const query = normalizeQuery(rawQuery);

  if (!additiveResult) {
    return;
  }

  if (!additivesData.length) {
    renderAdditiveEmptyState("Date indisponibile", "Fișierul cu aditivi nu a fost încărcat corect pe această pagină.");
    updateAdditiveMeta("Nu există date disponibile pentru căutare.");
    return;
  }

  if (!query) {
    renderAdditiveEmptyState("Introdu un cod sau un nume", "Poți începe cu un exemplu simplu, cum ar fi E100 sau E330.");
    updateAdditiveMeta(`Baza de date conține ${additivesData.length} aditivi.`);
    return;
  }

  const matches = findAdditiveMatches(query);

  if (!matches.length) {
    renderAdditiveEmptyState("Nu am găsit acest aditiv", `Nu există potriviri pentru "${query}". Încearcă un alt cod sau un alt nume.`);
    updateAdditiveMeta(`Nu există potriviri pentru "${query}".`);
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
