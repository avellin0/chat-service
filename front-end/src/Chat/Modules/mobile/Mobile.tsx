import "./Mobile.css"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

interface FriendsProps {
    id: string,
    username: string,
    userId: string
}

export function Mobile() {
    const [open, setOpen] = useState(false)
    const [friends, setFriends] = useState<FriendsProps[]>([])


    const { id, friends_id } = useParams<{ id: string, friends_id: string }>()
    const navigate = useNavigate()

    useEffect(() => {
        getAllUsers()
        console.log("this is the id", id);

    }, [])

    const privateChatRedirect = (friendName: string) => {
        navigate(`/chat/${id}/${friendName}`)
    }

    const getAllUsers = async () => {

        const response = await fetch("http://localhost:3000/verify_friends", {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ "name": id })
        })
        const data = await response.json()
        setFriends(data.friends)
    }


    return (
        <>
            {/* MOBILE HEADER */}
            {window.innerWidth < 550 && (
                <div className="header-chat-config">
                    <h2><span>You</span></h2>
                    <div>
                        <div className={`hamburger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
                            <span className="bar bar1"></span>
                            <span className="bar bar2"></span>
                            <span className="bar bar3"></span>
                        </div>
                        <div className={`sidebar ${open ? 'show' : ''}`}>
                            {friends.map((friend, index) => (
                                <div key={index} className="chat-friends-contact" onClick={() => privateChatRedirect(friend.username)}>
                                    <p>{friend.username}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}