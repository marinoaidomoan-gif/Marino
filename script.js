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

// ============================================================
// FILTRE PORTFOLIO
// ============================================================

(function() {
    const boutonsFiltre = document.querySelectorAll('.bouton-filtre');
    const cartesProjet = document.querySelectorAll('.carte-projet-v');

    if (!boutonsFiltre.length || !cartesProjet.length) return;

    boutonsFiltre.forEach(bouton => {
        bouton.addEventListener('click', () => {
            const filtreChoisi = bouton.getAttribute('data-filtre');

            // état visuel du bouton actif
            boutonsFiltre.forEach(b => b.classList.remove('actif'));
            bouton.classList.add('actif');

            // affichage/masquage des cartes
            cartesProjet.forEach(carte => {
                const correspond = filtreChoisi === 'tous' || carte.getAttribute('data-filtre') === filtreChoisi;
                carte.classList.toggle('masque', !correspond);
            });
        });
    });
})();

// ============================================================
// FORMULAIRE DE CONTACT
// ============================================================

(function() {
    const formulaire = document.getElementById('formulaire-contact');
    if (!formulaire) return;

    const boutonEnvoi = document.getElementById('bouton-envoi');
    const texteBouton = boutonEnvoi.querySelector('.texte-bouton');
    const iconeEnvoi = boutonEnvoi.querySelector('.fa-paper-plane');
    const spinner = boutonEnvoi.querySelector('.spinner');
    const messageSucces = document.getElementById('message-succes');

    const regles = {
        nom: (valeur) => valeur.trim().length >= 2 ? '' : 'Merci d\'indiquer votre nom (2 caractères minimum).',
        email: (valeur) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeur.trim()) ? '' : 'Adresse email invalide.',
        sujet: (valeur) => valeur.trim().length >= 3 ? '' : 'Merci de préciser un sujet.',
        message: (valeur) => valeur.trim().length >= 10 ? '' : 'Votre message doit contenir au moins 10 caractères.'
    };

    function afficherErreur(champ, texteMessage) {
        const groupe = champ.closest('.groupe-formulaire');
        groupe.classList.add('erreur');

        let elementErreur = groupe.querySelector('.texte-erreur');
        if (!elementErreur) {
            elementErreur = document.createElement('span');
            elementErreur.className = 'texte-erreur';
            groupe.appendChild(elementErreur);
        }
        elementErreur.textContent = texteMessage;
        champ.setAttribute('aria-invalid', 'true');
    }

    function retirerErreur(champ) {
        const groupe = champ.closest('.groupe-formulaire');
        groupe.classList.remove('erreur');
        const elementErreur = groupe.querySelector('.texte-erreur');
        if (elementErreur) elementErreur.remove();
        champ.removeAttribute('aria-invalid');
    }

    function validerChamp(champ) {
        const regle = regles[champ.name];
        if (!regle) return true;

        const messageErreur = regle(champ.value);
        if (messageErreur) {
            afficherErreur(champ, messageErreur);
            return false;
        }
        retirerErreur(champ);
        return true;
    }

    // validation en direct à la sortie du champ
    Object.keys(regles).forEach(nomChamp => {
        const champ = formulaire.elements[nomChamp];
        if (champ) {
            champ.addEventListener('blur', () => validerChamp(champ));
        }
    });

    formulaire.addEventListener('submit', async (evenement) => {
        evenement.preventDefault();

        // honeypot : si rempli, c'est un bot → on ignore silencieusement
        const honeypot = formulaire.elements['honeypot'];
        if (honeypot && honeypot.value.trim() !== '') {
            return;
        }

        // validation de tous les champs
        let formulaireValide = true;
        Object.keys(regles).forEach(nomChamp => {
            const champ = formulaire.elements[nomChamp];
            if (champ && !validerChamp(champ)) {
                formulaireValide = false;
            }
        });

        if (!formulaireValide) return;

        // état "envoi en cours"
        boutonEnvoi.disabled = true;
        texteBouton.textContent = 'Envoi en cours...';
        iconeEnvoi.style.display = 'none';
        spinner.style.display = 'inline-flex';

        try {
            const donnees = new FormData(formulaire);
            const reponse = await fetch(formulaire.action, {
                method: 'POST',
                body: donnees,
                headers: { 'Accept': 'application/json' }
            });

            if (reponse.ok) {
                formulaire.reset();
                messageSucces.classList.add('actif');

                // referme automatiquement après 8 secondes et réaffiche le formulaire
                setTimeout(() => {
                    messageSucces.classList.remove('actif');
                }, 8000);
            } else {
                throw new Error('Réponse non valide du serveur');
            }
        } catch (erreur) {
            texteBouton.textContent = 'Erreur, réessayer';
            setTimeout(() => {
                texteBouton.textContent = 'Envoyer le message';
            }, 3000);
        } finally {
            boutonEnvoi.disabled = false;
            iconeEnvoi.style.display = 'inline-flex';
            spinner.style.display = 'none';
            if (messageSucces.classList.contains('actif')) {
                texteBouton.textContent = 'Envoyer le message';
            }
        }
    });
})();

// ============================================================
// BOUTON RETOUR EN HAUT
// ============================================================

(function() {
    const boutonRemonter = document.getElementById('bouton-remonter');
    if (!boutonRemonter) return;

    // affiche le bouton après avoir scrollé plus d'une hauteur d'écran
    function gererVisibilite() {
        if (window.scrollY > window.innerHeight) {
            boutonRemonter.classList.add('visible');
        } else {
            boutonRemonter.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', gererVisibilite, { passive: true });
    gererVisibilite(); // état correct si la page est rechargée en cours de scroll

    boutonRemonter.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ============================================================
// ANIMATIONS AU SCROLL (Parcours, Services, Portfolio)
// ============================================================

(function() {
    // pas d'animation du tout si l'utilisateur préfère un mouvement réduit
    const reduitMouvement = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduitMouvement) return;

    const groupesAnimes = [
        { selecteur: '.etape-parcours', delaiEntre: 150 },
        { selecteur: '.ligne-service', delaiEntre: 100 },
        { selecteur: '.carte-projet-v', delaiEntre: 90 }
    ];

    const observateur = new IntersectionObserver((entrees, obs) => {
        entrees.forEach(entree => {
            if (entree.isIntersecting) {
                entree.target.classList.add('visible');
                obs.unobserve(entree.target); // ne se joue qu'une fois
            }
        });
    }, {
        threshold: 0.15
    });

    groupesAnimes.forEach(({ selecteur, delaiEntre }) => {
        const elements = document.querySelectorAll(selecteur);
        elements.forEach((element, index) => {
            element.style.setProperty('--delai', `${(index % 6) * delaiEntre}ms`);
            observateur.observe(element);
        });
    });
})();