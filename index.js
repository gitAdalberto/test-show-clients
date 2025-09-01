import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { pool } from './db.js';

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}));

app.use(express.json());

app.get("/",async (req,res) => {
    res.send("Servidor funcionando!");
})

app.get("/show", async (req,res) => {
    try {
        const result = await pool.query('SELECT * FROM tbClientes;');
        console.log(result);
        res.json({ success: true, message: "Datos obtenidos exitosamente!", result: result});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
})

app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
