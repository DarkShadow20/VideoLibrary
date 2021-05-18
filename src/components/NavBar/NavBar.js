import React,{useState,useContext}  from 'react'
import ReorderIcon from "@material-ui/icons/Reorder";
import {useAuth} from "../../hooks";
import "./NavBar.css";
import { UserDataContext } from "../../context";
import { useNavigate } from 'react-router';
function NavBar() {
    const [showLinks,setShowLinks]=useState(false)
    const { isUserLoggedIn, setLogin } = useAuth();
    const navigate=useNavigate();
    const {dispatch}=useContext(UserDataContext)
    return (
             <>
            <nav>
                    <div className="Logo">NukeVid</div>
                        <div className="leftSide">
                            <div className="link" id={showLinks?"hidden":""}>
                                <button onClick={()=>{navigate("/")}}>Home</button>
                                <button onClick={()=>{navigate("/history")}}>History</button>
                                <button onClick={()=>{navigate("/library")}}>Library</button>
                                {isUserLoggedIn ? (
                                  <>
                                    <button
                                      onClick={() => {
                                        navigate("/")
                                        setLogin(false);
                                        dispatch({type:"LOGOUT",payload:"logout"})
                                      }}
                                    >
                                      <div>Log out</div>
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => {
                                        navigate("/login");
                                      }}
                                    >
                                      <div>Login</div>
                                    </button>
                                    <button
                                      onClick={() => {
                                        navigate("/signup");
                                      }}
                                    >
                                      <div>Sign up</div>
                                    </button>
                                  </>
                                )}
                            </div>
                        </div>
                        <div className="rightSide">
                        <button onClick={()=>setShowLinks(!showLinks)}><ReorderIcon/></button>
                        </div>
                </nav>
        </>
    )
}

export default NavBar
