const pool = require('./db');

async function upsertUser(userData) {
    const { id, display_name, email, country, images, external_urls } = userData;
    const profile_url = external_urls?.spotify || null;
    const image_url = images?.[0]?.url || null;

    const result = await pool.query(`
        INSERT INTO users (spotify_id, display_name, email, country, profile_url, image_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (spotify_id) DO UPDATE
        SET display_name = EXCLUDED.display_name
        RETURNING id
    `, [id, display_name, email, country, profile_url, image_url]);

    return result.rows[0].id;
}

async function saveTopTracks(userId, tracks) {
    for (const track of tracks) {
        await pool.query(`
            INSERT INTO top_tracks (user_id, track_id, name, artists, album_name, album_image, spotify_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [
            userId,
            track.id,
            track.name,
            track.artists.map(a => a.name).join(', '),
            track.album.name,
            track.album.images[0]?.url,
            track.external_urls.spotify
        ]);
    }
}

async function saveRecentlyPlayed(userId, items) {
    for (const item of items) {
        const track = item.track;
        await pool.query(`
            INSERT INTO recently_played (user_id, track_id, name, artists, played_at, album_name, album_image, spotify_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [
            userId,
            track.id,
            track.name,
            track.artists.map(a => a.name).join(', '),
            item.played_at,
            track.album.name,
            track.album.images[0]?.url,
            track.external_urls.spotify
        ]);
    }
}

async function saveTopArtists(userId, artists) {
    for (const artist of artists) {
        await pool.query(`
            INSERT INTO top_artists (user_id, artist_id, name, genres, popularity, image_url, spotify_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [
            userId,
            artist.id,
            artist.name,
            artist.genres.join(', '),
            artist.popularity,
            artist.images[0]?.url,
            artist.external_urls.spotify
        ]);
    }
}

module.exports = {
    upsertUser,
    saveTopTracks,
    saveRecentlyPlayed,
    saveTopArtists
};
