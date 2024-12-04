import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "./Input"
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CreateContentModalProps{
  open: boolean;
  onClose: () => void;
}

enum ContentType{
  Youtube = "youtube",
  Twitter = "twitter" 
}

export const CreateContentModal = ({open, onClose}: CreateContentModalProps) => {
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent(){
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const token = localStorage.getItem("token");
    await axios.post(`${BACKEND_URL}/api/v1/content`, {
      title,
      link,
      type
    }, {
      headers: {
        "Authorization": token
      }
    })
    onClose();
  }



  return <div>
    {open && 
    <div>

      <div className="w-screen h-screen bg-slate-600 fixed top-0 left-0 opacity-60 flex justify-center">
      </div>

      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
      <div className="flex items-center">
        <span className="bg-white opacity-100 p-4 rounded">
          <div className="flex justify-end">
            <div onClick={onClose} className="cursor-pointer hover:bg-gray-200 rounded transition-all duration-150 active:bg-gray-400 rounded transition-all duration-150">
              <CrossIcon />
            </div>
          </div>
          <div>
            <div>
              <Input placeholder = {"Title"} reference={titleRef}/>
              <Input placeholder = {"Link"} reference={linkRef}/>
            </div>
            <div>
              <h1>Type</h1>
              <div  className="flex gap-1 p-4">
                <Button text="Youtube" variant={type === ContentType.Youtube ? "primary": "secondary"} onClick={() => {
                  setType(ContentType.Youtube)
                }}></Button>
                <Button text="Twitter" variant={type === ContentType.Twitter ? "primary": "secondary"} onClick={() => {
                  setType(ContentType.Twitter)
              }}></Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Button text="Submit" variant="primary" onClick={addContent}/>
            </div>
          </div>
        </span>
      </div>
      </div>

    </div>}

  </div>
}


