import { useEffect, useRef, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import { CreateLinkModal } from "../components/CreateLinkModal"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useRecoilValue } from "recoil"
import { contentTypeAtom } from "../store/atoms/contentType"


export const Dashboard = () =>{
  const [modalOpen, setModalOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const {contents, refresh} = useContent();
  const shareLinkRef = useRef();
  const contentType = useRecoilValue(contentTypeAtom);


  useEffect(() => {
    refresh();
  }, [modalOpen]);

  function openContentBox(){
      setModalOpen(true);
  }

  async function generateLink() {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
      share: true
    }, {
      headers: {
        "Authorization": token
      }
    })
    //@ts-ignore
    shareLinkRef.current.value = "localhost:5173" + response.data.message;
  }

  function openLinkBox(){
    setLinkModalOpen(true);
    generateLink();
  }

  async function copyLink() {
    //@ts-ignore
    await navigator.clipboard.writeText(shareLinkRef.current.value);
  }
  function copyLinkToClipboard(){
    copyLink();
  }

  return <div>
          {<Sidebar logoutVisible = {true}/>}
          <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
            <CreateContentModal open={modalOpen} onClose={() => {
              setModalOpen(false);
            }}/>
            <CreateLinkModal open = {linkModalOpen} onClose={() => {
              setLinkModalOpen(false);
            }} shareLinkRef = {shareLinkRef} copyLinkToClipboard={copyLinkToClipboard}/>
            <div className="flex justify-end gap-4">
              <Button text={"Add Content"} variant={"primary"} startIcon={<PlusIcon />} onClick={openContentBox}/>
              <Button text={"Share Brain"} variant={"secondary"} startIcon={<ShareIcon />} onClick={openLinkBox}/>
            </div>
            {contentType === "all" && <div className={"flex gap-4 flex-wrap"}>
              {contents.map(({type, link, title, _id}) => <Card title={title} type={type} link={link} contentId = {_id} icons = {true}/>)
              }
            </div>}
            {contentType !== "all" && <div className={"flex gap-4 flex-wrap"}>
              {contents.filter(({type}) => type === contentType).map(({type, link, title, _id}) => <Card title={title} type={type} link={link} contentId = {_id} icons = {true}/>)
              }
            </div>}
          </div>
         </div>

}



/*
vidthalai utube card
<Card title={"Viduthalai 2 tailer"} type={"youtube"} link={"https://www.youtube.com/watch?v=HOxXrrwa_8o"}/>
*/