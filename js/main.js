/* ========================================
   MAESTRO SOLUTION - JAVASCRIPT PRINCIPAL
   Versión: 1.0
   Autor: Maestro Solution SpA
   ======================================== */

// ========== MENU LATERAL ========== 
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');

// Toggle menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    sideMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
});

// Cerrar menu con overlay
menuOverlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    sideMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
});

// Cerrar menu al hacer click en link
document.querySelectorAll('.menu-item, .menu-cta').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        sideMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
    });
});

// ========== LOGO FADE OUT AL SCROLL ========== 
const logoContainer = document.getElementById('logoContainer');

window.addEventListener('scroll', () => {
    if (window.scrollY > 150) {
        logoContainer.classList.add('fade-out');
    } else {
        logoContainer.classList.remove('fade-out');
    }
});

// ========== SMOOTH SCROLL ========== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== ANIMACIONES CON INTERSECTION OBSERVER ========== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar elementos con fade-in
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ========== PRELOAD DE IMÁGENES ========== 
window.addEventListener('load', () => {
    const images = [
        'images/app-plagas.jpg', 
        'images/app-heladas.jpg', 
        'images/app-invernadero.jpg'
    ];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// ========== SISTEMA DE COOKIES ========== 

/**
 * Establece una cookie
 * @param {string} name - Nombre de la cookie
 * @param {string} value - Valor de la cookie
 * @param {number} days - Días hasta expiración
 */
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

/**
 * Obtiene el valor de una cookie
 * @param {string} name - Nombre de la cookie
 * @returns {string|null} - Valor de la cookie o null
 */
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Mostrar banner de cookies si no ha dado consentimiento
window.addEventListener('load', () => {
    const cookieConsent = getCookie('cookieConsent');
    if (!cookieConsent) {
        setTimeout(() => {
            document.getElementById('cookieConsent').classList.add('show');
        }, 1000); // Mostrar después de 1 segundo
    }
});

// Botones de consentimiento de cookies
const acceptCookiesBtn = document.getElementById('acceptCookies');
const rejectCookiesBtn = document.getElementById('rejectCookies');
const cookieConsentBanner = document.getElementById('cookieConsent');

// Aceptar todas las cookies
if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener('click', () => {
        setCookie('cookieConsent', 'accepted', 365);
        cookieConsentBanner.classList.remove('show');
        console.log('✅ Cookies aceptadas');
        
        // Aquí puedes activar Google Analytics
        // gtag('consent', 'update', {
        //     'analytics_storage': 'granted'
        // });
    });
}

// Rechazar cookies opcionales
if (rejectCookiesBtn) {
    rejectCookiesBtn.addEventListener('click', () => {
        setCookie('cookieConsent', 'essential', 365);
        cookieConsentBanner.classList.remove('show');
        console.log('ℹ️ Solo cookies esenciales');
    });
}

// Log de inicialización
console.log('✓ Maestro Solution - Scripts cargados correctamente');
