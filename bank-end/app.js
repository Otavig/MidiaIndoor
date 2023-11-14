const express = require("express")
const cors = require("cors")
const mysql = require("mysql2/promise")
const bodyparser = require("body-parser")

const app = express()
app.use(cors())
const porta = 3000
app.use(bodyparser.json())

app.listen (porta, () => {
    console.log(`o servidor está rodando em http://localhost:${porta}`)
})

