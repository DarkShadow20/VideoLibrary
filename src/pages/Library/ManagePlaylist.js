import { useUserData } from "../../hooks";
import { PlaylistEdit } from "../../components";
import  "./ManagePlaylist.css";

export const ManagePlaylist = ({ setRoute }) => {
  const { state } = useUserData();

  return (
    <div className="manage-wrapper" >
      <button onClick={() => setRoute("all")}>Back</button>
      {state.filter(({ id }) => id !== "LIKED" && id !== "WATCH_LATER" && id !== "HISTORY").length >
      0
        ? state.filter(({ id }) => id !== "LIKED" && id !== "WATCH_LATER" && id !== "HISTORY").map((list) => 
        <PlaylistEdit key={list.id} playlist={list} />)
        : "No playlists."}
    </div>
  );
};