import { Pool } from 'pg';
const pool = new Pool({
  user: 'sofiwi',
  host: 'localhost',
  database: 'isw',
  password: 'root',
  port: 5432,
});

const getDispositivos = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM dispositivos ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const createDispositivo = (body) => {
    return new Promise(function(resolve, reject) {
      const { name, email } = body
      pool.query('INSERT INTO dispositivos (estado) VALUES ($1) RETURNING *', [estado], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Dispositivo ha sido añadido ${results.rows[0]}`)
      })
    })
  }
  const deleteDispositivo = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.id)
      pool.query('DELETE FROM dispositivos WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`dispositivo eliminado con ID: ${id}`)
      })
    })
  }
  
  export default {
    getMerchants,
    createMerchant,
    deleteMerchant,
  }