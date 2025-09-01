import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

import { pool } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}));

app.use(express.json());

app.get("/",async (req,res) => {
    res.send("Servidor funcionando!");
})

app.get("/clientes", async (req,res) => {
    try {
        const [result] = await pool.query('SELECT * FROM tbClientes;');
        console.log(result);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
})

app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
