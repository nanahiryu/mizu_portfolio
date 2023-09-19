/** @type {import('next').NextConfig} */
const nextConfig = {
  // ルートパスにアクセスしたら、/portfolioにリダイレクトする
  async redirects() {
    return [
      {
        source: "/",
        destination: "/portfolio",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

module.exports = nextConfig;
