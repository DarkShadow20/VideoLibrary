import { useAuth, useUserData } from "../../hooks";
import { MainSection ,NavBar} from "../../components";
import { Navigate, useParams} from "react-router-dom";
import "./Playlist.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserDataContext} from "../../context";
import Loader from "react-loader-spinner";

export const Playlist = () => {
  let idArr,selectedPlaylistVideo,playlist;
  let playlists=[];
  let playListVideoArr=[]
  const { getSelectedPlaylist } = useUserData();
  const {userData}=useAuth();
  const { playListId } = useParams();
  const {state,dispatch}=useContext(UserDataContext);
  const [loading,setLoading]=useState(false);
  let selectedPlaylist=state.filter((items)=>items.id===playListId)
  playListVideoArr=selectedPlaylist.map((items)=>(items.videos))
  if(playListVideoArr.length>0)
  {
    idArr=playListVideoArr.map((items)=>items.map((list)=>(list.id)))
    selectedPlaylistVideo=state[0].videos.filter((item)=>idArr[0].includes(item.id))
  }
  useEffect(()=>{
    (async function(){
      try{
        setLoading(true)
        const res= await axios.get("https://8189ec78-7429-4fd0-b496-a077b74d5ee9.id.repl.co/video");
        dispatch({type:"SET_VIDEO",payload:res.data.videos})
        const response=await axios.get(`https://8189ec78-7429-4fd0-b496-a077b74d5ee9.id.repl.co/liked-video/${userData?._id}`)
        dispatch({type:"LIKE_VIDEO",payload:response.data.likedVideoItems})
        setLoading(false)
      }catch(err){
        setLoading(false)
        console.log(err)
      }
    })()
    //eslint-disable-next-line
  },[])
  if(playListId===":playListId"){
    return(<>
    <Navigate to = "/library"/>
    </>)
  }
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
      playlists=selectedPlaylist[0]?.videos
    }
  }
  else{
    playlists=[]
  }
  if (playlists?.length>0 ) {
    return (
      <>
      <NavBar/>
      {loading?(<div className="loader">
            <Loader type="ThreeDots" color="#fff" height={80} width={80} />
        </div>):(
        <div className="playlist-listWrapper">
        <MainSection
          route={play.name}
          videoList={playlists}
          inLibrary={"inLibrary"}
        />
      </div>
      )}
      </>
    );
  } else {
    return (
      <>
      <NavBar/>
      {loading?(
        <div className="loader">
          <Loader type="ThreeDots" color="#fff" height={80} width={80} />
        </div>
      ):(
      <div className="playlist-wrapper" >
        <div className="playlist-emptyPrompt" >
          Add some videos here.
        </div>
      </div>
      )}
      </>
    );
  }
};