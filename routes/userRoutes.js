const express = require("express")
const userRouter = express.Router()
const { validateToken } = require('../middlewares/authMiddleware');

const { countFollowers, addFollower, countFollowed, removeFollowed,removeFollower } = require("../controllers/userController");


userRouter.get("/followers",validateToken, countFollowers);
userRouter.get("/followed",validateToken, countFollowed);
userRouter.post("/follow/:userId",validateToken, addFollower);
userRouter.delete("/followed/:userId",validateToken, removeFollowed);
userRouter.delete("/followers/:userId",validateToken, removeFollower);




module.exports = userRouter