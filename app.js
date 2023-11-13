const express = require('express');
const app = express()

const appRoutes = require("./routes")

const PORT = process.env.PORT || 3000

app.use(appRoutes)

app.listen(PORT, () => {
    console.log("server running on port " + PORT);
})
