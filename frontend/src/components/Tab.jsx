const Tab = () => {
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
      name: "Systems Analysis & Des.",
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

  return (
    <div className="tab">
      {noteBooks.map((notebook) => (
        <button className="tablinks" key={notebook.id}>
          {notebook.name}
        </button>
      ))}
    </div>
  );
};
export default Tab;
