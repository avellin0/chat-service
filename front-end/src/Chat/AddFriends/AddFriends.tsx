import "./AddFriends.css"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

export function AddFriends() {
    const { id } = useParams<{ id: string }>()

    const [FriendName, setFriendName] = useState<string>(String(id))

    const navigate = useNavigate()


    const AddNewFriend = async () => {

        console.log("this is the id:", id);


        if (FriendName === null || FriendName === undefined) return
        if (!FriendName.trim()) return

        if (typeof (id) !== "string") return

        console.log("this is the user id:", FriendName, "and this is your friend id:", id);


        const getFriendInfo = await fetch(`https://chat-service-tjzg.onrender.com/user_info/${FriendName}`);
        const data = await getFriendInfo.json()

        console.log("this is the friend info:", data.id);
        

        const newFriendsQuery = {
            friend_name: data.username,
            user_id: id
        }

        console.log("this is the query:", newFriendsQuery);
        

        const response = await fetch('https://chat-service-tjzg.onrender.com/new_friend', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newFriendsQuery)
        }
        )

        //id: 180bca53-d7dd-4468-b8e6-31306c731149
        
        if (!response.ok) {
            throw new Error("Have some wrong here")
        }


        navigate(`/chat/${id}`)

        return
    }


    return (
        <div id="AddFriends-scope">
            <h1>Add your new Contact</h1>
            <input type="text" placeholder="Id" onChange={(e) => console.log(e.target.value)} />
            <input type="text" placeholder="Name" onChange={(e) => setFriendName(e.target.value)} />
            <button onClick={() => AddNewFriend()}>Save</button>
        </div>
    )
}

