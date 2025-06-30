import "./Chat.css"
import { useEffect, useRef, useState } from "react"
import { socket } from "./connect/socket"
import { useParams } from "react-router-dom"
import { Mobile } from "./Modules/mobile/Mobile"
import { SideBar } from "./Modules/sidebar/SideBar"
import { MessagesInput } from "./Modules/InteractiveChat/Messages"

interface TypeOfMessage {
    message: string
    author: string
    authorId: string
    addresse: string
    conteudo: string
    create_at: string,
    destinatarioId: string
    id: string
    remetentId: string
}



export function Chat() {

    const [hasMessage, setHasMessage] = useState<TypeOfMessage[]>([])
    const [message, setMessage] = useState<TypeOfMessage[]>([])



    const { id, friend_name } = useParams<{ id: string, friend_name: string }>()

    useEffect(() => {
        getMessages()
        console.log("this is messages:", friend_name);

        const handleMessage = (data: TypeOfMessage) => {
            setMessage((current) => [...current, data])
        }



        socket.on("port3004", handleMessage)


        return () => {
            socket.off("port3004", handleMessage)
        }
    }, [friend_name])



    const getMessages = async () => {
        const response = await fetch(`http://localhost:3000/refresh_message/${id}`)
        const data = await response.json()

        setHasMessage(data)
    }

    return (
        <div id="body">
            <div id="chat-body-scope">

                <Mobile />

                <SideBar id={id} />

                {/* CHAT AREA */}
                <div id="chat-scope">
                    <div id="chat-scope-area" >

                        {hasMessage.map((msg, index) => (
                            <>
                                {
                                    (msg.remetentId === friend_name && msg.destinatarioId === id) || (msg.remetentId === id && msg.destinatarioId === friend_name) ?
                                        <>
                                            <div key={index} className={msg.remetentId === id ? 'chat-left-side' : 'chat-right-side'}>
                                                <p><span>{msg.remetentId}</span>: {msg.conteudo}</p>
                                            </div>
                                        </>
                                        : ""
                                }
                            </>

                        ))}



                        {message.map((msg, index) => (
                            <>
                                {msg.addresse === id || msg.author === id ?
                                    < div key={index} className={msg.addresse === id ? 'chat-right-side' : 'chat-left-side'}>
                                        <p><span>{msg.author}</span>: {msg.message}</p>
                                    </div >

                                    : ""}
                            </>
                        ))
                        }


                    </div>

                    <MessagesInput friend={friend_name} id={id} />

                </div>
            </div>
        </div >
    )
}
