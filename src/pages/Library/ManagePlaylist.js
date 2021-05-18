import { useUserData } from "../../hooks";
import { PlaylistEdit } from "../../components";
import  "./ManagePlaylist.css";

export const ManagePlaylist = ({ setRoute }) => {
  const { state } = useUserData();

  return (
    <div className="manage-wrapper" >
      {state.filter(({ id }) =>id!=="VIDEO" && id !== "LIKED"  && id !== "HISTORY").length >
      0
        ? state.filter(({ id }) => id!=="VIDEO" && id !== "LIKED"  && id !== "HISTORY").map((list) => 
        <PlaylistEdit key={list.id} playlist={list} />)
        : "No playlists."}
    </div>
  );
};