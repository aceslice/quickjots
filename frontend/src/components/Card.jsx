import React, { useEffect, useState } from "react";
import hash from "/assets/hash.svg";
import useFetch from "../../hooks/useFetch";

const Card = () => {
  const notes = useFetch("http://localhost:3000/notes");

  const noteBooks = useFetch("http://localhost:3000/notebooks");

  const noteBooksObj =
    noteBooks &&
    noteBooks.reduce((obj, item) => {
      obj[item.id] = { color: item.color, name: item.name };
      return obj;
    }, {});

  // Transform notes array into an object grouped by date
  const notesByDate =
    notes &&
    notes.reduce((obj, note) => {
      const date = new Date(note.updatedAt).toLocaleDateString(undefined, {
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
      {notes &&
        Object.keys(notesByDate)
          .sort()
          .reverse()
          .map((date) => (
            <React.Fragment key={date}>
              <p className="date-heading">{date}</p>
              <div className="container">
                {notes &&
                  notesByDate[date].map((note) => {
                    const notebook = noteBooksObj[note.notebookId];
                    const color = noteBooksObj[note.notebookId].color;
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
                          <p
                            className="content"
                            style={{
                              maxWidth: "364px",
                              maxHeight: "188px",
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 3,
                              textOverflow: "ellipsis",
                            }}
                          >
                            {note.content.unformatted ||
                              (note.content.formatted === ""
                                ? note.content.unformatted
                                : note.content.formatted)}
                          </p>
                          <p className="time" style={{ color: color }}>
                            {new Date(note.updatedAt).toLocaleDateString(
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
