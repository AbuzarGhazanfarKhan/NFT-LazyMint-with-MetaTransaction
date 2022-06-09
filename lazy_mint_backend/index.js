require("./db").connect();
const express = require('express')
const api = require('./apis')
const cors = require('cors')
const port = process.env.PORT || 8000


const app = express()
app.use(cors({origin:"*"}))
app.use(express.json())
app.use(api)


app.listen(port)