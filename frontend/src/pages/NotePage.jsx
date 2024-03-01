import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

function NotePage() {
  const { noteId } = useParams();
  const iframeRef = useRef(null);
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.designMode = "On";

    doc.addEventListener("keydown", handleKeyDown);

    // Fetch note
    const fetchNote = async () => {
      const response = await fetch(`http://localhost:3000/notes/${noteId}`);
      const note = await response.json();
      reset({
        title: note[0].name,
        content: note[0].content,
      });
      doc.body.innerHTML = note[0].content;
    };

    fetchNote();
  }, [noteId, reset]);

  const handleKeyDown = (event) => {
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    if (event.key === "Enter") {
      event.preventDefault();
      doc.execCommand("insertHTML", false, "<br><br>");
      setValue("content", doc.body.innerHTML);
    } else if (event.key.length === 1) {
      event.preventDefault();
      doc.execCommand("insertText", false, event.key);
      setValue("content", doc.body.innerHTML);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("title")} placeholder="Title" />
        <button type="submit">Submit</button>
        <iframe
          ref={iframeRef}
          style={{ width: "100%", height: "300px", color: "red" }}
        />
        <textarea
          {...register("content")}
          style={{ width: "100%", height: "300px", display: "block" }}
          readOnly
        />
      </form>
    </div>
  );
}

export default NotePage;
