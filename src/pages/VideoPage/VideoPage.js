import {LikeButton,SaveButton,AddToPlayList, NavBar} from "../../components";
import {useUserData} from "../../hooks";
import { useParams} from "react-router-dom";
import ReactPlayer from "react-player";
import "./VideoPage.css";
export const VideoPage=()=>{
const { getVideoById } = useUserData();
  const {videoId}  = useParams();
  const video = getVideoById(videoId);
  return (  
    <div className="pageWrapper">
        <NavBar/>
      <div className="video-wrappers">
        <ReactPlayer url={`https://www.youtube.com/watch?v=${video.id}`} className="react-player" controls pip/>
        <div className="name">{video.title}</div>
      </div>
      <div className="actionBtnsWrapper">
        <div className="actionBtns">
        <LikeButton id={video.id} /> 
        <SaveButton id={video.id} />
        <AddToPlayList id={video.id} />
        </div>
      </div>
      <div className="videoDesc">{video.description}</div>
    </div>
  );
};