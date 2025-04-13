const { Connection, Request } = require('tedious');

const config = {
  server: process.env.FABRIC_SERVER,
  authentication: {
    type: 'azure-active-directory-msi-app-service',
    options: {
      clientId: process.env.FABRIC_CLIENT_ID,
    },
  },
  options: {
    database: process.env.FABRIC_DATABASE,
    encrypt: true,
    trustServerCertificate: false,
  },
};

module.exports = function getNoRData() {
  return new Promise((resolve, reject) => {
    const connection = new Connection(config);
    const results = [];

    connection.on('connect', (err) => {
      if (err) return reject(err);

      const request = new Request(
        `SELECT TOP 100 Year, Pupils 
         FROM [dbo].[School_Level_Data_Historic_Actual_and_Projection_NoR] 
         WHERE Actual_Projection_Historic = 'Actual' AND Yr_Group = 'Total'
         ORDER BY Year`,
        (err) => {
          if (err) return reject(err);
          connection.close();
        }
      );

      request.on('row', (columns) => {
        const row = {};
        columns.forEach((column) => {
          row[column.metadata.colName] = column.value;
        });
        results.push({
          Date: row.Year,
          Value: row.Pupils,
        });
      });

      request.on('requestCompleted', () => resolve(results));
      connection.execSql(request);
    });

    connection.connect();
  });
};