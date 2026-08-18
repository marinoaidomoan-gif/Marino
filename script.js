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