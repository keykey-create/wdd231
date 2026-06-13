const sunIcon = `<a>Toggle Dark Mode</a>`;
const moonIcon = `<a>Toggle Dark Mode</a>`;

function applyTheme(theme) {
    const buttons = document.querySelectorAll('#theme-toggle-button');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        buttons.forEach(btn => btn.innerHTML = sunIcon);
    } else {
        document.body.classList.remove('dark-mode');
        buttons.forEach(btn => btn.innerHTML = moonIcon);
    }
}
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
}
export function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('#theme-toggle-button')) {
            toggleTheme();
        }
    });
}