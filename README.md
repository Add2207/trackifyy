# 🎵 Trackifyy

**Trackifyy** is a full-stack web application that connects with the Spotify Web API to give users deep insights into their listening activity. Built with a modern tech stack, it features a personalized dashboard with real-time music data, analytics, and a sleek Spotify-inspired interface.

---

## 📱 App Overview

### Main Dashboard
The application features a clean, intuitive dashboard that organizes your music data into accessible sections:

![Main Dashboard](images/dashboard.png)
)

*Main interface showing all available music insights sections*

### 🎧 Your Music Analytics

**Top Tracks**
![Top Tracks](images/top-tracks.png)
)

*Discover your most played tracks with album artwork and artist information*

**Recently Played**
![Recently Played](images/recently-played.png)
)

*Track your recent listening history with timestamps*

**Top Artists**
![Top Artists](images/top-artists.png)
)

*View your favorite artists with profile pictures and listening statistics*

**Personalized Recommendations**
![Recommendations](images/presonalized-playlist.png)
)

*Get curated playlist recommendations based on your listening habits*

---

## 🚀 Key Features

- 🔐 **Secure Spotify Authentication** - OAuth 2.0 Authorization Code Flow
- 🎧 **Real-time Currently Playing** - Live updates of your current track
- 📈 **Comprehensive Analytics** - Top tracks, artists, and genres across different time periods
- 🕒 **Listening History** - Recently played tracks with detailed metadata
- 🎯 **Smart Recommendations** - Personalized playlist suggestions
- 🌅 **Dynamic Greetings** - Time-based personalized welcome messages
- 🎨 **Spotify-inspired Design** - Clean, modern UI matching Spotify's aesthetic
- 📱 **Responsive Layout** - Optimized for desktop and mobile devices

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup structure
- **CSS3** - Custom styling with Flexbox/Grid
- **Bootstrap** - Responsive component framework
- **Vanilla JavaScript** - Dynamic interactions and API calls
- **GitHub Pages** - Static hosting deployment

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Spotify Web API** - Music data integration
- **PostgreSQL** - Relational database for user data
- **dotenv** - Environment variable management
- **Modular Architecture** - Organized route handling

---

## 🗄️ Database Schema

The application uses PostgreSQL to store user data and track listening history:

### Database Structure
![Database Schema](path/to/database-schema.png)

*Complete database schema showing table relationships*

### Table Definitions

**Users Table**
- Stores user authentication and profile information
- Links to Spotify user accounts

**Top Tracks Table**
- Captures user's favorite tracks over time
- Includes track metadata and timestamps

**Recently Played Table**
- Logs listening history with play timestamps
- Enables trend analysis and recommendations

**Top Artists Table**
- Maintains favorite artists data
- Supports artist-based recommendations

---

## 📁 Project Structure

```
trackifyy/
├── frontend/
│   ├── index.html              # Main application entry point
│   ├── css/
│   │   └── styles.css          # Custom styling and themes
│   ├── js/
│   │   └── script.js           # Client-side logic and API calls
│   └── assets/
│       └── images/             # App icons and UI elements
├── backend/
│   ├── server.js               # Express server configuration
│   ├── routes/
│   │   ├── auth.js             # Spotify OAuth handling
│   │   ├── spotify.js          # Spotify API integration
│   │   └── track.js            # Track data endpoints
│   ├── controllers/
│   │   └── spotifyController.js # Business logic layer
│   ├── config/
│   │   └── database.js         # PostgreSQL configuration
│   └── .env                    # Environment variables
├── database/
│   └── schema.sql              # Database table definitions
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- Spotify Developer Account

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/trackifyy.git
cd trackifyy
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Environment Configuration
Create a `.env` file in the backend directory:
```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
REDIRECT_URI=http://localhost:3000/callback
FRONTEND_URI=http://localhost:5500
DATABASE_URL=postgresql://username:password@localhost:5432/trackifyy
```

### 4. Database Setup
```bash
# Create database
createdb trackifyy

# Run schema
psql -d trackifyy -f database/schema.sql
```

### 5. Start the Application
```bash
# Backend server
node server.js

# Frontend (serve index.html via live server or GitHub Pages)
```

---

## 🔗 External Resources

- 🎵 [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
- 📚 [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api/)
- 🐘 [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- 🚀 [Live Demo](https://your-username.github.io/trackifyy) *(Currently offline)*

---

## 🔮 Future Enhancements

### Analytics & Insights
- [ ] Advanced listening statistics and trends
- [ ] Genre analysis and distribution charts
- [ ] Listening time heatmaps
- [ ] Comparative analytics with friends

### User Experience
- [ ] Dark/Light mode toggle
- [ ] Custom playlist creation
- [ ] Export data functionality
- [ ] Mobile app development

### Technical Improvements
- [ ] Caching layer for better performance
- [ ] API rate limiting and optimization
- [ ] Automated testing suite

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙌 Author

**Aaditya Sandeep Ardhapurkar**  
🎓 Student @ Manipal Institute of Technology  
💻 Backend-focused Full-Stack Developer  
🎵 Spotify API Enthusiast  

---

## 🌟 Acknowledgments

- Spotify for providing the comprehensive Web API
- Bootstrap team for the responsive framework
- PostgreSQL community for the robust database system
- All contributors and users who make this project better

---

*Built with ❤️ and lots of ☕ by Aaditya*
