let allActivitiesData = [];

const getActivitiesData = async () => {
    if (allActivitiesData.length > 0) {
        return allActivitiesData;
    }
    try {
        const response = await fetch('data/activities.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allActivitiesData = await response.json();
        return allActivitiesData;
    } catch (error) {
        console.error("Failed to fetch Activity data:", error);
        return [];
    }
};

const renderActivities = (activities, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    if (activities.length === 0) {
        container.innerHTML = '<p>No Activities found.</p>';
        return;
    }
    activities.forEach((activity, index) => {
        const activityCard = document.createElement('div');
        activityCard.className = 'activity-card';
        activityCard.dataset.activityId = activity.id;
        
        //  Only lazy load images after the first row (index 2 for a 3-column grid).
        const lazyLoadAttribute = index > 2 ? 'loading="lazy"' : '';

        activityCard.innerHTML = `
            <img src="${activity.imageUrl}" alt="A photo of ${activity.name}" ${lazyLoadAttribute}>
            <div class="activity-card-info">
                <h3>${activity.name}</h3>
                <p><strong>Date of Activity:</strong> ${activity.date}</p>
                <p><strong>Description:</strong> ${activity.description}</p>
            </div>
        `;
        container.appendChild(activityCard);
    });
    addCardEventListeners();
};

export const loadActivities = async (featuredOnly = false) => {
    const activities = await getActivitiesData();
    if (featuredOnly) {
        // Featured activities on the homepage are always visible first and should NOT be lazy-loaded.
        const featuredActivities = activities.slice(0, 3);
        const container = document.getElementById('featured-activities-grid');
        if (!container) return;
        container.innerHTML = '';
        featuredActivities.forEach(activity => {
             const activityCard = document.createElement('div');
            activityCard.className = 'activity-card';
            activityCard.dataset.activityId = activity.id;
            // No loading="lazy" attribute here
            activityCard.innerHTML = `
                <img src="${activity.imageUrl}" alt="A photo of ${activity.name}">
                <div class="activity-card-info">
                    <h3>${activity.name}</h3>
                    <p><strong>Date of Activity: </strong> ${activity.date}</p>
                    <p><strong>Description:</strong> ${activity.description}</p>
                </div>
            `;
            container.appendChild(activityCard);
        });
        addCardEventListeners();
    } else {

        renderActivities(activities, 'all-activities-grid');
    }
};

export const filterActivities = (org) => {
    const filteredActivities = org === 'all' 
        ? allActivitiesData 
        : allActivitiesData.filter(activity => activity.org.toLowerCase() === org);
    renderActivities(filteredActivities, 'all-activities-grid');
};

const modal = document.getElementById('activity-modal');
const modalContent = document.getElementById('modal-content');
const closeModalButton = document.getElementById('modal-close-button');

const openModal = (activityId) => {
    const activity = allActivitiesData.find(a => a.id == activityId);
    if (!activity || !modal) return;
    // Images in the modal load on-demand, so no lazy loading is needed here either.
    modalContent.innerHTML = `
        <img src="${activity.imageUrl}" alt="A photo of ${activity.name}">
        <div>
            <h2>${activity.name}</h2>
            <p><strong>Date of Activity:</strong> ${activity.date}</p>
            <p><strong>Description:</strong> ${activity.description}</p>
            <p><strong>Participants:</strong> ${activity.participants}</p>
            <p><strong>Organization:</strong> ${activity.org}</p>
        </div>
    `;
    modal.showModal();
};

if (modal) {
    closeModalButton.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
}

const addCardEventListeners = () => {
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach(card => {
        card.addEventListener('click', () => {
            openModal(card.dataset.activityId);
        });
    });
};