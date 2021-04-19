import {createContext,useState} from "react";
import {videoList as data} from "../db";

export const VideoDataContext=createContext();

export const VideoDataProvider=({children})=>{
  const[videoList,setVideoList]=useState(data);
  return(
    <VideoDataContext.Provider value={{videoList,setVideoList}}>
      {children}
    </VideoDataContext.Provider>
  )
}