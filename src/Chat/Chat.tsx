import "./Chat.css"
import { useEffect, useState } from "react"
import { socket } from "./connect/socket"
import { useParams } from "react-router-dom"

interface TypeOfMessage {
    message: string,
    author: string,
    authorId: string,
    addresse: string
}


export function Chat() {

    const [username, setUsername] = useState('')
    const [text, setText] = useState<string>()
    const [message, setMessage] = useState<TypeOfMessage[]>([])
    const { id } = useParams<{ id: string }>()


    useEffect(() => {

        const handleMessage = (data: TypeOfMessage) => {
            console.log("info data result", data);
            setMessage((current) => [...current, data])
        }

        socket.on("port3004", handleMessage)

        getUserInfo()


        return () => {
            socket.off()
        }
    })


    const getUserInfo = async () => {

        const GetUserQuery = {
            "id": id
        }

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
            console.log("Tudo okay");

        } catch (err) {
            console.log(err);
            throw new Error("Erro ao buscar nome de usuario")
        }
    }

    const sendMessage = async () => {
        console.log("this is the id:", id);


        try {
            socket.emit("port3003", {
                message: text,
                authorId: id,
                author: username,
                addresse: "AuthorY"
            })

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao buscar nome do usuario")
        }
    }

    return (
        <div id="body">
            <div id="chat-body-scope">
                <div id="chat-sidebar-scope">
                    <button id="chat-new-friend-btn" onClick={() => "fui pra outra pagina"}>
                        <p>New Friends</p>
                    </button>

                    {
                        <>
                        </>
                    }

                </div>

                <div id="chat-scope">
                    <div id="chat-scope-area">

                        {
                            message.map((message, index) => {
                                return (
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
                                    </>)
                            })

                        }


                    </div>

                    <div id="chat-text-input-scope">
                        <input type="text" id="chat-input" onChange={(e) => setText(e.currentTarget.value)
                        } placeholder="Select your Contact" onKeyDown={(event) => { event.key === 'Enter' && sendMessage() }} />

                        <button id="chat-submit-btn" onClick={() => sendMessage()
                        }>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Pega como estava no github...