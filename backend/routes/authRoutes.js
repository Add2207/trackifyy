const express = require('express');
const axios = require('axios');
const pool = require('../config/db');
const session = require('express-session');
require('dotenv').config();
const { upsertUser, saveTopTracks, saveRecentlyPlayed, saveTopArtists } = require('../config/spotifyStorage');

const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// Spotify Authorization
router.get('/login', (req, res) => {
    const scope = 'user-read-playback-state user-read-recently-played user-top-read';
    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        scope: scope
    });

    res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
});

// Callback Route
router.get('/callback', async (req, res) => {
    const code = req.query.code;
    // if (!code) {
    //     return res.status(400).send('Authorization code not found');
    // }
    const tokenUrl = 'https://accounts.spotify.com/api/token';

    try {
        // console.log("Received auth code:", code); 
        const response = await axios.post(
            tokenUrl,
            new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        const { access_token, refresh_token, expires_in } = response.data;

        // Store token in session or database
        req.session.accessToken = access_token;

        try {
            await pool.query(
                "INSERT INTO user_tokens (access_token, refresh_token, expires_in) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
                [access_token, refresh_token, expires_in]
            );
        } catch (dbError) {
            console.error("Database insert error:", dbError);
        }

        const userRes = await axios.get("https://api.spotify.com/v1/me", {
            headers: { Authorization: `Bearer ${access_token}` }
        });

        const userId = await upsertUser(userRes.data); // Get internal user.id

        // Fetch and store top tracks
        const topTracks = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
            headers: { Authorization: `Bearer ${access_token}` }
        });
        await saveTopTracks(userId, topTracks.data.items);

        // Fetch and store recently played
        const recentlyPlayed = await axios.get("https://api.spotify.com/v1/me/player/recently-played", {
            headers: { Authorization: `Bearer ${access_token}` }
        });
        await saveRecentlyPlayed(userId, recentlyPlayed.data.items);

        // Fetch and store top artists
        const topArtists = await axios.get("https://api.spotify.com/v1/me/top/artists", {
            headers: { Authorization: `Bearer ${access_token}` }
        });
        await saveTopArtists(userId, topArtists.data.items);

        res.redirect(`http://localhost:3001?access_token=${access_token}`); // Redirect to frontend with token
    } catch (error) {
        console.error('Error getting token:', error.response?.data || error);
        res.status(500).send('Authentication failed');
    }
});

module.exports = router;

