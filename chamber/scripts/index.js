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

    // --- Weather API Logic --- //
    const fetchWeather = async () => {
        // --- Updated with your precise coordinates --- //
        const apiKey = 'cd8f12eec34f5f5e359243282755327d';
        const lat = -8.056422; // Your precise Latitude for Recife
        const lon = -34.885129; // Your precise Longitude for Recife
        
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        
        const weatherCard = document.querySelector('.weather-card');

        try {
            const [currentResponse, forecastResponse] = await Promise.all([
                fetch(currentWeatherUrl),
                fetch(forecastUrl)
            ]);
            
            if (!currentResponse.ok || !forecastResponse.ok) {
                 throw new Error(`API call failed: ${currentResponse.statusText} | ${forecastResponse.statusText}`);
            }
            
            const currentData = await currentResponse.json();
            const forecastData = await forecastResponse.json();
            
            displayCurrentWeather(currentData);
            displayForecast(forecastData);

        } catch (error) {
            console.error('Error fetching weather:', error);
            if (weatherCard) {
                weatherCard.innerHTML = '<p>Sorry, weather information is currently unavailable.</p>';
            }
        }
    };

    // --- Helper function to display the current weather --- //
    const displayCurrentWeather = (data) => {
        document.getElementById('current-temp').textContent = Math.round(data.main.temp);
        const description = data.weather[0].description.replace(/\b\w/g, char => char.toUpperCase());
        document.getElementById('weather-desc').textContent = description;
        const iconCode = data.weather[0].icon;
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById('weather-icon').alt = description;
    };

    // --- Helper function to display the 3-day forecast --- //
    const displayForecast = (data) => {
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = '';
        const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

        dailyForecasts.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'forecast-day';
            const dayName = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
            const temp = Math.round(day.main.temp);
            dayDiv.innerHTML = `<p>${dayName}</p><p>${temp}°C</p>`;
            forecastContainer.appendChild(dayDiv);
        });
    };

    // --- Member Spotlights Logic --- //
    const fetchMembersForSpotlight = async () => {
        const membersUrl = 'data/members.json';
        const spotlightContainer = document.getElementById('spotlight-container');

        try {
            const response = await fetch(membersUrl);
            if (!response.ok) throw new Error('Member data could not be retrieved.');
            const data = await response.json();
            
            const qualifiedMembers = data.members.filter(m => m.membershipLevel === 'Gold' || m.membershipLevel === 'Silver');
            const shuffledMembers = qualifiedMembers.sort(() => 0.5 - Math.random());
            const selectedMembers = shuffledMembers.slice(0, Math.floor(Math.random() * 2) + 2);

            displaySpotlights(selectedMembers);

        } catch (error) {
            console.error('Error fetching members:', error);
            if (spotlightContainer) {
                spotlightContainer.innerHTML = '<p>Member spotlights are currently unavailable.</p>';
            }
        }
    };
    
    // --- Helper function to display the spotlight cards --- //
    const displaySpotlights = (members) => {
        const spotlightContainer = document.getElementById('spotlight-container');
        spotlightContainer.innerHTML = '';

        members.forEach(member => {
            const card = document.createElement('div');
            card.className = 'spotlight-card';
            card.innerHTML = `
                <h3>${member.name}</h3>
                <img src="${member.image}" alt="${member.name} Logo" loading="lazy" width="150" height="100">
                <p>${member.phone}</p>
                <a href="${member.websiteURL}" target="_blank" rel="noopener noreferrer">Visit Website</a>
                <p><strong>Membership:</strong> ${member.membershipLevel}</p>
            `;
            spotlightContainer.appendChild(card);
        });
    };

    // --- Initial function calls --- //
    setupPageBasics();
    fetchWeather();
    fetchMembersForSpotlight();
    });
