import React, { useEffect, useState } from "react";
import hash from "/assets/hash.svg";
import useFetch from "../../hooks/useFetch";

const Card = () => {
  const [notes, setNotes] = useState([]);
  const [noteBooks, setNoteBooks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/notebooks")
      .then((response) => response.json())
      .then((data) => setNoteBooks(data))
      .catch((error) => console.error(error));
  }, []);

  const noteBooksObj = noteBooks.reduce((obj, item) => {
    obj[item.id] = { color: item.color, name: item.name };
    return obj;
  }, {});

  // Transform notes array into an object grouped by date
  const notesByDate = notes.reduce((obj, note) => {
    const date = new Date(note.createdAt).toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    if (!obj[date]) {
      obj[date] = [];
    }
    obj[date].push(note);
    return obj;
  }, {});

  return (
    <div className="card-container">
      {Object.keys(notesByDate)
        .sort()
        .reverse()
        .map((date) => (
          <React.Fragment key={date}>
            <p className="date-heading">{date}</p>
            <div className="container">
              {notesByDate[date].map((note) => {
                const notebook = noteBooksObj[note.notebookId];
                const color = notebook.color;
                const lighterColor = color + "20";
                return (
                  <a href={`notes/${note.id}`} key={note.id}>
                    <div
                      className="card"
                      key={note.id}
                      style={{
                        backgroundColor: lighterColor,
                        borderLeft: `10px solid ${color}`,
                      }}
                    >
                      <div
                        className="tag"
                        style={{ backgroundColor: `${color}95` }}
                      >
                        <img src={hash} alt={hash} className="ico" />
                        {notebook.name}
                      </div>
                      <h1 className="name">{note.name}</h1>
                      <p className="content">{note.content}</p>
                      <p className="time" style={{ color: color }}>
                        {new Date(note.createdAt).toLocaleDateString(
                          undefined,
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </React.Fragment>
        ))}
    </div>
  );
};

export default Card;
