// ===== Footer : Année dynamique =====
document.addEventListener('DOMContentLoaded', function() {
    // 1. Année du copyright
    const yearSpan = document.getElementById('annee-copyright');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});