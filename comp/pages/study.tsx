'use client'

import { Base } from '@/comp/base'
import { Heading } from '@/comp/common'
import { Engine } from '@/comp/engine'
import { HighScoresProvider } from '@/comp/highScores'
import { HighScoresIntro } from '@/comp/highScores/intro'
import { useAppContext } from '@/hooks/useAppContext'
import { COLUMNS, KanaGroups, KEY_SET_V1, KEY_SET_V2, PAGES } from '@/util/common'
import { _Sx, LINK, TOP, zMobileMediaQuery } from '@/util/styles'
import { Box, Link, Typography } from '@mui/material'
import RouterLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useLayoutEffect, useMemo, useState } from 'react'

// types

type _StudyProps = { searchParams: { [key: string]: string } }

// metadata

export const metadata = {
  description: 'Type this character’s rōmaji equivalent.',
  title: 'Study : Real hangul'
}

// constants

const LOCAL: _Sx = {
  circle: {
    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.85) 40%, rgba(255, 255, 255, 0) 70%)',
    height: 300,
    left: 0,
    marginTop: -18.125,
    position: 'absolute',
    top: '50%',
    width: '100%',
    [zMobileMediaQuery]: { display: 'none' }
  },
  mobile: { [zMobileMediaQuery]: { display: 'none' } }
}

// functions

const initializeKanas = (
  hiragana: number,
  hiraganaDouble: number,
  hiraganaWords: number,
  katakana: number,
  katakanaDouble: number,
  katakanaExtended: number,
  katakanaWords: number
) => {
  const KANAS: [key: KanaGroups, value: number][] = [
    [KanaGroups.KATAKANA_WORDS, katakanaWords],
    [KanaGroups.KATAKANA_EXTENDED, katakanaExtended],
    [KanaGroups.KATAKANA_DOUBLE, katakanaDouble],
    [KanaGroups.KATAKANA, katakana],
    [KanaGroups.HIRAGANA_WORDS, hiraganaWords],
    [KanaGroups.HIRAGANA_DOUBLE, hiraganaDouble],
    [KanaGroups.HIRAGANA, hiragana]
  ]

  let kanas: [string, string][] = []

  KANAS.forEach(kana => {
    let columns = PAGES.get(kana[0])!.columns

    while (columns) {
      const power = 2 ** --columns

      if (kana[1] >= power) {
        kana[1] -= power

        kanas = COLUMNS[columns + PAGES.get(kana[0])!.offset].concat(kanas)
      }
    }
  })

  return kanas
}

// components

const SpeedModeContent: FC = () => {
  const { hiraganaWords, isSpeedMode, katakanaWords } = useAppContext()

  if (isSpeedMode) {
    return (
      <Typography>
        <Link component={RouterLink} href="/extra" sx={LINK.plain}>
          Speed mode
        </Link>

        {hiraganaWords || katakanaWords ? ' is enabled for characters. Use the spacebar to submit words.' : ' is enabled. Use the spacebar to see the answer.'}
      </Typography>
    )
  }

  return <Typography>Use the spacebar to submit your guess and/or see the answer.</Typography>
}

export const Study: FC<_StudyProps> = ({ searchParams }) => {
  const { hiragana, hiraganaDouble, hiraganaWords, katakana, katakanaDouble, katakanaExtended, katakanaWords, timestamp, typefaces, updateContext } =
    useAppContext()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [hasWords, setHasWords] = useState(false)
  const [kanas, setKanas] = useState<[string, string][]>([])
  const [topOpacity, setTopOpacity] = useState('1')

  const message = useMemo(
    () =>
      `${kanas.length} ${[
        ...(hiragana || hiraganaDouble || hiraganaWords ? ['Hiragana'] : []),
        ...(katakana || katakanaDouble || katakanaExtended || katakanaWords ? ['Katakana'] : [])
      ].join('/')} ${[
        ...(hiragana || hiraganaDouble || katakana || katakanaDouble || katakanaExtended ? [`Character${kanas.length === 1 ? '' : 's'}`] : []),
        ...(hiraganaWords || katakanaWords ? [kanas.length === 1 ? 'Word' : 'Words'] : [])
      ].join('/')}`,
    [hiragana, hiraganaDouble, hiraganaWords, katakana, katakanaDouble, katakanaExtended, katakanaWords, kanas.length]
  )

  useEffect(() => {
    let set = searchParams.set?.match(new RegExp(String.raw`^${KEY_SET_V1}$`))

    if (set) {
      updateContext({
        hiragana: Number(set[1]),
        hiraganaDouble: Number(set[2]),
        hiraganaWords: 0,
        katakana: Number(set[3]),
        katakanaDouble: Number(set[4]),
        katakanaExtended: Number(set[5]),
        katakanaWords: 0
      })

      replace(pathname)
    } else {
      set = searchParams.set?.match(new RegExp(String.raw`^${KEY_SET_V2}$`))

      if (set) {
        updateContext({
          hiragana: Number(set[1]),
          hiraganaDouble: Number(set[2]),
          hiraganaWords: Number(set[3]),
          katakana: Number(set[4]),
          katakanaDouble: Number(set[5]),
          katakanaExtended: Number(set[6]),
          katakanaWords: Number(set[7])
        })

        replace(pathname)
      }
    }
  }, [pathname, replace, searchParams.set, updateContext])

  useEffect(() => {
    if (!typefaces) {
      updateContext({ typefaces: 1 })
    }
  }, [typefaces, updateContext])

  useLayoutEffect(() => {
    if (hiragana || hiraganaDouble || hiraganaWords || katakana || katakanaDouble || katakanaExtended || katakanaWords) {
      setHasWords(Boolean(hiraganaWords || katakanaWords))

      setKanas(initializeKanas(hiragana, hiraganaDouble, hiraganaWords, katakana, katakanaDouble, katakanaExtended, katakanaWords))
    } else {
      updateContext({ hiragana: 1 })
    }
  }, [hiragana, hiraganaDouble, hiraganaWords, katakana, katakanaDouble, katakanaExtended, katakanaWords, updateContext])

  return (
    <Base key={timestamp} tab="study">
      <HighScoresProvider>
        <Box sx={{ ...TOP.main, opacity: topOpacity }}>
          <Box sx={LOCAL.mobile}>
            <Heading h1="Study" message={message} />

            <Typography>Type this character’s rōmaji equivalent.</Typography>

            <HighScoresIntro count={kanas.length} />

            <SpeedModeContent />
          </Box>
        </Box>

        <Box sx={LOCAL.circle} />

        {kanas.length && typefaces ? <Engine hasWords={hasWords} initialKanas={kanas} setTopOpacity={setTopOpacity} /> : null}
      </HighScoresProvider>
    </Base>
  )
}
