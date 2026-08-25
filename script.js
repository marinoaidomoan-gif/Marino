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