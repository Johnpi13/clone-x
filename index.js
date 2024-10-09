require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.APP_DEV_PORT;

const registerRouter = require("./routes/registerRoutes");
const signUpRouter = require("./routes/signUpRoutes");
const tweetRouter = require("./routes/tweetRouters");//eliminar la s
const userRouter = require("./routes/userRoutes");


app.use(express.json());
app.use("/", registerRouter, signUpRouter);
app.use("/:username", tweetRouter);
app.use("/user", userRouter);
app.use("/tweet", tweetRouter);


app.listen(port, () => {
  console.log(`La app está escuchando en <http://localhost>:${port}`);
});
