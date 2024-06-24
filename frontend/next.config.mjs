/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.weatherapi.com"],
  },
  env: {
    BACKEND_BASE_URL: process.env.DATABASE_URL,
    WEATHER_API_KEY: process.env.API_KEY,
  },
};

export default nextConfig;
