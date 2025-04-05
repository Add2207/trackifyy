require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");
const pool  = require("./config/db");
const spotifyRoutes = require("./routes/spotifyRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Fix "secret option required for sessions"
app.use(
    session({
        secret: process.env.SESSION_SECRET || "yourSecretKey",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Set to true if using HTTPS
    })
);

app.use('/', authRoutes);
app.use('/', spotifyRoutes);


// ✅ Serve Static Files (Frontend)
app.use(express.static(path.join(__dirname, "../frontend"))); // Serves frontend files

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

// ✅ Serve `index.html` for Root Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ✅ Database Connection Check
pool.connect()
    .then(() => console.log("🎉 Connected to PostgreSQL Database"))
    .catch((err) => console.error("Database connection error", err));

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
