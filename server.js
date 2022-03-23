const express = require("express"); // Imports the Express npm package.
const app = express(); // Initiates express / stores it under a variable.
const PORT = process.env.PORT || 3001; // Either the default PORT or port 3001.

const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

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

app.get("*", (req, res) => { // Takes in any request other than '/notes'.
    res.sendFile(path.join(__dirname, "public/index.html")); // Returns 'index.html'.
});

app.post("/api/notes", (req, res) => {
    const db = fs.readFileSync('/db/db.json', 'utf8');
    console.log(db);
    const newNote = req.body;
    newNote.id = uuidv4();
    const updatedDB = db.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(updatedDB));

    res.send(`POST request for note with id ${newNote.id} recieved.`);
});

app.delete("/api/notes/:id", (req, res) => {
    const deleteID = req.params.id;
    const db = fs.readFileSync('/db/db.json', 'utf8');
    console.log(db);
    const updatedDB = db.filter((note) => note.id !== deleteID);
    fs.writeFileSync("./db/db.json", JSON.stringify(updatedDB));
    res.send(`DELETE Request Called for ${deleteID}`);
  })

app.listen(PORT, () => console.log(`App now listening on PORT ${PORT}`));
