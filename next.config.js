/** @type {import('next').NextConfig} */

const nextConfig = {
  images: { loader: 'custom', loaderFile: './imageLoader.ts' },
  redirects: async () => [
    { destination: '/blog/how-is-hiragana-used', permanent: true, source: '/blog/how_is_hiragana_used' },
    { destination: '/blog/how-is-katakana-used', permanent: true, source: '/blog/how_is_katakana_used' },
    { destination: '/blog/introducing-high-scores', permanent: true, source: '/blog/introducing_high_scores' },
    { destination: '/blog/introducing-words', permanent: true, source: '/blog/introducing_words' },
    { destination: '/blog/what-is-hiragana', permanent: true, source: '/blog/what_is_hiragana' },
    { destination: '/blog/what-is-katakana', permanent: true, source: '/blog/what_is_katakana' },
    { destination: '/study', permanent: true, source: '/practice' }
  ]
}

module.exports = nextConfig
