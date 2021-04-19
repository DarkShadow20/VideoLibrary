import {useUserData} from "../../hooks";
import {useNavigate} from "react-router-dom";
import "./VideoThumbnail.css";

export const VideoThumbnail=({video})=>{
    const navigate = useNavigate();
    const {addToHistoryOnClick, isInHistory }=useUserData();
    return(
        <div className="card-collection-wrapper">
            <div className="card" onClick={() => {
            navigate(`/video/${video.id}`);
            !isInHistory(video.id) && addToHistoryOnClick(video.id);
          }}>
                <img className="card-img-top" src={video.thumbnailURL} alt=""/>
                <div className="card-body">
                <h5 className="card-title">{video.title}</h5>
          </div>
        </div>
    </div>
    )
}
