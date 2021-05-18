import "./History.css";
import { useAuth, useUserData } from "../../hooks";
import { MainSection, NavBar } from "../../components";
import { useContext, useEffect } from "react";
import { UserDataContext } from "../../context";
import axios from "axios";

export const History =  () => {
  const { getSelectedPlaylist, clearHistory } = useUserData();
  const {dispatch}=useContext(UserDataContext);
  const {userData}=useAuth();
  const userId=userData._id
  useEffect(()=>{
    (async function(){
      const response=await axios.get(`https://videolibrary.kunalgupta9.repl.co/history/${userId}`)
      dispatch({type:"ADD_TO_HISTORY",payload:response.data.historyItems})
    })();
    //eslint-disable-next-line
  },[])
  const videoList = getSelectedPlaylist("HISTORY").videos;
  if (videoList[0]?.length) {
    return (
      <>
      <NavBar/>
      <div className="history-listWrapper">
        <button onClick={clearHistory}>Clear</button>
        <MainSection route={"History"} videoList={videoList[0]} />
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