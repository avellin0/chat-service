import { createBrowserRouter } from "react-router-dom"
import { App } from "../App"
import { Chat } from "../Chat/Chat"
import { PrivateChat } from "../Chat/Individual-chat/PrivateChat"
import { AddFriends } from "../Chat/AddFriends/AddFriends"
import { SignIn } from "../SignIn/SignIn"
import { Demo } from "../Chat/Demo/Demo"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/chat/:id",
        element: <PrivateChat />
    },
    {
        path: "/chat/:id/:friend_name",
        element: <Chat />
    },
    {
        path: "/chat/:id/:friends_id",
        element: <Chat />
    },
    {
        path: "/chat/:id/newfriend",
        element: <AddFriends />
    },
    {
        path: "/sign",
        element: <SignIn/>
    },
    {
        path: "/chat/demo",
        element: < Demo/>
    }
])