/** @type {import('next').NextConfig} */
// const nextConfig = {};

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@radix-ui/react-tabs',
    '@radix-ui/react-slider', 
    '@radix-ui/react-tooltip',
    '@radix-ui/react-roving-focus'
  ]
}

// module.exports = nextConfig;
export default nextConfig;
