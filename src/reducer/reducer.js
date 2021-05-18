export const userDataReducer = (state, action) => {
  switch (action.type) {
    case "SET_VIDEO":
      return [...state.map((list)=>{
        if(list.id==="VIDEO"){
          return {...list,videos:action.payload}
        };return list;
      })]
    case "LIKE_VIDEO":  
      return [
        ...state.map((list) => {
          if (list.id === "LIKED") {
            return {
              ...list,
              videos: [action.payload, ...list.videos]
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
              videos:[ list.videos.filter(
                (video) => video.filter((item)=>item.id!==action.payload._id)
              )]
            };
          }
          return list;
        })
      ];

    case "EDIT_PLAYLIST":
      return [
        ...state.map((list) => {
          if (list.id === action.payload.id) {
            return { ...list, name: action.payload.name };
          }
          return list;
        })
      ];

    case "DELETE_PLAYLIST":
      return [...state.filter((list) => list.id !== action.payload.playlistId)];
    
    case "GET_PLAYLIST":
      
      let idArr=action.payload.map((items)=>(items.id))
      let idStateArr=state.map((items)=>(items.id))
      let nameArr=action.payload.map((items)=>(items.name))
      let nameStateArr=state.map((items)=>(items.name))
      
      
      let idArrLen=idArr.length;
      let nameArrLen=nameArr.length;

      for(let k=0;k<idArrLen;k++){
        if(idStateArr.includes(idArr[k])){
          continue
        }
        else{
          state.push(action.payload[k])
        }
      }
      for(let k=0;k<nameArrLen;k++){
        if(nameStateArr.includes(nameArr[k])){
          continue
        }
        else{
          state[k+3]=action.payload[k]
        }
      }
      return [...state];
      
    case "CREATE_NEW_PLAYLIST":
      
      return [
        ...state,
        {
          id:action.payload.id,
          name: action.payload.name,
          videos: action.payload.videos,
          active: action.payload.active
        }
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
              videos: [action.payload, ...list.videos]
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
      case "LOGOUT":
        state=[{
              id:"VIDEO",
              name:"Videos",
              videos:[]
            },
            {
              id: "LIKED",
              name: "Liked",
              videos: []
            },
            {
              id: "HISTORY",
              name: "History",
              videos: []
            },
          ];
        return state
    default:
      break;
  }
};