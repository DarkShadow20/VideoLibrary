import {useContext,useEffect} from "react";
import {LikeButton ,AddToPlayList, NavBar} from "../../components";
import {useAuth, useUserData} from "../../hooks";
import { useParams} from "react-router-dom";
import ReactPlayer from "react-player";
import "./VideoPage.css";
import { UserDataContext } from "../../context";
import axios from "axios";

export const VideoPage=()=>{
  const {dispatch}=useContext(UserDataContext);
  const{userData}=useAuth();
  const { getVideoById } = useUserData();
  const {videoId}  = useParams();
  const video = getVideoById(videoId);
  useEffect(()=>{
    (async function(){
      let{data:{playlist}}=await axios.get(`https://videolibrary.kunalgupta9.repl.co/playlist/${userData?._id}`)
      dispatch({type:"GET_PLAYLIST",payload:playlist})
    })()
    //eslint-disable-next-line
  },[])
  return (  
    <div className="pageWrapper">
        <NavBar/>
      <div className="video-wrappers">
        <ReactPlayer url={`https://www.youtube.com/watch?v=${video.vid}`} className="react-player" width="100%" controls pip/>
        <div className="name">{video.title}</div>
      </div>
      <div className="actionBtnsWrapper">
        <div className="actionBtns">
          <LikeButton id={video.id} /> 
          <AddToPlayList id={video.id} />
        </div>
      </div>
      <div className="videoDesc">{video.description}</div>
    </div>
  );
};