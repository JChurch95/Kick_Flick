document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM ready... Do a kick flip!!!');
    const searchForm = document.querySelector('#searchForm');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            searchVideos();
        });
    } else {
        console.error("Could not find element with id 'searchForm'");
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
    resultsDiv.innerHTML = '<div class="column is-12"><progress class="progress is-primary" max="100">15%</progress></div>';

    try {
        const response = await fetch(`http://localhost:8000/api/videos/?skater=${encodeURIComponent(skaterName)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const videos = await response.json();
        displayVideos(videos);
    } catch (error) {
        console.error('Error fetching videos:', error);
        displayError('An error occurred while fetching videos. Please try again.');
    }
}

function displayVideos(videos) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (videos.length === 0) {
        resultsDiv.innerHTML = '<div class="column is-12"><p class="has-text-centered">No videos found for this skater.</p></div>';
        return;
    }

    // Display skater info once at the top
    const skaterInfo = videos[0]; // All videos will have the same skater info
    const skaterInfoDiv = document.createElement('div');
    skaterInfoDiv.className = 'column is-12';
    skaterInfoDiv.innerHTML = `
        <div class="box">
            <h2 class="title is-3">${skaterInfo.skater_name}</h2>
            <p class="subtitle is-5">Nationality: ${skaterInfo.nationality}</p>
            <p class="subtitle is-5">Brand: ${skaterInfo.brand}</p>
            <p class="subtitle is-5">Bio: ${skaterInfo.bio}</p>
        </div>
    `;
    resultsDiv.appendChild(skaterInfoDiv);

    videos.forEach(video => {
        const videoId = extractVideoId(video.youtube_url);
        const videoColumn = document.createElement('div');
        videoColumn.className = 'column is-half';
        videoColumn.innerHTML = `
            <div class="card">
                <div class="card-content">
                    <h3 class="title is-4 video-title">${video.video_name}</h3>
                    <p class="subtitle is-6 video-date">Year: ${video.video_date}</p>
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
    resultsDiv.innerHTML = `<div class="column is-12"><p class="has-text-centered error">${message}</p></div>`;
}