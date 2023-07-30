/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "m.media-amazon.com",
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
