import { Mobile } from "../Modules/mobile/Mobile";
import { SideBar } from "../Modules/sidebar/SideBar";
import { useParams } from "react-router-dom";


export function PrivateChat() {

    const {id} = useParams<{id: string}>()

    return (
        <>
            <div id="body">
                <div id="chat-body-scope">
                    <Mobile/>
                    <SideBar id={id}/>
                    
                </div>
            </div>
        </>
    )
}