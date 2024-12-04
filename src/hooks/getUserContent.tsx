import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function getUserContent(linkId: string){
  const [userContents, setUserContents] = useState([]);
  const [brainUser, setBrainUser] = useState("");
  function refresh(){
    axios.get(`${BACKEND_URL}/api/v1/brain/${linkId}`).then((response) => {
      setUserContents(response.data.contents)
      setBrainUser(response.data.username)
    })
  }


  return {userContents, refresh, brainUser};

}