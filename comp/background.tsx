'use client'

import { useMobileMediaQuery } from '@/hooks/useMobileMediaQuery'
import { WHITE } from '@/util/styles'
import Image from 'next/image'
import { FC } from 'react'

// components

export const Background: FC = () => {
  const isMobile = useMobileMediaQuery()

  if (isMobile) return null

  return (
    <Image
      alt="background"
      height={600}
      priority
      src="/background.jpg"
      style={{ backgroundColor: WHITE, borderRadius: 6, left: 0, position: 'absolute', top: 0, zIndex: -1 }}
      unoptimized
      width={594}
    />
  )
}
