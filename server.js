const express = require("express"); // Imports the Express npm package.
const app = express(); // Initiates express / stores it under a variable.
const PORT = process.env.PORT || 3001; // Either the default PORT or port 3001.

const path = require("path");

app.get('/notes', (req, res) => { // Get request for '/notes'.
    res.sendFile(path.join(__dirname, "public/notes.html")); // Returns 'notes.html'.
});

app.get('*', (req, res) => { // Takes in any request other than '/notes'.
    res.sendFile(path.join(__dirname, "public/index.html")); // Returns 'index.html'.
});

// 'Get /api/notes' should read the db.json file, return all saved notes - as JSON.

// 'POST /api/notes' should recieve a new note to save to the request body, add it to db.json, and then return the new note to the client.

// It should recieve a unique ID.

// Delete /api/notes/:id' - final step if time.

app.listen(PORT, () => console.log(`App now listening on PORT ${PORT}`));
