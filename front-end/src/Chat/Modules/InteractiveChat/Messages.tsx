import { useEffect, useRef, useState } from "react"
import { socket } from "../../connect/socket"
import { useParams } from "react-router-dom"

interface MessageProps {
    friend: any
    id: any
}

export function MessagesInput({ friend, id}: MessageProps) {
    const textRef = useRef<HTMLInputElement>(null)
    const [text, setText] = useState<string>('')
    const [address, setAddress] = useState<string>('')

    


    useEffect(() => {

        console.log("This is the id:",id,"this is the friend_name:",friend);
        
        setAddress(friend)
    })

    const sendMessage = async () => {
        if (!text.trim()) return

        const messageQuery = {
            message: text,
            author: id,
            addresse: address
        }

        const createMessage = {
            id: id as string,
            message: text,
            sendTo: address
        }

        console.log(createMessage);


        socket.emit("port3003", messageQuery)

        fetch('http://localhost:3000/create_message', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(createMessage)
        })

        setText('')
        if (textRef.current) textRef.current.value = ''
    }

    return (
        <>

            <div id="chat-text-input-scope">
                <input
                    type="text"
                    id="chat-input"
                    ref={textRef}
                    value={text}
                    onChange={(e) => setText(e.currentTarget.value)}
                    placeholder="Select your Contact"
                    onKeyDown={(e) => { e.key === 'Enter' && sendMessage() }}
                />
                <button id="chat-submit-btn" onClick={sendMessage}>Enviar</button>
            </div>
        </>
    )
}