import { useState } from "react";
import "./Library.css";
import {ManagePlaylist} from "./ManagePlaylist";
import {AllPlaylist} from "./AllPlaylist";
import { NavBar } from "../../components";

export const Library = () => {

  const [route, setRoute] = useState("all");

  return (
    <>
    <NavBar/>
    {route === "all" && <AllPlaylist setRoute={setRoute}/>}
    {route === "manage" && <ManagePlaylist setRoute={setRoute}/>}
    </>
  );
};