document.addEventListener('DOMContentLoaded', () => {
    // --- Reusable Page Setup (Menu & Footer) --- //
    const setupPageBasics = () => {
        const menuButton = document.getElementById('menu-button');
        const navMenu = document.getElementById('nav-menu');
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            menuButton.textContent = navMenu.classList.contains('open') ? '✕' : '☰';
        });

        const currentYearSpan = document.getElementById('current-year');
        const lastModifiedParagraph = document.getElementById('last-modified');
        currentYearSpan.textContent = new Date().getFullYear();
        lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
    };

    // --- Local Storage Visitor Message Logic --- //
    const displayVisitorMessage = () => {
        const messageElement = document.getElementById('visitor-message');
        const lastVisit = localStorage.getItem('lastVisitDate');
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

        if (!lastVisit) {
            messageElement.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const timeDifference = now - Number(lastVisit);
            if (timeDifference < oneDay) {
                messageElement.textContent = "Welcome Back!";
            } else {
                const daysDifference = Math.floor(timeDifference / oneDay);
                const dayText = daysDifference === 1 ? "day" : "days";
                messageElement.textContent = `You last visited ${daysDifference} ${dayText} ago.`;
            }
        }
        // Store the current visit date for the next time
        localStorage.setItem('lastVisitDate', now);
    };

    // --- Fetch and Display Attractions --- //
    const fetchAttractions = async () => {
        const attractionsUrl = 'data/attractions.json';
        const grid = document.getElementById('attractions-grid');

        try {
            const response = await fetch(attractionsUrl);
            if (!response.ok) throw new Error("Attractions data could not be loaded.");
            const data = await response.json();
            displayAttractions(data.attractions);
        } catch (error) {
            console.error(error);
            grid.innerHTML = "<p>Sorry, attractions could not be displayed at this time.</p>";
        }
    };
    
    // --- Helper function to create and display attraction cards --- //
    const displayAttractions = (attractions) => {
        const grid = document.getElementById('attractions-grid');
        grid.innerHTML = ''; // Clear existing content

        attractions.forEach((attraction, index) => {
            const card = document.createElement('div');
            card.className = 'attraction-card';
            card.id = `attraction-${index + 1}`; // For grid-area targeting

            card.innerHTML = `
                <figure>
                    <img src="${attraction.image}" alt="${attraction.name}" loading="lazy" width="300" height="200">
                </figure>
                <div class="card-content">
                    <h2>${attraction.name}</h2>
                    <address>${attraction.address}</address>
                    <p>${attraction.description}</p>
                    <button>Learn More</button>
                </div>
            `;
            grid.appendChild(card);
        });
    };

    // --- Initial function calls --- //
    setupPageBasics();
    displayVisitorMessage();
    fetchAttractions();
});