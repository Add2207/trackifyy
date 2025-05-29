# 🎵 Trackifyy

**Trackifyy** is a full-stack web application that connects with the Spotify Web API to give users insights into their listening activity. It features a personalized dashboard showing the currently playing track, top tracks, and more — all with a clean, modern interface.

---

## 🚀 Features

* 🔐 **Login with Spotify** (OAuth 2.0 Authorization Code Flow)
* 🎧 **Currently Playing** display with real-time updates
* 📈 **Top Tracks** (short-term, medium-term, long-term)
* 🧑‍💻 Personalized greeting based on time of day
* 🎨 Modern UI inspired by Spotify
* 🌐 Deployed with GitHub Pages (frontend) + Express.js (backend)

---

## 🛠️ Tech Stack

### 🧩 Frontend

* HTML, CSS, Bootstrap
* JavaScript (Vanilla)
* Responsive design
* Hosted via GitHub Pages

### 🖥️ Backend

* Node.js + Express.js
* Spotify Web API integration
* PostgreSQL (planned for user data storage)
* dotenv for environment variables
* Modular route handling (`auth`, `track`, `spotify`)

---

## 📁 Folder Structure

```
trackifyy/
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── script.js
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── spotify.js
│   │   └── track.js
│   ├── controllers/
│   │   └── (if any)
│   └── .env
├── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/trackifyy.git
cd trackifyy
```

### 2. Set up the backend

* Navigate to the backend folder:

```bash
cd backend
```

* Install dependencies:

```bash
npm install
```

* Create a `.env` file with your Spotify credentials:

```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
REDIRECT_URI=http://localhost:3000/callback
FRONTEND_URI=http://localhost:5500
```

* Start the server:

```bash
node server.js
```

### 3. Run the frontend

You can open `frontend/index.html` directly in the browser (if testing locally), or host it using GitHub Pages or any static site service.

---

## 🔗 Links

* 🔑 [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
* 📄 [Spotify Web API Docs](https://developer.spotify.com/documentation/web-api/)
* 💻 (Optional) [Live Demo](#) — *Add once deployed*

---

## 📌 Future Enhancements

* Track listening history and store in PostgreSQL
* Add charts (e.g., top artists, genres)
* Mobile responsiveness improvements
* Dark mode toggle

---

## 🙌 Author

**Aaditya Sandeep Ardhapurkar**
Student @ Manipal Institute of Technology
Backend-focused full-stack developer | Spotify API Enthusiast

