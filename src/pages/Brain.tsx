import { useParams } from "react-router-dom"
import { getUserContent } from "../hooks/getUserContent";
import { Sidebar } from "../components/Sidebar";
import { Card } from "../components/Card";
import { useEffect } from "react";
import { useContent } from "../hooks/useContent";
import { useRecoilValue } from "recoil";
import { userContentTypeAtom } from "../store/atoms/userContentType";

export const Brain = () => {

  const params = useParams();

  //@ts-ignore
  const linkId: string = params.shareLink?.substring(1);

  const {userContents, refresh, brainUser} = getUserContent(linkId);
  const {contents} = useContent();
  const userContentType = useRecoilValue(userContentTypeAtom);
  console.log("User content type value is " + userContentType);

  useEffect(() => {
    refresh();
  }, [contents]);

  return <div>
          <Sidebar logoutVisible = {false} />
          <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
            <div className="text-2xl">
              {brainUser}'s Brain
            </div>
            {userContentType === "all" && <div className={"flex gap-4 flex-wrap"}>
              {userContents.map(({type, link, title, _id}) => <Card title={title} type={type} link={link} contentId = {_id} icons = {false}/>)
              }
            </div>}
            {userContentType !== "all" && <div className={"flex gap-4 flex-wrap"}>
              {userContents.filter(({type}) => type === userContentType).map(({type, link, title, _id}) => <Card title={title} type={type} link={link} contentId = {_id} icons = {false}/>)
              }
            </div>}
          </div>
         </div>
}