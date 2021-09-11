import "./History.css";
import { useAuth, useUserData } from "../../hooks";
import { MainSection, NavBar } from "../../components";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../context";
import axios from "axios";
import Loader from "react-loader-spinner";

export const History =  () => {
  const { getSelectedPlaylist, clearHistory } = useUserData();
  const {dispatch}=useContext(UserDataContext);
  const {userData}=useAuth();
  const userId=userData._id
  const [loading,setLoading]=useState(false)
  const [clearBtnLoad,setClearBtnLoad]=useState(true)
  useEffect(()=>{
    (async function(){
      try{
        setLoading(true)
        const response=await axios.get(`https://videolibrary.kunalgupta9.repl.co/history/${userId}`)
        dispatch({type:"ADD_TO_HISTORY",payload:response.data.historyItems})
        setLoading(false)
      }catch(err){
        setLoading(false)
        console.log(err);
      }
    })();
    //eslint-disable-next-line
  },[])
  const videoList = getSelectedPlaylist("HISTORY").videos;
  if (videoList[0]?.length) {
    return (
      <>
      <NavBar/>
      {loading?(
        <div className="loader">
          <Loader type="ThreeDots" color="#fff" height={80} width={80} />
        </div>
      ):(
      <div className="history-listWrapper">
        <button onClick={()=>{clearHistory();setClearBtnLoad(false)}}>{!clearBtnLoad?"Loading...":"Clear"}</button>
        <MainSection route={"History"} videoList={videoList[0]} />
      </div>
      )}
      </>
    );
  } else {
    return (
      <>
      <NavBar/>
      {loading?(
        <div className="loader">
        <Loader type="ThreeDots" color="#fff" height={80} width={80} />
    </div>
      ):(<div className="history-wrapper">
      <div className="history.emptyPrompt">Nothing here yet.</div>
    </div>)}
      
      </>
    );
  }
}