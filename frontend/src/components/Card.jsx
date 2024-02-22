import React from "react";
import hash from "/assets/hashtag_key.svg";

const Card = () => {
  const noteBooks = [
    {
      id: 1,
      name: "Discrete Mathematics",
      color: "#0e6ffc",
    },
    {
      id: 2,
      name: "Computer Architecture",
      color: "#ff6f00",
    },
    {
      id: 3,
      name: "Operating Systems",
      color: "#6b5b95",
    },
    {
      id: 4,
      name: "PHP",
      color: "#F3ACFF",
    },
    {
      id: 5,
      name: "VB.Net",
      color: "#A7B5FF",
    },
    // Add more notebooks here
  ];

  const noteBooksObj = noteBooks.reduce((obj, item) => {
    obj[item.id] = { color: item.color, name: item.name };
    return obj;
  }, {});

  const notes = [
    {
      id: 1,
      name: "Boolean Algebra",
      content:
        "Lorem ipsum dolor sit amet. This an industry dummy text which has been around for ages and counting",
      notebookId: 1,
      createdAt: new Date().getFullYear(),
      updatedAt: new Date().getDate(),
    },
    {
      id: 2,
      name: "Multiplexers",
      content:
        "Lorem ipsum dolor sit amet. This an industry dummy text which has been around for ages and counting",
      notebookId: 2,
      createdAt: new Date().getFullYear(),
      updatedAt: new Date().getDate(),
    },
    {
      id: 3,
      name: "Process Scheduling",
      content:
        "Lorem ipsum dolor sit amet. This an industry dummy text which has been around for ages and counting",
      notebookId: 3,
      createdAt: new Date().getFullYear(),
      updatedAt: new Date().getDate(),
    },
    // Add more notes here
  ];

  return (
    <div className="card-container">
      {notes.map((note) => {
        const notebook = noteBooksObj[note.notebookId];
        const color = notebook.color;
        const lighterColor = color + "10";
        return (
          <div
            className="card"
            key={note.id}
            style={{ backgroundColor: lighterColor }}
          >
            <div className="tag" style={{ backgroundColor: color }}>
              <img src={hash} alt="" className="ico" />
              {notebook.name}
            </div>
            <h1 className="name">{note.name}</h1>
            <p className="content">{note.content}</p>
            <p className="time" style={{ color: color }}>
              {note.createdAt}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
