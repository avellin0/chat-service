import {Router} from "express"
const route = Router()

import {CreateMessage} from "../controller/Messages/CreateMessage.ts"
const sendMessage = new CreateMessage()
import {latestMessages} from "../controller/Messages/LatestMessages.ts"
const getMessages = new latestMessages()
import {CreateUser} from "../controller/verifyUserAccount/CreateUsers.ts"
const newUser = new CreateUser()
import { verifyUserAccount } from "../controller/verifyUserAccount/VerifyAccount.ts"
const verify = new verifyUserAccount()
import { CreateFriends } from "../controller/Friends/CreateFriends.ts"
const newFriend = new CreateFriends()
import { verifyFriends} from "../controller/Friends/VerifyFriends.ts"
const verifyFriendsAccount = new verifyFriends()
import { verifyUserInfo } from "../controller/verifyUserAccount/VerifyUserInfo.ts"
const user_info = new verifyUserInfo()



route.get('/refresh_message/:name', getMessages.handle)
route.get('/user_info/:name', user_info.handle)

route.post('/create_message', sendMessage.handle)
route.post('/new_user', newUser.handle)
route.post('/verify', verify.handle)
route.post('/new_friend', newFriend.handle)
route.post('/verify_friends', verifyFriendsAccount.handle)

export {route}