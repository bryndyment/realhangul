'use client'

import { FC, useEffect } from 'react'

// constants

const IMAGE_LIST = [
  'kana-19.png',
  'kana-50.png',
  'typeface-1.png',
  'typeface-2.png',
  'typeface-3.png',
  'typeface-4.png',
  'typeface-5.png',
  'typeface-6.png',
  'typeface-7.png',
  'typeface-8.png',
  'typeface-9.png'
]

// components

export const PreloadImages: FC = () => {
  useEffect(() => {
    const preloadImages = () => {
      IMAGE_LIST.forEach(image => {
        const img = new Image()

        img.src = `/${image}`
      })
    }

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadImages)
    }
  }, [])

  return null
}
