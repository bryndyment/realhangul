'use client'

import { HANGUL_LABELS } from '@/util/common'
import { _Sx, GRAY } from '@/util/styles'
import { Box, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import { FC } from 'react'

// types
type _HangulProps = {
  columns: string[]
  hangulPageId: string
  rows: string[]
}

const LOCAL: _Sx = {
  hangulCell: {
    '&:last-child': { borderRight: 'none' },
    borderBottom: 'none',
    borderRight: `1px solid ${GRAY[200]}`,
    lineHeight: 1,
    pb: 0.75,
    pt: 1,
    px: 0,
    textAlign: 'center'
  }
}

// components
export const Hangul: FC<_HangulProps> = ({ columns, rows }) => {
  return (
    <Box
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 1,
        cursor: 'pointer',
        my: 1.5,
        overflowX: 'scroll',
        textAlign: 'center',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <Table sx={{ borderCollapse: 'separate', width: '100%' }}>
        <TableBody>
          {[...Array(rows.length + 1)].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {[...Array(columns.length + 1)].map((_, colIndex) => {
                if (rowIndex === 0 && colIndex === 0) {
                  // Top-left blank cell
                  return <TableCell key={colIndex} sx={{ border: 'none', p: 2 }}></TableCell>
                }

                if (rowIndex === 0) {
                  // Header row: Vowels
                  return (
                    <TableCell
                      key={colIndex}
                      sx={{
                        borderBottom: '1px solid #ddd',
                        fontWeight: 'bold',
                        p: 2,
                        textAlign: 'center'
                      }}
                    >
                      {columns[colIndex - 1]}
                    </TableCell>
                  )
                }

                if (colIndex === 0) {
                  // Header column: Consonants
                  return (
                    <TableCell
                      key={colIndex}
                      sx={{
                        borderBottom: '1px solid #ddd',
                        fontWeight: 'bold',
                        p: 2,
                        textAlign: 'center'
                      }}
                    >
                      {rows[rowIndex - 1]}
                    </TableCell>
                  )
                }

                // Syllables with labels
                const consonant = rows[rowIndex - 1]
                const vowel = columns[colIndex - 1]
                const syllable = consonant + vowel
                const label = HANGUL_LABELS.get(syllable) || ''

                return (
                  <TableCell key={colIndex} sx={{ ...LOCAL.hangulCell }}>
                    <Box sx={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                      <Typography>{syllable}</Typography>
                    </Box>
                    <Box fontSize={15} sx={{ color: GRAY[500], mt: 0.5 }}>
                      <Typography variant="caption">{label}</Typography>
                    </Box>
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}
