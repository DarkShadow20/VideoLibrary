import "./Home.css";
import NavBar from '../../components/NavBar/NavBar';
import {MainSection} from "../../components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserDataContext } from "../../context";
import Loader from "react-loader-spinner";

function Home() {
    const {state,dispatch} =useContext(UserDataContext)
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        (async function (){
            try{
                setLoading(true)
            const response= await axios.get("https://8189ec78-7429-4fd0-b496-a077b74d5ee9.id.repl.co/video");
            dispatch({type:"SET_VIDEO",payload:response.data.videos})
            setLoading(false)
            }
            catch(err){
                setLoading(false)
                console.log(err)
            }
        })()
        //eslint-disable-next-line
    },[])
    return (
        <>
            <NavBar/>
            {loading ?(
                <div className="loader">
                    <Loader type="ThreeDots" color="#fff" height={80} width={80} />
                </div>
            ):(
            <div className="video-section">
                <div className="videos">
                        <MainSection route={"Latest"} videoList={state[0].videos}/>
                </div>
            </div>)}
        </>
    )
}

export default Home
