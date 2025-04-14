const axios = require('axios');

const getAccessToken = async () => {
  const tenantId = process.env.FABRIC_TENANT_ID;
  const clientId = process.env.FABRIC_CLIENT_ID;
  const clientSecret = process.env.FABRIC_CLIENT_SECRET;

  const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('scope', 'https://database.windows.net/.default');

  try {
    const res = await axios.post(url, params);
    return res.data.access_token;
  } catch (err) {
    console.error('❌ Failed to fetch access token:', err.response?.data || err.message);
    throw new Error('Unable to authenticate with Azure AD');
  }
};

module.exports = getAccessToken;