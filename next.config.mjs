/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	distDir: 'build',
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
	sassOptions: {
		silenceDeprecations: ['legacy-js-api'],
	},
	poweredByHeader: false,
	compress: true,
	reactStrictMode: true,
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
	experimental: {
		optimizeCss: true,
	},
};

export default nextConfig;
