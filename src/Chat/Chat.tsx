import "./Chat.css"
import { useEffect, useState } from "react"
import { socket } from "./connect/socket"

interface TypeOfMessage {
    message: string,
    author: string,
    authorId: string,
    addresse: string
}


export function Chat() {

    const [text, setText] = useState<string>()
    const [message, setMessage] = useState<TypeOfMessage[]>([])

    useEffect(() => {

        const handleMessage = (data: TypeOfMessage) => {
            console.log("info data result", data);
            setMessage((current) => [...current, data])
        }

        socket.on("port3004", handleMessage)


        return () => {
            socket.off()
        }
    })

    const sendMessage = () => {

        socket.emit("port3003", {
            message: text,
            authorId: "12345",
            author: users[0].username, // TENHO QUE FICAR TROCANDO ENTRE USUARIOS [0] e [1] = 'davi' e 'wesley';
            addresse: "AuthorY"
        })
    }


    const users = [
        {
            username: "davi"
        },
        {
            username: "wesley"
        }
    ]


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


                                        {message.author === users[0].username ?

                                            <div id="chat-left-side">
                                                <p key={index}><span>{message.author}</span>: {message.message}</p>
                                            </div> : ""
                                        }


                                        <>
                                            {message.author === users[1].username ?
                                                <div id="chat-right-side">
                                                    <p id="chat-host-side"><span>{message.author}</span>: {message.message}</p>
                                                </div> : ""
                                            }
                                        </>
                                    </>)
                            })

                        }


                    </div>

                    <div id="chat-text-input-scope">
                        <input type="text" id="chat-input" onKeyDownCapture={(e) => setText(e.currentTarget.value)
                        } placeholder="Select your Contact" />

                        <button id="chat-submit-btn" onClick={() => sendMessage()
                        }>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Pega como estava no github...