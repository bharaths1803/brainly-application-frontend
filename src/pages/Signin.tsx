import { useRef, useState } from "react";
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const[errorMessage, setErrorMessage] = useState("");
  async function signin(){
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password
    })

    if(response.data.message){
      setErrorMessage(response.data.message);
    }
    else{
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    }
  }

  return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
    <div className="bg-white rounded-xl border min-w-48 p-8">
      <Input placeholder="Username" reference={usernameRef}/>
      <Input placeholder="Password" reference={passwordRef}/>
      {errorMessage === "User not found" && <div className="text-purple-600">Invalid username or password!!!</div>}
      <div className="flex items-center">
        <div className="text-purple-600">
          New User?
        </div>
        <div className="ml-2">
          <Button variant="secondary" text="Click here" onClick={() => navigate("/signup")}/>
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <Button variant="primary" text="Signin" fullWidth = {true} loading = {false} onClick={signin}/>
      </div>
    </div>
  </div>
}