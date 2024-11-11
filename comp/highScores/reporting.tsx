'use client'

import { ConfirmDialog } from '@/comp/confirm'
import { Dialog } from '@/comp/dialog'
import { DownloadApp } from '@/comp/downloadApp'
import { HIGH_SCORES, INITIAL_HIGH_SCORE, readKeys, seconds, useHighScoresContext } from '@/comp/highScores'
import { useAppContext } from '@/hooks/useAppContext'
import { useMobileMediaQuery } from '@/hooks/useMobileMediaQuery'
import { displayedRows, Phases, ROWS_PER_PAGE, scale, scaleOff } from '@/util/common'
import { _Sx, LINK, PRIMARY } from '@/util/styles'
import { useOpening } from '@hoologic/use-opening'
import { MoreVert } from '@mui/icons-material'
import {
  Box,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import { formatDistanceToNowStrict } from 'date-fns'
import { enUS } from 'date-fns/locale'
import RouterLink from 'next/link'
import { FC, useMemo, useState } from 'react'

// types

type _HighScoresDialogProps = { phase: Phases; setTopOpacity: (topOpacity: string) => void }
type _HighScoresTableRowProps = { index: number; page: number; setPage: (page: number) => void; setTopOpacity: (topOpacity: string) => void }

// constants

const LOCAL: _Sx = {
  button: {
    '&.MuiIconButton-sizeMedium': { p: 1.5 },
    color: 'inherit'
  },
  highScore: {
    bottom: 30.5,
    left: 16,
    letterSpacing: 0.5,
    position: 'absolute',
    transform: 'rotate(-90deg)',
    transformOrigin: 'top left',
    transition: 'opacity 0.1s ease-in-out'
  },
  table: {
    '& td': { '&:first-of-type': { pl: 2 }, '&:last-child': { maxWidth: 50, minWidth: 50, pl: 0, pr: 0.25, py: 0.25, width: 50 }, px: 0.75, py: 1.5 },
    '& th': { '&:first-of-type': { pl: 2 }, bgcolor: 'transparent', fontWeight: 700, pb: 0.75, pt: 1.125, px: 0.75, textTransform: 'uppercase' }
  }
}

// components

export const HighScoresReporting: FC<_HighScoresDialogProps> = ({ phase, setTopOpacity }) => {
  const { highScoreContent, highScoreKeys } = useHighScoresContext()
  const isMobile = useMobileMediaQuery()
  const opening = useOpening()
  const [page, setPage] = useState(0)

  const handleClose = () => {
    opening.close()

    window.setTimeout(() => {
      document.querySelector('input')!.focus()

      setPage(0)
    }, 200)
  }

  const handlePageChange = (_: any, newPage: number) => setPage(newPage)

  return (
    <>
      {phase === Phases.INITIAL ? (
        isMobile ? (
          ''
        ) : highScoreKeys.length ? (
          <Box component="span" id="button" onClick={opening.open} onMouseOut={scaleOff} onMouseOver={scale} sx={LINK.mainButtonWhite}>
            {HIGH_SCORES}
          </Box>
        ) : (
          <DownloadApp />
        )
      ) : (
        ''
      )}

      {highScoreContent && !isMobile && phase === Phases.RESTARTED ? (
        <Box onClick={opening.open} sx={LOCAL.highScore}>
          <Box component="span" onMouseOut={scaleOff} onMouseOver={scale} sx={LINK.mainButtonWhite}>
            {highScoreContent}
          </Box>
        </Box>
      ) : (
        ''
      )}

      <Dialog close={handleClose} h1="High Scores" h2="Real Kana" opening={opening}>
        <TableContainer sx={{ flexGrow: 1, zIndex: 1 }}>
          <Table sx={LOCAL.table}>
            <TableHead>
              <TableRow>
                <TableCell>Set</TableCell>

                <TableCell align="center">Score</TableCell>

                <TableCell align="center">Time</TableCell>

                <TableCell align="right" sx={{ pr: 2 }}>
                  When
                </TableCell>

                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {highScoreKeys.length ? (
                highScoreKeys
                  .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
                  .map((key, index) => (
                    <HighScoresTableRow index={page * ROWS_PER_PAGE + index} key={key} page={page} setPage={setPage} setTopOpacity={setTopOpacity} />
                  ))
              ) : (
                <NoHighScores />
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {highScoreKeys.length ? (
          <TablePagination
            component="div"
            count={highScoreKeys.length}
            labelDisplayedRows={paginationInfo => displayedRows(paginationInfo, `high score${highScoreKeys.length === 1 ? '' : 's'}`)}
            onPageChange={handlePageChange}
            page={page}
            rowsPerPage={ROWS_PER_PAGE}
            rowsPerPageOptions={[]}
            sx={{ '& .MuiIconButton-sizeMedium': { p: 1.5 } }}
          />
        ) : null}
      </Dialog>
    </>
  )
}

const HighScoresTableRow: FC<_HighScoresTableRowProps> = ({ index, page, setPage, setTopOpacity }) => {
  const { updateContext } = useAppContext()
  const { highScoreKey, highScoreKeys, setHighScore, setHighScoreContent, setHighScoreKeys } = useHighScoresContext()
  const opening = useOpening()
  const confirmOpening = useOpening()

  const handleDelete = () => {
    if (highScoreKeys[index] === highScoreKey) {
      setHighScore(INITIAL_HIGH_SCORE)

      setHighScoreContent('')
    }

    window.localStorage.removeItem(key)

    const newHighScoreKeys = readKeys()

    setHighScoreKeys(newHighScoreKeys)

    if (page && newHighScoreKeys.length < page * ROWS_PER_PAGE + 1) {
      setPage(page - 1)
    }

    opening.close()
  }

  const prepPermalink = () => {
    setTopOpacity('1')

    updateContext({ timestamp: Date.now() })
  }

  const key = highScoreKeys[index]

  const value = JSON.parse(window.localStorage.getItem(key)!)

  const distanceToNow = useMemo(() => formatDistanceToNowStrict(value.when, { addSuffix: true, locale: enUS }), [value.when])

  return (
    <TableRow>
      <TableCell>
        <Link
          component={RouterLink}
          href={`?set=${key}`}
          onClick={prepPermalink}
          onMouseOut={scaleOff}
          onMouseOver={scale}
          sx={{ ...LINK.mainButton, fontWeight: 'normal' }}
        >
          {key.replaceAll('-', '·')}
        </Link>
      </TableCell>

      <TableCell align="center">{`${value.score}/${value.total}`}</TableCell>

      <TableCell align="center">{`${value.time ? seconds(value.time) : '–'}`}</TableCell>

      <TableCell align="right" sx={{ pr: 2, whiteSpace: 'nowrap' }}>
        {distanceToNow}
      </TableCell>

      <TableCell>
        <IconButton onClick={opening.open} sx={LOCAL.button}>
          <MoreVert />
        </IconButton>

        <Menu anchorEl={opening.anchor} onClose={opening.close} open={opening.isOpen} sx={{ '& li': { fontSize: 14 } }}>
          <MenuItem>
            <Link component={RouterLink} href={`?set=${key}`} onClick={prepPermalink} sx={LINK.raw}>
              Repeat Set
            </Link>
          </MenuItem>

          <Divider />

          <MenuItem onClick={confirmOpening.open} sx={{ color: PRIMARY }}>
            Delete High Score
          </MenuItem>
        </Menu>

        <ConfirmDialog callback={handleDelete} opening={confirmOpening} />
      </TableCell>
    </TableRow>
  )
}

const NoHighScores: FC = () => (
  <TableRow>
    <TableCell colSpan={5} sx={{ p: '14px 16px 15px !important' }}>
      No high scores.
    </TableCell>
  </TableRow>
)
