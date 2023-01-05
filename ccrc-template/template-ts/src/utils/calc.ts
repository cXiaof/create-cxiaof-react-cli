import NP from 'number-precision'

NP.enableBoundaryChecking(false)

// eslint-disable-next-line no-extend-native
Object.defineProperties(Number.prototype, {
  strip: {
    writable: false,
    enumerable: false,
    configurable: false,
    value: function (precision?: number) {
      return NP.strip(this, precision)
    },
  },
  plus: {
    writable: false,
    enumerable: false,
    configurable: false,
    value: function (...nums: Parameters<typeof NP['plus']>) {
      return NP.plus(this, ...nums)
    },
  },
  minus: {
    writable: false,
    enumerable: false,
    configurable: false,
    value: function (...nums: Parameters<typeof NP['minus']>) {
      return NP.minus(this, ...nums)
    },
  },
  times: {
    writable: false,
    enumerable: false,
    configurable: false,
    value: function (...nums: Parameters<typeof NP['times']>) {
      return NP.times(this, ...nums)
    },
  },
  divide: {
    writable: false,
    enumerable: false,
    configurable: false,
    value: function (...nums: Parameters<typeof NP['divide']>) {
      return NP.divide(this, ...nums)
    },
  },
  round: {
    writable: false,
    enumerable: false,
    configurable: false,
    value: function (decimal: number) {
      return NP.round(this, decimal)
    },
  },
})

export const calcMinUint = (num1: number = 1, num2: number = 1): number => {
  return Math.max(0, Math.min(num1, num2))
}

export const calcAverage = (arr: number[], ratio: number = 20): number => {
  const [first, ...others] = arr
  return first
    .plus(...others)
    .divide(arr.length)
    .round(ratio)
}

export const calcGolden = (num: number, reverse?: boolean): number => {
  const gsa = Math.sqrt(5).minus(1).divide(2)
  const golden = gsa.round(3)
  const divisor = reverse ? (1).minus(golden) : golden
  return num.times(divisor)
}

export const calcArrayDepth = (arr: any[]): number => {
  let depth = 1
  let first = arr[0]
  while (Array.isArray(first)) {
    depth++
    first = first[0]
  }
  return depth
}

export const getTextWidth = (txt: string): number => {
  let result = 0
  for (let i = 0; i < txt.length; i++) {
    result += 1
    const word = txt.charAt(i)
    const hasCh = word.match(/[\u4E00-\u9FA5\uF900-\uFA2D]/gi) != null
    if (hasCh) result += 1
  }
  return result
}
