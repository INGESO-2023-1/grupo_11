const express = require("express");
const cors = require("cors")
const pool = require("./db")
const app = express();

app.use(cors());
app.use(express.json());


// backend tiene lsa funciones para recibir y postear data a la bd, voy a hacer algunos que son necesarios: es decir una

//selecciona todos usuarios con quien se ha conversado
app.get("/usuarios/:id_user", async (req, res) => {
    try{
        const id_user = req.params["id_user"];
        const allusers = await pool.query('SELECT * FROM mensajes WHERE origin_id = $1 OR recipient_id = $1',
            [id_user]);
        res.json(allusers.rows);
    }
    catch (err){
        console.log(err.message);
    }
});
//obtiene todos los mensajes entre dos usuarios: se haran dos consultas, una para remitente y una para origen, asi que solo sera de la forma los mensajes de A a B
//aun no se como hacer que pueda tener mas de un get de una api rest
app.get("/usuarios/:id_user1/:id_user2", async (req, res) => {
    try{
        const id_user1 = req.params["id_user1"];
        const id_user2 = req.params["id_user2"];
        const allusers = await pool.query('SELECT * FROM mensajes WHERE origin_id = $1 and recipient_id = $2',
            [id_user1,id_user2]);
        res.json(allusers.rows);
    }
    catch (err){
        console.log(err.message);
    }
});
// agrega mensajes a la tabla
app.post("/usuarios/:id_user1/:id_user2", async(req, res) => {
    try{
        const id_user1 = req.params['id_user1'];
        const id_user2 = req.params['id_user2'];
        const {description} = req.body;
        const newmessage = await pool.query('INSERT INTO mensajes (origin_id,recipient_id,msg_content,timestamp) VALUES ($1,$2,$3,NOW()) RETURNING *', 
            [id_user1,id_user2,description]);
        res.json(newmessage.rows[0]);
    }catch(err){
        console.log(err.message);
    }
});

app.listen(5001, () =>{
    console.log("server started on 5001")
});