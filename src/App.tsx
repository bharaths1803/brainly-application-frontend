import { RecoilRoot } from "recoil";
import { Brain } from "./pages/Brain";
import { Dashboard } from "./pages/dashboard"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

function App() {
  const token = localStorage.getItem("token");
  let gotoPage: string = "/signup";
  if(token) gotoPage = "/dashboard";
  return <BrowserRouter>
    <Routes>
      <Route index element = {<Navigate to = {gotoPage} />}/>
      <Route path="/signup" element = {<Signup />}/>
      <Route path="/signin" element = {<Signin />}/>
      <Route path="/dashboard" element = {<RecoilRoot> <Dashboard /> </RecoilRoot>}/>
      <Route path="/brain/:shareLink" element = {<RecoilRoot> <Brain /> </RecoilRoot>}/>
    </Routes>
  </BrowserRouter>
}

export default App
