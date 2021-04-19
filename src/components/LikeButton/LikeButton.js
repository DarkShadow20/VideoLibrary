import { useUserData } from "../../hooks";
import "./LikeButton.css";

export const LikeButton = ({ id }) => {
  const { isLiked, toggleLiked } = useUserData();
  return (
    <div style={{ position: "relative" }}>
      <button
        data-tooltip={isLiked(id) ? "Unlike" : "Like"}
        className="btn-icons"
        onClick={() => toggleLiked(id)}
      >
        <div
          className="icon"
          style={{ color: isLiked(id) ? "red" : "white" }}
        >
          <i class="fa fa-thumbs-up"></i>
        </div>
      </button>
    </div>
  );
};