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
	
	// Update active nav item based on scroll position
	let current = '';
	sections.forEach(section => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.clientHeight;
		if (scrollY >= (sectionTop - headerHeight - 100)) {
			current = section.getAttribute('id');
		}
	});

	navLinks.forEach(link => {
		link.parentElement.classList.remove('active');
		if (link.getAttribute('href').substring(1) === current) {
			link.parentElement.classList.add('active');
		}
	});
});

// Typing Effect
const words = ["Data Analyst", "AI Enthusiast", "Python Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

const typingElement = document.querySelector('.typing-effect');

if (typingElement) {
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

// Form submission is handled by EmailJS via onsubmit in index.html

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
