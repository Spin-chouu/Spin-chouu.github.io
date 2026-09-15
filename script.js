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

      const currentId = entry.target.getAttribute("id");

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

  heroVisual.addEventListener("mousemove", (event) => {

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

  });


  heroVisual.addEventListener("mouseleave", () => {

    dataPanel.style.transform = `
      perspective(1000px)
      rotateY(-5deg)
      rotateX(3deg)
      translateY(0)
    `;

  });

}


/* =========================================================
   PROJECT CARD TILT
========================================================= */

const projectCards =
  document.querySelectorAll(".project-card");

projectCards.forEach((card) => {

  card.addEventListener("mousemove", (event) => {

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

  });


  card.addEventListener("mouseleave", () => {

    card.style.transform = "";

  });

});


/* =========================================================
   BUTTON RIPPLE EFFECT
========================================================= */

const buttons =
  document.querySelectorAll(".btn");

buttons.forEach((button) => {

  button.addEventListener("click", function (event) {

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

  });

});


/* =========================================================
   LINKEDIN BUTTON TRACKING FEEDBACK
========================================================= */

const linkedinLinks =
  document.querySelectorAll(
    'a[href*="linkedin.com"]'
  );

linkedinLinks.forEach((link) => {

  link.addEventListener("mouseenter", () => {

    link.style.setProperty(
      "--linkedin-hover",
      "1"
    );

  });

});


/* =========================================================
   SMOOTH HOVER FOR TAGS
========================================================= */

const tags =
  document.querySelectorAll(
    ".project-tags span, .skill-list span"
  );

tags.forEach((tag) => {

  tag.addEventListener("mouseenter", () => {

    tag.style.transform =
      "translateY(-3px) scale(1.03)";

  });

  tag.addEventListener("mouseleave", () => {

    tag.style.transform = "";

  });

});


/* =========================================================
   CONTACT EMAIL MICRO-INTERACTION
========================================================= */

const emailLink =
  document.querySelector(".contact-email");

emailLink?.addEventListener("click", () => {

  emailLink.classList.add("clicked");

  setTimeout(() => {
    emailLink.classList.remove("clicked");
  }, 500);

});