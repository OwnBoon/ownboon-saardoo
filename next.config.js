/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/',
        permanent: true,
      },{
        source: '/vent-choose',
        destination: '/workspace',
        permanent: true,
      },
      {
        source: '/social',
        destination: '/workspace',
        permanent: true,
      },
      {
        source: '/publishpost',
        destination: '/workspace',
        permanent: true,
      },
      {
        source: '/groupchat',
        destination: '/workspace',
        permanent: true,
      },
      {
        source: '/chats',
        destination: '/workspace',
        permanent: true,
      },
      {
        source: '/categories',
        destination: '/workspace',
        permanent: true,
      },
      {
        source: '/buddies',
        destination: '/workspace',
        permanent: true,
      },
      {
        source: '/blogpost',
        destination: '/workspace',
        permanent: true,
      },
      {
        source: '/dashboard',
        destination: '/workspace',
        permanent: true,
      },
    ];
  },
};
