import { useRef, useState } from "react";
import { useUserData } from "../../hooks";
import "./CreatePlaylist.css";

export const CreatePlaylist = () => {
  const divRef = useRef(null);
  const inputRef = useRef(null);
  const [text, setText] = useState("");
  const { creatNewPlaylist } = useUserData();

  return (
    <div style={{ position: "relative" }} >
      <button
        className="create-newBtn"
        onClick={() => {
          divRef.current.style.display = "block";
          inputRef.current.focus();
        }}
      >
        New
      </button>

      <div ref={divRef} className="create-wrappers" style={{ display: "none" }}>
        <input
          type="text"
          placeholder="New playlist"
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={() => {
              divRef.current.style.display = "none";
              setText("");
            }}
          >
            x
          </button>
          <button
            onClick={() => {
              divRef.current.style.display = "none";
              if (text !== "") {
                creatNewPlaylist(text);
                setText("");
              }
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};