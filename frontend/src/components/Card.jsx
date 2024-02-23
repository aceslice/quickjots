import React from "react";
import hash from "/assets/hash.svg";

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
      name: "System Analysis & Des.",
      color: "#6b5b95",
    },
    {
      id: 4,
      name: "PHP",
      color: "#ff1b6b",
    },
    {
      id: 5,
      name: "VB.Net",
      color: "#A7B5FF",
    },
    {
      id: 6,
      name: "Data Communication",
      color: "#582fff",
    },
    {
      id: 7,
      name: "DBMS With Oracle",
      color: "#bf0fff",
    },
    {
      id: 8,
      name: "Mini Project",
      color: "#3f4550",
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
      notebookId: 2,
      createdAt: new Date("2022-01-01T10:20:30Z").toLocaleDateString(
        undefined,
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      ),
      updatedAt: new Date().getDate(),
    },
    {
      id: 2,
      name: "Multiplexers",
      content:
        "Lorem ipsum dolor sit amet. This an industry dummy text which has been around for ages and counting",
      notebookId: 6,
      createdAt: new Date("2022-01-02T11:30:45Z").toLocaleDateString(
        undefined,
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      ),
      updatedAt: new Date().getDate(),
    },
    {
      id: 3,
      name: "Process Scheduling",
      content:
        "Lorem ipsum dolor sit amet. This an industry dummy text which has been around for ages and counting",
      notebookId: 5,
      createdAt: new Date("2022-01-03T12:40:50Z").toLocaleDateString(
        undefined,
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      ),
      updatedAt: new Date().getDate(),
    },
    {
      id: 4,
      name: "Conditional Statements",
      content:
        "Lorem ipsum dolor sit amet. This an industry dummy text which has been around for ages and counting",
      notebookId: 8,
      createdAt: new Date("2022-01-05T14:00:00Z").toLocaleDateString(
        undefined,
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      ),
      updatedAt: new Date().getDate(),
    },
    {
      id: 5,
      name: "Process Scheduling",
      content:
        "Lorem ipsum dolor sit amet. This an industry dummy text which has been around for ages and counting",
      notebookId: 4,
      createdAt: new Date("2022-01-05T14:00:00Z").toLocaleDateString(
        undefined,
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      ),
      updatedAt: new Date().getDate(),
    },
    // Add more notes here
  ];

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
                  <div
                    className="card"
                    key={note.id}
                    style={{ backgroundColor: lighterColor }}
                  >
                    <div
                      className="tag"
                      style={{ backgroundColor: `${color}95` }}
                    >
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
          </React.Fragment>
        ))}
    </div>
  );
};

export default Card;
