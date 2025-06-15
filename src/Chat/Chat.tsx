import "./Chat.css"
import { useEffect, useRef, useState } from "react"
import { socket } from "./connect/socket"
import { useParams, useNavigate } from "react-router-dom"

interface TypeOfMessage {
    message: string,
    author: string,
    authorId: string,
    addresse: string
}

interface FriendsProps {
    name: string
}



export function Chat() {

    const [username, setUsername] = useState('')
    const [text, setText] = useState<string>()
    const [message, setMessage] = useState<TypeOfMessage[]>([])
    const [friends, setFriends] = useState<FriendsProps[]>([])
    const [address, setAddress] = useState<string>('')
    const [largura, setLargura] = useState(window.innerWidth)
    const [open, setOpen] = useState(false)
    
    const textRef = useRef<HTMLInputElement>(null)

    const { id } = useParams<{ id: string }>()
    const { friends_id } = useParams<{ friends_id: string }>()

    const GetUserQuery = { "id": id }

    const navigate = useNavigate()


    useEffect(() => {

        const atualizarLargura = () => setLargura(window.innerWidth);

        window.addEventListener("resize", atualizarLargura);


        setAddress(String(friends_id))

        const handleMessage = (data: TypeOfMessage) => {
            console.log("info data result", data);
            setMessage((current) => [...current, data])
        }

        socket.on("port3004", handleMessage)

        getUserInfo()
        getAllUsers()

        return () => {
            socket.off()
            window.removeEventListener("resize", atualizarLargura);
        }
    }, [])

    const getUserInfo = async () => {
        try {
            const response = await fetch("https://extude.onrender.com/userinfo", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(GetUserQuery)
            })

            const data = await response.json()
            const name = data[0].name

            setUsername(name)
        } catch (err) {
            console.log(err);
            throw new Error("Erro ao buscar nome de usuario")
        }
    }

    const getAllUsers = async () => {
        const response = await fetch("https://extude.onrender.com/friends", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(GetUserQuery)
        })

        const data = await response.json()
        setFriends(data)
    }

    const PrivateChatRedirect = (friends_name: string) => {

        console.log("this is the user params:", id, "and this is the friends params:", friends_id);

        if (!friends_id ) {
            console.log("Indo para um chat privado");
            navigate(`${friends_name}`)
        }


        console.log("Ja estou em um chat privado", friends_id);

    }

    const sendMessage = async () => {
        console.log("this is the id:", id);
        console.log("this is the address:", address);

        try {
            socket.emit("port3003", {
                message: text,
                authorId: id,
                author: username,
                addresse: address
            })

            if(textRef.current){
                textRef.current.value = ""
            }

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao buscar nome do usuario")
        }
    }



    return (
        <div id="body">
            <div id="chat-body-scope">

                {largura < 550 && (
                    <div className="header-chat-config">
                        <h2><span>You</span></h2>
                        <div>
                            <div className={`hamburger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
                                <span className="bar bar1"></span>
                                <span className="bar bar2"></span>
                                <span className="bar bar3"></span>
                            </div>

                            <div className={`sidebar ${open ? 'show' : ''}`}>
                                    {friends.map((friends, index) => (
                                        <>
                                            <div className="chat-friends-contact" onClick={() => PrivateChatRedirect(friends.name)}>
                                                <p key={index} >{`${friends.name}`}</p>
                                            </div>
                                        </>
                                    ))

                                    }
                            </div>
                        </div>
                    </div>
                )}



                <div id="chat-sidebar-scope">
                    <button id="chat-new-friend-btn" onClick={() => navigate('newFriend')}>
                        <p>New Friends</p>
                    </button>

                    {friends.map((friends, index) => (
                        <>
                            <div className="chat-friends-contact" onClick={() => PrivateChatRedirect(friends.name)}>
                                <p key={index} >{`${friends.name}`}</p>
                            </div>
                        </>
                    ))

                    }

                </div>


                <div id="chat-scope">
                    <div id="chat-scope-area">

                        {
                            message.map((message, index) => {
                                return (
                                    <>

                                        {
                                            message.addresse === username || message.author === username ?
                                                <>
                                                    {
                                                        message.author === username ?
                                                            <>
                                                                <div id="chat-left-side">
                                                                    <p key={index}><span>{message.author}</span>: {message.message}</p>
                                                                </div>
                                                            </>
                                                            : ""

                                                    }


                                                    <>
                                                        {message.author === username ?
                                                            "" : <div id="chat-right-side">
                                                                <p id="chat-host-side"><span>{message.author}</span>: {message.message}</p>
                                                            </div>
                                                        }
                                                    </>
                                                </> : ""
                                        }
                                    </>

                                )
                            })

                        }


                    </div >

                    <div id="chat-text-input-scope">
                        <input type="text" id="chat-input" ref={textRef} onChange={(e) => setText(e.currentTarget.value)
                        } placeholder="Select your Contact" onKeyDown={(event) => { event.key === 'Enter' && sendMessage() }} />

                        <button id="chat-submit-btn" onClick={() => sendMessage()
                        }>Enviar</button>
                    </div>
                </div >
            </div>
        </div>
    )
}

// Pega como estava no github...