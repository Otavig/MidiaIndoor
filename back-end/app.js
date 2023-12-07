const fs = require("fs")
const path = require("path")

const express = require("express")
const cors = require("cors")
const mysql = require("mysql2/promise")
const bodyparser = require("body-parser")

const app = express()
app.use(cors())
const porta = 3000
app.use(bodyparser.json())

const multer = require("multer")
const midia_upload = multer({ dest: "midias_uploads" })


// criar uma pool de conexão
const pool = mysql.createPool({
    host: `localhost`,
    user: `root`,
    password: ``,
    database: `midia_indoor`,
    waitForConnections: true,
    connectionLimit: 3,
    queueLimit: 0
    
})

app.use("/bancos_midias", express.static("midias"))

app.post("/api/midia_indoor", midia_upload.single("arquivo_midia") , (req, res) => {
    console.log(req.file)

    let midia_arq_recebido = req.file.path
    let midia_arq_destino = "midias/" + req.file.filename + path.extname(req.file.originalname)

    fs.renameSync(midia_arq_recebido, midia_arq_destino)

    res.send(`<a class="nav-link" id="btn_Exibir" target="_blank" href = "http://localhost:3000/bancos_midias/
    ${ req.file.filename + path.extname(req.file.originalname)}>Exibir</a>`)
})

// rota pra SELECT
app.get(`/api/midia_indoor`, async (req, res) => {
    try {
        const conexao = await pool.getConnection();
        const sql = `SELECT * FROM midia`;
        //console.log(sql)
        const [linha] = await conexao.execute(sql);
        conexao.release();
        res.json(linha);

    } catch (error) {
        console.log(`O erro que ocorreu foi: ${error}`)
        res.send(500).json({ error: "Deu algum erro na busca" })
    }
})

// rota pra SELECT com o ID
app.get(`/api/midia_indoor/id/:id`, async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const conexao = await pool.getConnection();
        const sql = `SELECT * FROM midia WHERE id = ${id}`;

        const [linha] = await conexao.execute(sql);
        console.log(sql);
        conexao.release();
        res.json(linha[0]);

    } catch (error) {
        console.log(`O erro que ocorreu foi: ${error}`)
        res.send(500).json({ error: "Deu algum erro na busca" })
    }
})

// Rota para SELECT com o nome
app.get(`/api/midia_indoor/nome/:nome`, async (req, res) => {
    try {
        const nome = req.params.nome;
        const conexao = await pool.getConnection();
        const sql = `SELECT * FROM midia WHERE nome LIKE "%${nome}%"`;
        const [linha] = await conexao.execute(sql);
        console.log(sql);
        conexao.release();
        res.json(linha);

    } catch (error) {
        console.log(`O erro que ocorreu foi: ${error}`)
        res.send(500).json({ error: "Deu algum erro na busca" })
    }
})

// rota para cadastrar 
app.post("/api/midia_indoor/", async (req, res) => {
    try {
        const { nome, tipo, status, data_inicio, data_fim, url, tempo } = req.body;
        const conexao = await pool.getConnection();
        const sql = `INSERT INTO midia (nome, tipo, status, data_inicio, data_fim, url, tempo) VALUES ("${nome}", "${tipo}", "${status}", "${data_inicio}", "${data_fim}", "${url}", ${tempo})`;
        console.log(sql);
        const [linha] = await conexao.execute(sql);
        conexao.release();
        res.json({ msg: "Registro gravado!" });
    } catch (error) {
        console.log(`O erro que ocorreu foi: ${error}`);
        res.status(500).json({ error: "Deu algum erro no cadastro" });
    }
});


// Rota para Editar
app.put("/api/midia_indoor/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, tipo, status, data_inicio, data_fim, url, tempo } = req.body;

        const conexao = await pool.getConnection();
        const sql = `UPDATE midia SET nome = "${nome}", tipo = "${tipo}", status = "${status}", data_inicio = "${data_inicio}", data_fim = "${data_fim}", url = "${url}", tempo = "${tempo}" WHERE id = "${id}"`;
        const [linha] = await conexao.execute(sql);
        conexao.release();

        res.json({ msg: "Registro Atualizado!" });
    } catch (error) {
        console.log(`O erro que ocorreu foi: ${error}`);
        res.status(500).json({ error: "Deu algum erro na atualização" });
    }
});

// Rota pra deletar
app.delete("/api/midia_indoor/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const conexao = await pool.getConnection();
        const sql = `DELETE FROM midia WHERE id = ${id}`;
        const [linha] = await conexao.execute(sql, [id]);
        conexao.release();
        res.json({ msg: "Registro excluído!" });
    } catch (error) {
        console.log(`O erro que ocorreu foi: ${error}`);
        res.status(500).json({ error: "Deu algum erro na exclusão" });
    }
});


app.listen(porta, () => {
    console.log(`o servidor está rodando em http://localhost:${porta}`)
})