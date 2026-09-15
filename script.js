/* =========================================================
   MOBILE MENU
========================================================= */

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menu?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menu.classList.toggle("is-open", isOpen);

  menu.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  menu.setAttribute(
    "aria-label",
    isOpen
      ? "Fermer le menu"
      : "Ouvrir le menu"
  );
});


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING A LINK
========================================================= */

nav?.querySelectorAll("a").forEach((link) => {

  link.addEventListener("click", () => {

    nav.classList.remove("open");

    menu?.classList.remove("is-open");

    menu?.setAttribute(
      "aria-expanded",
      "false"
    );

    menu?.setAttribute(
      "aria-label",
      "Ouvrir le menu"
    );

  });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);


document
  .querySelectorAll(".reveal")
  .forEach((element) => {

    observer.observe(element);

  });


/* =========================================================
   DYNAMIC YEAR
========================================================= */

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(
  '.nav a[href^="#"]'
);


const sectionObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (!entry.isIntersecting) {
        return;
      }

      const currentId =
        entry.target.getAttribute("id");

      navLinks.forEach((link) => {

        link.classList.remove("active");

        const target =
          link.getAttribute("href");

        if (target === `#${currentId}`) {
          link.classList.add("active");
        }

      });

    });

  },
  {
    threshold: 0.35
  }
);


sections.forEach((section) => {
  sectionObserver.observe(section);
});


/* =========================================================
   MOUSE PARALLAX ON HERO PANEL
========================================================= */

const heroVisual =
  document.querySelector(".hero-visual");

const dataPanel =
  document.querySelector(".data-panel");


if (heroVisual && dataPanel) {

  heroVisual.addEventListener(
    "mousemove",
    (event) => {

      const rect =
        heroVisual.getBoundingClientRect();

      const x =
        (event.clientX - rect.left)
        / rect.width
        - 0.5;

      const y =
        (event.clientY - rect.top)
        / rect.height
        - 0.5;

      dataPanel.style.transform = `
        perspective(1000px)
        rotateY(${x * 8 - 2}deg)
        rotateX(${y * -6}deg)
        translateY(-4px)
      `;

    }
  );


  heroVisual.addEventListener(
    "mouseleave",
    () => {

      dataPanel.style.transform = `
        perspective(1000px)
        rotateY(-5deg)
        rotateX(3deg)
        translateY(0)
      `;

    }
  );

}


/* =========================================================
   PROJECT CARD TILT
========================================================= */

const projectCards =
  document.querySelectorAll(".project-card");


projectCards.forEach((card) => {

  card.addEventListener(
    "mousemove",
    (event) => {

      if (window.innerWidth < 1000) {
        return;
      }

      const rect =
        card.getBoundingClientRect();

      const x =
        (event.clientX - rect.left)
        / rect.width
        - 0.5;

      const y =
        (event.clientY - rect.top)
        / rect.height
        - 0.5;

      card.style.transform = `
        translateY(-8px)
        rotateX(${y * -1.5}deg)
        rotateY(${x * 1.5}deg)
      `;

    }
  );


  card.addEventListener(
    "mouseleave",
    () => {

      card.style.transform = "";

    }
  );

});


/* =========================================================
   BUTTON RIPPLE EFFECT
========================================================= */

const buttons =
  document.querySelectorAll(".btn");


buttons.forEach((button) => {

  button.addEventListener(
    "click",
    function (event) {

      const rect =
        button.getBoundingClientRect();

      const ripple =
        document.createElement("span");

      ripple.classList.add("ripple");

      ripple.style.left =
        `${event.clientX - rect.left}px`;

      ripple.style.top =
        `${event.clientY - rect.top}px`;

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);

    }
  );

});


/* =========================================================
   LINKEDIN BUTTON TRACKING FEEDBACK
========================================================= */

const linkedinLinks =
  document.querySelectorAll(
    'a[href*="linkedin.com"]'
  );


linkedinLinks.forEach((link) => {

  link.addEventListener(
    "mouseenter",
    () => {

      link.style.setProperty(
        "--linkedin-hover",
        "1"
      );

    }
  );

});


/* =========================================================
   SMOOTH HOVER FOR TAGS
========================================================= */

const tags =
  document.querySelectorAll(
    ".project-tags span, .skill-list span"
  );


tags.forEach((tag) => {

  tag.addEventListener(
    "mouseenter",
    () => {

      tag.style.transform =
        "translateY(-3px) scale(1.03)";

    }
  );


  tag.addEventListener(
    "mouseleave",
    () => {

      tag.style.transform = "";

    }
  );

});


/* =========================================================
   CONTACT EMAIL MICRO-INTERACTION
========================================================= */

const emailLink =
  document.querySelector(".contact-email");


emailLink?.addEventListener(
  "click",
  () => {

    emailLink.classList.add("clicked");

    setTimeout(() => {

      emailLink.classList.remove("clicked");

    }, 500);

  }
);


/* =========================================================
   LANGUAGE SWITCH — FR / EN
========================================================= */

const languageButtons = document.querySelectorAll(".language-button");

const translations = {
  "nav.about": { fr: "À propos", en: "About" },
  "nav.projects": { fr: "Projets", en: "Projects" },
  "nav.skills": { fr: "Compétences", en: "Skills" },
  "nav.contact": { fr: "Contact", en: "Contact" },
  "nav.linkedin": { fr: "LinkedIn", en: "LinkedIn" },

  "hero.badge": {
    fr: "Data · IA · Machine Learning · Computer Vision",
    en: "Data · AI · Machine Learning · Computer Vision"
  },
  "hero.kicker": {
    fr: "PORTFOLIO — SALAH DJESSAS",
    en: "PORTFOLIO — SALAH DJESSAS"
  },
  "hero.title": {
    fr: 'Transformer les <span class="gradient-text">données</span> en décisions utiles.',
    en: 'Turning <span class="gradient-text">data</span> into meaningful decisions.'
  },
  "hero.description": {
    fr: 'Je conçois des solutions intelligentes à partir de données, en combinant <strong>Data Science</strong>, <strong>Machine Learning</strong>, <strong>Vision par ordinateur</strong> et <strong>développement logiciel</strong>.',
    en: 'I design intelligent solutions from data, combining <strong>Data Science</strong>, <strong>Machine Learning</strong>, <strong>Computer Vision</strong> and <strong>software development</strong>.'
  },
  "hero.cta.projects": {
    fr: 'Découvrir mes projets <span>↓</span>',
    en: 'Explore my projects <span>↓</span>'
  },
  "hero.cta.linkedin": {
    fr: '<span class="linkedin-icon">in</span> Mon LinkedIn <span>↗</span>',
    en: '<span class="linkedin-icon">in</span> My LinkedIn <span>↗</span>'
  },
  "hero.meta.experiences": {
    fr: "Expériences & projets",
    en: "Experiences & projects"
  },
  "hero.meta.ml": { fr: "Machine Learning", en: "Machine Learning" },
  "hero.meta.cv": { fr: "Vision par ordinateur", en: "Computer Vision" },
  "hero.scroll": { fr: "Scroll pour explorer", en: "Scroll to explore" },

  "about.eyebrow": { fr: "01 — À PROPOS", en: "01 — ABOUT" },
  "about.title": {
    fr: 'Une approche à la croisée de <span class="gradient-text">l\'IA et du logiciel.</span>',
    en: 'An approach at the intersection of <span class="gradient-text">AI and software.</span>'
  },
  "about.subtitle": {
    fr: "Mon parcours combine développement logiciel, Data Science, Machine Learning et vision par ordinateur avec une approche orientée vers la conception de solutions concrètes.",
    en: "My background combines software development, Data Science, Machine Learning and computer vision with a focus on building concrete solutions."
  },
  "about.p1": {
    fr: "À travers mes expériences et projets, j'ai travaillé sur des problématiques allant de l'analyse et la préparation de données jusqu'à la conception de modèles prédictifs et de systèmes intelligents.",
    en: "Through my experiences and projects, I have worked on challenges ranging from data analysis and preparation to the design of predictive models and intelligent systems."
  },
  "about.p2": {
    fr: 'Mes travaux couvrent notamment la <strong>détection d\'événements à partir de flux vidéo</strong>, la <strong>modélisation prédictive</strong>, la <strong>recherche documentaire</strong> et le <strong>développement d\'applications web</strong>.',
    en: 'My work notably covers <strong>event detection from video streams</strong>, <strong>predictive modeling</strong>, <strong>document search</strong> and <strong>web application development</strong>.'
  },
  "about.p3": {
    fr: "L'objectif est toujours le même : transformer une problématique métier ou opérationnelle en une solution exploitable, mesurable et compréhensible.",
    en: "The goal is always the same: turning a business or operational challenge into a usable, measurable and understandable solution."
  },

  "about.fact1.title": { fr: "Data Science", en: "Data Science" },
  "about.fact1.desc": {
    fr: "Analyse, préparation et valorisation des données.",
    en: "Data analysis, preparation and value creation."
  },
  "about.fact2.title": { fr: "Machine Learning", en: "Machine Learning" },
  "about.fact2.desc": {
    fr: "Modélisation prédictive et évaluation des modèles.",
    en: "Predictive modeling and model evaluation."
  },
  "about.fact3.title": { fr: "Computer Vision", en: "Computer Vision" },
  "about.fact3.desc": {
    fr: "Analyse de données visuelles et flux vidéo.",
    en: "Visual data and video stream analysis."
  },
  "about.fact4.title": { fr: "Software Engineering", en: "Software Engineering" },
  "about.fact4.desc": {
    fr: "Conception et intégration de solutions applicatives.",
    en: "Design and integration of software solutions."
  },

  "projects.eyebrow": {
    fr: "02 — PROJETS & EXPÉRIENCES",
    en: "02 — PROJECTS & EXPERIENCE"
  },
  "projects.title": {
    fr: 'Des problématiques concrètes, <span class="gradient-text">des solutions intelligentes.</span>',
    en: 'Real-world challenges, <span class="gradient-text">intelligent solutions.</span>'
  },
  "projects.subtitle": {
    fr: "De la vision par ordinateur à la modélisation prédictive, chaque expérience m'a permis de travailler sur une étape différente de la chaîne de valeur de la donnée.",
    en: "From computer vision to predictive modeling, each experience allowed me to work on a different stage of the data value chain."
  },

  /* Project 1 */
  "project1.type": {
    fr: "VISION PAR ORDINATEUR · DEEP LEARNING",
    en: "COMPUTER VISION · DEEP LEARNING"
  },
  "project1.title": {
    fr: "Solution IA de détection précoce des chutes et malaises",
    en: "AI solution for early detection of falls and medical incidents"
  },
  "project1.company": {
    fr: "Établissement hospitalier privé LA COLOMBE · Stage",
    en: "LA COLOMBE Private Hospital · Internship"
  },
  "project1.date": {
    fr: "févr. 2026 — juil. 2026 · 6 mois · Hybride",
    en: "Feb. 2026 — Jul. 2026 · 6 months · Hybrid"
  },
  "project1.badge": { fr: "STAGE", en: "INTERNSHIP" },
  "project1.intro": {
    fr: "Conception et développement d'une solution intelligente destinée à détecter précocement des situations potentiellement à risque à partir de flux vidéo capturant uniquement le squelette de la personne.",
    en: "Design and development of an intelligent solution for early detection of potentially risky situations from video streams capturing only the person's skeleton."
  },
  "project1.mission.title": { fr: "Mission", en: "Mission" },
  "project1.mission.desc": {
    fr: "Développer une approche combinant vision par ordinateur et Deep Learning afin d'analyser les mouvements et les comportements d'une personne.",
    en: "Develop an approach combining computer vision and Deep Learning to analyze a person's movements and behavior."
  },
  "project1.work.title": { fr: "Travaux réalisés", en: "Work carried out" },
  "project1.work.1": { fr: "Mise en place d'un pipeline de traitement vidéo.", en: "Built a video processing pipeline." },
  "project1.work.2": { fr: "Analyse des mouvements et comportements.", en: "Analyzed movements and behavior." },
  "project1.work.3": { fr: "Détection de déséquilibres et événements anormaux.", en: "Detected imbalances and abnormal events." },
  "project1.work.4": { fr: "Évaluation du risque de chute ou de malaise.", en: "Assessed fall or medical-incident risk." },
  "project1.work.5": { fr: "Expérimentation et évaluation des performances.", en: "Experimented with and evaluated model performance." },
  "project1.visual.analysis": { fr: "Analyse comportementale", en: "Behavioral analysis" },

  /* Project 2 */
  "project2.type": {
    fr: "DATA SCIENCE · MODÉLISATION PRÉDICTIVE",
    en: "DATA SCIENCE · PREDICTIVE MODELING"
  },
  "project2.title": {
    fr: "Système d'aide à la décision pour la prévention des incendies",
    en: "Decision support system for wildfire prevention"
  },
  "project2.company": {
    fr: "Direction Générale des Forêts (DGF) · Stage",
    en: "General Directorate of Forests (DGF) · Internship"
  },
  "project2.date": {
    fr: "sept. 2025 — janv. 2026 · 5 mois",
    en: "Sep. 2025 — Jan. 2026 · 5 months"
  },
  "project2.badge": { fr: "STAGE", en: "INTERNSHIP" },
  "project2.intro": {
    fr: "Conception d'une solution prédictive destinée à améliorer la prévention des risques d'incendie et à faciliter la priorisation des interventions préventives.",
    en: "Designed a predictive solution to improve wildfire risk prevention and prioritize preventive interventions."
  },
  "project2.mission.title": { fr: "Mission", en: "Mission" },
  "project2.mission.desc": {
    fr: "Exploiter des données géospatiales et environnementales afin d'identifier les facteurs associés au risque d'incendie et produire des indicateurs permettant d'orienter la prise de décision.",
    en: "Leverage geospatial and environmental data to identify factors associated with wildfire risk and produce indicators to guide decision-making."
  },
  "project2.work.title": { fr: "Travaux réalisés", en: "Work carried out" },
  "project2.work.1": { fr: "Collecte et préparation de données géospatiales.", en: "Collected and prepared geospatial data." },
  "project2.work.2": { fr: "Analyse de données environnementales.", en: "Analyzed environmental data." },
  "project2.work.3": { fr: "Identification des principaux facteurs de risque.", en: "Identified the main risk factors." },
  "project2.work.4": { fr: "Modélisation prédictive du niveau de risque.", en: "Built predictive models of risk levels." },
  "project2.work.5": { fr: "Cartographie des zones sensibles.", en: "Mapped high-risk areas." },
  "project2.work.6": { fr: "Priorisation des interventions préventives.", en: "Prioritized preventive interventions." },
  "project2.work.7": { fr: "Analyse et interprétation des résultats.", en: "Analyzed and interpreted results." },
  "project2.visual.risk": { fr: "Zones à risque", en: "Risk areas" },

  /* Project 3 */
  "project3.type": {
    fr: "INFORMATION RETRIEVAL · NLP · MACHINE LEARNING",
    en: "INFORMATION RETRIEVAL · NLP · MACHINE LEARNING"
  },
  "project3.title": {
    fr: "Moteur de recherche et de classement de documents",
    en: "Document search and ranking engine"
  },
  "project3.company": {
    fr: "Projet personnel · Indépendant",
    en: "Personal project · Independent"
  },
  "project3.date": {
    fr: "sept. 2025 — déc. 2025 · 4 mois · Hybride",
    en: "Sep. 2025 — Dec. 2025 · 4 months · Hybrid"
  },
  "project3.badge": { fr: "PROJET", en: "PROJECT" },
  "project3.intro": {
    fr: "Conception et développement d'une solution intelligente de recherche et de classement de documents visant à améliorer la pertinence des résultats retournés à partir de requêtes utilisateurs.",
    en: "Design and development of an intelligent document search and ranking solution to improve the relevance of results returned from user queries."
  },
  "project3.architecture.title": { fr: "Architecture", en: "Architecture" },
  "project3.architecture.desc": {
    fr: "Mise en place d'un pipeline couvrant la préparation, l'indexation, la recherche et le classement des documents, avec comparaison de plusieurs stratégies de retrieval et ranking.",
    en: "Set up a pipeline covering document preparation, indexing, search and ranking, comparing several retrieval and ranking strategies."
  },
  "project3.work.title": { fr: "Travaux réalisés", en: "Work carried out" },
  "project3.work.1": { fr: "Benchmark de stratégies BM25 et TF-IDF.", en: "Benchmarked BM25 and TF-IDF strategies." },
  "project3.work.2": { fr: "Vector Space Model et Cosine Similarity.", en: "Vector Space Model and Cosine Similarity." },
  "project3.work.3": { fr: "Expérimentation de LSI et modèles sémantiques.", en: "Experimented with LSI and semantic models." },
  "project3.work.4": { fr: "Comparaison de différentes approches de ranking.", en: "Compared different ranking approaches." },
  "project3.work.5": { fr: "Évaluation via Precision, Recall et F1-Score.", en: "Evaluated using Precision, Recall and F1-Score." },
  "project3.work.6": { fr: "Utilisation de MAP, Precision@K, MRR et nDCG.", en: "Used MAP, Precision@K, MRR and nDCG." },
  "project3.work.7": { fr: "Développement d'une interface de recherche.", en: "Developed a search interface." },
  "project3.work.8": { fr: "Tests sur un corpus documentaire médical.", en: "Tested on a medical document corpus." },
  "project3.visual.search": { fr: "recherche documentaire...", en: "document search..." },
  "project3.visual.result1": { fr: "Document médical pertinent", en: "Relevant medical document" },
  "project3.visual.result1.sub": { fr: "Score de pertinence élevé", en: "High relevance score" },
  "project3.visual.result2": { fr: "Analyse clinique", en: "Clinical analysis" },
  "project3.visual.result2.sub": { fr: "Correspondance sémantique", en: "Semantic match" },
  "project3.visual.result3": { fr: "Rapport documentaire", en: "Document report" },
  "project3.visual.result3.sub": { fr: "Similarité textuelle", en: "Text similarity" },

  /* Project 4 */
  "project4.type": {
    fr: "DATA SCIENCE · MACHINE LEARNING",
    en: "DATA SCIENCE · MACHINE LEARNING"
  },
  "project4.title": {
    fr: "Prédiction du churn client",
    en: "Customer churn prediction"
  },
  "project4.company": {
    fr: "SARL LTMI · Stage",
    en: "SARL LTMI · Internship"
  },
  "project4.date": {
    fr: "juin 2025 — août 2025 · 3 mois · Hybride",
    en: "Jun. 2025 — Aug. 2025 · 3 months · Hybrid"
  },
  "project4.badge": { fr: "STAGE", en: "INTERNSHIP" },
  "project4.intro": {
    fr: "Participation au développement d'une solution de prédiction du churn client afin d'identifier les facteurs associés au départ des clients et d'apporter des éléments d'aide à la décision.",
    en: "Contributed to the development of a customer churn prediction solution to identify factors associated with customer departure and provide decision-support insights."
  },
  "project4.approach.title": { fr: "Approche Data Science", en: "Data Science approach" },
  "project4.approach.desc": {
    fr: "Analyse du comportement client à travers la préparation des données, l'analyse exploratoire, la construction de variables pertinentes et l'entraînement de modèles prédictifs.",
    en: "Analyzed customer behavior through data preparation, exploratory analysis, feature engineering and training predictive models."
  },
  "project4.work.title": { fr: "Travaux réalisés", en: "Work carried out" },
  "project4.work.1": { fr: "Collecte et préparation des données clients.", en: "Collected and prepared customer data." },
  "project4.work.2": { fr: "Analyses exploratoires et recherche de corrélations.", en: "Performed exploratory analysis and correlation analysis." },
  "project4.work.3": { fr: "Préparation des données pour le Machine Learning.", en: "Prepared data for Machine Learning." },
  "project4.work.4": { fr: "Développement de modèles prédictifs de churn.", en: "Developed predictive churn models." },
  "project4.work.5": { fr: "Évaluation des performances des modèles.", en: "Evaluated model performance." },
  "project4.work.6": { fr: "Identification des facteurs associés au départ.", en: "Identified factors associated with customer departure." },
  "project4.work.7": { fr: "Restitution des résultats pour la prise de décision.", en: "Presented results to support decision-making." },

  /* Project 5 */
  "project5.type": {
    fr: "FULL-STACK DEVELOPMENT · WEB",
    en: "FULL-STACK DEVELOPMENT · WEB"
  },
  "project5.title": {
    fr: "Plateforme e-commerce",
    en: "E-commerce platform"
  },
  "project5.company": {
    fr: "SARL LTMI · Stage",
    en: "SARL LTMI · Internship"
  },
  "project5.date": {
    fr: "févr. 2024 — juil. 2024 · 6 mois · Hybride",
    en: "Feb. 2024 — Jul. 2024 · 6 months · Hybrid"
  },
  "project5.badge": { fr: "STAGE", en: "INTERNSHIP" },
  "project5.intro": {
    fr: "Participation à la conception et au développement d'une plateforme e-commerce destinée à un acteur du levage et de la manutention.",
    en: "Contributed to the design and development of an e-commerce platform for a lifting and handling company."
  },
  "project5.dev.title": { fr: "Développement", en: "Development" },
  "project5.dev.desc": {
    fr: "Contribution à la construction de l'application et au développement des fonctionnalités nécessaires au parcours client, depuis la consultation du catalogue jusqu'au processus de commande.",
    en: "Contributed to building the application and developing the features needed for the customer journey, from catalog browsing to the checkout process."
  },
  "project5.work.title": { fr: "Travaux réalisés", en: "Work carried out" },
  "project5.work.1": { fr: "Développement du catalogue produits.", en: "Developed the product catalog." },
  "project5.work.2": { fr: "Gestion du panier et du parcours d'achat.", en: "Implemented cart and checkout flow." },
  "project5.work.3": { fr: "Fonctionnalités d'authentification.", en: "Implemented authentication features." },
  "project5.work.4": { fr: "Gestion des utilisateurs.", en: "Implemented user management." },
  "project5.work.5": { fr: "Développement de composants front-end.", en: "Developed front-end components." },
  "project5.work.6": { fr: "Développement de composants back-end.", en: "Developed back-end components." },
  "project5.work.7": { fr: "Intégration des différents composants techniques.", en: "Integrated the different technical components." },
  "project5.work.8": { fr: "Contribution à l'expérience d'achat complète.", en: "Contributed to the end-to-end shopping experience." },
  "project5.visual.catalog": { fr: "CATALOGUE PRODUITS", en: "PRODUCT CATALOG" },
  "project5.visual.solutions": { fr: "Solutions professionnelles", en: "Professional solutions" },
  "project5.visual.productA": { fr: "Produit A", en: "Product A" },
  "project5.visual.productB": { fr: "Produit B", en: "Product B" },
  "project5.visual.productC": { fr: "Produit C", en: "Product C" },

  "skills.eyebrow": { fr: "03 — COMPÉTENCES", en: "03 — SKILLS" },
  "skills.title": {
    fr: 'Une stack pensée pour <span class="gradient-text">construire.</span>',
    en: 'A stack designed to <span class="gradient-text">build.</span>'
  },
  "skills.cat1.title": { fr: "Data & IA", en: "Data & AI" },
  "skills.cat2.title": { fr: "Vision & NLP", en: "Vision & NLP" },
  "skills.cat3.title": { fr: "Software", en: "Software" },
  "skills.cat4.title": { fr: "Approche", en: "Approach" },

  "contact.eyebrow": { fr: "04 — CONTACT", en: "04 — CONTACT" },
  "contact.title": {
    fr: 'Un projet, une opportunité, <span class="gradient-text">une discussion ?</span>',
    en: 'A project, an opportunity, <span class="gradient-text">a conversation?</span>'
  },
  "contact.subtitle": {
    fr: "Vous recherchez un profil orienté Data Science, Machine Learning, IA ou développement de solutions intelligentes ? N'hésitez pas à me contacter.",
    en: "Looking for a profile focused on Data Science, Machine Learning, AI or intelligent solution development? Feel free to contact me."
  },
  "contact.email.label": { fr: "EMAIL", en: "EMAIL" },
  "contact.linkedin.label": { fr: "PROFIL PROFESSIONNEL", en: "PROFESSIONAL PROFILE" },
  "contact.linkedin.text": { fr: "Voir mon profil LinkedIn", en: "View my LinkedIn profile" },

  "footer.role": { fr: "Data · IA · Machine Learning", en: "Data · AI · Machine Learning" },
  "footer.home": { fr: "Accueil", en: "Home" },
  "footer.projects": { fr: "Projets", en: "Projects" },
  "footer.contact": { fr: "Contact", en: "Contact" },
  "footer.linkedin": { fr: "LinkedIn ↗", en: "LinkedIn ↗" }
};

function translatePage(language) {
  // Traduction des éléments avec data-i18n (texte pur)
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const translation = translations[key];
    if (translation && translation[language]) {
      el.textContent = translation[language];
    }
  });

  // Traduction des éléments avec data-i18n-html (HTML autorisé)
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    const translation = translations[key];
    if (translation && translation[language]) {
      el.innerHTML = translation[language];
    }
  });

  // Mise à jour du titre et de la description
  const description = document.querySelector('meta[name="description"]');
  if (language === 'en') {
    document.title = "Salah Djessas — Data Science · AI · Machine Learning";
    if (description) {
      description.content = "Salah Djessas portfolio — Data Science, Machine Learning, Computer Vision, AI and software development.";
    }
  } else {
    document.title = "Salah Djessas — Data Science · IA · Machine Learning";
    if (description) {
      description.content = "Portfolio de Salah Djessas — Data Science, Machine Learning, Computer Vision, IA et développement logiciel.";
    }
  }

  // Mise à jour de la langue du document
  document.documentElement.lang = language;

  // Mise à jour des boutons de langue
  languageButtons.forEach((button) => {
    const active = button.dataset.language === language;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  // Accessibilité : menu mobile
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    const menuIsOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute(
      'aria-label',
      language === 'en'
        ? (menuIsOpen ? 'Close menu' : 'Open menu')
        : (menuIsOpen ? 'Fermer le menu' : 'Ouvrir le menu')
    );
  }

  // Accessibilité : switch de langue
  const languageSwitch = document.querySelector('.language-switch');
  if (languageSwitch) {
    languageSwitch.setAttribute(
      'aria-label',
      language === 'en' ? 'Choose language' : 'Choisir la langue'
    );
  }
}

function saveLanguage(language) {
  try {
    localStorage.setItem('portfolio-language', language);
  } catch (error) {
    // localStorage indisponible
  }
}

function loadLanguage() {
  try {
    const saved = localStorage.getItem('portfolio-language');
    if (saved === 'en' || saved === 'fr') {
      return saved;
    }
  } catch (error) {
    // Par défaut le français
  }
  return 'fr';
}

languageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const language = button.dataset.language;
    if (language !== 'fr' && language !== 'en') return;

    document.body.classList.add('language-changing');
    translatePage(language);
    saveLanguage(language);

    window.setTimeout(() => {
      document.body.classList.remove('language-changing');
    }, 180);
  });
});

// Initialisation
translatePage(loadLanguage());