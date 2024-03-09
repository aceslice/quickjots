// Node.js server code
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

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
// Define route to update note by ID
app.put("/notes/:id", (req, res) => {
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
    const noteIndex = notes.findIndex((note) => note.id === noteId);
    if (noteIndex === -1) {
      res.status(404).json({ error: "Note not found" });
      return;
    }

    // Update the note
    notes[noteIndex] = {
      ...notes[noteIndex],
      name: req.body.title,
      content: req.body.content,
    };
    console.log(notes[noteIndex]);

    // Write the updated notes back to the file
    fs.writeFile("./data/notes/notes.json", JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error writing notes" });
        return;
      }

      // Send the updated note as a json response
      res.json(notes[noteIndex]);
    });
  });
});
app.get("/notebook/:id", (req, res) => {
  // Read notes from file on the user's device
  fs.readFile("./data/notebooks.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error reading notebooks" });
      return;
    }

    // Parse the data as JSON and find the notebook with the specified ID
    const notebooks = JSON.parse(data);
    const noteBookId = Number(req.params.id);
    const noteBook = notebooks.find((notebook) => notebook.id === noteBookId);
    if (!noteBook) {
      res.status(404).json({ error: "Note not found" });
      return;
    }

    // Send the note as a json response
    res.json([noteBook]);
  });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
