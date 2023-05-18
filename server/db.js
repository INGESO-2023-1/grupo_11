const Pool = require("pg").Pool;

const pool = new Pool({
  	user: 'sofiwi',
  	host: 'localhost',
  	database: 'isw',
	password: 'root',
	port: 5432,
});

module.exports = pool;