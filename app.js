document.addEventListener('DOMContentLoaded', function() {
    const liensDeveloppement = document.querySelectorAll('main a[href^="#"]');

    liensDeveloppement.forEach(function(lien) {
        lien.addEventListener('click', function(event) {
            event.preventDefault(); // Empêcher la navigation par défaut
            const idDeveloppement = lien.getAttribute('href').substring(1); // Obtenir l'identifiant du développement
            const developpementContenu = document.getElementById(idDeveloppement);

            if (developpementContenu) {
                developpementContenu.style.display = 'block'; // Afficher le contenu du développement
                developpementContenu.scrollIntoView({ behavior: 'smooth' }); // Faire défiler jusqu'au développement
            }
        });
    });
});