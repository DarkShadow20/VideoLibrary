import {useContext} from "react";
import {VideoDataContext} from "../context";

export const useVideoData=()=>{
    return useContext(VideoDataContext);
}