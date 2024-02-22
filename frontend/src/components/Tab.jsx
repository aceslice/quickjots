const Tab = () => {
  let tablinks = [
    "All",
    "Computer Arch.",
    "PHP",
    "VB.Net",
    "DBMS",
    "Discrete Maths",
    "Comp. Analysis & Design",
  ];
  return (
    <div className="tab">
      {tablinks.map((tablink) => (
        <button className="tablinks" key={tablink}>
          {tablink}
        </button>
      ))}
    </div>
  );
};
export default Tab;
