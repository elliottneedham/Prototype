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
        `SELECT Year, Pupils 
         FROM [dbo].[School_Level_Data_Historic_Actual_and_Projection_NoR] 
         WHERE URN = '100225'
           AND Diocese__name_ = 'Diocese of Shrewsbury'
           AND Rationalised_School_Type = '02 - Mainstream - Primary'
           AND Phase <> 'Totals'
           AND Yr_Group NOT IN (
             'Early Years Total', 'Post 16 Total',
             'Primary Total', 'Secondary Total', 'Total'
           )
           AND Year NOT IN (202829, 202930)
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

      request.on('requestCompleted', () => {
        console.log('✅ Fetched rows:', results.length);
        resolve(results);
      });

      connection.execSql(request);
    });

    connection.connect();
  });
};