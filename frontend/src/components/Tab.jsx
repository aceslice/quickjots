import useFetch from "../../hooks/useFetch";

const Tab = () => {
  const noteBooks = useFetch("http://localhost:3000/notebooks");

  return (
    <div className="tab">
      {noteBooks &&
        noteBooks.map((notebook) => (
          <button className="tablinks" key={notebook.id}>
            <a href={`notebooks/${notebook.id}`}>{notebook.name}</a>
          </button>
        ))}
    </div>
  );
};
export default Tab;
