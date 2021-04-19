import {VideoThumbnail} from "../";
import "./MainSection.css";

export const MainSection=({route,videoList})=>{
    return (
        <section className="main-section">
            <div className="title">
                {route}
            </div>
            <div className="video-wrapper">
                {videoList.map((video)=>(<VideoThumbnail key={video.id} video={video}/>))}
            </div>
        </section>
    )
}