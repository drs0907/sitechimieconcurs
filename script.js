const visualDetails = {
  bread: {
    title: "Stiinta Coacerii",
    description:
      "Cand painea intra in cuptor, are loc o transformare dramatica. Caldura determina evaporarea apei de la suprafata, permitand temperaturii sa creasca peste 140C, punctul unde incepe schimbarea chimica intensa.",
    image: "assets/images/bread-loaves.png",
    examples: [
      { name: "Expansiunea gazelor", text: "Dioxidul de carbon produs de drojdie se dilata rapid si face painea sa creasca." },
      { name: "Formarea crustei", text: "Reacția Maillard creează arome noi și culoarea brună specifică." }
    ]
  },
  liquid: {
    title: "Chimia apei",
    description:
      "Apa este un solvent polar. Poate dizolva usor anumite substante, dar interactioneaza mai greu cu grasimile. Diferenta aceasta explica de ce unele amestecuri raman omogene, iar altele se separa rapid.",
    image: "assets/images/water-bubbles.jpg",
    examples: [
      { name: "Polaritatea", text: "Molecula de apa are o distributie inegala a sarcinilor si devine foarte buna pentru dizolvare si transport." },
      { name: "Tensiunea superficiala", text: "Forta de la suprafata lichidului influenteaza forma picaturilor si felul in care apa se distribuie pe alte materiale." }
    ]
  },
  fruit: {
    title: "Biochimia Fructelor",
    description:
      "Fructele sunt organisme vii care respira. Cand taiem un mar, distrugem celulele si eliberam enzime care, in contact cu oxigenul, incep un proces vizibil prin schimbarea culorii.",
    image: "assets/images/sliced-apple.jpg",
    examples: [
      { name: "Polifenoloxidaza", text: "Enzima principala responsabila pentru inchiderea la culoare a fructelor." },
      { name: "Antioxidanții naturali", text: "Vitamina C poate încetini acest proces prin reacția ei rapidă cu oxigenul." }
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
  const overlay = document.getElementById("detailOverlay");
  const body = document.getElementById("detailBody");

  if (!data || !overlay || !body) {
    return;
  }

  body.innerHTML = `
    <div class="detail-header">
      <h2>${data.title}</h2>
      <span class="section-tag">Ghid vizual detaliat</span>
    </div>
    <div class="detail-image-container">
      ${buildDetailImageHtml(data)}
    </div>
    <div class="detail-body">
      <p>${data.description}</p>
      <h3>Ce observam in imagine?</h3>
      <div class="detail-examples">
        ${data.examples
          .map(
            (example) => `
              <div class="detail-example-card">
                <h4>${example.name}</h4>
                <p>${example.text}</p>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
};

const conceptDetails = {
  apa: {
    title: "Apa in alimente",
    description:
      "Apa nu este doar un ingredient, ci mediul in care au loc interactiunile chimice. Ea influenteaza direct textura, stabilitatea si modul in care caldura este transferata in interiorul alimentului.",
    image: "assets/images/water-bubbles.jpg",
    examples: [
      { name: "Activitatea apei", text: "Reprezinta apa libera care poate fi folosita de microorganisme pentru a se dezvolta." },
      { name: "Hidratarea", text: "Procesul prin care proteinele si amidonul absorb apa, esential in formarea aluatului." }
    ]
  },
  glucide: {
    title: "Carbohidratii",
    description:
      "Sunt compusi organici formati din carbon, hidrogen si oxigen. In bucatarie, ei sunt responsabili pentru gustul dulce, structura oferita de amidon si culoarea bruna obtinuta prin caramelizare.",
    image: "assets/images/carbohydrates-foods.png",
    examples: [
      { name: "Amidonul", text: "La incalzire in prezenta apei, granulele de amidon se umfla si gelifica sosurile." },
      { name: "Zaharurile reducătoare", text: "Acestea participă la reacția Maillard și contribuie la aroma de copt." }
    ]
  },
  lipide: {
    title: "Lipidele",
    description:
      "Grasimile sunt esentiale pentru transportul aromelor si pentru crearea texturilor fine. Ele ofera energie concentrata si ajuta la transferul termic uniform in timpul prajirii.",
    image: "assets/images/lipid-foods.png",
    examples: [
      { name: "Punctul de fum", text: "Temperatura la care o grasime incepe sa se descompuna si sa scoata fum." },
      { name: "Auto-oxidarea", text: "Procesul chimic prin care grasimile reactioneaza cu oxigenul si duc la rancezire." }
    ]
  },
  proteine: {
    title: "Proteinele",
    description:
      "Sunt molecule mari formate din lanturi de aminoacizi. In chimia alimentara, ele dau structura prin coagulare si permit formarea spumelor, cum se intampla la albusul batut.",
    image: "assets/images/protein-foods.png",
    examples: [
      { name: "Forma glutenului", text: "Dupa hidratare, glutenul nu are granule regulate, ci formeaza structuri neregulate, alungite si elastice care se unesc intr-o retea continua in aluat." },
      { name: "Denaturarea", text: "Procesul prin care proteinele isi pierd structura nativa sub influenta caldurii sau a acizilor." }
    ]
  }
};

window.openConcept = (key) => {
  const data = conceptDetails[key];
  const overlay = document.getElementById("detailOverlay");
  const body = document.getElementById("detailBody");

  if (!data || !overlay || !body) {
    return;
  }

  body.innerHTML = `
    <div class="detail-header">
      <h2>${data.title}</h2>
      <span class="section-tag">Concept fundamental</span>
    </div>
    <div class="detail-image-container">
      ${buildDetailImageHtml(data)}
    </div>
    <div class="detail-body">
      <p>${data.description}</p>
      <h3>Detalii tehnice si exemple</h3>
      <div class="detail-examples">
        ${data.examples
          .map(
            (example) => `
              <div class="detail-example-card">
                <h4>${example.name}</h4>
                <p>${example.text}</p>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
};

const reactionDetails = {
  maillard: {
    title: "Reacția Maillard",
    description:
      "Este o reacție chimică complexă între aminoacizi și zaharuri reducătoare, care are loc de obicei la temperaturi ridicate. Aceasta conferă alimentelor gătite culoarea brună caracteristică și aromele de prăjit sau copt.",
    image: "assets/images/maillard-diagram.png",
    imageFit: "contain",
    examples: [
      { name: "Painea proaspat coapta", text: "Coaja maronie si mirosul specific sunt rezultatul direct al acestei reactii." },
      { name: "Friptura", text: "Rumenirea carnii la suprafata elibereaza multi compusi aromatici noi." }
    ]
  },
  caramelizare: {
    title: "Caramelizarea",
    description:
      "Spre deosebire de Maillard, caramelizarea implica doar descompunerea zaharurilor sub actiunea caldurii intense. Procesul elimina apa si creeaza compusi cu gust dulce-amarui si culoare aurie spre maro inchis.",
    image: "assets/images/sugar-liquid-detail.png",
    examples: [
      { name: "Zaharul ars", text: "Exemplul clasic in care zaharul alb devine un lichid brun si aromat." },
      { name: "Legumele sote", text: "Ceapa devine dulce si maronie cand este gatita lent datorita caramelizarii propriilor zaharuri." }
    ]
  },
  denaturare: {
    title: "Denaturarea si coagularea",
    description:
      "Denaturarea reprezinta modificarea structurii tridimensionale a proteinelor sub influenta caldurii, acizilor sau fortei mecanice. Coagularea este etapa urmatoare, unde proteinele desfacute se leaga intre ele si formeaza o retea solida.",
    image: "assets/images/egg-food.jpg",
    examples: [
      { name: "Oul prajit", text: "Albusul devine alb si solid deoarece proteinele se denatureaza termic si coaguleaza." },
      { name: "Branza", text: "Acidul adaugat in lapte denatureaza cazeina si duce la formarea cheagului." }
    ]
  },
  fermentatie: {
    title: "Fermentația",
    description:
      "Un proces metabolic prin care microorganismele, precum drojdiile sau bacteriile, transforma glucidele in alcool, acizi sau gaze. Este esentiala pentru conservare si pentru dezvoltarea unor arome complexe.",
    image: "assets/images/bread-loaves.png",
    examples: [
      { name: "Iaurtul", text: "Bacteriile lactice transforma lactoza in acid lactic si ingroasa laptele." },
      { name: "Dospirea aluatului", text: "Drojdia produce dioxid de carbon, care creeaza bulele de aer din paine." },
      { name: "Obtinerea alcoolului etilic", text: "Drojdia transforma glucoza in alcool etilic si dioxid de carbon, proces folosit la obtinerea vinului si a berii." },
      { name: "Fermentatia acetica", text: "Bacteriile acetice transforma alcoolul etilic in acid acetic, proces esential la obtinerea otetului." }
    ]
  },
  oxidare: {
    title: "Oxidarea",
    description:
      "Reacția substanțelor din alimente cu oxigenul. În bucătărie apare des oxidarea enzimatică, adică închiderea la culoare a fructelor, dar și râncezirea grăsimilor.",
    image: "assets/images/sliced-apple.jpg",
    examples: [
      { name: "Marul taiat", text: "Enzimele din mar reactioneaza cu aerul si produc pigmenti bruni." },
      { name: "Vitamina C pe mar", text: "Daca ungem cu o pensula o solutie de vitamina C pe suprafata marului taiat, procesul de oxidare este mult mai intarziat." },
      { name: "Uleiul ranced", text: "Grasimile expuse la lumina si aer se descompun in compusi cu miros neplacut." }
    ]
  },
  emulsificare: {
    title: "Emulsificarea",
    description:
      "Procesul de amestecare a doua lichide care in mod normal nu se combina, ca apa si uleiul. Un agent emulsificator ajuta la stabilizarea picaturilor mici de ulei in apa.",
    image: "assets/images/water-polarity.png",
    imageFit: "contain",
    examples: [
      { name: "Maioneza", text: "O emulsie stabila de ulei in suc de lamaie sau otet, legata de galbenusul de ou." },
      { name: "Laptele", text: "O emulsie naturala de grasimi in apa, stabilizata de proteinele laptelui." }
    ]
  }
};

window.openDetail = (key) => {
  const data = reactionDetails[key];
  const overlay = document.getElementById("detailOverlay");
  const body = document.getElementById("detailBody");

  if (!data || !overlay || !body) {
    return;
  }

  body.innerHTML = `
    <div class="detail-header">
      <h2>${data.title}</h2>
      <span class="section-tag">Explicatie detaliata</span>
    </div>
    <div class="detail-image-container">
      ${buildDetailImageHtml(data)}
    </div>
    <div class="detail-body">
      <p>${data.description}</p>
      <h3>Exemple practice</h3>
      <div class="detail-examples">
        ${data.examples
          .map(
            (example) => `
              <div class="detail-example-card">
                <h4>${example.name}</h4>
                <p>${example.text}</p>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
};

window.closeDetail = () => {
  const overlay = document.getElementById("detailOverlay");

  if (!overlay) {
    return;
  }

  overlay.classList.remove("open");
  document.body.style.overflow = "";
};

document.getElementById("detailOverlay")?.addEventListener("click", (event) => {
  if (event.target.id === "detailOverlay") {
    closeDetail();
  }
});

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const navbar = document.querySelector(".navbar");
const parallaxElements = Array.from(document.querySelectorAll("[data-parallax]"));
const pageName = document.body.dataset.page;
const navLinks = Array.from(document.querySelectorAll(".nav-link[data-page]"));

const GOOGLE_TRANSLATE_LANGS = "ro|en";

const setGoogleComboLanguage = (lang) => {
  const combo = document.querySelector(".goog-te-combo");
  if (!(combo instanceof HTMLSelectElement)) {
    return false;
  }

  combo.value = lang;
  combo.dispatchEvent(new Event("change"));
  return true;
};

const ensureGoogleTranslate = () => {
  if (document.getElementById("google_translate_element")) {
    return;
  }

  const mount = document.createElement("div");
  mount.id = "google_translate_element";
  mount.setAttribute("aria-hidden", "true");
  document.body.append(mount);

  window.googleTranslateElementInit = () => {
    if (!(window.google && window.google.translate && window.google.translate.TranslateElement)) {
      return;
    }

    new window.google.translate.TranslateElement(
      {
        pageLanguage: "ro",
        includedLanguages: GOOGLE_TRANSLATE_LANGS,
        autoDisplay: false
      },
      "google_translate_element"
    );
  };

  if (!document.querySelector('script[src*="translate.google.com/translate_a/element.js"]')) {
    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.append(script);
  }
};

const applySiteLanguage = (language) => {
  const lang = language === "en" ? "en" : "ro";
  document.documentElement.lang = lang;
  localStorage.setItem("site-language", lang);
  document.body.dataset.lang = lang;

  document.querySelectorAll(".lang-switch-btn").forEach((button) => {
    const isActive = button.dataset.langValue === lang;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  const applied = setGoogleComboLanguage(lang);
  if (!applied) {
    let tries = 0;
    const interval = window.setInterval(() => {
      tries += 1;
      if (setGoogleComboLanguage(lang) || tries > 24) {
        window.clearInterval(interval);
      }
    }, 250);
  }
};

const mountLanguageSwitcher = () => {
  const navInner = document.querySelector(".nav-inner");
  if (!navInner || document.querySelector(".lang-switch")) {
    return;
  }

  const switcher = document.createElement("div");
  switcher.className = "lang-switch";
  switcher.innerHTML = `
    <button class="lang-switch-btn" data-lang-value="ro" type="button" aria-pressed="false">RO</button>
    <button class="lang-switch-btn" data-lang-value="en" type="button" aria-pressed="false">EN</button>
  `;

  navInner.append(switcher);

  switcher.addEventListener("click", (event) => {
    const target = event.target;
    const trigger = target instanceof Element ? target.closest("[data-lang-value]") : null;
    if (!trigger) {
      return;
    }
    applySiteLanguage(trigger.dataset.langValue);
  });
};

document.documentElement.classList.add("js-enhanced");
mountLanguageSwitcher();
ensureGoogleTranslate();
applySiteLanguage(localStorage.getItem("site-language") || "ro");

const scrollProgress = document.createElement("div");
scrollProgress.className = "scroll-progress";
scrollProgress.setAttribute("aria-hidden", "true");
document.body.prepend(scrollProgress);

const modernToast = document.createElement("div");
modernToast.className = "modern-toast";
modernToast.setAttribute("role", "status");
modernToast.setAttribute("aria-live", "polite");
document.body.append(modernToast);

let toastTimeout = null;

const showModernToast = (message) => {
  modernToast.textContent = message;
  modernToast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    modernToast.classList.remove("is-visible");
  }, 2600);
};

const updatePageProgress = () => {
  const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableDistance > 0 ? window.scrollY / scrollableDistance : 0;
  document.documentElement.style.setProperty("--scroll-progress", String(Math.max(0, Math.min(1, progress))));
};

window.addEventListener("scroll", updatePageProgress, { passive: true });
window.addEventListener("resize", updatePageProgress);
updatePageProgress();

window.addEventListener("pointermove", (event) => {
  document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
}, { passive: true });

window.addEventListener("pointerdown", (event) => {
  const burst = document.createElement("span");
  burst.className = "chem-burst";
  burst.style.setProperty("--burst-x", `${event.clientX}px`);
  burst.style.setProperty("--burst-y", `${event.clientY}px`);
  document.body.append(burst);
  window.setTimeout(() => burst.remove(), 820);
}, { passive: true });

const localLinks = Array.from(document.querySelectorAll("a[href]"))
  .map((link) => link.getAttribute("href"))
  .filter((href) => href && !href.startsWith("#") && !href.startsWith("http") && !href.startsWith("mailto:"));

const duplicateLocalLinks = localLinks.filter((href, index) => localLinks.indexOf(href) !== index);

if (duplicateLocalLinks.length && window.location.protocol === "file:") {
  console.info("Structura locala verificata: linkurile interne sunt folosite in mai multe zone de navigare.", [...new Set(duplicateLocalLinks)]);
}

const finaleData = {
  home: {
    intro: {
      kicker: "Mini rezumat",
      title: "Tot proiectul intr-un traseu de prezentare",
      text: "Pornesti de la un fenomen observabil, explici moleculele implicate, demonstrezi prin simulator si inchei cu baza de date pentru aditivi."
    },
    panel: `
      <div class="finale-steps">
        <span>1. Observa alimentul</span>
        <span>2. Explica procesul chimic</span>
        <span>3. Cauta aditivul relevant</span>
        <span>4. Leaga totul de surse</span>
      </div>
    `
  },
  concepte: {
    intro: {
      kicker: "Quiz rapid",
      title: "Verifica daca ai prins ideea de baza",
      text: "Un test scurt, gandit pentru public: raspuns imediat, explicatie clara si fara presiune."
    },
    quiz: {
      question: "Ce componenta influenteaza puternic dizolvarea, textura si viteza unor reactii?",
      options: [
        { text: "Apa", correct: true },
        { text: "Ambalajul", correct: false },
        { text: "Lumina din sala", correct: false }
      ],
      success: "Corect. Apa este mediul in care se dizolva substante si in care au loc multe interactiuni chimice.",
      fail: "Raspunsul corect este apa. Ea influenteaza dizolvarea, textura si multe reactii din alimente."
    }
  },
  reactii: {
    intro: {
      kicker: "Quiz de reactie",
      title: "Alege procesul potrivit",
      text: "Sistemul fixeaza diferenta dintre procesele care pot parea asemanatoare la prima vedere."
    },
    quiz: {
      question: "Ce proces explica brunificarea painii la temperatura ridicata?",
      options: [
        { text: "Reacția Maillard", correct: true },
        { text: "Emulsificarea", correct: false },
        { text: "Dizolvarea", correct: false }
      ],
      success: "Corect. Reacția Maillard implica aminoacizi si zaharuri reducatoare si produce culoare si aroma.",
      fail: "Raspunsul corect este Reacția Maillard, nu emulsificarea sau simpla dizolvare."
    }
  },
  formule: {
    intro: {
      kicker: "Sistem formula",
      title: "Citeste formula ca pe o harta",
      text: "Pagina se incheie cu o ancora vizuala: identifici grupa functionala, apoi legi formula de alimentul real."
    },
    panel: `
      <div class="formula-molecule"><strong>HOOC-CH2-C(OH)(COOH)-CH2-COOH</strong></div>
      <div class="formula-console">
        <span>3 grupe carboxil: acid citric</span>
        <span>1 grupa hidroxil: influenteaza proprietatile</span>
        <span>Exemplu real: citrice si bauturi acidulate</span>
      </div>
    `
  }
};

const buildQuizFinale = (quiz) => `
  <div class="smart-quiz" data-smart-quiz>
    <p class="smart-quiz-question">${quiz.question}</p>
    <div class="smart-quiz-options">
      ${quiz.options
        .map((option) => `<button type="button" data-smart-correct="${option.correct}">${option.text}</button>`)
        .join("")}
    </div>
    <p class="smart-quiz-result" data-smart-result>Alege un raspuns.</p>
  </div>
`;

const mountPageFinale = () => {
  const config = finaleData[pageName];
  const main = document.querySelector("main");

  if (!config || !main || document.querySelector(".page-finale")) {
    return;
  }

  const section = document.createElement("section");
  section.className = "page-finale";
  section.innerHTML = `
    <div class="container finale-shell">
      <div class="finale-intro">
        <span class="finale-kicker">${config.intro.kicker}</span>
        <h2>${config.intro.title}</h2>
        <p>${config.intro.text}</p>
      </div>
      <div class="finale-panel">
        ${config.quiz ? buildQuizFinale(config.quiz) : config.panel}
      </div>
    </div>
  `;

  main.append(section);
};

mountPageFinale();

document.addEventListener("click", (event) => {
  const target = event.target;
  const button = target instanceof Element ? target.closest("[data-smart-correct]") : null;

  if (!button) {
    return;
  }

  const quiz = button.closest("[data-smart-quiz]");
  const result = quiz?.querySelector("[data-smart-result]");
  const isCorrect = button.getAttribute("data-smart-correct") === "true";
  const pageConfig = finaleData[pageName];

  quiz?.querySelectorAll("[data-smart-correct]").forEach((option) => {
    option.classList.remove("is-correct", "is-wrong");
  });

  button.classList.add(isCorrect ? "is-correct" : "is-wrong");

  if (result && pageConfig?.quiz) {
    result.textContent = isCorrect ? pageConfig.quiz.success : pageConfig.quiz.fail;
  }
});


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

if (pageName === "resurse") {
  const bibliographyButtons = Array.from(document.querySelectorAll("[data-bibliography-filter]"));
  const bibliographyPanels = Array.from(document.querySelectorAll("[data-bibliography-panel]"));

  const applyBibliographyFilter = (filter) => {
    bibliographyButtons.forEach((button) => {
      const isActive = button.dataset.bibliographyFilter === filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    bibliographyPanels.forEach((panel) => {
      const shouldShow = filter === "toate" || panel.dataset.bibliographyPanel === filter;
      panel.hidden = !shouldShow;
    });

    requestScrollMotionUpdate();
  };

  bibliographyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyBibliographyFilter(button.dataset.bibliographyFilter ?? "toate");
    });
  });

  applyBibliographyFilter("toate");
}

if (navbar) {
  window.addEventListener("scroll", () => {
    navbar.style.boxShadow = window.scrollY > 10 ? "0 10px 28px rgba(8, 52, 41, 0.08)" : "none";
  });
}

window.addEventListener("scroll", requestScrollMotionUpdate, { passive: true });
window.addEventListener("resize", requestScrollMotionUpdate);
requestScrollMotionUpdate();

const revealTargets = Array.from(
  document.querySelectorAll(
    ".section-header, .feature-card, .detail-card, .timeline-card, .case-card, .info-card, .qa-card, .photo-card, .definition-row, .topic-row, .visual-card, .highlight-strip, .quote-panel, .additive-search-card, .hero-search-box, .additive-result-card"
  )
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal-ready");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 55}ms`);
    revealObserver.observe(element);
  });
} else {
  revealTargets.forEach((element) => {
    element.classList.add("is-visible");
  });
}

document
  .querySelectorAll(".feature-card, .detail-card, .timeline-card, .case-card, .info-card, .photo-card, .additive-result-card")
  .forEach((card) => {
    card.classList.add("tilt-ready");

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-x", `${(-relativeY * 5).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(relativeX * 5).toFixed(2)}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });

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

document.querySelectorAll(".hero, .page-hero").forEach((hero, heroIndex) => {
  if (!hero.querySelector(".chem-canvas")) {
    const canvas = document.createElement("canvas");
    canvas.className = "chem-canvas";
    canvas.setAttribute("aria-hidden", "true");
    hero.prepend(canvas);
  }

  const chemCanvas = hero.querySelector(".chem-canvas");

  if (!(chemCanvas instanceof HTMLCanvasElement)) {
    return;
  }

  const context = chemCanvas.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let particles = [];
  let animationFrameId = null;

  const resizeCanvas = () => {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const rect = chemCanvas.getBoundingClientRect();
    chemCanvas.width = Math.max(1, Math.floor(rect.width * pixelRatio));
    chemCanvas.height = Math.max(1, Math.floor(rect.height * pixelRatio));
    chemCanvas.dataset.pixelRatio = String(pixelRatio);

    const particleCount = Math.max(28, Math.min(74, Math.floor(rect.width / 20)));
    particles = Array.from({ length: particleCount }, (_, index) => ({
      x: Math.random() * chemCanvas.width,
      y: Math.random() * chemCanvas.height,
      radius: (index % 5 === 0 ? 3.8 : 2.2) * pixelRatio,
      vx: (Math.random() - 0.5) * 0.28 * pixelRatio,
      vy: (Math.random() - 0.5) * 0.28 * pixelRatio,
      hue: (index + heroIndex) % 3
    }));
  };

  const drawChemCanvas = () => {
    if (!context) {
      return;
    }

    const width = chemCanvas.width;
    const height = chemCanvas.height;
    const pixelRatio = Number(chemCanvas.dataset.pixelRatio || 1);

    context.clearRect(0, 0, width, height);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > width) {
        particle.vx *= -1;
      }

      if (particle.y < 0 || particle.y > height) {
        particle.vy *= -1;
      }

      for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
        const nextParticle = particles[nextIndex];
        const dx = particle.x - nextParticle.x;
        const dy = particle.y - nextParticle.y;
        const distance = Math.hypot(dx, dy);
        const linkDistance = 145 * pixelRatio;

        if (distance < linkDistance) {
          context.strokeStyle = `rgba(201, 241, 226, ${0.2 - distance / linkDistance / 5})`;
          context.lineWidth = 1 * pixelRatio;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(nextParticle.x, nextParticle.y);
          context.stroke();
        }
      }

      const colors = ["rgba(201, 241, 226, 0.82)", "rgba(33, 212, 253, 0.72)", "rgba(245, 225, 191, 0.78)"];
      context.fillStyle = colors[particle.hue];
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    });

    if (!reducedMotion) {
      animationFrameId = requestAnimationFrame(drawChemCanvas);
    }
  };

  resizeCanvas();
  drawChemCanvas();

  window.addEventListener("resize", () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    resizeCanvas();
    drawChemCanvas();
  });
});

const phSlider = document.getElementById("phSlider");
const phReadout = document.getElementById("phReadout");
const phResult = document.getElementById("phResult");

const updatePhSimulator = () => {
  if (!(phSlider instanceof HTMLInputElement) || !phReadout || !phResult) {
    return;
  }

  const phValue = Number(phSlider.value);
  phReadout.textContent = `pH ${phValue.toFixed(1)}`;

  if (phValue < 4) {
    phResult.textContent = "Acid puternic: potrivit pentru exemple precum lamaia, otetul si oprirea oxidarii la fructe.";
    phResult.style.background = "rgba(255, 107, 87, 0.14)";
    return;
  }

  if (phValue < 6.8) {
    phResult.textContent = "Usor acid: zona multor alimente fermentate, unde gustul si conservarea se modifica vizibil.";
    phResult.style.background = "rgba(245, 225, 191, 0.72)";
    return;
  }

  if (phValue <= 7.4) {
    phResult.textContent = "Neutru: potrivit pentru a explica apa si solutiile simple.";
    phResult.style.background = "rgba(223, 244, 234, 0.62)";
    return;
  }

  phResult.textContent = "Bazic: util pentru discutii despre textura, proteine si schimbari de culoare la pigmenti.";
  phResult.style.background = "rgba(232, 240, 255, 0.9)";
};

phSlider?.addEventListener("input", updatePhSimulator);
updatePhSimulator();

const foodScannerData = {
  paine: {
    title: "Paine ambalata",
    text: "Cauta emulsificatori, conservanti si zaharuri. Leaga fiecare ingredient de textura si termenul de valabilitate.",
    tags: ["E300", "E471", "gluten"]
  },
  suc: {
    title: "Suc colorat",
    text: "Identifica acidifiantii, colorantii si indulcitorii. Este un exemplu bun pentru pH, aroma si perceptia gustului.",
    tags: ["acid citric", "coloranti", "zaharuri"]
  },
  iaurt: {
    title: "Iaurt cu fructe",
    text: "Explica fermentatia lactica, stabilizatorii si rolul pectinei in textura fina a produsului.",
    tags: ["fermentatie", "pectina", "proteine"]
  }
};

const scannerTabs = document.getElementById("foodScannerTabs");
const scannerTitle = document.getElementById("scannerTitle");
const scannerText = document.getElementById("scannerText");
const scannerTags = document.getElementById("scannerTags");

scannerTabs?.addEventListener("click", (event) => {
  const target = event.target;
  const trigger = target instanceof Element ? target.closest("[data-food-scan]") : null;

  if (!trigger || !scannerTitle || !scannerText || !scannerTags) {
    return;
  }

  const nextKey = trigger.dataset.foodScan;
  const nextData = foodScannerData[nextKey];

  if (!nextData) {
    return;
  }

  scannerTabs.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("is-active", button === trigger);
  });

  scannerTitle.textContent = nextData.title;
  scannerText.textContent = nextData.text;
  scannerTags.innerHTML = nextData.tags.map((tag) => `<span>${tag}</span>`).join("");
});

const quizOptions = document.getElementById("quizOptions");
const quizResult = document.getElementById("quizResult");

quizOptions?.addEventListener("click", (event) => {
  const target = event.target;
  const selected = target instanceof Element ? target.closest("button") : null;

  if (!selected || !quizResult) {
    return;
  }

  quizOptions.querySelectorAll("button").forEach((button) => {
    button.classList.remove("is-correct", "is-wrong");
  });

  const isCorrect = selected.dataset.correct === "true";
  selected.classList.add(isCorrect ? "is-correct" : "is-wrong");
  quizResult.textContent = isCorrect
    ? "Corect. Reacția Maillard apare între aminoacizi și zaharuri reducătoare la temperatură ridicată."
    : "Aproape, dar aici răspunsul corect este Reacția Maillard, responsabilă pentru crustă și aroma de copt.";
});

document.getElementById("presenterModeBtn")?.addEventListener("click", () => {
  document.body.classList.toggle("presentation-mode");
  const isActive = document.body.classList.contains("presentation-mode");
  document.getElementById("presenterModeBtn").textContent = isActive ? "Iesi din prezentare" : "Mod prezentare";
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
const additiveSuggestionPanel = document.getElementById("additiveSuggestionPanel");
const additiveSuggestionList = document.getElementById("additiveSuggestionList");
const additiveSuggestionStatus = document.getElementById("additiveSuggestionStatus");
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
const getAdditiveCodeNumber = (code) => Number.parseInt(String(code).replace(/^\D+/u, ""), 10) || 0;

const orderedAdditives = [...additivesData].sort((left, right) => {
  const numberDiff = getAdditiveCodeNumber(left.code) - getAdditiveCodeNumber(right.code);

  if (numberDiff !== 0) {
    return numberDiff;
  }

  return left.code.localeCompare(right.code) || left.name.localeCompare(right.name);
});

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

const getPredictiveAdditives = (rawQuery) => {
  const normalizedCode = normalizeCodeQuery(rawQuery);
  const normalizedText = normalizeQuery(rawQuery).toLowerCase();

  if (!normalizedCode || normalizedCode === "E") {
    return orderedAdditives;
  }

  if (/^E\d+$/u.test(normalizedCode)) {
    return orderedAdditives.filter((additive) => additive.code.toUpperCase().startsWith(normalizedCode));
  }

  if (/^\d+$/u.test(normalizedCode)) {
    return orderedAdditives.filter((additive) => additive.code.toUpperCase().startsWith(`E${normalizedCode}`));
  }

  return orderedAdditives.filter((additive) => {
    const name = additive.name.toLowerCase();
    const type = additive.type.toLowerCase();
    return name.includes(normalizedText) || type.includes(normalizedText);
  });
};

const showAdditiveSuggestions = () => {
  if (additiveSuggestionPanel) {
    additiveSuggestionPanel.hidden = false;
  }
};

const hideAdditiveSuggestions = () => {
  if (additiveSuggestionPanel) {
    additiveSuggestionPanel.hidden = true;
  }
};

const renderPredictiveList = (rawQuery) => {
  if (!additiveSuggestionList || !additiveSuggestionStatus) {
    return;
  }

  const normalizedCode = normalizeCodeQuery(rawQuery);
  const suggestions = getPredictiveAdditives(rawQuery);
  const numericPrefix = normalizedCode.startsWith("E") ? normalizedCode.slice(1) : normalizedCode;
  let statusMessage = `Lista completa ordonata: ${suggestions.length} aditivi.`;

  if (!normalizedCode || normalizedCode === "E") {
    statusMessage = `Lista completa ordonata: ${suggestions.length} aditivi.`;
  } else if ((normalizedCode.startsWith("E") || /^\d+$/u.test(normalizedCode)) && /^\d+$/u.test(numericPrefix)) {
    statusMessage = `Prefix numeric ${numericPrefix}: ${suggestions.length} potriviri.`;
  } else {
    statusMessage = `Potriviri text: ${suggestions.length}.`;
  }

  additiveSuggestionStatus.textContent = statusMessage;
  showAdditiveSuggestions();

  if (!suggestions.length) {
    additiveSuggestionList.innerHTML = `<div class="additive-suggestion-empty">Nu exista aditivi pentru acest prefix.</div>`;
    return;
  }

  additiveSuggestionList.innerHTML = suggestions
    .map(
      (additive) => `
        <button class="additive-suggestion-item" type="button" data-additive-suggestion="${escapeHtml(additive.code)}" role="option">
          <span class="additive-suggestion-code">${escapeHtml(additive.code)}</span>
          <span class="additive-suggestion-name">${escapeHtml(additive.name)}</span>
        </button>
      `
    )
    .join("");
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
    renderPredictiveList("");
    renderAdditiveEmptyState("Alege un aditiv din lista", "Lista este ordonata dupa cod. Scrie E si apoi cifre pentru a restrange sugestiile.");
    updateAdditiveMeta(`Baza de date contine ${additivesData.length} aditivi.`);
    return;
  }

  const matches = findAdditiveMatches(query);

  if (!matches.length) {
    renderAdditiveEmptyState("Nu am gasit acest aditiv", `Nu exista potriviri pentru "${query}". Incearca un alt cod sau un alt nume.`);
    updateAdditiveMeta(`Nu exista potriviri pentru "${query}".`);
    showModernToast(`Nu exista potriviri pentru "${query}".`);
    return;
  }

  renderAdditiveResult(matches[0], matches, query);
  showModernToast(matches.length === 1 ? `Gasit: ${matches[0].code} - ${matches[0].name}` : `${matches.length} potriviri gasite pentru "${query}".`);
};

if (additiveSearchForm && additiveSearchInput && additiveResult) {
  const openPredictiveList = () => {
    renderPredictiveList(additiveSearchInput.value);
  };

  const handleAdditiveSelection = (nextQuery) => {
    additiveSearchInput.value = nextQuery;
    runAdditiveSearch(nextQuery);
    renderPredictiveList(nextQuery);
    hideAdditiveSuggestions();
    additiveSearchInput.focus();
  };

  const handleAdditiveQuickSelect = (event) => {
    const trigger = event.target.closest("[data-additive-example], [data-additive-code], [data-additive-suggestion]");

    if (!trigger) {
      return;
    }

    const nextQuery =
      trigger.dataset.additiveExample ??
      trigger.dataset.additiveCode ??
      trigger.dataset.additiveSuggestion ??
      "";

    handleAdditiveSelection(nextQuery);
  };

  additiveSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    runAdditiveSearch(additiveSearchInput.value);
  });

  additiveSearchInput.addEventListener("focus", openPredictiveList);
  additiveSearchInput.addEventListener("click", openPredictiveList);
  additiveSearchInput.addEventListener("input", openPredictiveList);
  additiveSearchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideAdditiveSuggestions();
    }
  });

  document.getElementById("additiveExamples")?.addEventListener("click", handleAdditiveQuickSelect);
  additiveResult.addEventListener("click", handleAdditiveQuickSelect);
  additiveSuggestionList?.addEventListener("click", handleAdditiveQuickSelect);

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (
      target instanceof Node &&
      additiveSuggestionPanel &&
      !additiveSuggestionPanel.contains(target) &&
      !additiveSearchForm.contains(target)
    ) {
      hideAdditiveSuggestions();
    }
  });

  const initialQuery = "E100";
  additiveSearchInput.value = initialQuery;
  runAdditiveSearch(initialQuery);
}
