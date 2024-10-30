require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const express = require("express");
const app = express();
const port = process.env.APP_DEV_PORT;

const validateTokenRouter = require('./routes/validateTokenRoute');
const registerRouter = require("./routes/registerRoutes");
const signInRouter = require("./routes/signInRoutes");
const tweetRouter = require("./routes/tweetRouters");
const userRouter = require("./routes/userRoutes");
const { connectBd } = require('./config/db');

const authMiddleware = require('./middlewares/authMiddleware');

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use("/", registerRouter, signInRouter);

app.use(authMiddleware.validateToken);

app.use('/', userRouter)
app.use('/', validateTokenRouter)
app.use("/:username", tweetRouter);
app.use("/user", userRouter);
app.use("/tweet", tweetRouter);

connectBd()

app.listen(port, () => {
  console.log(`La app está escuchando en <http://localhost>:${port}`);
});
