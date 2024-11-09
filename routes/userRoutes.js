const express = require("express")
const userRouter = express.Router()

const userController = require("../controllers/userController");

userRouter.get('/', userController.getRecentTweets)
userRouter.get('/userinfo', userController.getUserInfo)
userRouter.get("/:userName/followers", userController.countFollowers);
userRouter.get("/:userName/followed", userController.countFollowed);
userRouter.get("/:userName/followers/list", userController.getFollowers);
userRouter.get("/:userName/followed/list", userController.getFollowed);
userRouter.post("/follow/:user", userController.addFollower);
userRouter.delete("/followed/:user", userController.removeFollowed);
userRouter.delete("/followers/:user", userController.removeFollower);




module.exports = userRouter