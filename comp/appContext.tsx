'use client'

import { HangulGroups } from '@/util/common'
import { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react'

// types
type _AppContext = {
  hangulCommonSyllables: number
  hangulCompoundVowels: number
  hangulDoubleConsonants: number
  hangulSimpleConsonants: number
  hangulSimpleVowels: number
  hangulWords: number
  isContinuousPlay: boolean
  isMessageShowing: boolean
  isRandomOrder: boolean
  isRepeatProblemHangul: boolean
  isSpeedMode: boolean
  message: string
  preview: number
  timestamp: number
  updateContext: _UpdateContext
}

type _AppContextProps = { children: ReactNode }
type _ContextFunctions = (value: any) => void
type _UpdateContext = (context: { [key: string]: boolean | number | string }) => void

// context
export const APP_CONTEXT = createContext<_AppContext | null>(null)

// constants
const DEFAULTS = new Map<string, boolean | number>([
  ['isContinuousPlay', false],
  ['isRandomOrder', true],
  ['isRepeatProblemHangul', false],
  ['isSpeedMode', true],
  ['preview', 1],
  [HangulGroups.HANGUL_COMMON_SYLLABLES, 0],
  [HangulGroups.HANGUL_COMPOUND_VOWELS, 0],
  [HangulGroups.HANGUL_DOUBLE_CONSONANTS, 0],
  [HangulGroups.HANGUL_SIMPLE_CONSONANTS, 0],
  [HangulGroups.HANGUL_SIMPLE_VOWELS, 0],
  [HangulGroups.HANGUL_WORDS, 0]
])

const TESTS = new Map<string, any>([
  ['isContinuousPlay', (value: boolean) => value === Boolean(value)],
  ['isRandomOrder', (value: boolean) => value === Boolean(value)],
  ['isRepeatProblemHangul', (value: boolean) => value === Boolean(value)],
  ['isSpeedMode', (value: boolean) => value === Boolean(value)],
  ['preview', (value: number) => integerFromTo(value, 1, 9)],
  [HangulGroups.HANGUL_COMMON_SYLLABLES, (value: number) => integerFromTo(value, 1, 16383)],
  [HangulGroups.HANGUL_COMPOUND_VOWELS, (value: number) => integerFromTo(value, 1, 4095)],
  [HangulGroups.HANGUL_DOUBLE_CONSONANTS, (value: number) => integerFromTo(value, 1, 4095)],
  [HangulGroups.HANGUL_SIMPLE_CONSONANTS, (value: number) => integerFromTo(value, 1, 65535)],
  [HangulGroups.HANGUL_SIMPLE_VOWELS, (value: number) => integerFromTo(value, 1, 65535)],
  [HangulGroups.HANGUL_WORDS, (value: number) => integerFromTo(value, 1, 31)]
])

// functions
const getPersistentState = (key: string) => {
  const value = JSON.parse(window.localStorage.getItem(key)!)

  if (TESTS.get(key)!(value)) return value

  window.localStorage.removeItem(key)

  return DEFAULTS.get(key)
}

const integerFromTo = (value: boolean | number, from: number, to: number) =>
  typeof value === 'number' && value === Math.floor(value) && value >= from && value <= to

// components
export const AppContext: FC<_AppContextProps> = ({ children }) => {
  const [hangulSimpleVowels, setHangulSimpleVowels] = useState(0)
  const [hangulCompoundVowels, setHangulCompoundVowels] = useState(0)
  const [hangulSimpleConsonants, setHangulSimpleConsonants] = useState(0)
  const [hangulDoubleConsonants, setHangulDoubleConsonants] = useState(0)
  const [hangulCommonSyllables, setHangulCommonSyllables] = useState(0)
  const [hangulWords, setHangulWords] = useState(0)
  const [isContinuousPlay, setIsContinuousPlay] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isRandomOrder, setIsRandomOrder] = useState(true)
  const [isRepeatProblemHangul, setIsRepeatProblemHangul] = useState(false)
  const [isSpeedMode, setIsSpeedMode] = useState(true)
  const [message, setMessage] = useState('')
  const [preview, setPreview] = useState(0)
  const [isMessageShowing, setIsMessageShowing] = useState(false)
  const [timestamp, setTimestamp] = useState(0)

  useEffect(() => {
    setHangulSimpleVowels(getPersistentState(HangulGroups.HANGUL_SIMPLE_VOWELS))
    setHangulCompoundVowels(getPersistentState(HangulGroups.HANGUL_COMPOUND_VOWELS))
    setHangulSimpleConsonants(getPersistentState(HangulGroups.HANGUL_SIMPLE_CONSONANTS))
    setHangulDoubleConsonants(getPersistentState(HangulGroups.HANGUL_DOUBLE_CONSONANTS))
    setHangulCommonSyllables(getPersistentState(HangulGroups.HANGUL_COMMON_SYLLABLES))
    setHangulWords(getPersistentState(HangulGroups.HANGUL_WORDS))
    setIsContinuousPlay(getPersistentState('isContinuousPlay'))
    setIsInitialized(true)
    setIsRandomOrder(getPersistentState('isRandomOrder'))
    setIsRepeatProblemHangul(getPersistentState('isRepeatProblemHangul'))
    setIsSpeedMode(getPersistentState('isSpeedMode'))
    setPreview(getPersistentState('preview'))
  }, [])

  const appContext = useMemo(() => {
    const contextFunctions = new Map<string, _ContextFunctions>([
      ['isContinuousPlay', setIsContinuousPlay],
      ['isMessageShowing', setIsMessageShowing],
      ['isRandomOrder', setIsRandomOrder],
      ['isRepeatProblemHangul', setIsRepeatProblemHangul],
      ['isSpeedMode', setIsSpeedMode],
      ['message', setMessage],
      ['preview', setPreview],
      ['timestamp', setTimestamp],
      [HangulGroups.HANGUL_COMMON_SYLLABLES, setHangulCommonSyllables],
      [HangulGroups.HANGUL_COMPOUND_VOWELS, setHangulCompoundVowels],
      [HangulGroups.HANGUL_DOUBLE_CONSONANTS, setHangulDoubleConsonants],
      [HangulGroups.HANGUL_SIMPLE_CONSONANTS, setHangulSimpleConsonants],
      [HangulGroups.HANGUL_SIMPLE_VOWELS, setHangulSimpleVowels],
      [HangulGroups.HANGUL_WORDS, setHangulWords]
    ])

    const updateContext: _UpdateContext = context => {
      Object.keys(context).forEach(key => {
        if (DEFAULTS.has(key)) {
          window.localStorage.setItem(key, JSON.stringify(context[key]))
        }

        contextFunctions.get(key)!(context[key])
      })
    }

    return {
      hangulCommonSyllables,
      hangulCompoundVowels,
      hangulDoubleConsonants,
      hangulSimpleConsonants,
      hangulSimpleVowels,
      hangulWords,
      isContinuousPlay,
      isMessageShowing,
      isRandomOrder,
      isRepeatProblemHangul,
      isSpeedMode,
      message,
      preview,
      timestamp,
      updateContext
    }
  }, [
    hangulSimpleVowels,
    hangulCompoundVowels,
    hangulSimpleConsonants,
    hangulDoubleConsonants,
    hangulCommonSyllables,
    hangulWords,
    isContinuousPlay,
    isMessageShowing,
    isRandomOrder,
    isRepeatProblemHangul,
    isSpeedMode,
    message,
    preview,
    timestamp
  ])

  return <APP_CONTEXT.Provider value={appContext}>{isInitialized ? children : null}</APP_CONTEXT.Provider>
}
