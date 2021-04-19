import "./History.css";
import { useUserData } from "../../hooks";
import { MainSection, NavBar } from "../../components";

export const History = () => {
  const { getSelectedPlaylist, clearHistory } = useUserData();

  const videoList = getSelectedPlaylist("HISTORY").videos;

  if (videoList.length) {
    return (
      <>
      <NavBar/>
      <div className="history-listWrapper">
        <button onClick={clearHistory}>Clear</button>
        <MainSection route={"History"} videoList={videoList} />
      </div>
      </>
    );
  } else {
    return (
      <>
      <NavBar/>
      <div className="history-wrapper">
        <div className="history.emptyPrompt">Nothing here yet.</div>
      </div>
      </>
    );
  }
}