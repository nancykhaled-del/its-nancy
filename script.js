document.addEventListener("DOMContentLoaded", () => {
  const progress = document.querySelector(".scroll-progress");
  const backTop = document.querySelector(".back-top");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const updateScrollUI = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
    backTop.classList.toggle("visible", window.scrollY > 450);
  };
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
        entry.target.classList.add("in-view");
      }
    });
  }, { rootMargin: "-35% 0px -50% 0px", threshold: 0 });
  document.querySelectorAll("main section[id]").forEach(section => sectionObserver.observe(section));

  const role = document.getElementById("typed-role");
  const roles = ["Full Stack Developer", "Web Developer", "Programming Enthusiast"];
  let roleIndex = 0, charIndex = roles[0].length, deleting = false;
  function typeRole() {
    const current = roles[roleIndex];
    if (deleting) {
      charIndex--;
      role.textContent = current.slice(0, Math.max(0, charIndex));
    } else {
      charIndex++;
      role.textContent = current.slice(0, charIndex);
    }
    let delay = deleting ? 48 : 85;
    if (!deleting && charIndex >= current.length) { deleting = true; delay = 1500; }
    else if (deleting && charIndex <= 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 300; }
    window.setTimeout(typeRole, delay);
  }
  window.setTimeout(typeRole, 1800);
});