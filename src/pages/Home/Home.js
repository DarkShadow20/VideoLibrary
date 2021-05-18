import "./Home.css";
import NavBar from '../../components/NavBar/NavBar';
import {MainSection} from "../../components";
import { useContext, useEffect } from "react";
import axios from "axios";
import { UserDataContext } from "../../context";

function Home() {
    const {state,dispatch} =useContext(UserDataContext)
    useEffect(()=>{
        (async function (){
            try{
            const response= await axios.get("https://videolibrary.kunalgupta9.repl.co/video");
            dispatch({type:"SET_VIDEO",payload:response.data.videos})
            }
            catch(err){
                console.log(err)
            }
        })()
        //eslint-disable-next-line
    },[])
    return (
        <>
            <NavBar/>
            <div className="video-section">
                <div className="videos">
                        <MainSection route={"Latest"} videoList={state[0].videos}/>
                </div>
            </div>
        </>
    )
}

export default Home
