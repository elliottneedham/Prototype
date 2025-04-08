// index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Connection, Request } = require('tedious');
const axios = require('axios');
console.log('👀 FABRIC_TENANT_ID:', process.env.FABRIC_TENANT_ID);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🌍 Fabric API is alive — root route responding!');
});

app.get('/test', (req, res) => {
  res.json({ message: 'Fabric API is alive and kicking 🚀' });
});

app.get('/api/nor-data', async (req, res) => {
  console.log('🚦 /api/nor-data endpoint hit');

  try {
    console.log('🔐 Requesting token from Azure...');
    const tokenResponse = await axios.post(
      `https://login.microsoftonline.com/${process.env.FABRIC_TENANT_ID}/oauth2/v2.0/token`,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.FABRIC_CLIENT_ID,
        client_secret: process.env.FABRIC_CLIENT_SECRET,
        scope: 'https://database.windows.net/.default',
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const accessToken = tokenResponse.data.access_token;
    console.log('✅ Token acquired from Azure');

    const config = {
      server: process.env.FABRIC_DATABASE_URL,
      authentication: {
        type: 'azure-active-directory-access-token',
        options: { token: accessToken },
      },
      options: {
        database: process.env.FABRIC_DATABASE_NAME,
        encrypt: true,
        rowCollectionOnRequestCompletion: true,
        trustServerCertificate: false,
        port: 1433,
        connectTimeout: 60000,
        requestTimeout: 60000,
      },
    };

    console.log('🔧 SQL config prepared');
    const connection = new Connection(config);

    connection.on('connect', (err) => {
      if (err) {
        console.error('❌ Connection error:', err.message);
        return res.status(500).json({ error: 'Connection failed', detail: err.message });
      }

      console.log('🟢 Connected. Running SQL query...');
      const request = new Request(
        'SELECT * FROM school_level_data_historic_actual_and_projection_NoR',
        (err, rowCount, rows) => {
          if (err) {
            console.error('❌ Query error:', err.message);
            return res.status(500).json({ error: 'Query failed', detail: err.message });
          }

          const data = rows.map(row =>
            Object.fromEntries(row.map(col => [col.metadata.colName, col.value]))
          );

          console.log(`✅ Query successful. Returned ${rowCount} rows.`);
          res.json(data);
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
  } catch (err) {
    console.error('❌ Token error:', err.message);
    console.error('📦 Full error response:', err.response?.data || err);
    res.status(500).json({
      error: 'Token failure',
      detail: err.response?.data || err.message,
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Fabric API running on http://0.0.0.0:${PORT}`);
});