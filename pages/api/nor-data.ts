import { NextApiRequest, NextApiResponse } from 'next';
import { Connection, Request } from 'tedious';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('🔁 Starting token request...');

    const tokenResponse = await axios.post(
      `https://login.microsoftonline.com/${process.env.FABRIC_TENANT_ID}/oauth2/v2.0/token`,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.FABRIC_CLIENT_ID!,
        client_secret: process.env.FABRIC_CLIENT_SECRET!,
        scope: 'https://database.windows.net/.default',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;
    console.log('✅ Token acquired:', accessToken?.substring(0, 20) + '...');

    const config = {
      server: process.env.FABRIC_DATABASE_URL!,
      authentication: {
        type: 'azure-active-directory-access-token' as const,
        options: {
          token: accessToken,
        },
      },
      options: {
        database: process.env.FABRIC_DATABASE_NAME!,
        encrypt: true,
        rowCollectionOnRequestCompletion: true,
        trustServerCertificate: false,
        connectTimeout: 60000,
        requestTimeout: 60000,
      },
    };

    const connection = new Connection(config);

    connection.on('connect', (err) => {
      if (err) {
        console.error('❌ Connection error:', err.message);
        return res.status(500).json({ error: 'Connection failed', detail: err.message });
      }

      console.log('✅ Connected. Running SQL...');
      const request = new Request(
        'SELECT TOP 10 * FROM school_level_data_historic_actual_and_projection_NoR',
        (err, rowCount, rows) => {
          if (err) {
            console.error('❌ SQL error:', err.message);
            return res.status(500).json({ error: 'Query failed', detail: err.message });
          }

          const data = rows.map(row =>
            Object.fromEntries(row.map(col => [col.metadata.colName, col.value]))
          );

          console.log(`✅ ${rowCount} rows retrieved`);
          res.status(200).json(data);
          connection.close();
        }
      );

      connection.execSql(request);
    });

    setTimeout(() => {
      console.error('❌ Timeout: SQL connection took too long');
      res.status(504).json({ error: 'Timeout connecting to database' });
      connection.close();
    }, 60000);
  } catch (err: any) {
    console.error('❌ Token error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve token', detail: err.message });
  }
}