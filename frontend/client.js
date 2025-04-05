const BACKEND_URL = "http://localhost:3001";

// Get access_token from URL (after login)
const accessToken = new URLSearchParams(window.location.search).get("access_token");

if (accessToken) {
    localStorage.setItem("access_token", accessToken);
    window.history.replaceState({}, document.title, "/"); // Clean URL
}

const storedAccessToken = localStorage.getItem("access_token");

if (storedAccessToken) {
    document.getElementById("spotify-login").style.display = "none";
    loadUserData(storedAccessToken);
    loadTopTracks(storedAccessToken);
    loadRecentlyPlayed(storedAccessToken);
    loadTopArtists(storedAccessToken);
} else {
    document.getElementById("spotify-login").addEventListener("click", login);
}

// Redirect to backend for Spotify login
function login() {
    window.location.href = `${BACKEND_URL}/login`;
}

// Logout function
function logout() {
    localStorage.removeItem("access_token");
    window.location.href = `${BACKEND_URL}/logout`;
}

// Add Logout button dynamically
const logoutButton = document.createElement("button");
logoutButton.innerText = "Logout";
logoutButton.onclick = logout;
document.body.appendChild(logoutButton);

function renderTrackCard(track) {
    return `
    <div class="music-card">
        <img src="${track.album.images[0]?.url}" alt="Album Cover">
        <div class="info">
            <h5>${track.name}</h5>
            <p>${track.artists.map(a => a.name).join(", ")}</p>
        </div>
    </div>`;
}

function renderArtistCard(artist) {
    return `
    <div class="col-6 col-sm-4 col-md-3 artist-card">
        <img src="${artist.images[0]?.url}" alt="${artist.name}">
        <h6>${artist.name}</h6>
    </div>`;
}

// Load user profile data
async function loadUserData(token) {
    try {
        const response = await fetch(`${BACKEND_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();

        if (data.display_name) {
            document.getElementById("username").innerText = `Logged in as ${data.display_name}`;
        } else {
            throw new Error("Invalid token");
        }
    } catch (error) {
        console.error("Error loading user data:", error);
        localStorage.removeItem("access_token");
    }
}

// Load Top Tracks
async function loadTopTracks(token) {
    try {
        const response = await fetch(`${BACKEND_URL}/top-tracks`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();

        const container = document.getElementById("top-tracks");
        container.innerHTML = "<h2>Top Tracks</h2>";
        data.items.forEach(track => {
            container.innerHTML += renderTrackCard(track);
        });
    } catch (err) {
        console.error("Error loading top tracks:", err);
    }
}

// Load Recently Played
async function loadRecentlyPlayed(token) {
    try {
        const response = await fetch(`${BACKEND_URL}/recently-played`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();

        const container = document.getElementById("recently-played");
        container.innerHTML = "<h2>Recently Played</h2>";
        data.items.forEach(item => {
            container.innerHTML += renderTrackCard(item.track);
        });
    } catch (err) {
        console.error("Error loading recently played:", err);
    }
}

// Load Top Artists
async function loadTopArtists(token) {
    try {
        const response = await fetch(`${BACKEND_URL}/top-artists`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();

        const container = document.getElementById("top-artists");
        container.innerHTML = "<h2>Top Artists</h2>";
        data.items.forEach(artist => {
            container.innerHTML += renderArtistCard(artist);
        });
    } catch (err) {
        console.error("Error loading top artists:", err);
    }
}
