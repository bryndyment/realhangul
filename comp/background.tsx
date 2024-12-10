'use client'

import { WHITE } from '@/util/styles'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

// types
interface Dimensions {
  height: number
  width: number
}

// components

export const Background: FC<{ containerRef: React.RefObject<HTMLDivElement | null> }> = ({ containerRef }) => {
  const [dimensions, setDimensions] = useState<Dimensions | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.contentRect) {
          setDimensions({
            height: entry.contentRect.height,
            width: entry.contentRect.width
          })
        }
      }
    })

    resizeObserver.observe(container)

    return () => {
      if (container) {
        resizeObserver.unobserve(container)
      }
    }
  }, [containerRef])

  if (!dimensions) return null

  return (
    <Image
      alt="background"
      height={dimensions.height}
      priority
      src="/background.jpg"
      style={{
        backgroundColor: WHITE,
        borderRadius: 6,
        left: 0,
        position: 'absolute',
        top: 0,
        zIndex: -1
      }}
      unoptimized
      width={dimensions.width}
    />
  )
}
