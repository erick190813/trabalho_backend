const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();


router.post('/', (req, res) => {
    const { login, senha, fone } = req.body;

    

    if (!login || !senha || !fone) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const filePath = path.join(__dirname, '..', 'data', 'user.json');

    fs.readFile(filePath, (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).json({ error: 'Erro ao ler o arquivo.' });
        }

        let users = [];
        if (data) {
            users = JSON.parse(data);
        }

        users.push({ login, senha, fone });

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao salvar os dados.' });
            }
            res.status(200).json({ message: 'Cadastro realizado com sucesso.' });
        });
    });
});

module.exports = router;
