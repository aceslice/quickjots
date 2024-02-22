import hash from "/assets/hashtag_key.svg";
const Card = () => {
  const noteBooks = [
    {
      id: 1,
      name: "Discrete Mathematics",
      color: "#0e6ffc",
    },
  ];
  const notes = [
    {
      id: 1,
      name: "Functions",
      content:
        "Lorem ipsum dolor sit amet. This an industry dummy text whixh has been around for ages and counting",
      notebookId: "Discrete Maths",
      createdAt: new Date().getFullYear(),
      updatedAt: new Date().getDate(),
    },
    {
      id: 2,
      name: "Multiplexers",
      content:
        "Lorem ipsum dolor sit amet. This an industry dummy text whixh has been around for ages and counting",
      notebookId: "Computer Arch.",
      createdAt: new Date().getFullYear(),
      updatedAt: new Date().getDate(),
    },
  ];
  return (
    <div className="card-container">
      {notes.map((note) => (
        <div className="card" key={note.id}>
          <div className="tag">
            <img src={hash} alt="" className="ico" />
            {note.notebookId}
          </div>
          <h1 className="name">{note.name}</h1>
          <p className="content">{note.content}</p>
          <p className="time">{note.createdAt}</p>
        </div>
      ))}
    </div>
  );
};
export default Card;
