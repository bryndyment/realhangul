import { CHARS } from '@/util/common'
import { Box } from '@mui/material'
import Image from 'next/image'
import { FC } from 'react'

// types

type _QuestionProps = { kana: string[]; typeface: number }

// components

export const Question: FC<_QuestionProps> = ({ kana, typeface }) => (
  <>
    {kana[0].split('').map((item, index) => (
      <Box key={index} sx={{ display: 'inline-block', height: 50, overflow: 'hidden', width: 50 }}>
        <Image
          alt={item}
          height={800}
          quality={100}
          src="/kana-50.png"
          style={{ left: `-${CHARS.get(item)![0] * 50 + (typeface - 1) * 500}px`, position: 'relative', top: `-${CHARS.get(item)![1] * 50}px` }}
          unoptimized
          width={4500}
        />
      </Box>
    ))}
  </>
)
