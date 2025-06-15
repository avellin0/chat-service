import "./AddFriends.css"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

export function AddFriends() {
    const { id } = useParams<{ id: string }>()

    const [Friendid, setFriendid] = useState<string>(String(id))

    const navigate = useNavigate()


    const AddNewFriend = async () => {

        console.log("this is the id:", id);
        

        if (Friendid === null || Friendid === undefined) return
        if (!Friendid.trim()) return

        if (typeof (id) !== "string") return

        console.log("this is the user id:", Friendid,"and this is your friend id:", id);

        const newFriendsQuery = {
            friendOf: id,
            id: Friendid
        }

        const response = await fetch('https://extude.onrender.com/newfriends', {
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
            <input type="text" placeholder="Name" onChange={(e) => console.log(e.target.value)} />
            <input type="text" placeholder="id" onChange={(e) => setFriendid(e.target.value)} />
            <button onClick={() => AddNewFriend()}>Save</button>
        </div>
    )
}

