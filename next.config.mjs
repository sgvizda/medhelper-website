import { withPayload } from '@payloadcms/next/withPayload'

const isProd = process.env.NODE_ENV === 'production'

/**
 * Content Security Policy for the public site. The Payload admin (/admin)
 * needs a looser policy, so it gets its own header block below.
 */
const siteCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'" + (isProd ? '' : " 'unsafe-eval'"),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isProd ? ['upgrade-insecure-requests'] : []),
].join('; ')

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  ...(isProd
    ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }]
    : []),
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.STANDALONE ? 'standalone' : undefined,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      ...(process.env.S3_PUBLIC_URL
        ? [{ protocol: 'https', hostname: new URL(process.env.S3_PUBLIC_URL).hostname }]
        : []),
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
  },
  async headers() {
    return [
      {
        source: '/((?!admin|api).*)',
        headers: [...securityHeaders, { key: 'Content-Security-Policy', value: siteCsp }],
      },
      {
        source: '/(admin|api)(.*)',
        headers: securityHeaders.filter((h) => h.key !== 'X-Frame-Options'),
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
