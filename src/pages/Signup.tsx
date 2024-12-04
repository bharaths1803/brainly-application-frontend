import { useRef, useState } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const[errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function signup(){
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    setLoading(true);
    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password
    })
    setLoading(false);

    if(response.data.error) {
      setErrorMessage(`${response.data.message}`)
    }
    else if(response.data.message === "User already exists"){
      setErrorMessage(`${response.data.message}`)
    }
    else{
      navigate("/signin");
    }
  }

  function existingUserSignup(){
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/signin")
    }, 1000);
  }

  return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
    <div className="bg-white rounded-xl border min-w-48 p-8">
      <Input placeholder="Username" reference={usernameRef}/>
      <Input placeholder="Password" reference={passwordRef}/>
      {errorMessage === "Incorrect format" && <div><div className="text-purple-600">Password must contain at least:</div>
        <div className="text-purple-600">1 special character, 1 upper case</div><div className="text-purple-600">1 lower case, and 1 number!!!</div></div>}
      {errorMessage === "User already exists" && <div className="flex items-center"><div className="text-purple-600">User already exists!!!</div><div className="ml-2"><Button variant="secondary" text="Click here" fullWidth = {true} onClick={existingUserSignup}/></div></div>}
      <div className="flex justify-center pt-4">
        <Button variant="primary" text="Signup" fullWidth = {true} loading = {loading} onClick={signup}/>
      </div>
    </div>
  </div>
}