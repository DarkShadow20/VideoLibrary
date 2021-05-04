import { v4 } from "uuid";

export const userDataReducer = (state, action) => {
  switch (action.type) {
    case "LIKE_VIDEO":
      return [
        ...state.map((list) => {
          if (list.id === "LIKED") {
            return {
              ...list,
              videos: [action.payload.video, ...list.videos]
            };
          }
          return list;
        })
      ];

    case "UNLIKE_VIDEO":
      return [
        ...state.map((list) => {
          if (list.id === "LIKED") {
            return {
              ...list,
              videos: list.videos.filter(
                (video) => video.id !== action.payload.id
              )
            };
          }
          return list;
        })
      ];

    case "SAVE_VIDEO":
      return [
        ...state.map((list) => {
          if (list.id === "WATCH_LATER") {
            return {
              ...list,
              videos: [action.payload.video, ...list.videos]
            };
          }
          return list;
        })
      ];

    case "UNSAVE_VIDEO":
      return [
        ...state.map((list) => {
          if (list.id === "WATCH_LATER") {
            return {
              ...list,
              videos: list.videos.filter(
                (video) => video.id !== action.payload.id
              )
            };
          }
          return list;
        })
      ];

    case "EDIT_PLAYLIST":
      return [
        ...state.map((list) => {
          if (list.id === action.payload.id) {
            return { ...list, name: action.payload.newName };
          }
          return list;
        })
      ];

    case "DELETE_PLAYLIST":
      return [...state.filter((list) => list.id !== action.payload.id)];

    case "CREATE_NEW_PLAYLIST":
      return [
        {
          id: v4(),
          name: action.payload.name,
          videos: []
        },
        ...state
      ];

    case "ADD_VIDEO_TO_PLAYLIST":
      return [
        ...state.map((list) => {
          if (list.id === action.payload.playlistId) {
            return {
              ...list,
              videos: [action.payload.video, ...list.videos]
            };
          }
          return list;
        })
      ];

    case "REMOVE_VIDEO_FROM_PLAYLIST":
      return [
        ...state.map((list) => {
          if (list.id === action.payload.playlistId) {
            return {
              ...list,
              videos: list.videos.filter(
                (video) => video.id !== action.payload.id
              )
            };
          }
          return list;
        })
      ];

    case "ADD_TO_HISTORY":
      return [
        ...state.map((list) => {
          if (list.id === "HISTORY") {
            return {
              ...list,
              videos: [action.payload.video, ...list.videos]
            };
          }
          return list;
        })
      ];

    case "CLEAR_HISTORY":
      return [
        ...state.map((list) => {
          if (list.id === "HISTORY") {
            return {
              ...list,
              videos: []
            };
          }
          return list;
        })
      ];

    default:
      break;
  }
};