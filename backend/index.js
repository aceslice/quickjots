// Node.js server code
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
// Define route to fetch notes
app.get("/notes", (req, res) => {
  // Read notes from file on the user's device
  fs.readFile("./data/notes/notes.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading notes");
      return;
    }
    // Send notes to the ui
    res.json(JSON.parse(data));
  });
});
app.get("/notebooks", (req, res) => {
  // Read notes from file on the user's device
  fs.readFile("./data/notebooks.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading notes");
      return;
    }
    // Send notes to the ui
    res.json(JSON.parse(data));
  });
});
// Define route to fetch note by ID
app.get("/notes/:id", (req, res) => {
  // Read notes from file on the user's device
  fs.readFile("./data/notes/notes.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error reading notes" });
      return;
    }

    // Parse the data as JSON and find the note with the specified ID
    const notes = JSON.parse(data);
    const noteId = Number(req.params.id);
    const note = notes.find((note) => note.id === noteId);
    if (!note) {
      res.status(404).json({ error: "Note not found" });
      return;
    }

    // Send the note as a json response
    res.json([note]);
  });
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
