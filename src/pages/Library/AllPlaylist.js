import {useContext, useEffect} from "react";
import { useUserData,useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllPlaylist.css";
import { UserDataContext } from "../../context";

export const AllPlaylist = ({ setRoute }) => {
  const { state } = useUserData();
  const {dispatch}=useContext(UserDataContext);
  const navigate = useNavigate();
  const {userData}=useAuth();
  useEffect(()=>{
    (async function(){
      let{data:{playlist}}=await axios.get(`https://videolibrary.kunalgupta9.repl.co/playlist/${userData?._id}`)
      dispatch({type:"GET_PLAYLIST",payload:playlist})
    })()
    //eslint-disable-next-line
  },[])
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
          </div>
        </div>
        <div className="play-separator" />
        {state
          .filter(
            (list) =>
              list.id!=="VIDEO" &&  
              list.id !== "LIKED" &&
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