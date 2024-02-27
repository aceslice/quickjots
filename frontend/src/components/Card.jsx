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

  // const notes = [
  //   {
  //     id: 1,
  //     name: "Boolean Algebra",
  //     content:
  //       "Lorem ipsum dolor sit amet. This an industry dummy text which has been around for ages and counting",
  //     notebookId: 2,
  //     createdAt: new Date("2022-01-01T10:20:30Z").toLocaleDateString(
  //       undefined,
  //       {
  //         day: "numeric",
  //         month: "long",
  //         year: "numeric",
  //       }
  //     ),
  //     updatedAt: new Date().getDate(),
  //   },
  //   {
  //     id: 2,
  //     name: "Multiplexers",
  //     content:
  //       "Lorem ipsum dolor sit amet. This an industry dummy text which has been around for ages and counting",
  //     notebookId: 6,
  //     createdAt: new Date("2022-01-02T11:30:45Z").toLocaleDateString(
  //       undefined,
  //       {
  //         day: "numeric",
  //         month: "long",
  //         year: "numeric",
  //       }
  //     ),
  //     updatedAt: new Date().getDate(),
  //   },
  //   {
  //     id: 3,
  //     name: "Process Scheduling",
  //     content:
  //       "Lorem ipsum dolor sit amet. This an industry dummy text which has been around for ages and counting",
  //     notebookId: 1,
  //     createdAt: new Date("2022-01-03T12:40:50Z").toLocaleDateString(
  //       undefined,
  //       {
  //         day: "numeric",
  //         month: "long",
  //         year: "numeric",
  //       }
  //     ),
  //     updatedAt: new Date().getDate(),
  //   },
  //   {
  //     id: 4,
  //     name: "Conditional Statements",
  //     content:
  //       "Lorem ipsum dolor sit amet. This an industry dummy text which has been around for ages and counting",
  //     notebookId: 8,
  //     createdAt: new Date("2022-01-05T14:00:00Z").toLocaleDateString(
  //       undefined,
  //       {
  //         day: "numeric",
  //         month: "long",
  //         year: "numeric",
  //       }
  //     ),
  //     updatedAt: new Date().getDate(),
  //   },
  //   {
  //     id: 5,
  //     name: "Process Scheduling",
  //     content:
  //       "Lorem ipsum dolor sit amet. This an industry dummy text which has been around for ages and counting",
  //     notebookId: 4,
  //     createdAt: new Date("2022-01-05T14:00:00Z").toLocaleDateString(
  //       undefined,
  //       {
  //         day: "numeric",
  //         month: "long",
  //         year: "numeric",
  //       }
  //     ),
  //     updatedAt: new Date().getDate(),
  //   },
  //   // Add more notes here
  // ];

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
                        {note.createdAt}
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
