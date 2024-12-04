import { useNavigate } from "react-router-dom"
import { Logo } from "../icons/Logo"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { Button } from "./Button"
import { SidebarItem } from "./SidebarItem"
import { AllIcon } from "../icons/AllIcon"


interface SidebarProps {
  logoutVisible?: boolean;
}

export const Sidebar = ({logoutVisible}: SidebarProps) => {
  const navigate = useNavigate();
  function logout(){
    localStorage.removeItem("token");
    navigate("/signin");
  }



  return <div className="h-screen border-r w-72 bg-white fixed left-0 top-0 pl-6 flex flex-col justify-between">
    <div>
      <div className="flex text-2xl pt-8 items-center">
        <div className="pr-2 text-purple-600">
          <Logo/ >
        </div>
        Brainly
      </div>
      <div className="pt-8 pl-4">
          <SidebarItem text={"Tweets and Vedios"} icon={<AllIcon />}/>
          <SidebarItem text={"Tweets"}  icon={<TwitterIcon />} />
          <SidebarItem text={"Vedios"}  icon={<YoutubeIcon />} />
      </div>
    </div>
    {logoutVisible && <div className="pt-8 pl-4 pb-4">
        <Button variant="primary" text="Logout" onClick={logout}/>
    </div>}
  </div>
}