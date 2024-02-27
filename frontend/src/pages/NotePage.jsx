import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function NotePage() {
  const { noteId } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3000/notes/${noteId}`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);

  // Now you can use noteId to fetch and display the specific note
}
export default NotePage;
