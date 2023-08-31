const mysql = require('mysql2');
const fs = require('fs');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'anjali@123',
  database: 'dummy'
};


const connection = mysql.createConnection(dbConfig);

const query = "SELECT * FROM dummy_table";

connection.connect(err => {
  if (err) {
    console.error('error into the database:', err);
    return;
  }

  connection.query(query, (err, rows) => {
    if (err) {
      console.error('error in query:', err);
      connection.end();
      return;
    }

    const csvData = rows.map(row => Object.values(row).join(','));

    fs.writeFile('output.csv', csvData.join('\n'), err => {
      if (err) {
        console.error('error :', err);
      } else {
        console.log('csv file  save successfull.');
      }
      connection.end();
    });
  });
});
