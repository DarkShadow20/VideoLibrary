import "./Home.css";
import NavBar from '../../components/NavBar/NavBar';
import {MainSection} from "../../components";
import {useVideoData} from "../../hooks";

function Home() {
    const {videoList}=useVideoData();
    return (
        <>
            <NavBar/>
            <div className="video-section">
                <div className="videos">
                        <MainSection route={"Latest"} videoList={videoList}/>
                </div>
            </div>
        </>
    )
}

export default Home
