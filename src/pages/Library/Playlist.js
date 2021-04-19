import { useUserData } from "../../hooks";
import { MainSection ,NavBar} from "../../components";
import { useParams} from "react-router-dom";
import "./Playlist.css";

export const Playlist = () => {
  const { getSelectedPlaylist } = useUserData();
  const { playListId } = useParams();

  const playlist = getSelectedPlaylist(playListId);

  if (playlist.videos.length) {
    return (
      <>
      <NavBar/>
      <div className="playlist-listWrapper">
        <MainSection
          route={playlist.name}
          videoList={playlist.videos}
          inLibrary={"inLibrary"}
        />
      </div>
      </>
    );
  } else {
    return (
      <>
      <NavBar/>
      <div className="playlist-wrapper" >
        <div className="playlist-emptyPrompt" >
        Add some videos here.
        </div>
      </div>
      </>
    );
  }
};