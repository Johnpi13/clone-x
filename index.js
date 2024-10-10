require('dotenv').config();
 
const express = require("express");
const app = express();
const port = process.env.APP_DEV_PORT;
 
const registerRouter = require("./routes/registerRoutes");
const signInRouter = require("./routes/signInRoutes");
const tweetRouter = require("./routes/tweetRouters");
const userRouter = require("./routes/userRoutes");
const { connectBd } = require('./config/db')
 
const authMiddleware = require('./middlewares/authMiddleware')
 
app.use(express.json());
app.use("/", registerRouter, signInRouter);
 
app.use(authMiddleware.validateToken);
 
app.use("/:username", tweetRouter);
app.use("/user", userRouter);
app.use("/tweet", tweetRouter);
 
connectBd()
 
app.listen(port, () => {
  console.log(`La app está escuchando en <http://localhost>:${port}`);
});