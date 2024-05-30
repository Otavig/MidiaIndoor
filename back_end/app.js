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
const mw_upload = multer({ dest: "./dir_uploads" })



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

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/front-end/index.html')
})

app.get('/exibir', (req, res) => {
    res.sendFile(__dirname + '/front-end/midia.html')
})

// Rota para obter todas as mídias
app.get("/api/midia_indoor/", async (req, res) => {
    try {
        const conexao = await pool.getConnection();
        const sql = `SELECT * FROM midia`;
        const [linha] = await conexao.execute(sql);
        conexao.release();
        res.json(linha);
    } catch (error) {
        console.log(`O erro que ocorreu foi: ${error}`);
        res.status(500).json({ error: "Deu algum erro na busca" });
    }
});

app.use("", express.static("front-end/"))


app.post("/upload", mw_upload.single("arquivo"), (req, res) => {
    try {
        console.log(req.file);

        if (!req.file) {
            return res.status(400).json({ error: "Nenhum arquivo foi enviado." });
        }

        let arq_recebido = req.file.path;
        let arq_destino = "front-end/midias/" + req.file.filename + path.extname(req.file.originalname);

        // Movendo arquivo recebido
        fs.renameSync(arq_recebido, arq_destino);

        res.status(200).json({
            message: "Arquivo recebido e movido com sucesso.",
            filename: req.file.filename + path.extname(req.file.originalname),
        });
    } catch (error) {
        console.error("Erro no upload:", error);
        res.status(500).json({ error: "Erro interno durante o upload." });
    }
});

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
    const id = req.params.id;
    let conexao;

    try {
        conexao = await pool.getConnection();
        const sqlSelect = `SELECT url FROM midia WHERE id = ?`;
        const [rows] = await conexao.execute(sqlSelect, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Registro não encontrado" });
        }

        const arquivoUrl = rows[0].url;
        const caminhoArquivo = path.join(__dirname, 'front-end', 'midias', arquivoUrl);

        await excluirArquivo(caminhoArquivo);

        const sqlDelete = `DELETE FROM midia WHERE id = ?`;
        await conexao.execute(sqlDelete, [id]);

        conexao.release();

        res.json({ msg: "Registro e arquivo excluídos!" });
    } catch (error) {
        if (conexao) conexao.release();
        console.error(`Erro ao excluir registro: ${error}`);
        res.status(500).json({ error: "Deu algum erro na exclusão" });
    }
});

// Função para excluir o arquivo
function excluirArquivo(caminho) {
    return new Promise((resolve, reject) => {
        fs.unlink(caminho, (erro) => {
            if (erro) {
                return reject(erro);
            }
            resolve();
        });
    });
}



app.listen(porta, () => {
    console.log(`o servidor está rodando em http://localhost:${porta}`)
})