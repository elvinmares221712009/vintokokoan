// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     webpack: (config) => {
//       config.module.rules.push({
//         test: /\.html$/,
//         use: 'ignore-loader',
//       });
//       return config;
//     },
//   };
  
//   module.exports = nextConfig;
  
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true, // Untuk optimasi performa
    experimental: {
      appDir: true, // Pastikan app directory routing aktif
    },
  };
  
  module.exports = nextConfig;