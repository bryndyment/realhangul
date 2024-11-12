/** @type {import('next').NextConfig} */

const nextConfig = {
  images: { loader: 'custom', loaderFile: './imageLoader.ts' },
  redirects: async () => [
    { destination: '/blog/how-is-hangul-used', permanent: true, source: '/blog/how_is_hangul_used' },
    { destination: '/blog/introducing-high-scores', permanent: true, source: '/blog/introducing_high_scores' },
    { destination: '/blog/introducing-words', permanent: true, source: '/blog/introducing_words' },
    { destination: '/blog/what-is-hangul', permanent: true, source: '/blog/what_is_hangul' },
    { destination: '/study', permanent: true, source: '/practice' }
  ]
}

module.exports = nextConfig
