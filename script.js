// script.js
// Loading Screen Animation
document.addEventListener("DOMContentLoaded", () => {
	const loadingText = document.getElementById("loading-text");
	const mainIcon = document.querySelector(".main-icon");
	const subIcons = document.querySelectorAll(".sub-icons i");
	const designerText = document.getElementById("designer-text");
	const loadingScreen = document.getElementById("loading-screen");

	function showElement(element, delay = 0) {
		setTimeout(() => {
			element.classList.remove("hidden");
			element.classList.add("fall");
		}, delay);
	}

	showElement(loadingText, 0);
	showElement(mainIcon, 800);
	subIcons.forEach((icon, idx) => {
		showElement(icon, 1600 + idx * 400);
	});
	showElement(designerText, 2800);

	setTimeout(() => {
		loadingScreen.style.opacity = '0';
		setTimeout(() => {
			loadingScreen.style.display = 'none';
		}, 500);
	}, 4000);
});

// Navigation Active State and Mobile Menu
const navLinks = document.querySelectorAll('.nav-item a');
const sections = document.querySelectorAll('section');
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

if (hamburger) {
	hamburger.addEventListener('click', () => {
		navList.classList.toggle('active');
		hamburger.innerHTML = navList.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
	});
}

function removeActive() {
	navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

// Improved navigation click functionality
navLinks.forEach(link => {
	link.addEventListener('click', e => {
		e.preventDefault();

		// Close mobile menu if open
		if (navList.classList.contains('active')) {
			navList.classList.remove('active');
			hamburger.innerHTML = '<i class="fas fa-bars"></i>';
		}

		const targetId = link.getAttribute('href').substring(1);
		const targetSection = document.getElementById(targetId);

		if (targetSection) {
			// Calculate the position to scroll to
			const headerHeight = document.querySelector('.header').offsetHeight;
			const targetPosition = targetSection.offsetTop - headerHeight - 20;

			window.scrollTo({
				top: targetPosition,
				behavior: 'smooth'
			});

			// Update active state
			removeActive();
			link.parentElement.classList.add('active');
		}
	});
});

// Scroll Events
window.addEventListener('scroll', () => {
	const headerHeight = document.querySelector('.header').offsetHeight;
	let scrollPos = window.scrollY + headerHeight + 50;

	// Update active nav link based on scroll position
	sections.forEach(section => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.offsetHeight;

		if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
			removeActive();
			const activeLink = document.querySelector(`.nav-item a[href="#${section.id}"]`);
			if (activeLink) activeLink.parentElement.classList.add('active');
		}
	});

	// Show/hide back to top button
	if (window.scrollY > 500) {
		backToTop.style.display = "flex";
	} else {
		backToTop.style.display = "none";
	}

	// Reveal elements on scroll
	revealElements.forEach(el => {
		const windowHeight = window.innerHeight;
		const elementTop = el.getBoundingClientRect().top;
		const revealPoint = 150;

		if (elementTop < windowHeight - revealPoint) {
			el.classList.add('active-reveal');
		}
	});
});

// Initialize reveal elements
const revealElements = document.querySelectorAll('.about-container, .skills-container, .projects-container, .contact-content');
revealElements.forEach(el => el.classList.add('reveal'));

// Create back to top button
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Card hover effects
const cards = document.querySelectorAll('.project-card, .c1, .stat-item, .learning-item');
cards.forEach(card => {
	card.addEventListener('mouseenter', () => {
		card.style.transform = 'translateY(-8px)';
		card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
	});
	card.addEventListener('mouseleave', () => {
		card.style.transform = 'translateY(0)';
		card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
	});
});

// Skill Progress Animations
function initSkillAnimations() {
	const skillProgressBars = document.querySelectorAll('.skill-progress');
	const skillsSection = document.querySelector('.skills');

	// Function to animate the bars
	function animateSkills() {
		skillProgressBars.forEach((bar, index) => {
			const width = bar.getAttribute('data-width');
			setTimeout(() => {
				bar.style.width = width + '%';
			}, index * 150); // Staggered animation
		});
	}

	// Check if already animated
	if (skillsSection) {
		// Create intersection observer with lower threshold for better mobile support
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					animateSkills();
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

		observer.observe(skillsSection);

		// Also trigger on scroll with debouncing for mobile
		let scrollTimeout;
		window.addEventListener('scroll', () => {
			if (scrollTimeout) clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(() => {
				const rect = skillsSection.getBoundingClientRect();
				const windowHeight = window.innerHeight;
				// Trigger when skills section is anywhere in view
				if (rect.top < windowHeight && rect.bottom > 0) {
					animateSkills();
				}
			}, 100);
		}, { passive: true });

		// Also trigger on touch for mobile
		document.addEventListener('touchstart', () => {
			const rect = skillsSection.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			if (rect.top < windowHeight && rect.bottom > 0) {
				animateSkills();
			}
		}, { passive: true });
	}
}

// Initialize skill animations
initSkillAnimations();

// Typing effect for the hero section
const typingElement = document.querySelector('.info-home h3');
if (typingElement) {
	const words = ["Data Analyst", "AI Enthusiast", "Python Developer", "ML Practitioner"];
	let wordIndex = 0;
	let charIndex = 0;
	let isDeleting = false;
	let typingSpeed = 100;

	function type() {
		const currentWord = words[wordIndex];
		let displayedText = currentWord.substring(0, charIndex);

		typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

		if (!isDeleting && charIndex < currentWord.length) {
			charIndex++;
			setTimeout(type, typingSpeed);
		} else if (isDeleting && charIndex > 0) {
			charIndex--;
			setTimeout(type, typingSpeed / 2);
		} else {
			isDeleting = !isDeleting;
			if (!isDeleting) {
				wordIndex = (wordIndex + 1) % words.length;
			}
			setTimeout(type, 1000);
		}
	}

	// Start typing effect after page loads
	window.addEventListener('load', () => {
		setTimeout(type, 4500);
	});
}

// Form submission is handled by EmailJS in index.html

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();

		const targetId = this.getAttribute('href');
		if (targetId === '#') return;

		const targetElement = document.querySelector(targetId);
		if (targetElement) {
			const headerHeight = document.querySelector('.header').offsetHeight;
			const targetPosition = targetElement.offsetTop - headerHeight - 20;

			window.scrollTo({
				top: targetPosition,
				behavior: 'smooth'
			});
		}
	});
});

// Hire Me button functionality
const hireMeBtn = document.querySelector('.btn-home1');
if (hireMeBtn) {
	hireMeBtn.addEventListener('click', () => {
		const contactSection = document.querySelector('#contact');
		if (contactSection) {
			const headerHeight = document.querySelector('.header').offsetHeight;
			const targetPosition = contactSection.offsetTop - headerHeight - 20;

			window.scrollTo({
				top: targetPosition,
				behavior: 'smooth'
			});
		}
	});
}

// View CV button functionality - Link opens directly via HTML href
// No JavaScript needed - the anchor tag handles it
