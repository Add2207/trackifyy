const express = require('express');
const axios = require('axios');
const pool = require('../config/db');
const router = express.Router();

// Get User Data
router.get('/me', async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Access token required" });

    try {
        const userProfile = await axios.get("https://api.spotify.com/v1/me", {
            headers: { Authorization: `Bearer ${token}` }
        });

        res.json(userProfile.data);
    } catch (error) {
        console.error("Error fetching user profile:", error.response?.data || error);
        res.status(500).json({ error: "Failed to fetch user info" });
    }
});


module.exports = router;
