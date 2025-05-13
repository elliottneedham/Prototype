import { Connection, Request } from 'tedious';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  console.log("🧪 Token received:", token?.slice(0, 20));

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  const config = {
    server: "zhy37jcw26quzfiun7rrsrwc7q-mtr6qabpalfeldtgvae7cdnpzu.datawarehouse.fabric.microsoft.com",
    options: {
      database: "Insites_Lakehouse_Gold",
      encrypt: true,
      rowCollectionOnRequestCompletion: true,
      trustServerCertificate: false,
    },
    authentication: {
      type: "azure-active-directory-access-token" as const,
      options: {
        token,
      },
    },
  };

  const connection = new Connection(config);

  let hasResponded = false;

  connection.on('connect', (err) => {
    if (err) {
      console.error('❌ Connection error:', err.message);
      if (!hasResponded) {
        res.status(500).json({ error: 'Connection failed', detail: err.message });
        hasResponded = true;
      }
      return;
    }

    const request = new Request(
      "SELECT TOP 1 * FROM School_Level_Data_Historic_Actual_and_Projection_NoR",
      (err, rowCount, rows) => {
        if (err) {
          console.error('❌ SQL error:', err.message);
          if (!hasResponded) {
            res.status(500).json({ error: 'Query failed', detail: err.message });
            hasResponded = true;
          }
          return;
        }

        const data = rows.map(row =>
          Object.fromEntries(row.map(col => [col.metadata.colName, col.value]))
        );

        console.log('✅ Query success - rows returned:', rowCount);
        if (!hasResponded) {
          res.status(200).json(data);
          hasResponded = true;
        }
        connection.close();
      }
    );

    connection.execSql(request);
  });

  // Force timeout after 30 seconds
  setTimeout(() => {
    if (!hasResponded) {
      console.error("⏱️ Timeout connecting to Fabric SQL");
      res.status(504).json({ error: "Timeout connecting to Fabric SQL" });
      hasResponded = true;
      connection.close();
    }
  }, 30000);
}
