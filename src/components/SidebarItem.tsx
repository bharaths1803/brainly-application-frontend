import { ReactElement } from "react"
import { useSetRecoilState } from "recoil";
import { contentTypeAtom } from "../store/atoms/contentType";
import { userContentTypeAtom } from "../store/atoms/userContentType";

export interface SidebarItemInterface{
  text: string;
  icon: ReactElement;
}

export const SidebarItem = ({text, icon}: SidebarItemInterface) => {
  const setContentType = useSetRecoilState(contentTypeAtom);
  const setUserContentType = useSetRecoilState(userContentTypeAtom);

  let typeOfContent:string = "";
  if(text === "Vedios") typeOfContent = "youtube";
  else if(text === "Tweets") typeOfContent = "twitter";
  else typeOfContent = "all";

  return <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all duration-150 active:bg-gray-400 rounded max-w-48 pl-4 transition-all duration-150" onClick={() => {
    setContentType((val) => val = typeOfContent);
    setUserContentType((val) => val = typeOfContent);
    }}>
    <div className="pr-2">
      {icon}
    </div>
    <div>
      {text}
    </div>
  </div>
}

