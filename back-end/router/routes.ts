import {Router} from "express"
const route = Router()

import {latestMessages} from "../controller/Messages/LatestMessages"
const getMessages = new latestMessages()

import {CreateMessage} from "../controller/Messages/CreateMessage"
const sendMessage = new CreateMessage()

import {CreateUser} from "../controller/verifyUserAccount/CreateUsers"
const newUser = new CreateUser()

import { CreateFriends } from "../controller/Friends/CreateFriends"
const newFriend = new CreateFriends()

import { verifyUserAccount } from "../controller/verifyUserAccount/VerifyAccount"
const verify = new verifyUserAccount()

import { verifyFriends} from "../controller/Friends/VerifyFriends"
const verifyFriendsAccount = new verifyFriends()

import { verifyUserInfo } from "../controller/verifyUserAccount/VerifyUserInfo"
const user_info = new verifyUserInfo()



route.get('/refresh_message/:name', getMessages.handle)
route.get('/user_info/:name', user_info.handle)

route.post('/create_message', sendMessage.handle)
route.post('/new_user', newUser.handle)
route.post('/verify', verify.handle)
route.post('/new_friend', newFriend.handle)
route.post('/verify_friends', verifyFriendsAccount.handle)

export {route}