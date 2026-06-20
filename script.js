// script.js — Pooja Portfolio 2026 (Performance Optimized)

document.addEventListener("DOMContentLoaded", () => {

    // ===== ELEMENT REFERENCES (cached once) =====
    const scrollBar  = document.getElementById("scroll-progress-bar");
    const backToTopBtn = document.getElementById("back-to-top");
    const hamburger   = document.querySelector(".hamburger");
    const navList     = document.querySelector(".nav-list");
    const navLinks    = document.querySelectorAll(".nav-item a");
    const sections    = document.querySelectorAll("section");
    const header      = document.querySelector(".header");

    // ===== THROTTLE HELPER (runs function only once per animation frame) =====
    function throttleRAF(fn) {
        let ticking = false;
        return function(...args) {
            if (!ticking) {
                requestAnimationFrame(() => {
                    fn.apply(this, args);
                    ticking = false;
                });
                ticking = true;
            }
        };
    }

    // ===== SINGLE COMBINED SCROLL HANDLER (fast, no lag) =====
    const onScroll = throttleRAF(() => {
        const scrollTop  = window.scrollY;
        const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
        const hh         = header ? header.offsetHeight : 70;

        // 1. Progress bar
        if (scrollBar) {
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            scrollBar.style.width = pct + "%";
        }

        // 2. Back to top button
        if (backToTopBtn) {
            backToTopBtn.classList.toggle("show", scrollTop > 400);
        }

        // 3. Active nav link
        let current = "";
        sections.forEach(section => {
            if (scrollTop >= section.offsetTop - hh - 120) {
                current = section.getAttribute("id");
            }
        });
        if (current) setActiveNav(current);
    });

    window.addEventListener("scroll", onScroll, { passive: true });

    // Back to top click
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ===== HAMBURGER MENU (fixed — now guaranteed to find elements) =====
    if (hamburger && navList) {
        hamburger.addEventListener("click", (e) => {
            e.stopPropagation();
            navList.classList.toggle("active");
            hamburger.innerHTML = navList.classList.contains("active")
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Close on outside click / tap
        document.addEventListener("click", (e) => {
            if (!navList.contains(e.target) && !hamburger.contains(e.target) && navList.classList.contains("active")) {
                navList.classList.remove("active");
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // Helper — set exactly one nav item active, clear all others
    function setActiveNav(id) {
        navLinks.forEach(l => {
            const isMatch = l.getAttribute("href") === "#" + id;
            l.parentElement.classList.toggle("active", isMatch);
        });
    }

    // ===== NAV LINK CLICK (smooth scroll + close mobile menu) =====
    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();

            if (navList && navList.classList.contains("active")) {
                navList.classList.remove("active");
                if (hamburger) hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }

            const targetId = link.getAttribute("href").substring(1);
            const target   = document.getElementById(targetId);
            if (target) {
                const hh = header ? header.offsetHeight : 70;
                setActiveNav(targetId);
                window.scrollTo({ top: target.offsetTop - hh - 16, behavior: "smooth" });
            }
        });
    });

    // ===== HIRE ME BUTTON =====
    const hireBtn = document.querySelector(".btn-home1");
    if (hireBtn) {
        hireBtn.addEventListener("click", () => {
            const contact = document.querySelector("#contact");
            if (contact) {
                const hh = header ? header.offsetHeight : 70;
                window.scrollTo({ top: contact.offsetTop - hh - 16, behavior: "smooth" });
            }
        });
    }

    // ===== SMOOTH SCROLL FOR ANY OTHER ANCHOR LINKS (not nav, already handled above) =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.closest(".nav-item")) return; // skip — nav links already handled
        anchor.addEventListener("click", function(e) {
            const id = this.getAttribute("href");
            if (id === "#") return;
            e.preventDefault();
            const el = document.querySelector(id);
            if (el) {
                const hh = header ? header.offsetHeight : 70;
                window.scrollTo({ top: el.offsetTop - hh - 16, behavior: "smooth" });
            }
        });
    });

    // ===== ANIMATIONS (IntersectionObserver — only runs when elements are visible) =====
    initAnimations();

    // ===== TYPING EFFECT =====
    const words    = ["Data Analyst", "AI Enthusiast", "Python Developer", "BI Developer", "ML Explorer"];
    let wIdx = 0, cIdx = 0, deleting = false;
    const typingEl = document.querySelector(".typing-effect");

    if (typingEl) {
        function type() {
            const word = words[wIdx];
            typingEl.innerHTML = word.substring(0, cIdx) + '<span class="cursor">|</span>';

            if (!deleting && cIdx < word.length) {
                cIdx++;
                setTimeout(type, 100);
            } else if (deleting && cIdx > 0) {
                cIdx--;
                setTimeout(type, 50);
            } else {
                deleting = !deleting;
                if (!deleting) wIdx = (wIdx + 1) % words.length;
                setTimeout(type, 1100);
            }
        }
        setTimeout(type, 1200);
    }

});

// ===== ALL SECTION/CARD ANIMATIONS =====
function initAnimations() {

    // Fallback for old browsers without IntersectionObserver
    if (!("IntersectionObserver" in window)) {
        document.querySelectorAll("section").forEach(s => s.classList.add("active-reveal"));
        document.querySelectorAll(".skill-bar-fill").forEach(b => b.classList.add("animate"));
        document.querySelectorAll(".project-card").forEach(c => { c.style.opacity = "1"; c.style.transform = "none"; });
        return;
    }

    // 1. Section reveal
    const revealObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add("active-reveal");
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.07 });

    document.querySelectorAll("section").forEach(s => {
        s.classList.add("reveal");
        revealObs.observe(s);
    });

    // 2. Skill bars
    const skillObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.querySelectorAll(".skill-bar-fill").forEach((bar, i) => {
                    setTimeout(() => bar.classList.add("animate"), i * 150);
                });
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.2 });

    const skillsSec = document.querySelector(".skills");
    if (skillsSec) skillObs.observe(skillsSec);

    // 3. Project cards
    const projObs = new IntersectionObserver((entries, obs) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => {
                    e.target.style.opacity = "1";
                    e.target.style.transform = "translateY(0)";
                }, i * 120);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.07 });

    document.querySelectorAll(".project-card").forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(35px)";
        card.style.transition = "opacity 0.65s ease, transform 0.65s ease";
        projObs.observe(card);
    });

    // 4. Stat items
    const statObs = new IntersectionObserver((entries, obs) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => {
                    e.target.style.opacity = "1";
                    e.target.style.transform = "translateY(0)";
                }, i * 150);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".stat-item").forEach(s => {
        s.style.opacity = "0";
        s.style.transform = "translateY(22px)";
        s.style.transition = "opacity 0.55s ease, transform 0.55s ease";
        statObs.observe(s);
    });

    // 5. Learning items
    const learnObs = new IntersectionObserver((entries, obs) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => {
                    e.target.style.opacity = "1";
                    e.target.style.transform = "translateY(0)";
                }, i * 100);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".learning-item").forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        learnObs.observe(item);
    });

    // 6. Certificate cards
    const certObs = new IntersectionObserver((entries, obs) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => {
                    e.target.style.opacity = "1";
                    e.target.style.transform = "translateY(0)";
                }, i * 200);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".certificate-card").forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        certObs.observe(card);
    });
}
