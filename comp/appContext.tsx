'use client'

import { KanaGroups } from '@/util/common'
import { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react'

// types

type _AppContext = {
  hiragana: number
  hiraganaDouble: number
  hiraganaWords: number
  isContinuousPlay: boolean
  isMessageShowing: boolean
  isRandomOrder: boolean
  isRepeatProblemKana: boolean
  isSpeedMode: boolean
  katakana: number
  katakanaDouble: number
  katakanaExtended: number
  katakanaWords: number
  message: string
  preview: number
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
  ['isRepeatProblemKana', false],
  ['isSpeedMode', true],
  ['preview', 1],
  ['typefaces', 0],
  [KanaGroups.HIRAGANA, 0],
  [KanaGroups.HIRAGANA_DOUBLE, 0],
  [KanaGroups.HIRAGANA_WORDS, 0],
  [KanaGroups.KATAKANA, 0],
  [KanaGroups.KATAKANA_DOUBLE, 0],
  [KanaGroups.KATAKANA_EXTENDED, 0],
  [KanaGroups.KATAKANA_WORDS, 0]
])

const TESTS = new Map<string, any>([
  ['isContinuousPlay', (value: boolean) => value === Boolean(value)],
  ['isRandomOrder', (value: boolean) => value === Boolean(value)],
  ['isRepeatProblemKana', (value: boolean) => value === Boolean(value)],
  ['isSpeedMode', (value: boolean) => value === Boolean(value)],
  ['preview', (value: number) => integerFromTo(value, 1, 9)],
  ['typefaces', (value: number) => integerFromTo(value, 1, 511)],
  [KanaGroups.HIRAGANA, (value: number) => integerFromTo(value, 1, 65535)],
  [KanaGroups.HIRAGANA_DOUBLE, (value: number) => integerFromTo(value, 1, 4095)],
  [KanaGroups.HIRAGANA_WORDS, (value: number) => integerFromTo(value, 1, 31)],
  [KanaGroups.KATAKANA, (value: number) => integerFromTo(value, 1, 65535)],
  [KanaGroups.KATAKANA_DOUBLE, (value: number) => integerFromTo(value, 1, 4095)],
  [KanaGroups.KATAKANA_EXTENDED, (value: number) => integerFromTo(value, 1, 16383)],
  [KanaGroups.KATAKANA_WORDS, (value: number) => integerFromTo(value, 1, 31)]
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
  const [hiragana, setHiragana] = useState(0)
  const [hiraganaDouble, setHiraganaDouble] = useState(0)
  const [hiraganaWords, setHiraganaWords] = useState(0)
  const [isContinuousPlay, setIsContinuousPlay] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isRandomOrder, setIsRandomOrder] = useState(true)
  const [isRepeatProblemKana, setIsRepeatProblemKana] = useState(false)
  const [isSpeedMode, setIsSpeedMode] = useState(true)
  const [katakana, setKatakana] = useState(0)
  const [katakanaDouble, setKatakanaDouble] = useState(0)
  const [katakanaExtended, setKatakanaExtended] = useState(0)
  const [katakanaWords, setKatakanaWords] = useState(0)
  const [message, setMessage] = useState('')
  const [preview, setPreview] = useState(0)
  const [isMessageShowing, setIsMessageShowing] = useState(false)
  const [timestamp, setTimestamp] = useState(0)
  const [typefaces, setTypefaces] = useState(0)

  useEffect(() => {
    setHiragana(getPersistentState(KanaGroups.HIRAGANA))
    setHiraganaDouble(getPersistentState(KanaGroups.HIRAGANA_DOUBLE))
    setHiraganaWords(getPersistentState(KanaGroups.HIRAGANA_WORDS))
    setIsContinuousPlay(getPersistentState('isContinuousPlay'))
    setIsInitialized(true)
    setIsRandomOrder(getPersistentState('isRandomOrder'))
    setIsRepeatProblemKana(getPersistentState('isRepeatProblemKana'))
    setIsSpeedMode(getPersistentState('isSpeedMode'))
    setKatakana(getPersistentState(KanaGroups.KATAKANA))
    setKatakanaDouble(getPersistentState(KanaGroups.KATAKANA_DOUBLE))
    setKatakanaExtended(getPersistentState(KanaGroups.KATAKANA_EXTENDED))
    setKatakanaWords(getPersistentState(KanaGroups.KATAKANA_WORDS))
    setPreview(getPersistentState('preview'))
    setTypefaces(getPersistentState('typefaces'))
  }, [setIsInitialized])

  const appContext = useMemo(() => {
    const contextFunctions = new Map<string, _ContextFunctions>([
      ['error', setError],
      ['isContinuousPlay', setIsContinuousPlay],
      ['isMessageShowing', setIsMessageShowing],
      ['isRandomOrder', setIsRandomOrder],
      ['isRepeatProblemKana', setIsRepeatProblemKana],
      ['isSpeedMode', setIsSpeedMode],
      ['message', setMessage],
      ['preview', setPreview],
      ['timestamp', setTimestamp],
      ['typefaces', setTypefaces],
      [KanaGroups.HIRAGANA, setHiragana],
      [KanaGroups.HIRAGANA_DOUBLE, setHiraganaDouble],
      [KanaGroups.HIRAGANA_WORDS, setHiraganaWords],
      [KanaGroups.KATAKANA, setKatakana],
      [KanaGroups.KATAKANA_DOUBLE, setKatakanaDouble],
      [KanaGroups.KATAKANA_EXTENDED, setKatakanaExtended],
      [KanaGroups.KATAKANA_WORDS, setKatakanaWords]
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
      error,
      hiragana,
      hiraganaDouble,
      hiraganaWords,
      isContinuousPlay,
      isMessageShowing,
      isRandomOrder,
      isRepeatProblemKana,
      isSpeedMode,
      katakana,
      katakanaDouble,
      katakanaExtended,
      katakanaWords,
      message,
      preview,
      timestamp,
      typefaces,
      updateContext
    }
  }, [
    error,
    hiragana,
    hiraganaDouble,
    hiraganaWords,
    isContinuousPlay,
    isMessageShowing,
    isRandomOrder,
    isRepeatProblemKana,
    isSpeedMode,
    katakana,
    katakanaDouble,
    katakanaExtended,
    katakanaWords,
    message,
    preview,
    timestamp,
    typefaces
  ])

  return <APP_CONTEXT.Provider value={appContext}>{isInitialized ? children : null}</APP_CONTEXT.Provider>
}
