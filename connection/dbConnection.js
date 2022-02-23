const db = require('mysql2')
const pool=db.createPool({
    host : 'localhost',
    user :'root',
    database : 'donatello',
    password : 'root'
});

module.exports=pool.promise();