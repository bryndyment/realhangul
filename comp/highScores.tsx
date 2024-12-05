'use client'

import { useAppContext } from '@/hooks/useAppContext'
import { KEY_SET_V1, KEY_SET_V2, Phases } from '@/util/common'
import { useDependencies } from '@hoologic/use-dependencies'
import { createContext, FC, ReactNode, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react'

// types

type _HighScore = { score: number; time: number; total: number; when?: number }

type _HighScoresContext = {
  areHighScoresEnabled: boolean
  highScore: _HighScore
  highScoreContent: string
  highScoreKey: string
  highScoreKeys: string[]
  setHighScore: (highScore: _HighScore) => void
  setHighScoreContent: (highScoreContent: string) => void
  setHighScoreKeys: (highScoreKeys: string[]) => void
}

type _HighScoresProps = { count: number; phase: Phases; right: number; setTopOpacity: (topOpacity: string) => void; shown: number }
type _HighScoresProviderProps = { children: ReactNode }

// constants

export const INITIAL_HIGH_SCORE = { score: 0, time: 0, total: 0 }

const BEST_TIME = 'Best Time'
const HIGH_SCORE = 'High Score!'
export const HIGH_SCORES = 'High Scores'

// context

const HighScoresContext = createContext<_HighScoresContext | null>(null)

// functions

export const readKeys = () => {
  // update legacy set keys
  Object.keys(window.localStorage).forEach(key => {
    const highScoreKey = key.match(new RegExp(String.raw`^${KEY_SET_V1}$`))
    const highScoreObject = window.localStorage.getItem(key)!

    if (highScoreKey && typeof JSON.parse(highScoreObject!) === 'object') {
      window.localStorage.removeItem(key)

      window.localStorage.setItem(`${highScoreKey[1]}-${highScoreKey[2]}-0-${highScoreKey[3]}-${highScoreKey[4]}-${highScoreKey[5]}-0`, highScoreObject)
    }
  })

  return Object.keys(window.localStorage)
    .filter(key => key.match(new RegExp(`^${KEY_SET_V2}$`)) && typeof JSON.parse(window.localStorage.getItem(key)!) === 'object')
    .sort((a, b) => (JSON.parse(window.localStorage.getItem(a)!).when > JSON.parse(window.localStorage.getItem(b)!).when ? -1 : 1))
}

export const seconds = (milliseconds: number) => {
  if (milliseconds > 999999) {
    return String(Math.floor(milliseconds / 1000))
  }

  const seconds = String((milliseconds / 1000).toPrecision(3)).replace(/(\..*)0+$/, '$1')

  return seconds.endsWith('.') ? `${seconds}0` : seconds
}

// hooks

export const useHighScoresContext = () => {
  const context = useContext(HighScoresContext)

  if (context === null) {
    throw new Error('Context error.')
  }

  return context
}

// components

export const HighScores: FC<_HighScoresProps> = ({ count, phase, right, shown }) => {
  const { areHighScoresEnabled, highScore, highScoreKey, setHighScore, setHighScoreContent, setHighScoreKeys } = useHighScoresContext()
  const [startTime, setStartTime] = useState(0)

  useLayoutEffect(() => {
    if (areHighScoresEnabled && phase === Phases.RESTARTED) {
      const elapsedTime = Date.now() - startTime
      const isNewBestTime = right === shown && shown > 1 && (elapsedTime < highScore.time || !highScore.time)
      const isNewHighScore = right > highScore.score

      let newHighScoreContent = ''

      if (isNewBestTime || isNewHighScore) {
        const newHighScore = { ...highScore, when: new Date().getTime() }

        if (isNewBestTime) {
          newHighScore.time = elapsedTime

          newHighScoreContent = `${BEST_TIME}: ${seconds(elapsedTime)}!`
        }

        if (isNewHighScore) {
          newHighScore.score = right
          newHighScore.total = shown

          newHighScoreContent = HIGH_SCORE
        }

        setHighScore(newHighScore)
        setHighScoreContent(newHighScoreContent)

        window.localStorage.setItem(highScoreKey, JSON.stringify(newHighScore))
        setHighScoreKeys(readKeys())
      } else {
        setHighScoreContent(HIGH_SCORES)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areHighScoresEnabled, count, highScoreKey, phase, right, setHighScore, setHighScoreContent, setHighScoreKeys, shown, startTime])

  useDependencies(() => {
    if (areHighScoresEnabled && phase === Phases.STARTED) {
      setStartTime(Date.now())
      console.log(Math.random())
    }
  }, [areHighScoresEnabled, phase])

  return null
}

export const HighScoresProvider: FC<_HighScoresProviderProps> = ({ children }) => {
  const { commonSyllables, compoundVowels, doubleConsonants, isContinuousPlay, isRandomOrder, simpleConsonants, simpleVowels, words } = useAppContext()

  const [highScore, setHighScore] = useState<_HighScore>(INITIAL_HIGH_SCORE)
  const [highScoreContent, setHighScoreContent] = useState('')
  const [highScoreKeys, setHighScoreKeys] = useState(() => readKeys())

  const highScoresContext = useMemo(
    () => ({
      areHighScoresEnabled: !isContinuousPlay && isRandomOrder,
      highScore,
      highScoreContent,
      highScoreKey: `${simpleVowels}-${compoundVowels}-${simpleConsonants}-${doubleConsonants}-${commonSyllables}-${words}`,
      highScoreKeys,
      setHighScore,
      setHighScoreContent,
      setHighScoreKeys
    }),
    [
      highScore,
      highScoreContent,
      highScoreKeys,
      commonSyllables,
      compoundVowels,
      doubleConsonants,
      isContinuousPlay,
      isRandomOrder,
      simpleConsonants,
      simpleVowels,
      words,
      isContinuousPlay,
      isRandomOrder
    ]
  )

  useEffect(() => {
    const savedHighScore = window.localStorage.getItem(`${simpleVowels}-${compoundVowels}-${simpleConsonants}-${doubleConsonants}-${commonSyllables}-${words}`)

    setHighScore(savedHighScore ? JSON.parse(savedHighScore) : INITIAL_HIGH_SCORE)
  }, [simpleVowels, compoundVowels, simpleConsonants, doubleConsonants, commonSyllables, words])

  return <HighScoresContext.Provider value={highScoresContext}>{children}</HighScoresContext.Provider>
}
