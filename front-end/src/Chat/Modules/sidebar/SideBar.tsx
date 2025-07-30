import {useNavigate, useParams} from "react-router-dom"
import { useEffect, useState} from "react";

interface FriendsProps {
    username?: string
    id: any
}

export function SideBar({id}: FriendsProps){
    const [friends, setFriends] = useState<FriendsProps[]>([])
    const navigate = useNavigate()
    
    useEffect(() => {
        getAllUsers()
    },[id])
    
    const getAllUsers = async () => {
            
        const response = await fetch("https://chat-service-tjzg.onrender.com/verify_friends", {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({"name": id })
        })

        const data = await response.json()
        console.log("esse é o data:", data);
        
        setFriends(data.friends)
    }


    const privateChatRedirect = async(friendName: any) => {        
        navigate(`/chat/${id}/${friendName}`)
    }


    return (
        <>
         <div id="chat-sidebar-scope">
                    <button id="chat-new-friend-btn" onClick={() => navigate(`/chat/${id}/newfriend`)}>
                        <p>New Friends</p>
                    </button>

                    {friends.map((friend, index) => (
                        <div key={index} className="chat-friends-contact" onClick={() => privateChatRedirect(friend.username)}>
                            <p>{friend.username}</p>
                        </div>
                    ))}
                </div>
        </>
    )
}