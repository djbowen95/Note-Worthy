const express = require("express"); // Imports the Express npm package.
const app = express(); // Initiates express / stores it under a variable.
const PORT = process.env.PORT || 3001; // Either the default PORT or port 3001.

const path = require("path");
const db = require("./db/db.json")

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/notes", (req, res) => { // Get request for '/notes'.
    res.sendFile(path.join(__dirname, "public/notes.html")); // Returns 'notes.html'.
});

// 'Get /api/notes' should read the db.json file, return all saved notes - as JSON.
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", (req, res) => {
    console.info(`POST request received for notes`);
    const newNote = req.body;
    console.log("The new note is: ")
    console.log(newNote);
    res.sendFile(path.join(__dirname, "./db/db.json"));
});


app.get("*", (req, res) => { // Takes in any request other than '/notes'.
    res.sendFile(path.join(__dirname, "public/index.html")); // Returns 'index.html'.
});

/*
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    let note = createNewNote(req.body, notes);
    res.json(note);
})
*/


// 'POST /api/notes' should recieve a new note to save to the request body, add it to db.json, and then return the new note to the client.

// It should recieve a unique ID.

// Delete /api/notes/:id' - final step if time.

app.listen(PORT, () => console.log(`App now listening on PORT ${PORT}`));
