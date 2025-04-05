const express = require("express");
const axios = require("axios");

const router = express.Router();

// Middleware to extract access token
function getToken(req) {
    const authHeader = req.headers.authorization;
    return authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
}

// Top Tracks
router.get("/top-tracks", async (req, res) => {
    const token = getToken(req);
    if (!token) return res.status(401).json({ error: "Missing access token" });

    try {
        const response = await axios.get("https://api.spotify.com/v1/me/top/tracks?limit=5", {
            headers: { Authorization: `Bearer ${token}` },
        });
        res.json(response.data);
    } catch (err) {
        console.error("Error getting top tracks:", err.response?.data || err);
        res.status(500).json({ error: "Failed to get top tracks" });
    }
});

// Recently Played
router.get("/recently-played", async (req, res) => {
    const token = getToken(req);
    if (!token) return res.status(401).json({ error: "Missing access token" });

    try {
        const response = await axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=5", {
            headers: { Authorization: `Bearer ${token}` },
        });
        res.json(response.data);
    } catch (err) {
        console.error("Error getting recently played:", err.response?.data || err);
        res.status(500).json({ error: "Failed to get recently played" });
    }
});

// Top Artists
router.get("/top-artists", async (req, res) => {
    const token = getToken(req);
    if (!token) return res.status(401).json({ error: "Missing access token" });

    try {
        const response = await axios.get("https://api.spotify.com/v1/me/top/artists?limit=5", {
            headers: { Authorization: `Bearer ${token}` },
        });
        res.json(response.data);
    } catch (err) {
        console.error("Error getting top artists:", err.response?.data || err);
        res.status(500).json({ error: "Failed to get top artists" });
    }
});

module.exports = router;
