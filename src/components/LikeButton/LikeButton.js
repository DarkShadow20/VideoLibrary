import { useContext,useEffect } from "react";
import { useUserData,useAuth } from "../../hooks";
import "./LikeButton.css";
import { UserDataContext } from "../../context";
import axios from "axios";

export const LikeButton = ({ id }) => {
  const { isLiked, toggleLiked } = useUserData();
  const {userData}=useAuth();
  const {dispatch}=useContext(UserDataContext);
    useEffect(()=>{
      (async function(){
        const response=await axios.get(`https://videolibrary.kunalgupta9.repl.co/liked-video/${userData?._id}`)
        dispatch({type:"LIKE_VIDEO",payload:response.data.likedVideoItems})
      })()
      //eslint-disable-next-line
    },[])
  return (
    <div style={{ position: "relative" }}>
      <button
        data-tooltip={isLiked(id) ? "Unlike" : "Like"}
        className="btn-icons"
        onClick={() =>toggleLiked(id) }
      >
        <div
          className="icon"
          style={{ color: isLiked(id) ? "red" : "white" }}
        >
          <i className="fa fa-thumbs-up"></i>
        </div>
      </button>
    </div>
  );
};