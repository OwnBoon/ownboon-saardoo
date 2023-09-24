/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil"
    });

    config.resolve = {
      ...config.resolve,
      fallback: {
        "fs": false,
        "path": false,
        "os": false,
      }
    }

    return config;
  },
  images: {
    domains: [
      "uploadthing.com",
      "utfs.io"
    ]
  },
  async redirects() {
    return [
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
