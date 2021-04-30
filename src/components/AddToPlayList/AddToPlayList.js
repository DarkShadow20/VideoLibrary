import { useRef } from "react";
import { useUserData } from "../../hooks";
import { CreatePlaylist } from "../../components";
import "./AddToPlayList.css";

export const AddToPlayList = ({ id }) => {
  const divRef = useRef(null);
  const {
    getTotalCustomPlaylists,
    isVideoInPlaylist,
    togglePlaylist
  } = useUserData();

  const isChecked = getTotalCustomPlaylists().some((list) =>
    isVideoInPlaylist(list.id, id)
  );

  return (
    <div className="wrapper" >
      <button
        data-tooltip={"Playlist"}
        className="btn-icons"
        onClick={() => {
          divRef.current.style.display = "grid";
        }}
      >
        <div
          className="icon"
          style={{ color: isChecked ? "red" : "white" }}
        >
          <i className="fa fa-plus"></i>
        </div>
      </button>

      <div className="wrapper2" ref={divRef}>
        {getTotalCustomPlaylists().map((list) => {
          return (
            <label key={list.id} htmlFor={list.id}>
              <input
                type="checkbox"
                checked={isVideoInPlaylist(list.id, id)}
                id={list.id}
                onChange={() => togglePlaylist(list.id, id)}
              />
              {list.name}
            </label>
          );
        })}
        <CreatePlaylist />
        <button onClick={() => (divRef.current.style.display = "none")}>
          Close
        </button>
      </div>
    </div>
  );
};