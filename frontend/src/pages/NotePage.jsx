import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import "../css/Notepage.css";
import backIcon from "/assets/back.svg";
import shareIcon from "/assets/share.svg";
import saveIcon from "/assets/save.svg";
import moreIcon from "/assets/more.svg";
import hash from "/assets/hash.svg";

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
  const [noteBook, setNoteBook] = useState([]);
  const [unformattedContent, setUnformattedContent] = useState("");
  const [timer, setTimer] = useState(null);
  const [note, setNote] = useState([]);

  useEffect(() => {
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.designMode = "On";

    const link = doc.createElement("link");
    link.rel = "stylesheet";
    link.href = "http://localhost:3000/css/style.css";

    doc.head.appendChild(link);

    doc.addEventListener("keydown", handleKeyDown);

    const fetchNote = async () => {
      const response = await fetch(`http://localhost:3000/notes/${noteId}`);
      const data = await response.json();
      if (response.ok) {
        const noteBookResponse = await fetch(
          `http://localhost:3000/notebook/${data[0].notebookId}`
        );
        const noteBookJson = await noteBookResponse.json();
        if (noteBookResponse.ok) {
          setNoteBook(noteBookJson);
        }
      }
      setNote(data);
      console.log(note);
      reset({
        title: data[0]?.name,
        content: data[0]?.content.unformatted,
      });
      doc.body.innerHTML = data[0]?.content.formatted;
      setWordCount(doc.body.innerText.split(" ").length);
      setUnformattedContent(doc.body.innerText);
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

    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        updateContent(doc.body.innerHTML);
      }, 1000)
    );
  };

  const updateContent = (content) => {
    setValue("content", content);
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    setUnformattedContent(doc.body.innerText);
    setWordCount(doc.body.innerText.split(" ").length);
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
      `<b style="color: ${noteBook[0]?.color};">${output}</b>`
    );
    updateContent(doc.body.innerHTML);
  };
  const handleHighlight = () => {
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    const selection = doc.getSelection();
    if (!selection.rangeCount) return false;
    let output = "";
    for (let i = 0; i < selection.rangeCount; i++) {
      output += selection.getRangeAt(i).toString();
    }

    // Check if the selected text is only whitespace
    if (!output.trim()) {
      // If the selected text is only whitespace, return early from the function
      return;
    }

    doc.execCommand(
      "insertHTML",
      false,
      `<span style="
      color: ${noteBook[0]?.color}; background: ${
        noteBook[0]?.color + 20
      }; padding:0 10px; text-align: center; border-radius: 10px; font-size: 16px; margin: 0 6px;">${output}</span>&#8203;`
    );
    updateContent(doc.body.innerHTML);
  };
  const onSubmit = async (data) => {
    const dataToSend = {
      ...data,
      content: {
        formatted: data.content,
        unformatted: unformattedContent,
      },
      updatedAt: new Date().getTime(),
    };

    const response = await fetch(`http://localhost:3000/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="head">
          <div className="container">
            <span style={{ background: noteBook[0]?.color + "09" }}>
              Editing{" "}
              <p style={{ color: noteBook[0]?.color }}>{note[0]?.name}</p>
              <p>
                Last updated:{" "}
                {new Date(note[0]?.createdAt).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </span>
            &#8226;{" "}
            <div
              className="tag"
              style={{
                backgroundColor: `${noteBook[0]?.color + 95}`,
                margin: 0,
              }}
            >
              <img src={hash} alt={hash} className="ico" />
              {noteBook[0]?.name}
            </div>
          </div>
          <div className="actions">
            <button type="button" onClick={handleHighlight}>
              {/* <img src={shareIcon} alt="" className="ico" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="ico"
              >
                <path
                  d="M18,21H6c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h12c1.657,0,3,1.343,3,3v12C21,19.657,19.657,21,18,21z"
                  opacity=""
                  fill={`${noteBook[0]?.color}`}
                />
                <path
                  d="M7,18c-0.553,0-1-0.447-1-1v-1.669C6,11.289,9.289,8,13.331,8H16c0.553,0,1,0.447,1,1s-0.447,1-1,1h-2.669C10.392,10,8,12.392,8,15.331V17C8,17.553,7.553,18,7,18z"
                  fill="#FFFFFF"
                />
                <path
                  d="M14,12.305c0,0.617,0.744,0.927,1.182,0.493l3.114-3.085c0.396-0.393,0.396-1.033,0-1.426l-3.114-3.085C14.744,4.768,14,5.079,14,5.695V12.305z"
                  fill="#FFFFFF"
                />
              </svg>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="primary-button"
              style={{
                background: `${noteBook[0]?.color}`,
              }}
            >
              <img src={saveIcon} alt="" className="ico" />
              {isSubmitting ? "Saving note..." : "Save note"}
            </button>
            <button type="button">
              <img src={moreIcon} alt="" className="ico" />
            </button>
            <p className="word-count tag" style={{ margin: 0 }}>
              {wordCount}
            </p>
          </div>
        </div>
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
      </form>
    </div>
  );
}

export default NotePage;
