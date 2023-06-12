import { Pool } from 'pg';
const pool = new Pool({
  user: 'sofiwi',
  host: 'localhost',
  database: 'isw',
  password: 'root',
  port: 5432,
});

const getUsuarios = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM usuarios ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const createUsuario = (body) => {
    return new Promise(function(resolve, reject) {
      const username = body
      pool.query('INSERT INTO usuarios (username) VALUES ($1) RETURNING *', [username], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Usuario ha sido añadido ${results.rows[0]}`)
      })
    })
  }
  const deleteUsuario = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.id)
      pool.query('DELETE FROM usuarios WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`usuario eliminado con ID: ${id}`)
      })
    })
  }
  
  export default {
    getUsuarios,
    createUsuario,
    deleteUsuario,
  }