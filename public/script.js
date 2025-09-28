document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule-container');
    const searchInput = document.getElementById('category-search');
    const loader = document.querySelector('.loader');
    let allTalks = [];

    // Fetch talk data from the backend
    fetch('/api/talks')
        .then(response => response.json())
        .then(data => {
            loader.style.display = 'none'; // Hide loader on success
            allTalks = data;
            renderSchedule(allTalks);
        })
        .catch(error => {
            loader.style.display = 'none'; // Hide loader on error
            console.error('Error fetching talk data:', error);
            scheduleContainer.innerHTML = '<p style="color: red;">Could not load schedule. Please try again later.</p>';
        });