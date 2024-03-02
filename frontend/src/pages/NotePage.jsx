import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import "../css/Notepage.css";

function NotePage() {
  const { noteId } = useParams();
  const iframeRef = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm();
  const [wordCount, setWordCount] = useState(0);
  const [content, setContent] = useState("");
  const [unformattedContent, setUnformattedContent] = useState(""); // Add a state variable for the unformatted content
  const [timer, setTimer] = useState(null); // Add a state variable for the timer

  useEffect(() => {
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.designMode = "On";
    // Add styles to the iframe's document
    doc.head.innerHTML += `<style>
      body {
        font-family: Arial, sans-serif; /* Change font family */
        background-color: #f0f0f0; /* Change background color */
        font-size: 17px;
        /* Add more styles as needed */
      }
    </style>`;

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
      updateWordCount(note[0].content);
    };

    fetchNote();
  }, [noteId, reset]);

  const handleKeyDown = (event) => {
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    if (event.key === "Enter") {
      event.preventDefault();
      doc.execCommand("insertHTML", false, "<br><br>");
    }

    // Clear the previous timer and start a new one
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        updateContent(doc.body.innerHTML);
      }, 1000)
    ); // Update the content state after a delay of 1 second
  };

  const handleBold = () => {
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    const selection = doc.getSelection();
    if (!selection.rangeCount) return false;
    let output = "";
    for (let i = 0; i < selection.rangeCount; i++) {
      output += selection.getRangeAt(i).toString();
    }
    doc.execCommand(
      "insertHTML",
      false,
      `<b style=" color: blue;">${output}</b>`
    );
    updateContent(doc.body.innerHTML);
  };

  const updateContent = (content) => {
    setValue("content", content);
    updateWordCount(content);
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    setUnformattedContent(doc.body.innerText); // Update the unformatted content state
  };

  const updateWordCount = (content) => {
    const words = content.trim().split(/\s+/);
    setWordCount(words.length);
  };

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const dataToSend = {
      ...data,
      content: {
        formatted: data.content,
        unformatted: unformattedContent,
      },
    };
    console.log(dataToSend);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("title")} placeholder="Title" />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving note" : "Save"}
        </button>
        <button type="button" onClick={handleBold}>
          Bold
        </button>{" "}
        {/* Add a button to trigger the handleBold function */}
        <iframe
          ref={iframeRef}
          className="custom-iframe"
          width="100%"
          height="300px"
          style={{ border: "none" }}
        />
        <textarea
          {...register("content")}
          className="note-content"
          readOnly
          style={{ width: "100%", display: "none" }}
        />
        <p className="word-count">Word count: {wordCount}</p>
      </form>
    </div>
  );
}

export default NotePage;
