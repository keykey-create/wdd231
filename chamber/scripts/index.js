document.addEventListener("DOMContentLoaded", () => {
    const spotlightsMainBox = document.querySelector(".spotlights-main-box");
    spotlightsMainBox.innerHTML = "";

    const createSpotCard = (index) => {
        const spotCard = document.createElement("div");
        spotCard.className = `spot-card spot-card-0${index}`;

        spotCard.innerHTML = `
                <div class="title-spot">
                    <h4 id="business-name-0${index}"></h4>
                    <h3 id="tag0${index}"></h3>
                </div>
                <div class="spot-img">
                    <img src="" alt="" id="img-0${index}-spot" width="80px">
                </div>
                <div class="spot-data">
                    <p><span id="phone-0${index}"></span></p>
                    <p><a href="" id="url-0${index}"></a></p>
                    <p><span id="member-since-0${index}"></span></p>
                </div>
            `;

        return spotCard;
    };

    for (let i = 1; i <= 3; i++) {
        spotlightsMainBox.appendChild(createSpotCard(i));
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const nameBusiness01 = document.querySelector("#business-name-01");
    const nameBusiness02 = document.querySelector("#business-name-02");
    const nameBusiness03 = document.querySelector("#business-name-03");

    const phone01 = document.querySelector("#phone-01");
    const phone02 = document.querySelector("#phone-02");
    const phone03 = document.querySelector("#phone-03");

    const url01 = document.querySelector("#url-01");
    const url02 = document.querySelector("#url-02");
    const url03 = document.querySelector("#url-03");

    const member01 = document.querySelector("#member-since-01");
    const member02 = document.querySelector("#member-since-02");
    const member03 = document.querySelector("#member-since-03");

    const img01 = document.querySelector("#img-01-spot");
    const img02 = document.querySelector("#img-02-spot");
    const img03 = document.querySelector("#img-03-spot");

    try {
        const response = await fetch("data/members.json");
        const data = await response.json();

        const shuffledData = data.sort(() => 0.5 - Math.random());

        const businessNames = [nameBusiness01, nameBusiness02, nameBusiness03];
        const phones = [phone01, phone02, phone03];
        const urls = [url01, url02, url03];
        const members = [member01, member02, member03];
        const imgs = [img01, img02, img03];

        businessNames.forEach((nameElement, index) => {
            if (nameElement && shuffledData[index]) {
                nameElement.innerHTML = `${shuffledData[index].Name}`;
            }
        });

        phones.forEach((phone, index) => {
            if (phone && shuffledData[index]) {
                phone.innerHTML = `Phone: ${shuffledData[index].Phone}`;
            }
        });

        urls.forEach((url, index) => {
            if (url && shuffledData[index]) {
                url.href = `${shuffledData[index].Website}`;
                url.innerHTML = `Visite the website`;
            }
        });

        members.forEach((member, index) => {
            if (member && shuffledData[index]) {
                member.innerHTML = `Membership level: ${shuffledData[index].Membership}`;
            }
        });

        imgs.forEach((img, index) => {
            if (img && shuffledData[index]) {
                img.src = `${shuffledData[index].logo}`;
                img.alt = `${shuffledData[index].Name} logo`;
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});


async function getEvents() {
    try {
        const response = await fetch("data/events.json");
        const data = await response.json();
        return data.events;
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}

async function displayEvents() {
    const events = await getEvents();
    const eventsContainer = document.getElementById("events-list");

    eventsContainer.innerHTML = "";

    if (events.length === 0) {
        eventsContainer.innerHTML = "<p>No upcoming events at this time.</p>";
        return;
    }

    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    const nextEvents = events.slice(0, 3);

    // Loop through the next 3 events and create HTML to display
    nextEvents.forEach((event) => {
        const eventElement = document.createElement("div");
        eventElement.classList.add("event");

        eventElement.innerHTML = `
            <h3>${event.name}</h3>
            <p>Date: ${new Date(event.date).toDateString()}</p>
        `;

        eventsContainer.appendChild(eventElement);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    displayEvents();
});

