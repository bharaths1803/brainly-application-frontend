import axios from "axios";
import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon"
import { BACKEND_URL } from "../config";
import { useContent } from "../hooks/useContent";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { useRef, useState } from "react";
import { CreateLinkModal } from "./CreateLinkModal";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  contentId: string;
  icons?: boolean
}

export const Card = ({title, link, type, contentId, icons}: CardProps) => {

  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const shareLinkRef = useRef();

  function openLinkBox(){
    setLinkModalOpen(true);
    shareContent();
  }

  const iconsObject = {
    "twitter": <TwitterIcon />,
    "youtube": <YoutubeIcon />
  }

  async function deleteContent(){
    await axios.delete(`${BACKEND_URL}/api/v1/content`, {
      data: {
        contentId: contentId
      },
      headers:{
        "Authorization": localStorage.getItem("token")
      }
    })

    const {refresh} = useContent();
    refresh();
  }

  async function shareContent(){
    console.log("Link is " + link);
    setTimeout(() => {
      //@ts-ignore
      shareLinkRef.current.value = link;
    }, 100);
  }

  const hoverActiveStyles = "hover:bg-gray-200 rounded transition-all duration-150 active:bg-gray-400 rounded transition-all duration-150"


  async function copyLink() {
    //@ts-ignore
    await navigator.clipboard.writeText(shareLinkRef.current.value);
  }
  function copyLinkToClipboard(){
    copyLink();
  }

  return <div>
    <CreateLinkModal open = {linkModalOpen} onClose={() => {
    setLinkModalOpen(false)
    }} shareLinkRef = {shareLinkRef} copyLinkToClipboard={copyLinkToClipboard}/>
    <div className={"p-4 bg-white rounded-md outline-state-200 max-w-72 border border-gray-200 min-h-48 min-w-72"}>
      <div className={"flex justify-between"}>
        <div className={"flex items-center text-md"}>
          <div className={"pr-2 text-gray-500"}>
            {iconsObject[type]}
          </div>
          {title}
        </div>

        {icons && <div className={"flex items-center"}>
          <div className={"pr-2 text-gray-500 " + hoverActiveStyles} onClick={openLinkBox}>
            <a href= {link} target="_blank">
              <ShareIcon/ >
            </a>
          </div>
          <div className={"text-gray-500 cursor-pointer " + hoverActiveStyles} onClick={deleteContent}>
            <DeleteIcon/ >
          </div>
        </div>}
      </div>
      <div className="pt-4">
        {type === "twitter" && <blockquote className="twitter-tweet">
          <a href={link.replace("x.com", "twitter.com")}></a> 
        </blockquote>}
        {type === "youtube" && <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
      </div>
    </div>
  </div>
  

}