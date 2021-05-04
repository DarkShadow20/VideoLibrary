import { useUserData } from "../../hooks";
import { CreatePlaylist } from "../../components";
import { useNavigate } from "react-router-dom";
import "./AllPlaylist.css";
export const AllPlaylist = ({ setRoute }) => {
  const { state } = useUserData();
  const navigate = useNavigate();

  return (
    <div className="play-wrapper">
      <div className="play-title">Your library</div>
      <div className="play-separator" />
      <div className="play-defaultPlaylistWrapper">
        <div
          className="play-playListName"
          onClick={() => navigate("/play-list/LIKED")}
        >
          Liked
        </div>
        <div
          className="play-playListName"
          onClick={() => navigate("/play-list/WATCH_LATER")}
        >
          Watch later
        </div>
      </div>
      <div className="play-customPlaylistWrapper">
        <div className="play-subtitle">
          <div> Your playlists</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              className="play-manageBtn"
              onClick={() => setRoute("manage")}
            >
              Manage
            </button>
            <div className="play-createBtn">
              <CreatePlaylist />
            </div>
          </div>
        </div>
        <div className="play-separator" />
        {state
          .filter(
            (list) =>
              list.id !== "LIKED" &&
              list.id !== "WATCH_LATER" &&
              list.id !== "HISTORY"
          )
          .map((playlist) => (
            <div
              key={playlist.id}
              className="play-playListName"
              onClick={() => navigate(`/play-list/${playlist.id}`)}
            >
              {playlist.name}
            </div>
          ))}
      </div>
    </div>
  );
};