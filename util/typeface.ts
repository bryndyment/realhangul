// variables

let typefaceIndex: number

let typefaces: number[] = []

// functions

export const getNextTypeface = () => {
  if (typefaces.length > 1) {
    typefaceIndex = typefaceIndex === typefaces.length - 1 ? 0 : typefaceIndex + 1
  }

  return typefaces[typefaceIndex]
}

export const getRandomTypeface = () => {
  let proposed

  if (typefaces.length > 1) {
    do {
      proposed = Math.floor(Math.random() * typefaces.length)
    } while (typefaces[proposed] === typefaces[typefaceIndex])

    typefaceIndex = proposed
  }

  return typefaces[typefaceIndex]
}

export const initializeTypefaces = (value: number, isRandomOrder: boolean) => {
  let index = 9
  let power

  typefaces = []

  while (index) {
    power = 2 ** --index

    if (value >= power) {
      value -= power

      typefaces.push(index + 1)
    }
  }

  typefaces = typefaces.reverse()

  typefaceIndex = isRandomOrder ? Math.floor(Math.random() * typefaces.length) : 0

  return typefaces[typefaceIndex]
}
