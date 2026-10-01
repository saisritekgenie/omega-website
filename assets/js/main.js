/**
 * Omega Sunnidhi Multi Speciality Hospital - JavaScript Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
                document.body.style.overflow = 'hidden';
            } else {
                icon.className = 'fa-solid fa-bars';
                document.body.style.overflow = '';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                if (mobileToggle.querySelector('i')) {
                    mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
                }
            });
        });
    }

    // 2. Navbar Header Shadow on Scroll & Page Active Link
    const header = document.getElementById('header');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        if (href === currentPath || (currentPath === '' && href === 'index.html') || (currentPath === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Doctor Department Filter Tabs
    const filterBtns = document.querySelectorAll('.filter-btn');
    const doctorCards = document.querySelectorAll('.doctor-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            doctorCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // 4. Modal Booking System
    const bookingModal = document.getElementById('bookingModal');
    const openBookModalBtn = document.getElementById('openBookModalBtn');
    const closeBookModalBtn = document.getElementById('closeBookModalBtn');
    const openTriggers = document.querySelectorAll('.open-booking-trigger');
    const modalDepartment = document.getElementById('modalDepartment');
    const modalDoctor = document.getElementById('modalDoctor');

    const openModal = () => {
        if (bookingModal) {
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Set default date to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const dateInput = document.getElementById('modalDate');
            if (dateInput && !dateInput.value) {
                dateInput.value = tomorrow.toISOString().split('T')[0];
            }
        }
    };

    const closeModal = () => {
        if (bookingModal) {
            bookingModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (openBookModalBtn) {
        openBookModalBtn.addEventListener('click', openModal);
    }

    if (closeBookModalBtn) {
        closeBookModalBtn.addEventListener('click', closeModal);
    }

    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                closeModal();
            }
        });
    }

    // Auto-select doctor/package when clicking trigger buttons
    openTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            openModal();
            
            const doctorName = trigger.getAttribute('data-doctor');
            const packageName = trigger.getAttribute('data-package');

            if (doctorName && modalDoctor) {
                for (let option of modalDoctor.options) {
                    if (option.value.includes(doctorName)) {
                        modalDoctor.value = option.value;
                        break;
                    }
                }
            }

            if (packageName && modalNotes) {
                const notes = document.getElementById('modalNotes');
                if (notes) {
                    notes.value = `Interested in ${packageName}`;
                }
            }
        });
    });

    // 5. Form Submissions (Hero & Modal Forms)
    const toastNotification = document.getElementById('toastNotification');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    const toastClose = document.getElementById('toastClose');

    const showToast = (title, message) => {
        if (toastNotification) {
            toastTitle.innerText = title;
            toastMessage.innerText = message;
            toastNotification.classList.add('active');

            setTimeout(() => {
                toastNotification.classList.remove('active');
            }, 6000);
        }
    };

    if (toastClose) {
        toastClose.addEventListener('click', () => {
            toastNotification.classList.remove('active');
        });
    }

    const generateRefId = () => {
        const randNum = Math.floor(1000 + Math.random() * 9000);
        return `#OMG-${randNum}`;
    };

    // Hero Quick Book Form
    const heroQuickBookForm = document.getElementById('heroQuickBookForm');
    if (heroQuickBookForm) {
        heroQuickBookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('heroPatientName').value;
            const refId = generateRefId();

            showToast(
                `Appointment Confirmed for ${name}!`,
                `Reference ID: ${refId}. Our front desk at Choppadandi Road will call you to confirm your slot.`
            );

            heroQuickBookForm.reset();
        });
    }

    // Modal Booking Form
    const modalBookingForm = document.getElementById('modalBookingForm');
    if (modalBookingForm) {
        modalBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('modalPatientName').value;
            const refId = generateRefId();

            closeModal();

            showToast(
                `Consultation Booked for ${name}!`,
                `Reference ID: ${refId}. We look forward to providing you top care at Omega Sunnidhi Hospital.`
            );

            modalBookingForm.reset();
        });
    }

    // 6. FAQ Accordion Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isOpen = faqItem.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const btn = item.querySelector('.faq-question');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });

            if (!isOpen) {
                faqItem.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // 7. Scroll Reveal Observer Animations
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('in-view'));
    }
});
