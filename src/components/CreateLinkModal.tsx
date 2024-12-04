
import { CrossIcon } from "../icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "./Input"


interface CreateLinkModalProps{
  open: boolean;
  onClose: () => void;
  shareLinkRef: any;
  copyLinkToClipboard: () => void;
}

export const CreateLinkModal = ({open, onClose, shareLinkRef, copyLinkToClipboard}: CreateLinkModalProps) => {
  

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
                <Input placeholder = {"Link"} reference = {shareLinkRef}/>
              </div>
              <div className="flex justify-center">
                <Button text="Copy link" variant="primary" onClick={copyLinkToClipboard}/>
              </div>
            </div>
          </span>
        </div>
      </div>

    </div>}

  </div>
}


