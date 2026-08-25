// ===== Footer : Année dynamique =====
// Année dynamique
const anneeCourante = document.getElementById('annee-courante');
if (anneeCourante) {
  anneeCourante.textContent = new Date().getFullYear();
}

// ==== Animations blobs ====
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const blobs = document.querySelectorAll('.blob-img');

    if (!hero) return;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        // On calcule la position de la souris par rapport au centre du hero
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        blobs.forEach((blob, index) => {
            // On crée un léger décalage, différent pour chaque blob
            const speedX = 15 * (index + 1); // Amplitude mouvement X
            const speedY = 10 * (index + 1); // Amplitude mouvement Y
            
            // On applique le mouvement en plus de l'animation CSS existante
            blob.style.transform = `translate(${x * speedX}px, ${y * speedY}px)`;
        });
    });

    // Remet les blobs à zéro quand la souris quitte le hero
    hero.addEventListener('mouseleave', () => {
        blobs.forEach((blob) => {
            blob.style.transform = `translate(0px, 0px)`;
        });
    });
});

/* ==========================================================================
   SCRIPT PRINCIPAL 
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       MENU MOBILE
       ------------------------------------------------------------------ */
    const boutonMenuMobile = document.getElementById('bouton-menu-mobile');
    const menuListe = document.getElementById('menu-liste');
    const iconeMenuMobile = boutonMenuMobile.querySelector('i');

    function ouvrirMenuMobile() {
        menuListe.classList.add('ouvert');
        boutonMenuMobile.setAttribute('aria-expanded', 'true');
        boutonMenuMobile.setAttribute('aria-label', 'Fermer le menu');
        iconeMenuMobile.classList.remove('fa-bars');
        iconeMenuMobile.classList.add('fa-xmark');
        document.body.classList.add('menu-ouvert');
    }

    function fermerMenuMobile() {
        menuListe.classList.remove('ouvert');
        boutonMenuMobile.setAttribute('aria-expanded', 'false');
        boutonMenuMobile.setAttribute('aria-label', 'Ouvrir le menu');
        iconeMenuMobile.classList.remove('fa-xmark');
        iconeMenuMobile.classList.add('fa-bars');
        document.body.classList.remove('menu-ouvert');
    }

    boutonMenuMobile.addEventListener('click', () => {
        const estOuvert = menuListe.classList.contains('ouvert');
        estOuvert ? fermerMenuMobile() : ouvrirMenuMobile();
    });

    menuListe.querySelectorAll('.menu-lien').forEach(lien => {
        lien.addEventListener('click', () => {
            if (menuListe.classList.contains('ouvert')) {
                fermerMenuMobile();
            }
        });
    });

    document.addEventListener('click', (evenement) => {
        const clicDansMenu = menuListe.contains(evenement.target);
        const clicSurBouton = boutonMenuMobile.contains(evenement.target);
        if (!clicDansMenu && !clicSurBouton && menuListe.classList.contains('ouvert')) {
            fermerMenuMobile();
        }
    });

    document.addEventListener('keydown', (evenement) => {
        if (evenement.key === 'Escape' && menuListe.classList.contains('ouvert')) {
            fermerMenuMobile();
        }
    });

});

// ============================================================
// THÈME CLAIR / SOMBRE
// ============================================================

(function() {
    const toggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    const mediaSombre = window.matchMedia('(prefers-color-scheme: dark)');

    function appliquerTheme(estSombre) {
        body.classList.toggle('dark-mode', estSombre);
        themeIcon.className = estSombre ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    // Préférence explicite déjà choisie par l'utilisateur ?
    const themeSauvegarde = localStorage.getItem('theme');

    if (themeSauvegarde === 'dark' || themeSauvegarde === 'light') {
        // L'utilisateur a déjà fait un choix manuel → on le respecte, point final
        appliquerTheme(themeSauvegarde === 'dark');
    } else {
        // Aucun choix explicite → on suit le système, SANS l'enregistrer
        appliquerTheme(mediaSombre.matches);
    }

    // Clic manuel → devient la préférence explicite, prioritaire pour toujours
    toggleBtn.addEventListener('click', function() {
        const estSombre = body.classList.toggle('dark-mode');
        themeIcon.className = estSombre ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        localStorage.setItem('theme', estSombre ? 'dark' : 'light');
    });

    // Si l'utilisateur n'a JAMAIS choisi manuellement, on continue de suivre
    // les changements de thème système en temps réel
    mediaSombre.addEventListener('change', function(e) {
        const choixExplicite = localStorage.getItem('theme');
        if (!choixExplicite) {
            appliquerTheme(e.matches);
        }
    });
})();

// ============================================================
// SURBRILLANCE DE NAV AU SCROLL
// ============================================================

(function() {
    const sections = document.querySelectorAll('section[id]');
    const liensNav = document.querySelectorAll('.menu-lien');

    if (!sections.length || !liensNav.length) return;

    const observateur = new IntersectionObserver((entrees) => {
        entrees.forEach((entree) => {
            const lienCorrespondant = document.querySelector(`.menu-lien[href="#${entree.target.id}"]`);
            if (!lienCorrespondant) return;

            if (entree.isIntersecting) {
                liensNav.forEach(lien => lien.classList.remove('actif'));
                lienCorrespondant.classList.add('actif');
            }
        });
    }, {
        // la section est considérée "active" quand elle occupe la bande
        // centrale de l'écran, entre 20% du haut et 55% du bas
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0
    });

    sections.forEach(section => observateur.observe(section));
})();

// ============================================================
// MODALES LÉGALES (Mentions légales / Politique de confidentialité)
// ============================================================

(function() {
    const fondModale = document.getElementById('fond-modale');
    const liensOuverture = document.querySelectorAll('[data-ouvrir-modale]');
    const boutonsFermeture = document.querySelectorAll('[data-fermer-modale]');

    if (!fondModale) return;

    function ouvrirModale(nomModale) {
        // on désactive d'abord toutes les modales, puis on active la bonne
        document.querySelectorAll('.modale').forEach(m => m.classList.remove('actif'));

        const modaleCible = document.getElementById(`modale-${nomModale}`);
        if (!modaleCible) return;

        modaleCible.classList.add('actif');
        fondModale.classList.add('actif');
        document.body.classList.add('menu-ouvert'); // réutilise le blocage de scroll déjà en place
    }

    function fermerModale() {
        fondModale.classList.remove('actif');
        document.body.classList.remove('menu-ouvert');
        // on attend la fin de la transition avant de vraiment masquer le contenu
        setTimeout(() => {
            document.querySelectorAll('.modale').forEach(m => m.classList.remove('actif'));
        }, 250);
    }

    liensOuverture.forEach(lien => {
        lien.addEventListener('click', (evenement) => {
            evenement.preventDefault();
            const nomModale = lien.getAttribute('data-ouvrir-modale');
            ouvrirModale(nomModale);
        });
    });

    boutonsFermeture.forEach(bouton => {
        bouton.addEventListener('click', fermerModale);
    });

    // clic sur le fond sombre (en dehors de la boîte blanche) → ferme aussi
    fondModale.addEventListener('click', (evenement) => {
        if (evenement.target === fondModale) {
            fermerModale();
        }
    });

    // touche Échap → ferme
    document.addEventListener('keydown', (evenement) => {
        if (evenement.key === 'Escape' && fondModale.classList.contains('actif')) {
            fermerModale();
        }
    });
})();