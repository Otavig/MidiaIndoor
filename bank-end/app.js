const express = requise("express")
const cors = requise("cors")
const mysql = requise("mysql/promise")
const badyparser = requise("body-parser")

const app = express()
app.use(cors())
const porta = 3000
app.use(bodyParser.json())

app.listen (porta, () => {
    console.log(`o servidor está rodando em http://localhost:${porta}`)
})