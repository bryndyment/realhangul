'use client'

import { Dialog } from '@/comp/dialog'
import { useAppContext } from '@/hooks/useAppContext'
import { calculate, clickCheckbox, displayedRows, HANGUL_CHARS, HangulGroups, ROWS, ROWS_PER_PAGE } from '@/util/common'
import { _Sx, GRAY, LINK, SECONDARY, zMobileMediaQuery } from '@/util/styles'
import { useOpening } from '@hoologic/use-opening'
import {
  Box,
  Checkbox,
  LabelDisplayedRowsArgs,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import Image from 'next/image'
import { FC, MouseEvent, useState } from 'react'

// types

type _CheckboxesProps = { columns: number; stateKey: string; stateValue: number }
type _HangulCell = { hangul: string; label: string }
type _HangulCellProps = { cell: _HangulCell; hangulPageId: string }
type _HangulCharsProps = { chars: string; sx?: SxProps }
type _HangulProps = { columns: number; hangulPageId: HangulGroups; rangeEnd: number; rangeStart: number }
type _RowsProps = { hangulPageId: string; rows: (_HangulCell | _WordsCell[] | {})[][] } // eslint-disable-line @typescript-eslint/no-empty-object-type
type _WordsCell = { columnIndex: number; label: string; sample: string }
type _WordsCellProps = { cell: _WordsCell; hangulPageId: string }
type _WordsTableRowProps = { item: [string, string] }

// constants

const LOCAL: _Sx = {
  cellHangul: { [zMobileMediaQuery]: { minWidth: 34 } },
  cellHangulDouble: { [zMobileMediaQuery]: { minWidth: 45 } },
  cellHangulWords: { width: '20%', [zMobileMediaQuery]: { minWidth: 45 } },
  checkbox: { '&.Mui-checked': { color: SECONDARY }, p: 0 },
  checkboxCell: {
    '&:last-child': { borderRight: 'none' },
    borderBottom: 'none',
    borderRight: `1px solid ${GRAY[200]}`,
    fontSize: 15,
    lineHeight: 1,
    pb: 1.25,
    pt: 1,
    px: 0,
    textAlign: 'center'
  },
  hangulCell: {
    '&:last-child': { borderRight: 'none' },
    borderBottom: 'none',
    borderRight: `1px solid ${GRAY[200]}`,
    lineHeight: 1,
    pb: 0.75,
    pt: 1,
    px: 0,
    textAlign: 'center'
  },
  sample: { '&::after': { content: '"…」"' }, '&::before': { bottom: 6, content: '"「"', position: 'relative' }, opacity: 0.4 },
  table: {
    '& td': { px: 2, py: 1.5 },
    '& th': { bgcolor: 'transparent', fontWeight: 700, pb: 0.75, pt: 1.125, px: 2, textTransform: 'uppercase' }
  }
}

// components

const Checkboxes: FC<_CheckboxesProps> = ({ columns, stateKey, stateValue }) => {
  const { updateContext } = useAppContext()

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation()

    updateContext({ [stateKey]: calculate('#top table input') })
  }

  let counter = columns
  let decrementer = stateValue

  const checkboxes = [...Array(columns)].map((_, index) => {
    const power = 2 ** --counter

    if (decrementer >= power) {
      decrementer -= power

      return (
        <TableCell key={index} onClick={clickCheckbox} sx={LOCAL.checkboxCell}>
          <Checkbox checked={true} onClick={handleClick} size="small" sx={LOCAL.checkbox} />
        </TableCell>
      )
    }

    return (
      <TableCell key={index} onClick={clickCheckbox} sx={LOCAL.checkboxCell}>
        <Checkbox checked={false} onClick={handleClick} size="small" sx={LOCAL.checkbox} />
      </TableCell>
    )
  })

  return <TableRow sx={{ textAlign: 'center' }}>{checkboxes.reverse()}</TableRow>
}

export const Hangul: FC<_HangulProps> = ({ columns, hangulPageId, rangeEnd, rangeStart }) => {
  const { [hangulPageId]: value } = useAppContext()

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
          <Rows hangulPageId={hangulPageId} rows={ROWS.slice(rangeStart, rangeEnd)} />

          <Checkboxes columns={columns} stateKey={hangulPageId} stateValue={value} />
        </TableBody>
      </Table>
    </Box>
  )
}

const HangulCell: FC<_HangulCellProps> = ({ cell, hangulPageId }) => (
  <TableCell onClick={clickCheckbox} sx={{ ...LOCAL.hangulCell, ...(LOCAL as any)[`cell${hangulPageId.charAt(0).toUpperCase()}${hangulPageId.slice(1)}`] }}>
    <Box sx={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
      <HangulChars chars={cell.hangul} />
    </Box>

    <Box fontSize={15} sx={{ color: GRAY[500], mt: 0.5 }}>
      {cell.label}
    </Box>
  </TableCell>
)

const HangulChars: FC<_HangulCharsProps> = ({ chars, sx }) => {
  const { preview } = useAppContext()

  return (
    <>
      {chars.split('').map((character, index) => (
        <Box key={`${character}-${index}`} sx={{ display: 'inline-block', height: 19, overflow: 'hidden', width: 19, ...sx }}>
          <Image
            alt={character}
            height={304}
            src="/hangul-19.png"
            style={{
              left: `-${HANGUL_CHARS.get(character)![0] * 19 + (preview - 1) * 190}px`,
              position: 'relative',
              top: `-${HANGUL_CHARS.get(character)![1] * 19}px`
            }}
            unoptimized
            width={1710}
          />
        </Box>
      ))}
    </>
  )
}

const Rows: FC<_RowsProps> = ({ hangulPageId, rows }) => (
  <>
    {rows.map((row, index) => (
      <TableRow key={index}>
        {row.map((cell, index2) =>
          'hangul' in cell ? (
            <HangulCell cell={cell} hangulPageId={hangulPageId} key={`${index}-${index2}`} />
          ) : 'columnIndex' in cell ? (
            <WordsCell cell={cell as _WordsCell} hangulPageId={hangulPageId} key={`${index}-${index2}`} />
          ) : (
            <TableCell key={`${index}-${index2}`} onClick={clickCheckbox} sx={LOCAL.hangulCell} />
          )
        )}
      </TableRow>
    ))}
  </>
)

const WordsCell: FC<_WordsCellProps> = ({ cell, hangulPageId }) => {
  const opening = useOpening()
  const [page, setPage] = useState(0)

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation()

    opening.open()
  }

  const handleClose = () => {
    opening.close()

    window.setTimeout(() => {
      document.querySelector('input')!.focus()

      setPage(0)
    }, 200)
  }

  const handlePageChange = (_: any, newPage: number) => setPage(newPage)

  return (
    <TableCell onClick={clickCheckbox} sx={{ ...LOCAL.hangulCell, ...(LOCAL as any)[`cell${hangulPageId.charAt(0).toUpperCase()}${hangulPageId.slice(1)}`] }}>
      <Box fontSize={15} sx={{ fontWeight: 700, mt: 0.5 }}>
        {cell.label}
      </Box>

      <Box fontSize={15} mt={1.5} sx={LOCAL.sample}>
        <HangulChars chars={cell.sample} />
      </Box>

      <Box sx={{ mb: 0.25, mt: 1.25 }}>
        <Box component="span" fontSize={15} onClick={handleClick} sx={{ ...LINK.plain, '&:hover': { textDecoration: 'underline' } }}>
          See words
        </Box>
      </Box>

      <Dialog
        fullWidth
        onClose={handleClose}
        open={opening.opened}
        sx={{ '& [class*="MuiPaper"]': { bgcolor: 'rgba(255, 255, 255, 0.9)', borderRadius: 1.5, maxWidth: '50%', minWidth: 'auto', p: 2.5 } }}
        title={
          <Box fontSize={16} fontWeight={700}>
            Words with “{cell.label}”
          </Box>
        }
      >
        <TableContainer>
          <Table sx={LOCAL.table}>
            <TableHead>
              <TableRow>
                <TableCell>Hangul</TableCell>
                <TableCell>Translation</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {displayedRows(cell.columnIndex, page).map((item, index) => (
                <WordsTableRow item={item} key={index} />
              ))}
            </TableBody>
          </Table>

          <TablePagination
            count={ROWS_PER_PAGE[cell.columnIndex].length}
            labelDisplayedRows={(info: LabelDisplayedRowsArgs) => `${info.to}`}
            onPageChange={handlePageChange}
            page={page}
            rowsPerPage={5}
          />
        </TableContainer>
      </Dialog>
    </TableCell>
  )
}

const WordsTableRow: FC<_WordsTableRowProps> = ({ item }) => (
  <TableRow>
    <TableCell sx={{ color: SECONDARY, fontWeight: 700, px: 1.5 }}>{item[0]}</TableCell>
    <TableCell sx={{ px: 1.5 }}>{item[1]}</TableCell>
  </TableRow>
)
