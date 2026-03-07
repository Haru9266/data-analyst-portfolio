// script.js
// Loading Screen Animation
document.addEventListener("DOMContentLoaded", () => {
	const loadingText = document.getElementById("loading-text");
	const mainIcon = document.querySelector(".main-icon");
	const subIcons = document.querySelectorAll(".sub-icons i");
	const designerText = document.getElementById("designer-text");
	const loadingScreen = document.getElementById("loading-screen");

	// Detect if mobile/tablet
	const isMobile = window.innerWidth <= 1024;
	const animationDelay = isMobile ? 2000 : 4000;

	function showElement(element, delay = 0) {
		setTimeout(() => {
			element.classList.remove("hidden");
			element.classList.add("fall");
		}, delay);
	}

	showElement(loadingText, 0);
	showElement(mainIcon, isMobile ? 400 : 800);
	subIcons.forEach((icon, idx) => {
		showElement(icon, isMobile ? 800 + idx * 200 : 1600 + idx * 400);
	});
	showElement(designerText, isMobile ? 1400 : 2800);

	setTimeout(() => {
		loadingScreen.style.opacity = '0';
		setTimeout(() => {
			loadingScreen.style.display = 'none';
			// Trigger initial animations after loading screen
			initAnimations();
		}, isMobile ? 300 : 500);
	}, animationDelay);
});

// Initialize all animations
function initAnimations() {
	// Initialize Intersection Observer for scroll animations
	if ('IntersectionObserver' in window) {
		const observerOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.1
		};

		// Observer for reveal animations
		const revealObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('active-reveal');
					observer.unobserve(entry.target);
				}
			});
		}, observerOptions);

		// Observe all sections for reveal animation
		document.querySelectorAll('section').forEach(section => {
			section.classList.add('reveal');
			revealObserver.observe(section);
		});

		// Observer for skill bars with .animate class (new responsive method)
		const skillBarObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					// Add animate class to all skill-bar-fill elements
					const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
					skillBars.forEach((bar, index) => {
						setTimeout(() => {
							bar.classList.add('animate');
						}, index * 150);
					});
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.3 });

		// Observe skills section for skill bar animation
		const skillsSection = document.querySelector('.skills');
		if (skillsSection) {
			skillBarObserver.observe(skillsSection);
		}

		// Observer for project cards
		const projectObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry, index) => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						entry.target.style.opacity = '1';
						entry.target.style.transform = 'translateY(0)';
					}, index * 100);
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.1 });

		document.querySelectorAll('.project-card').forEach(card => {
			card.style.opacity = '0';
			card.style.transform = 'translateY(30px)';
			card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
			projectObserver.observe(card);
		});

		// Observer for stat items
		const statObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry, index) => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						entry.target.style.opacity = '1';
						entry.target.style.transform = 'translateY(0)';
					}, index * 150);
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.3 });

		document.querySelectorAll('.stat-item').forEach(stat => {
			stat.style.opacity = '0';
			stat.style.transform = 'translateY(20px)';
			stat.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
			statObserver.observe(stat);
		});

		// Observer for learning items
		const learningObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry, index) => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						entry.target.style.opacity = '1';
						entry.target.style.transform = 'translateY(0)';
					}, index * 100);
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.2 });

		document.querySelectorAll('.learning-item').forEach(item => {
			item.style.opacity = '0';
			item.style.transform = 'translateY(20px)';
			item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
			learningObserver.observe(item);
		});

		// Observer for certificate cards
		const certObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry, index) => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						entry.target.style.opacity = '1';
						entry.target.style.transform = 'translateY(0)';
					}, index * 200);
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.2 });

		document.querySelectorAll('.certificate-card').forEach(card => {
			card.style.opacity = '0';
			card.style.transform = 'translateY(30px)';
			card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
			certObserver.observe(card);
		});
	} else {
		// Fallback for older browsers - show everything immediately
		document.querySelectorAll('.skill-progress').forEach(bar => {
			bar.style.width = bar.getAttribute('data-width') + '%';
		});
		document.querySelectorAll('section').forEach(section => {
			section.classList.add('active-reveal');
		});
	}
}

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

			window.scrollTo({
				top: targetPosition,
				behavior: 'smooth'
			});
		
			
	


// View CV button functionality - Link opens directly via HTML href
// No JavaScript needed - the anchor tag handles it
