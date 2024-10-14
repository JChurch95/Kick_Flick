document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM ready... Do a kick flip!!!');
    const searchForm = document.querySelector('#searchForm');
    const contactForm = document.querySelector('#contactForm');
    
    // Create an Audio object for the kick flip sound
    const kickFlipSound = new Audio('./media/do-a-kickflip.mp3');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Play the kick flip sound
            kickFlipSound.play();
            searchVideos();
        });
    } else {
        console.error("Could not find element with id 'searchForm'");
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitContactForm();
        });
    }

    // Populate the dropdown when the page loads
    populateSkaterDropdown();
});

async function populateSkaterDropdown() {
    const select = document.getElementById('skaterName');

    try {
        const response = await fetch('http://localhost:8000/api/skaters/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const skaters = await response.json();

        // Sort skaters alphabetically by last name
        skaters.sort((a, b) => {
            const lastNameA = a.skater_name.split(' ').pop().toLowerCase();
            const lastNameB = b.skater_name.split(' ').pop().toLowerCase();
            return lastNameA.localeCompare(lastNameB);
        });

        skaters.forEach(skater => {
            const option = document.createElement('option');
            option.value = skater.skater_name;
            option.textContent = skater.skater_name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching skaters:', error);
        displayError('An error occurred while fetching skaters. Please try again.');
    }
}

async function searchVideos() {
    const skaterName = document.getElementById('skaterName').value;
    const resultsDiv = document.getElementById('results');
    const skaterInfoDiv = document.getElementById('skaterInfo');
    
    if (resultsDiv) {
        resultsDiv.innerHTML = '<div class="column is-12"><progress class="progress is-primary" max="100">15%</progress></div>';
    } else {
        console.error("Could not find element with id 'results'");
        return;
    }
    
    if (skaterInfoDiv) {
        skaterInfoDiv.innerHTML = ''; // Clear previous skater info
    } else {
        console.error("Could not find element with id 'skaterInfo'");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8000/api/videos/?skater=${encodeURIComponent(skaterName)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const videos = await response.json();
        if (videos.length > 0) {
            displaySkaterInfo(videos[0]); // Display skater info
            displayVideos(videos);
        } else {
            displayError('No videos found for this skater.');
        }
    } catch (error) {
        console.error('Error fetching videos:', error);
        displayError('An error occurred while fetching videos. Please try again.');
    }
}

function displaySkaterInfo(skaterInfo) {
    const skaterInfoDiv = document.getElementById('skaterInfo');
    if (!skaterInfoDiv) {
        console.error("Could not find element with id 'skaterInfo'");
        return;
    }
    
    const pictureHtml = skaterInfo.skater_picture 
        ? `<img src="/media/${skaterInfo.skater_picture}" alt="${skaterInfo.skater_name}" class="skater-picture">`
        : '<p>No picture available</p>';

    skaterInfoDiv.innerHTML = `
        <div class="card">
            <div class="card-content">
                <div class="has-text-centered mb-4">
                    <h2 class="title is-3">${skaterInfo.skater_name}</h2>
                    ${pictureHtml}
                </div>
                <div class="skater-info">
                    <p>
                        <span class="info-label">Nationality:</span> 
                        <span class="info-value">${skaterInfo.nationality}</span>
                    </p>
                    <p>
                        <span class="info-label">Brand:</span> 
                        <span class="info-value">${skaterInfo.brand}</span>
                    </p>
                    <p>
                        <span class="info-label">Bio:</span> 
                        <span class="info-value">${skaterInfo.bio}</span>
                    </p>
                </div>
            </div>
        </div>
    `;
}

function displayVideos(videos) {
    const resultsDiv = document.getElementById('results');
    if (!resultsDiv) {
        console.error("Could not find element with id 'results'");
        return;
    }
    resultsDiv.innerHTML = '';

    if (videos.length === 0) {
        resultsDiv.innerHTML = '<div class="column is-12"><p class="has-text-centered">No videos found for this skater.</p></div>';
        return;
    }

    videos.forEach(video => {
        const videoId = extractVideoId(video.youtube_url);
        const videoColumn = document.createElement('div');
        videoColumn.className = 'column is-half';
        videoColumn.innerHTML = `
            <div class="card">
                <div class="card-content">
                    <h3 class="title is-4 video-title">${video.video_name}</h3>
                    <p class="subtitle is-6 video-date"><span class="year-label">Year:&nbsp;</span>${video.video_date}</p>
                    <div class="video-wrapper">
                        <iframe
                            src="https://www.youtube.com/embed/${videoId}"
                            frameborder="0"
                            allow="autoplay; encrypted-media"
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
        `;
        resultsDiv.appendChild(videoColumn);
    });
}

function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function displayError(message) {
    const resultsDiv = document.getElementById('results');
    if (!resultsDiv) {
        console.error("Could not find element with id 'results'");
        return;
    }
    resultsDiv.innerHTML = `<div class="column is-12"><p class="has-text-centered error">${message}</p></div>`;
}

function submitContactForm() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    // Here you would typically send the form data to your server
    // For now, we'll just log it to the console
    console.log('Form submitted:', formObject);

    // Display a success message
    alert('Thank you for your submission! Now go shred!');
    
    // Reset the form
    form.reset();
}