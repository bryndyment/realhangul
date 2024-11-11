'use client'

import { Dialog } from '@/comp/dialog'
import { useAppContext } from '@/hooks/useAppContext'
import { calculate, CHARS, clickCheckbox, COLUMNS, displayedRows, KanaGroups, ROWS, ROWS_PER_PAGE } from '@/util/common'
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
type _KanaCell = { kana: string; label: string }
type _KanaCellProps = { cell: _KanaCell; kanaPageId: string }
type _KanaCharsProps = { chars: string; sx?: SxProps }
type _KanaProps = { columns: number; kanaPageId: KanaGroups; rangeEnd: number; rangeStart: number }
type _RowsProps = { kanaPageId: string; rows: (_KanaCell | _WordsCell[] | {})[][] } // eslint-disable-line @typescript-eslint/no-empty-object-type
type _WordsCell = { columnIndex: number; label: string; sample: string }
type _WordsCellProps = { cell: _WordsCell; kanaPageId: string }
type _WordsTableRowProps = { item: [string, string] }

// constants

const LOCAL: _Sx = {
  cellHiragana: { [zMobileMediaQuery]: { minWidth: 34 } },
  cellHiraganaDouble: { [zMobileMediaQuery]: { minWidth: 45 } },
  cellHiraganaWords: { width: '20%', [zMobileMediaQuery]: { cellHiraganaWords: { minWidth: 45 } } },
  cellKatakana: { [zMobileMediaQuery]: { minWidth: 34 } },
  cellKatakanaDouble: { [zMobileMediaQuery]: { minWidth: 45 } },
  cellKatakanaExtended: { [zMobileMediaQuery]: { minWidth: 39 } },
  cellKatakanaWords: { width: '20%', [zMobileMediaQuery]: { minWidth: 45 } },
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
  kanaCell: {
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

export const Kana: FC<_KanaProps> = ({ columns, kanaPageId, rangeEnd, rangeStart }) => {
  const { [kanaPageId]: value } = useAppContext()

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
          <Rows kanaPageId={kanaPageId} rows={ROWS.slice(rangeStart, rangeEnd)} />

          <Checkboxes columns={columns} stateKey={kanaPageId} stateValue={value} />
        </TableBody>
      </Table>
    </Box>
  )
}

const KanaCell: FC<_KanaCellProps> = ({ cell, kanaPageId }) => (
  <TableCell onClick={clickCheckbox} sx={{ ...LOCAL.kanaCell, ...(LOCAL as any)[`cell${kanaPageId.charAt(0).toUpperCase()}${kanaPageId.slice(1)}`] }}>
    <Box sx={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
      <KanaChars chars={cell.kana} />
    </Box>

    <Box fontSize={15} sx={{ color: GRAY[500], mt: 0.5 }}>
      {cell.label}
    </Box>
  </TableCell>
)

const KanaChars: FC<_KanaCharsProps> = ({ chars, sx }) => {
  const { preview } = useAppContext()

  return (
    <>
      {chars.split('').map((character, index) => (
        <Box key={`${character}-${index}`} sx={{ display: 'inline-block', height: 19, overflow: 'hidden', width: 19, ...sx }}>
          <Image
            alt={character}
            height={304}
            src="/kana-19.png"
            style={{ left: `-${CHARS.get(character)![0] * 19 + (preview - 1) * 190}px`, position: 'relative', top: `-${CHARS.get(character)![1] * 19}px` }}
            unoptimized
            width={1710}
          />
        </Box>
      ))}
    </>
  )
}

const Rows: FC<_RowsProps> = ({ kanaPageId, rows }) => (
  <>
    {rows.map((row, index) => (
      <TableRow key={index}>
        {row.map((cell, index2) =>
          'kana' in cell ? (
            <KanaCell cell={cell} kanaPageId={kanaPageId} key={`${index}-${index2}`} />
          ) : 'columnIndex' in cell ? (
            <WordsCell cell={cell as _WordsCell} kanaPageId={kanaPageId} key={`${index}-${index2}`} />
          ) : (
            <TableCell key={`${index}-${index2}`} onClick={clickCheckbox} sx={LOCAL.kanaCell} />
          )
        )}
      </TableRow>
    ))}
  </>
)

const WordsCell: FC<_WordsCellProps> = ({ cell, kanaPageId }) => {
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
    <TableCell onClick={clickCheckbox} sx={{ ...LOCAL.kanaCell, ...(LOCAL as any)[`cell${kanaPageId.charAt(0).toUpperCase()}${kanaPageId.slice(1)}`] }}>
      <Box fontSize={15} sx={{ fontWeight: 700, mt: 0.5 }}>
        {cell.label}
      </Box>

      <Box fontSize={15} mt={1.5} sx={LOCAL.sample}>
        <KanaChars chars={cell.sample} />
      </Box>

      <Box sx={{ mb: 0.25, mt: 1.25 }}>
        <Box component="span" fontSize={15} onClick={handleClick} sx={{ ...LINK.plain, color: GRAY[500] }}>
          {`${COLUMNS[cell.columnIndex].length} words`}
        </Box>
      </Box>

      <Dialog close={handleClose} h1={kanaPageId.match(/^h/) ? 'Hiragana' : 'Katakana'} message={cell.label} opening={opening}>
        <TableContainer sx={{ flexGrow: 1, zIndex: 1 }}>
          <Table sx={LOCAL.table}>
            <TableHead>
              <TableRow>
                <TableCell>Kana</TableCell>

                <TableCell align="right">Rōmaji</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {COLUMNS[cell.columnIndex].slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE).map((item, index) => (
                <WordsTableRow item={COLUMNS[cell.columnIndex][page * ROWS_PER_PAGE + index]} key={item[0]} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={COLUMNS[cell.columnIndex].length}
          labelDisplayedRows={(paginationInfo: LabelDisplayedRowsArgs) => displayedRows(paginationInfo, 'words')}
          onPageChange={handlePageChange}
          page={page}
          rowsPerPage={ROWS_PER_PAGE}
          rowsPerPageOptions={[]}
          sx={{ '& .MuiIconButton-sizeMedium': { p: 1.5 } }}
        />
      </Dialog>
    </TableCell>
  )
}

const WordsTableRow: FC<_WordsTableRowProps> = ({ item }) => (
  <TableRow>
    <TableCell>
      <KanaChars chars={item[0]} sx={{ mt: 0.125, position: 'relative', top: 1 }} />
    </TableCell>

    <TableCell align="right">{item[1]}</TableCell>
  </TableRow>
)
