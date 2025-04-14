const { Connection, Request } = require("tedious");

const config = {
  authentication: {
    options: {
      clientId: process.env.FABRIC_CLIENT_ID,
      authorityId: process.env.FABRIC_TENANT_ID,
      clientSecret: process.env.FABRIC_CLIENT_SECRET,
    },
    type: "azure-active-directory-password",
  },
  server: "zhy37jcw26quzfiun7rrsrwc7q-mtr6qabpalfeldtgvae7cdnpzu.sql.fabric.microsoft.com",
  options: {
    database: "insites_lakehouse_gold",
    encrypt: true,
    rowCollectionOnRequestCompletion: true,
    trustServerCertificate: false,
    port: 1433,
  },
};

exports.getNoRData = (req, res) => {
  const connection = new Connection(config);

  connection.connect((err) => {
    if (err) {
      console.error("❌ Connection failed:", err);
      return res.status(500).json({ error: "SQL connection failed" });
    }

    const query = `
      SELECT Year, URN, Rationalised_School_Type, Yr_Group, Pupils, Actual_Projection_Historic, Phase
      FROM dbo.NoR_Chart_Results
      WHERE URN = '100225'
    `;

    const request = new Request(query, (err, rowCount, rows) => {
      if (err) {
        console.error("❌ Query error:", err);
        return res.status(500).json({ error: "Query failed" });
      }

      const data = rows.map((row) => {
        const record = {};
        row.forEach((column) => {
          record[column.metadata.colName] = column.value;
        });
        return record;
      });

      res.json(data);
      connection.close();
    });

    connection.execSql(request);
  });
};