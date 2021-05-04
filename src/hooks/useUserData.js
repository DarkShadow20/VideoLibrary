import { useContext } from "react";
import { UserDataContext } from "../context";
import { useVideoData } from "../hooks";

export const useUserData = () => {
  const { state, dispatch } = useContext(UserDataContext);

  const { videoList } = useVideoData();

  const getVideoById = (id) => {
    return videoList.find((video) => video.id === id);
  };

  const getSelectedPlaylist = (id) => {
    return state.find((playlist) => playlist.id === id);
  };

  const isLiked = (id) => {
    return state
      .find(({ id }) => id === "LIKED")
      .videos.some((video) => video.id === id);
  };

  const toggleLiked = (id) => {
    if (!isLiked(id)) {
      const video = getVideoById(id);

      dispatch({
        type: "LIKE_VIDEO",
        payload: {
          video
        }
      });
    } else {
      dispatch({
        type: "UNLIKE_VIDEO",
        payload: {
          id
        }
      });
    }
  };

  const isSaved = (id) => {
    return state
      .find(({ id }) => id === "WATCH_LATER")
      .videos.some((video) => video.id === id);
  };

  const toggleSaved = (id) => {
    if (!isSaved(id)) {
      const video = getVideoById(id);

      dispatch({
        type: "SAVE_VIDEO",
        payload: {
          video
        }
      });
    } else {
      dispatch({
        type: "UNSAVE_VIDEO",
        payload: {
          id
        }
      });
    }
  };

  const editPlaylistOnClick = (id, newName) => {
    dispatch({
      type: "EDIT_PLAYLIST",
      payload: {
        id,
        newName
      }
    });
  };

  const deletePlaylistOnClick = (id) => {
    dispatch({
      type: "DELETE_PLAYLIST",
      payload: {
        id
      }
    });
  };

  const creatNewPlaylist = (name) => {
    dispatch({
      type: "CREATE_NEW_PLAYLIST",
      payload: {
        name
      }
    });
  };

  const getTotalCustomPlaylists = () => {
    return state
      .filter(
        (list) =>
          list.id !== "LIKED" &&
          list.id !== "WATCH_LATER" &&
          list.id !== "HISTORY"
      )
      .map(({ id, name }) => ({ id, name }));
  };

  const isVideoInPlaylist = (playlistId, id) => {
    return state
      .find((list) => list.id === playlistId)
      .videos.some((video) => video.id === id);
  };

  const togglePlaylist = (playlistId, id) => {
    if (isVideoInPlaylist(playlistId, id)) {
      dispatch({
        type: "REMOVE_VIDEO_FROM_PLAYLIST",
        payload: {
          playlistId,
          id
        }
      });
    } else {
      const video = getVideoById(id);
      dispatch({
        type: "ADD_VIDEO_TO_PLAYLIST",
        payload: {
          playlistId,
          video
        }
      });
    }
  };

  const addToHistoryOnClick = (id) => {
    const video = getVideoById(id);

    dispatch({
      type: "ADD_TO_HISTORY",
      payload: {
        video
      }
    });
  };

  const isInHistory = (id) => {
    return state
      .find(({ id }) => id === "HISTORY")
      .videos.some((video) => video.id === id);
  };

  const clearHistory = () => {
    dispatch({
      type: "CLEAR_HISTORY"
    });
  };

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
    isSaved,
    toggleSaved,
    getSelectedPlaylist
  };
};