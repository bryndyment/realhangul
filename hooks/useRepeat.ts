import { useState } from 'react'

// hooks

export const useRepeat = (value: boolean) => {
  const [isRepeatProblemKana, setIsRepeatProblemKana] = useState(value)
  const [repeatSlotList, setRepeatSlotList] = useState<(null | number)[]>(new Array(5).fill(null))

  const conditionallyAdd = (current: number) => {
    if (isRepeatProblemKana && !repeatSlotList.includes(current)) {
      const attempt = repeatSlotList.indexOf(null)

      if (attempt !== -1) {
        setRepeatSlotList(previousRepeatSlotList => previousRepeatSlotList.map((item, idx) => (idx === attempt ? current : item)))
      }
    }
  }

  const conditionallyChoose = (current: number) => {
    let index: null | number = null

    if (isRepeatProblemKana) {
      do {
        index = Math.floor(Math.random() * 5)

        if (repeatSlotList[index] === current) {
          index = null
        } else if (repeatSlotList[index] !== null) {
          setRepeatSlotList(previousRepeatSlotList => previousRepeatSlotList.map((item, idx) => (idx === index ? null : item)))
        }
      } while (index === null)
    }

    return index !== null ? repeatSlotList[index] : null
  }

  const reinitializeRepeat = (value: boolean) => {
    setIsRepeatProblemKana(value)
    setRepeatSlotList(new Array(5).fill(null))
  }

  return { conditionallyAdd, conditionallyChoose, reinitializeRepeat }
}
