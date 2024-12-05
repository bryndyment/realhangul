'use client'

import { useAppContext } from '@/hooks/useAppContext'
import { nthChild } from '@/util/common'
import { _Sx } from '@/util/styles'
import { Box } from '@mui/material'
import Image from 'next/image'
import { FC, MouseEvent } from 'react'

// types

type _PreviewProps = { isHangul: boolean }

// constants

const LOCAL: _Sx = {
  inner: { height: 19, mx: 'auto', overflow: 'hidden', width: 19 },
  outer: { cursor: 'pointer', flexGrow: 1, py: 1.75 },
  preview: { backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: 1, display: 'flex', mb: 1.875 }
}

// components

export const Preview: FC<_PreviewProps> = ({ isHangul }) => {
  const { updateContext } = useAppContext()

  const handleClick = (event: MouseEvent) => updateContext({ preview: nthChild(event) })

  const previewIcons = [...Array(9)].map((_, index) => (
    <Box key={index} onClick={handleClick} sx={LOCAL.outer}>
      <Box sx={LOCAL.inner}>
        <Image
          alt={isHangul ? 'あ' : 'ア'}
          height={304}
          src="/kana-19.png"
          style={{ left: isHangul ? `-${190 * index}px` : `-${190 * (index + 1) - 95}px`, position: 'relative', top: isHangul ? 0 : '-133px' }}
          unoptimized
          width={1710}
        />
      </Box>
    </Box>
  ))

  return <Box sx={LOCAL.preview}>{previewIcons}</Box>
}
