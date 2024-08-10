const express = require("express")
const app = express()
const port = 3000

const router = require("./routes/appRoutes")

app.use("/clone-x", router)

app.listen(port, () => {
    console.log(`La app está escuchando en <http://localhost>:${port}`)
})