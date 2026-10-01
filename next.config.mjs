/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/java/syllabus',
        destination: '/java',
        permanent: true,
      },
      {
        source: '/dotnet',
        destination: '/',
        permanent: true,
      },
      {
        source: '/dotnet/:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
