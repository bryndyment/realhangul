'use client'

import { HighScores } from '@/comp/highScores'
import { HighScoresReporting } from '@/comp/highScores/reporting'
import { Question } from '@/comp/question'
import { RealKanji } from '@/comp/realKanji'
import { useAppContext } from '@/hooks/useAppContext'
import { useMobileMediaQuery } from '@/hooks/useMobileMediaQuery'
import { useRepeat } from '@/hooks/useRepeat'
import { Phases, Visibilities } from '@/util/common'
import { _Sx, BLACK, BOTTOM, GRAY, PRIMARY, SECONDARY_DARKER, WHITE, zMobileMediaQuery } from '@/util/styles'
import { getNextTypeface, getRandomTypeface, initializeTypefaces } from '@/util/typeface'
import { useDependencies } from '@hoologic/use-dependencies'
import { Box, TextField } from '@mui/material'
import { isEqual, shuffle, sortBy } from 'lodash'
import { FC, KeyboardEvent, useCallback, useMemo, useState } from 'react'

// types

type _EngineProps = { hasWords: boolean; initialKanas: [string, string][]; setTopOpacity: (topOpacity: string) => void }
type _RepeatIndex = null | number
type _RightShownProps = { count: number; label: string }

// constants

const ALTS = new Map([
  ['し', ['si']],
  ['しゃ', ['sya']],
  ['しゅ', ['syu']],
  ['しょ', ['syo']],
  ['じ', ['zi']],
  ['じゃ', ['zya', 'jya']],
  ['じゅ', ['zyu', 'jyu']],
  ['じょ', ['zyo', 'jyo']],
  ['ち', ['ti']],
  ['ちゃ', ['tya']],
  ['ちゅ', ['tyu']],
  ['ちょ', ['tyo']],
  ['ぢ', ['di', 'dzi']],
  ['ぢゃ', ['zya', 'dya']],
  ['ぢゅ', ['zyu', 'dyu']],
  ['ぢょ', ['zyo', 'dyo']],
  ['つ', ['tu']],
  ['づ', ['du', 'dzu']],
  ['ふ', ['hu']],
  ['を', ['o']],
  ['シ', ['si']],
  ['シャ', ['sya']],
  ['シュ', ['syu']],
  ['ショ', ['syo']],
  ['ジ', ['zi']],
  ['ジャ', ['zya', 'jya']],
  ['ジュ', ['zyu', 'jyu']],
  ['ジョ', ['zyo', 'jyo']],
  ['チ', ['ti']],
  ['チャ', ['tya']],
  ['チュ', ['tyu']],
  ['チョ', ['tyo']],
  ['ヂ', ['di']],
  ['ヂャ', ['zya', 'dya']],
  ['ヂュ', ['zyu', 'dyu']],
  ['ヂョ', ['zyo', 'dyo']],
  ['ツ', ['tu']],
  ['ヅ', ['du']],
  ['フ', ['hu']],
  ['ヲ', ['o']]
])

const IS_N = new Set(['n', 'N'])
const IS_VOWEL = new Set(['a', 'A', 'e', 'E', 'i', 'I', 'o', 'O', 'u', 'U'])
const KEY_BACKSPACE = 'Backspace'
const KEY_ENTER = 'Enter'
const KEY_SPACE = ' '

const LOCAL_INPUT = {
  '& .MuiInputBase-input': {
    '&:focus': { bgcolor: 'transparent', boxShadow: 'none', color: BLACK },
    appearance: 'none',
    bgcolor: WHITE,
    borderRadius: 1.75,
    borderWidth: 0,
    boxShadow: '0 0 15px 0 rgba(205, 205, 205, 0.95)',
    boxSizing: 'border-box',
    color: WHITE,
    fontSize: 16,
    fontWeight: 700,
    height: 33,
    outline: 'none',
    pb: 0.5,
    pt: 0.375,
    px: 0,
    textAlign: 'center',
    width: 40,
    zIndex: 668
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  bottom: 16,
  left: '50%',
  ml: -2.5,
  position: 'absolute',
  [zMobileMediaQuery]: { bottom: 8 }
}

const LOCAL_RIGHT_SHOWN = {
  bgcolor: WHITE,
  border: `1px solid ${GRAY[300]}`,
  borderRadius: 1,
  bottom: 16,
  color: GRAY[600],
  fontSize: 14,
  fontWeight: 700,
  pl: 0.75,
  position: 'absolute',
  pr: 0.875,
  py: 0.375,
  textTransform: 'uppercase'
}

const LOCAL: _Sx = {
  input: LOCAL_INPUT,
  inputWide: { ...LOCAL_INPUT, '& .MuiInputBase-input': { ...LOCAL_INPUT['& .MuiInputBase-input'], width: 130 }, ml: -8.125 },
  right: { ...LOCAL_RIGHT_SHOWN, left: 16, [zMobileMediaQuery]: { bottom: 8, left: 8 } },
  shown: { ...LOCAL_RIGHT_SHOWN, right: 16, [zMobileMediaQuery]: { bottom: 8, right: 8 } }
}

const WORDS = new Map([
  ['hu', 'fu'],
  ['jya', 'ja'],
  ['jyo', 'jo'],
  ['jyu', 'ju'],
  ['si', 'shi'],
  ['sya', 'sha'],
  ['syo', 'sho'],
  ['syu', 'shu'],
  ['ti', 'chi'],
  ['tu', 'tsu'],
  ['tya', 'cha'],
  ['tyo', 'cho'],
  ['tyu', 'chu'],
  ['wo', 'o'],
  ['zya', 'ja'],
  ['zyo', 'jo'],
  ['zyu', 'ju']
])

// functions

const isWord = (answer: string) => !((answer.match(/[aiueo]/g)?.length === 1 && answer.slice(-1) !== 'n') || answer === 'n')

const shuffleKanas = (kanas: [string, string][], setKanas: (kanas: [string, string][]) => void) => {
  if (kanas.length > 1) {
    let candidateKanas

    do {
      candidateKanas = shuffle(kanas)
    } while (candidateKanas[0][0] === kanas[kanas.length - 1][0])

    setKanas(candidateKanas)
  }
}

// components

export const Engine: FC<_EngineProps> = ({ initialKanas, setTopOpacity }) => {
  const { isContinuousPlay, isRandomOrder, isRepeatProblemHangul, isSpeedMode, typefaces, words } = useAppContext()
  const isMobile = useMobileMediaQuery()
  const { conditionallyAdd, conditionallyChoose, reinitializeRepeat } = useRepeat(isRepeatProblemHangul)
  const [answerVisibility, setAnswerVisibility] = useState(Visibilities.HIDDEN)
  const [count, setCount] = useState(0)
  const [crossVisibility, setCrossVisibility] = useState(Visibilities.HIDDEN)
  const [guess, setGuess] = useState('')
  const [isFirstGuess, setIsFirstGuess] = useState(true)
  const [kanas, setKanas] = useState(() => (isRandomOrder ? shuffle(initialKanas) : initialKanas))
  const [mainIndex, setMainIndex] = useState(0)
  const [phase, setPhase] = useState(Phases.INITIAL)
  const [priorGuess, setPriorGuess] = useState('')
  const [repeatIndex, setRepeatIndex] = useState<_RepeatIndex>(null)
  const [right, setRight] = useState(0)
  const [shown, setShown] = useState(0)
  const [typeface, setTypeface] = useState(() => initializeTypefaces(typefaces, true))

  useDependencies(() => {
    if (!isEqual(sortBy(initialKanas), sortBy(kanas))) {
      setKanas(isRandomOrder ? shuffle(initialKanas) : initialKanas)
    }
  }, [initialKanas, isRandomOrder, kanas])

  const answerCrossSx = useMemo(
    () => ({
      fontWeight: 700,
      left: 0,
      position: 'absolute',
      textAlign: 'center',
      top: '55%',
      visibility: answerVisibility,
      width: '100%',
      [zMobileMediaQuery]: { top: '60%' }
    }),
    [answerVisibility]
  )

  const determineVisuals = useCallback(
    () => ({
      ...(phase === Phases.RESTARTED && { bgcolor: SECONDARY_DARKER, borderColor: SECONDARY_DARKER, color: WHITE }),
      visibility: phase === Phases.INITIAL ? Visibilities.HIDDEN : Visibilities.VISIBLE
    }),
    [phase]
  )

  const handleKeyUp = (event: KeyboardEvent) => {
    if (isKeyRepeating(event)) return

    if (isSubmitted(event)) {
      if (
        answerVisibility === Visibilities.VISIBLE ||
        guess === kanas[index][1] ||
        ALTS.get(kanas[index][0])?.includes(guess) ||
        guess.match(/([^aiueo]*[aiueo])/g)?.reduce((previous, current) => previous + (WORDS.get(current) || current), '') === kanas[index][1]
      ) {
        const isRestarting = !isContinuousPlay && mainIndex === 0

        setRight(rightValue(isRestarting))

        setShown(shownValue(isRestarting))

        const isLooping = mainIndex === kanas.length - 1

        if (isLooping) {
          reinitializeRepeat(isRepeatProblemHangul)

          if (isRandomOrder) {
            shuffleKanas(kanas, setKanas)
          }

          setCount(count + 1)

          setMainIndex(0)
        } else {
          const localRepeatIndex = conditionallyChoose(index)

          setRepeatIndex(localRepeatIndex)

          if (localRepeatIndex === null) {
            setMainIndex(mainIndex + 1)
          }
        }

        setAnswerVisibility(Visibilities.HIDDEN)

        setCrossVisibility(Visibilities.HIDDEN)

        setIsFirstGuess(true)

        setGuess('')

        setPhase(!isContinuousPlay && isLooping ? Phases.RESTARTED : Phases.STARTED)

        setPriorGuess('')

        setTopOpacity('0')

        setTypeface(getRandomTypeface())
      } else {
        setIsFirstGuess(false)

        conditionallyAdd(index)

        if (guess === priorGuess) {
          setAnswerVisibility(Visibilities.VISIBLE)

          setCrossVisibility(Visibilities.HIDDEN)
        } else {
          setPriorGuess(guess)

          setCrossVisibility(Visibilities.VISIBLE)
        }
      }
    } else {
      setPriorGuess('')
    }
  }

  const isKeyRepeating = (event: KeyboardEvent) => {
    if (event.repeat) {
      if (event.key !== KEY_BACKSPACE) {
        event.preventDefault()
      }

      return true
    }

    return false
  }

  const isSubmitted = (event: KeyboardEvent) =>
    event.key === KEY_ENTER ||
    event.key === KEY_SPACE ||
    (!isWord(kanas[index][1]) && isSpeedMode && (IS_VOWEL.has(event.key) || (IS_N.has(event.key) && kanas[index][1] === 'n')))

  const rightValue = (isRestarting: boolean) => (isFirstGuess && repeatIndex === null ? (isRestarting ? 1 : right + 1) : isRestarting ? 0 : right)
  const shownValue = (isRestarting: boolean) => (isRestarting ? 1 : repeatIndex !== null ? shown : shown + 1)

  const index = repeatIndex === null ? mainIndex : repeatIndex

  return (
    <>
      <Box sx={{ height: 50, left: 0, marginTop: -5.625, position: 'absolute', textAlign: 'center', top: '50%', width: '100%' }}>
        <Box onClick={() => setTypeface(getNextTypeface())} sx={{ cursor: 'pointer', display: 'inline-block', lineHeight: 0 }}>
          <Question kana={kanas[index]} typeface={typeface} />
        </Box>
      </Box>

      <Box sx={answerCrossSx}>{kanas[index][1]}</Box>

      <Box sx={{ ...answerCrossSx, color: PRIMARY, fontSize: 24, mt: -0.5, visibility: crossVisibility }}>×</Box>

      <Box sx={BOTTOM.main}>
        <RealKanji phase={phase} />

        <Box sx={{ ...LOCAL.shown, ...determineVisuals() }}>
          <RightShown count={shown} label="Shown" />
        </Box>

        <TextField
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          autoFocus={!isMobile}
          inputProps={{
            maxLength: words ? 17 : 3,
            name: `g-${Math.random()}`,
            onKeyDown: event => event.key === KEY_SPACE && event.preventDefault(),
            onKeyUp: handleKeyUp,
            spellCheck: false
          }}
          onChange={event => setGuess(event.currentTarget.value.trim().toLowerCase())}
          onFocus={() => scrollTo(0, 0)}
          sx={words ? LOCAL.inputWide : LOCAL.input}
          value={guess}
        />

        <Box sx={{ ...LOCAL.right, ...determineVisuals() }}>
          <RightShown count={right} label="Right" />
        </Box>

        <HighScores count={count} phase={phase} right={right} setTopOpacity={setTopOpacity} shown={shown} />

        <HighScoresReporting phase={phase} setTopOpacity={setTopOpacity} />
      </Box>
    </>
  )
}

const RightShown: FC<_RightShownProps> = ({ count, label }) => (
  <>
    {count} {label}
  </>
)
