import { Blog } from '@/comp/pages/blog'
import { buildMetadata } from '@/util/common'
import { FC } from 'react'

// metadata

export const generateMetadata = buildMetadata({
  canonical: '/blog',
  description: 'The Real Kana blog.',
  title: 'Blog : Real Kana'
})

// components

const BlogPage: FC = () => <Blog />

export default BlogPage
