const express = require("express")
const userRouter = express.Router()

const { countFollowers, addFollower, countFollowed, removeFollowed,removeFollower } = require("../controllers/userController");


userRouter.get("/followers", countFollowers);
userRouter.get("/followed", countFollowed);
userRouter.post("/followed", addFollower);
userRouter.delete("/followed", removeFollowed);
userRouter.delete("/followers", removeFollower);




module.exports = userRouter