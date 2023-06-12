const express = require("express");
const cors = require("cors")
const pool = require("./db")
const app = express();

app.use(cors());
app.use(express.json());


// backend tiene lsa funciones para recibir y postear data a la bd, voy a hacer algunos que son necesarios: es decir una

// esta funcion dado un id de usuario retorna los campos relacionados a dicho usuario, insertados en la tabla de Usuarios
app.get("/usuarios/:id_user", async (req, res) => {
    try{
        const id_user = req.params["id_user"];
        const user = await pool.query('SELECT * FROM usuarios WHERE id = $1',
            [id_user]);
        console.log(user.rows)
        res.json(user.rows);
    }
    catch (err){
        console.log(err.message);
    }
});

//selecciona todos usuarios con quien se ha conversado
app.get("/mensajes/:id_user", async (req, res) => {
    try{
        const id_user = req.params["id_user"];
        const allusers = await pool.query('SELECT * FROM mensajes WHERE origin_id = $1 OR recipient_id = $1 ORDER BY timestamp DESC',
            [id_user]);
        res.json(allusers.rows);
    }
    catch (err){
        console.log(err.message);
    }
});
//obtiene todos los mensajes entre dos usuarios: se haran dos consultas, una para remitente y una para origen, asi que solo sera de la forma los mensajes de A a B
app.get("/mensajes/:id_user1/:id_user2", async (req, res) => {
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
app.post("/mensajes/:id_user1/:id_user2", async(req, res) => {
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

// ADMIN ----------------------------------------------------

// GET request to fetch all device data
app.get("/devices", async (req, res) => {
    try{
        const allDevices = await pool.query('SELECT * FROM hlr');
        res.json(allDevices.rows);
    } catch (err){
        console.error(err.message);
    }
});

// GET request to fetch a specific device's data
app.get("/devices/:device", async (req, res) => {
    try{
        const { device } = req.params;
        const deviceData = await pool.query('SELECT * FROM hlr WHERE device = $1', [device]);
        res.json(deviceData.rows[0]);
    } catch (err){
        console.error(err.message);
    }
});

// PUT request to update a device's msc field
app.put("/devices/:device", async (req, res) => {
    try{
        const { device } = req.params;
        const { msc } = req.body;
        const updateDevice = await pool.query('UPDATE hlr SET msc = $1 WHERE device = $2 RETURNING *', [msc, device]);
        res.json(updateDevice.rows[0]);
    } catch(err){
        console.error(err.message);
    }
});

// DELETE request to disconnect a device (set msc field to 'Disconnected')
app.delete("/devices/:device", async (req, res) => {
    try{
        const { device } = req.params;
        const disconnectDevice = await pool.query('UPDATE hlr SET msc = $1 WHERE device = $2 RETURNING *', ['Disconnected', device]);
        res.json("Device was successfully disconnected!");
    } catch(err){
        console.error(err.message);
    }
});

app.listen(5001, () =>{
    console.log("server started on 5001")
});