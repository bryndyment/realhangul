'use client'

import { HangulGroups } from '@/util/common'
import { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react'

// types
type _AppContext = {
  compoundVowels: number
  doubleConsonants: number
  isContinuousPlay: boolean
  isMessageShowing: boolean
  isRandomOrder: boolean
  isRepeatProblemHangul: boolean
  isSpeedMode: boolean
  message: string
  preview: number
  simpleConsonants: number
  simpleVowels: number
  timestamp: number
  typefaces: number
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
  ['typefaces', 0],
  [HangulGroups.COMPOUND_VOWELS, 0],
  [HangulGroups.DOUBLE_CONSONANTS, 0],
  [HangulGroups.SIMPLE_CONSONANTS, 0],
  [HangulGroups.SIMPLE_VOWELS, 0]
])

const TESTS = new Map<string, any>([
  ['isContinuousPlay', (value: boolean) => value === Boolean(value)],
  ['isRandomOrder', (value: boolean) => value === Boolean(value)],
  ['isRepeatProblemHangul', (value: boolean) => value === Boolean(value)],
  ['isSpeedMode', (value: boolean) => value === Boolean(value)],
  ['preview', (value: number) => integerFromTo(value, 1, 9)],
  ['typefaces', (value: number) => integerFromTo(value, 1, 511)],
  [HangulGroups.COMPOUND_VOWELS, (value: number) => integerFromTo(value, 1, 4095)],
  [HangulGroups.DOUBLE_CONSONANTS, (value: number) => integerFromTo(value, 1, 4095)],
  [HangulGroups.SIMPLE_CONSONANTS, (value: number) => integerFromTo(value, 1, 65535)],
  [HangulGroups.SIMPLE_VOWELS, (value: number) => integerFromTo(value, 1, 65535)]
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
  const [error, setError] = useState('')
  const [simpleVowels, setSimpleVowels] = useState(0)
  const [compoundVowels, setCompoundVowels] = useState(0)
  const [simpleConsonants, setSimpleConsonants] = useState(0)
  const [doubleConsonants, setDoubleConsonants] = useState(0)
  const [isContinuousPlay, setIsContinuousPlay] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isRandomOrder, setIsRandomOrder] = useState(true)
  const [isRepeatProblemHangul, setIsRepeatProblemHangul] = useState(false)
  const [isSpeedMode, setIsSpeedMode] = useState(true)
  const [message, setMessage] = useState('')
  const [preview, setPreview] = useState(0)
  const [isMessageShowing, setIsMessageShowing] = useState(false)
  const [timestamp, setTimestamp] = useState(0)
  const [typefaces, setTypefaces] = useState(0)

  useEffect(() => {
    setSimpleVowels(getPersistentState(HangulGroups.SIMPLE_VOWELS))
    setCompoundVowels(getPersistentState(HangulGroups.COMPOUND_VOWELS))
    setSimpleConsonants(getPersistentState(HangulGroups.SIMPLE_CONSONANTS))
    setDoubleConsonants(getPersistentState(HangulGroups.DOUBLE_CONSONANTS))
    setIsContinuousPlay(getPersistentState('isContinuousPlay'))
    setIsInitialized(true)
    setIsRandomOrder(getPersistentState('isRandomOrder'))
    setIsRepeatProblemHangul(getPersistentState('isRepeatProblemHangul'))
    setIsSpeedMode(getPersistentState('isSpeedMode'))
    setPreview(getPersistentState('preview'))
    setTypefaces(getPersistentState('typefaces'))
  }, [setIsInitialized])

  const appContext = useMemo(() => {
    const contextFunctions = new Map<string, _ContextFunctions>([
      ['error', setError],
      ['isContinuousPlay', setIsContinuousPlay],
      ['isMessageShowing', setIsMessageShowing],
      ['isRandomOrder', setIsRandomOrder],
      ['isRepeatProblemHangul', setIsRepeatProblemHangul],
      ['isSpeedMode', setIsSpeedMode],
      ['message', setMessage],
      ['preview', setPreview],
      ['timestamp', setTimestamp],
      ['typefaces', setTypefaces],
      [HangulGroups.COMPOUND_VOWELS, setCompoundVowels],
      [HangulGroups.DOUBLE_CONSONANTS, setDoubleConsonants],
      [HangulGroups.SIMPLE_CONSONANTS, setSimpleConsonants],
      [HangulGroups.SIMPLE_VOWELS, setSimpleVowels]
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
      compoundVowels,
      doubleConsonants,
      error,
      isContinuousPlay,
      isMessageShowing,
      isRandomOrder,
      isRepeatProblemHangul,
      isSpeedMode,
      message,
      preview,
      simpleConsonants,
      simpleVowels,
      timestamp,
      typefaces,
      updateContext
    }
  }, [
    error,
    simpleVowels,
    compoundVowels,
    doubleConsonants,
    simpleConsonants,
    isContinuousPlay,
    isMessageShowing,
    isRandomOrder,
    isRepeatProblemHangul,
    isSpeedMode,
    message,
    preview,
    timestamp,
    typefaces
  ])
  return <APP_CONTEXT.Provider value={appContext}>{isInitialized ? children : null}</APP_CONTEXT.Provider>
}
