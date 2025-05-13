/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/nor',
        destination: 'https://fabric-api-elliott-win.azurewebsites.net/api/nor',
      },
    ];
  },
};

module.exports = nextConfig;