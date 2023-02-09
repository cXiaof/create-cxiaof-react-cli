/// <reference types="vite/client" />

type Obj = Record<string, any>

interface Window {}

type NumberType = number | string

interface Number {
  strip: (precision?: number) => number
  times: (...nums: NumberType[]) => number
  plus: (...nums: NumberType[]) => number
  minus: (...nums: NumberType[]) => number
  divide: (...nums: NumberType[]) => number
  round: (decimal: number) => number
}
