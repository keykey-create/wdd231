/**
 * The above JavaScript code fetches data of latter-day prophets from a JSON file, creates HTML
 * elements for each prophet's name and portrait, and appends them to the DOM.
 */
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  //console.table(data.prophets); // temporary testing of data response
  displayProphets(data.prophets);
}

getProphetData();

/**
 * The function `displayProphets` creates HTML elements for each prophet in the input array and appends
 * them to a parent element.
 * @param prophets - An array of objects representing prophets, where each object contains the
 * following properties:
 */
const displayProphets = (prophets) => {
  prophets.forEach(prophet => {
    const card = document.createElement('section');
    const fullName = document.createElement('h2');
    const portrait = document.createElement('img');
    const birthDate = document.createElement('p');
    const birthPlace = document.createElement('p');

    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`)
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');
    birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;


    card.appendChild(fullName);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);
    card.appendChild(portrait);
    cards.appendChild(card);
  });

  
}