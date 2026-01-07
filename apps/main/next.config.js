/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js")

/** @type {import("next").NextConfig} */
const config = {
  env: { NEXT_API_URL: process.env.NEXT_API_URL },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "d4278d3d3c974da0009aefca43bdb2ae.r2.cloudflarestorage.com",
        pathname: "/class-cat/media/**",
      },
    ],
  },
}

export default config
