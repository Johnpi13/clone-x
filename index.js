const express = require("express");
const app = express();
const port = 3000;

const router = require("./routes/appRoutes");
const registerRouter = require("./routes/registerRoutes");
const signUpRouter = require("./routes/signUpRoutes");
const tweetRouter = require("./routes/tweetRouters");
const userRouter = require("./routes/userRoutes");

app.use(express.json());
app.use("/register",registerRouter);
app.use("/signup",signUpRouter);
app.use("/:username",tweetRouter);
app.use("/user",userRouter);


app.listen(port, () => {
  console.log(`La app está escuchando en <http://localhost>:${port}`);
});
