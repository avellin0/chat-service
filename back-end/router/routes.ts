import {Router} from "express"
const route = Router()

import {CreateMessage} from "../controller/CreateMessage.ts"
const sendMessage = new CreateMessage()
import {latestMessages} from "../controller/latestMessages.ts"
const getMessages = new latestMessages()

route.get('/refresh_message/:id', getMessages.handle)
route.post('/create_message', sendMessage.handle)

export {route}