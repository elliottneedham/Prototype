const { Connection, Request } = require('tedious');
const getAccessToken = require('../utils/getAccessToken');

const getNoRData = async () => {
  const accessToken = await getAccessToken();

  const config = {
    server: process.env.FABRIC_DATABASE_URL,
    options: {
      database: process.env.FABRIC_DATABASE_NAME,
      encrypt: true,
    },
    authentication: {
      type: 'azure-active-directory-access-token',
      options: {
        token: accessToken,
      },
    },
  };

  return new Promise((resolve, reject) => {
    const connection = new Connection(config);
    const results = [];

    connection.on('connect', err => {
      if (err) {
        console.error('❌ Connection failed:', err);
        return reject(new Error('SQL connection failed'));
      }

      const query = `SELECT TOP 10 * FROM school_level_data_historic_actual_and_projection_NoR`;
      const request = new Request(query, (err) => {
        if (err) {
          console.error('❌ Query failed:', err);
          return reject(new Error('Query execution failed'));
        }
      });

      request.on('row', columns => {
        const row = {};
        columns.forEach(col => {
          row[col.metadata.colName] = col.value;
        });
        results.push(row);
      });

      request.on('requestCompleted', () => {
        connection.close();
        resolve(results);
      });

      connection.execSql(request);
    });

    connection.connect();
  });
};

module.exports = getNoRData;
