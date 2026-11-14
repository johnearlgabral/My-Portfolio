
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Mobile navigation
menuToggle.addEventListener("click", function() {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.textContent = isOpen ? "×" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu after clicking a navigation link
document.querySelectorAll(".nav-links a").forEach(function(link) {
    link.addEventListener("click", function() {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

const sections = document.querySelectorAll("main section, body > section");
const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (!entry.isIntersecting) {
            return;
        }

        const activeLink = document.querySelector(
            '.nav-links a[href="#' + entry.target.id + '"]'
        );

        if (activeLink) {
            document.querySelectorAll(".nav-links a").forEach(function(link) {
                link.classList.remove("active");
                link.removeAttribute("aria-current");
            });
            activeLink.classList.add("active");
            activeLink.setAttribute("aria-current", "location");
        }
    });
}, {
    rootMargin: "-25% 0px -65% 0px"
});

sections.forEach(function(section) {
    sectionObserver.observe(section);
});

// Automatically update copyright year
document.getElementById("year").textContent =
    new Date().getFullYear();
