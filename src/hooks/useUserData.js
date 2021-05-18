import axios from "axios";
import { useContext } from "react";
import { UserDataContext } from "../context";
import { useAuth } from "./useAuth";

export const useUserData = () => {
  const { state, dispatch } = useContext(UserDataContext);
  const {userData}=useAuth();
  const videoList  = state[0].videos

  const getVideoById = (id) => {
    return videoList.find((video) => video.id === id);
  };

  const getSelectedPlaylist = (id) => {
    return state.find((playlist) => playlist.id === id);
  };

  const isLiked = (id) => {
    return state
    .find(({ id }) => id === "LIKED")
    .videos.some((video) => video.some((item)=>item.id===id))
  };

  const toggleLiked = async  (_id) => {
    let response
    if (!isLiked(_id)) {
      // const video = getVideoById(_id);
      response=await axios.post(`https://videolibrary.kunalgupta9.repl.co/liked-video/${userData._id}`,{_id})
      dispatch({
        type: "LIKE_VIDEO",
        payload: 
          response.data.likedVideo
      });
    } else {
      response=await axios.post(`https://videolibrary.kunalgupta9.repl.co/liked-video/${userData._id}`,{_id})
      dispatch({
        type: "UNLIKE_VIDEO",
        payload: {
          _id
        }
      });
    }
  };

  const editPlaylistOnClick = async (_id, name) => {
    //eslint-disable-next-line
    const response=await axios.put(`https://videolibrary.kunalgupta9.repl.co/playlist/${userData._id}`,{_id,name})
    dispatch({
      type: "EDIT_PLAYLIST",
      payload: {
        _id,
        name
      }
    });
  };

  const deletePlaylistOnClick = async(playlistId) => {
    //eslint-disable-next-line
    const response=await axios.put(`https://videolibrary.kunalgupta9.repl.co/playlist/${userData._id}/list/${playlistId}`)
    dispatch({
      type: "DELETE_PLAYLIST",
      payload: {
        playlistId
      }
    });
  };

  const creatNewPlaylist = async (name,_id) => {
    let response;
    response=await axios.post(`https://videolibrary.kunalgupta9.repl.co/playlist/${userData._id}`,{name,_id})
    dispatch({
      type: "CREATE_NEW_PLAYLIST",
      payload: 
        response.data.playlist
    });
  };

  const getTotalCustomPlaylists = () => {
    return state
      .filter(
        (list) =>
          list.id!=="VIDEO" &&
          list.id !== "LIKED" &&
          list.id !== "HISTORY"
      )
      .map(({ id, name }) => ({ id, name }));
  };

  const isVideoInPlaylist = (playlistId, id) => {
    return state
      .find((list) => list.id === playlistId)
      .videos.some((video) => video.id === id);
  };

  const togglePlaylist = async (playlistId, _id) => {

    if (isVideoInPlaylist(playlistId, _id)) {
      //eslint-disable-next-line
      const response=await axios.post(`https://videolibrary.kunalgupta9.repl.co/playlist/${userData._id}/list/${playlistId}`,{_id})
      dispatch({
        type: "REMOVE_VIDEO_FROM_PLAYLIST",
        payload: {
          playlistId,
          _id
        }
      });
    } else {
      const video = getVideoById(_id);
      //eslint-disable-next-line
      const respone=await axios.post(`https://videolibrary.kunalgupta9.repl.co/playlist/${userData._id}/list/${playlistId}`,{_id})
      dispatch({
        type: "ADD_VIDEO_TO_PLAYLIST",
        payload: {
          playlistId,
          video
        }
      });
    }
  };

  const addToHistoryOnClick = async(id) => {
    const userId=userData?._id;
    if(userId)
    {
      const response=await axios.post(`https://videolibrary.kunalgupta9.repl.co/history/${userId}`,{id})   
      dispatch({
        type: "ADD_TO_HISTORY",
        payload: response.data.history
      });
    };
  }
  const isInHistory = (id) => {
    return state
      .find(({ id }) => id === "HISTORY")
      .videos.some((video) => video.id === id);
  };

  const clearHistory = async() => {
    const userId=userData?._id
    if(userId)
    {//eslint-disable-next-line
      const response=await axios.delete(`https://videolibrary.kunalgupta9.repl.co/history/${userId}`)
      dispatch({
        type: "CLEAR_HISTORY"
      });
    };
  }
  return {
    state,
    addToHistoryOnClick,
    isInHistory,
    clearHistory,
    getVideoById,
    isVideoInPlaylist,
    togglePlaylist,
    getTotalCustomPlaylists,
    creatNewPlaylist,
    editPlaylistOnClick,
    deletePlaylistOnClick,
    isLiked,
    toggleLiked,
    getSelectedPlaylist
  };
};