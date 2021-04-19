import {useUserData} from "../../hooks";
import {useNavigate} from "react-router-dom";
import "./VideoThumbnail.css";

export const VideoThumbnail=({video})=>{
    const navigate = useNavigate();
    const {addToHistoryOnClick, isInHistory }=useUserData();
    return(
        <div class="card-collection-wrapper">
            <div class="card" onClick={() => {
            navigate(`/video/${video.id}`);
            !isInHistory(video.id) && addToHistoryOnClick(video.id);
          }}>
                <img class="card-img-top" src={video.thumbnailURL} alt=""/>
                <div class="card-body">
                <h5 class="card-title">{video.title}</h5>
          </div>
        </div>
    </div>
    )
}
