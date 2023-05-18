import { Pool } from 'pg';
const pool = new Pool({
  user: 'sofiwi',
  host: 'localhost',
  database: 'isw',
  password: 'root',
  port: 5432,
});

const getMensajes = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM mensajes ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const createMensaje = (body) => {
    return new Promise(function(resolve, reject) {
      const contenido = body
      pool.query('INSERT INTO dispositivos (contenido) VALUES ($1) RETURNING *', [contenido], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Dispositivo ha sido añadido ${results.rows[0]}`)
      })
    })
  }

  
  export default {
    getMensajes,
    createMensaje,
  }