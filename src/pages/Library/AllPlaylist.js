import {useContext, useEffect, useState} from "react";
import { useUserData,useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllPlaylist.css";
import { UserDataContext } from "../../context";
import Loader from "react-loader-spinner";
export const AllPlaylist = ({ setRoute }) => {
  const { state } = useUserData();
  const {dispatch}=useContext(UserDataContext);
  const navigate = useNavigate();
  const {userData}=useAuth();
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    (async function(){
      try{
        setLoading(true)
      let{data:{playlist}}=await axios.get(`https://8189ec78-7429-4fd0-b496-a077b74d5ee9.id.repl.co/playlist/${userData?._id}`)
      dispatch({type:"GET_PLAYLIST",payload:playlist})
      setLoading(false)
      }catch(err){
        setLoading(false);
        console.log(err);
      }
    })()
    //eslint-disable-next-line
  },[])
  return (
    <>
    {loading?(
      <div className="loader">
      <Loader type="ThreeDots" color="#fff" height={80} width={80} />
  </div>
    ):(<div className="play-wrapper">
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
      {state.filter(
          (list) =>
            list.id!=="VIDEO" &&  
            list.id !== "LIKED" &&
            list.id !== "HISTORY"
        )
        .map((playlist) => (
          <div
            key={playlist.id}
            className="play-playListName"
            onClick={() => navigate(`/play-list/${playlist?.id}`)}
          >
            {playlist.name}
          </div>
        ))}
    </div>
  </div>)}
    
    </>
  );
};