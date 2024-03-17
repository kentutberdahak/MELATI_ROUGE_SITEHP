fetchAllCharacters();

async function fetchAllCharacters() {
    try {
        const response = await fetch("https://hp-api.lainocs.fr/characters");
        
        // Gestion des erreurs
        if(!response.ok) {
            throw new Error("Couldn't fetch character");
        }
        
        // Convertir la response en json
        const data = await response.json();

        // Obtenir card-container
        const cardContainer = document.querySelector('.card-container');
        
        // Parcourir le json
        for (let i = 0; i < data.length; i++) {

            // Creer une nouvelle carte
            const card = document.createElement("div");
            card.classList.add("card");

            // Obtenir l'image
            const image = document.createElement("img");
            image.src = data[i].image;
            image.alt = "Character Image";

            // Ajouter a card-content
            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            // Obtenir le nom
            const title = document.createElement('h1');
            title.textContent = data[i].name;

            // Obtenir la maison
            const description = document.createElement('p');

            // Verifier que le personnage a une maison
            if (data[i].house == "") {
                description.textContent = "No house";
            } else {
                description.textContent = data[i].house;
            }

            // Ajouter un bouton de details (profil du personnage)
            const seeDetails = document.createElement('button');
            seeDetails.classList.add('card-button');
            seeDetails.textContent = 'Details';

            // Créer le lien avec le slug et l'ID
            const detailsUrl = '../html/details.html?slug=' + data[i].slug
            seeDetails.addEventListener('click', function() {
                window.location.href = detailsUrl;
            });

            // Ajouter les donnes a card-content
            cardContent.appendChild(title);
            cardContent.appendChild(description);
            cardContent.appendChild(seeDetails);

            // Ajouter card-content a card
            card.appendChild(image);
            card.appendChild(cardContent);

            // Ajouter card a card-container
            cardContainer.appendChild(card);
        }
    }
    // Gestion des erreurs
    catch(error) {
        console.log(error);
    }
}