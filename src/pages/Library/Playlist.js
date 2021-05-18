import { useAuth, useUserData } from "../../hooks";
import { MainSection ,NavBar} from "../../components";
import { useParams} from "react-router-dom";
import "./Playlist.css";
import axios from "axios";
import { useContext, useEffect } from "react";
import { UserDataContext} from "../../context";

export const Playlist = () => {
  let idArr,selectedPlaylistVideo,playlist;
  let playlists=[];
  let playListVideoArr=[]
  const { getSelectedPlaylist } = useUserData();
  const {userData}=useAuth();
  const { playListId } = useParams();
  const {state,dispatch}=useContext(UserDataContext);
  let selectedPlaylist=state.filter((items)=>items.id===playListId)
  playListVideoArr=selectedPlaylist.map((items)=>(items.videos))
  
  if(playListVideoArr.length>0)
  {
    
    idArr=playListVideoArr.map((items)=>items.map((list)=>(list.id)))
    selectedPlaylistVideo=state[0].videos.filter((item)=>idArr[0].includes(item.id))

  }
  useEffect(()=>{
    (async function(){
      const response=await axios.get(`https://videolibrary.kunalgupta9.repl.co/liked-video/${userData._id}`)
      dispatch({type:"LIKE_VIDEO",payload:response.data.likedVideoItems})
    })()
    //eslint-disable-next-line
  },[])
  
  const play=getSelectedPlaylist(playListId)
  if(playListId==="LIKED"){
    playlist=state[1].videos
    if(playlist.length>0){
      playlists=playlist[0]
    }
    else{
      playlists=[]
    }
  }
  else if(playListId!=="LIKED" && playListId!=="HISTORY" && playListId!=="VIDEO"){
    playlists=selectedPlaylistVideo
    if(!selectedPlaylistVideo){
      playlists=[]
    }
  }
  else{
    playlists=[]
  }
  if (playlists.length>0 ) {
    return (
      <>
      <NavBar/>
      <div className="playlist-listWrapper">
        <MainSection
          route={play.name}
          videoList={playlists}
          inLibrary={"inLibrary"}
        />
      </div>
      </>
    );
  } else {
    return (
      <>
      <NavBar/>
      <div className="playlist-wrapper" >
        <div className="playlist-emptyPrompt" >
        Add some videos here.
        </div>
      </div>
      </>
    );
  }
};