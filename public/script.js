document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule-container');
    const searchInput = document.getElementById('category-search');
    let allTalks = [];

    // Fetch talk data from the backend
    fetch('/api/talks')
        .then(response => response.json())
        .then(data => {
            allTalks = data;
            renderSchedule(allTalks);
        })
        .catch(error => {
            console.error('Error fetching talk data:', error);
            scheduleContainer.innerHTML = '<p style="color: red;">Could not load schedule. Please try again later.</p>';
        });

    // Add event listener for the search input
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const talkElements = document.querySelectorAll('.slot:not(.break):not(.lunch)');

        talkElements.forEach(talkElement => {
            const categories = talkElement.dataset.categories.toLowerCase();
            if (categories.includes(searchTerm)) {
                talkElement.classList.remove('hidden');
            } else {
                talkElement.classList.add('hidden');
            }
        });
    });

    // Function to render the entire schedule
    function renderSchedule(talks) {
        scheduleContainer.innerHTML = ''; // Clear existing content
        let currentTime = new Date();
        currentTime.setHours(10, 0, 0, 0); // Event starts at 10:00 AM

        talks.forEach((talk, index) => {
            // Add talk slot
            const talkEndTime = new Date(currentTime.getTime() + talk.duration * 60000);
            const talkSlot = createTalkSlot(talk, currentTime, talkEndTime);
            scheduleContainer.appendChild(talkSlot);

            // Update current time for the next event
            currentTime = talkEndTime;

            // Add break or lunch
            if (index === 2) { // Lunch break after the 3rd talk
                const lunchEndTime = new Date(currentTime.getTime() + 60 * 60000);
                const lunchSlot = createBreakSlot('Lunch Break', 'lunch', currentTime, lunchEndTime);
                scheduleContainer.appendChild(lunchSlot);
                currentTime = lunchEndTime;
            } else if (index < talks.length - 1) { // 10-min break between other talks
                const breakEndTime = new Date(currentTime.getTime() + 10 * 60000);
                const breakSlot = createBreakSlot('Transition', 'break', currentTime, breakEndTime);
                scheduleContainer.appendChild(breakSlot);
                currentTime = breakEndTime;
            }
        });
    }

    // Function to create a single talk slot HTML element
    function createTalkSlot(talk, startTime, endTime) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.dataset.categories = talk.category.join(', ');

        const time = formatTime(startTime) + ' - ' + formatTime(endTime);

        slot.innerHTML = `
            <div class="time">${time}</div>
            <div class="details">
                <h2>${talk.title}</h2>
                <p class="speakers">By: ${talk.speakers.join(', ')}</p>
                <p class="description">${talk.description}</p>
                <div class="categories">
                    ${talk.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                </div>
            </div>
        `;
        return slot;
    }

    // Function to create a break or lunch slot HTML element
    function createBreakSlot(title, type, startTime, endTime) {
        const slot = document.createElement('div');
        slot.className = `slot ${type}`;
        const time = formatTime(startTime) + ' - ' + formatTime(endTime);

        slot.innerHTML = `
            <div class="time">${time}</div>
            <div class="details">
                <h2>${title}</h2>
            </div>
        `;
        return slot;
    }

    // Helper function to format time as HH:MM AM/PM
    function formatTime(date) {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
});
