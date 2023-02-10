export const getArrNoRepeat = <T>(arr: T[]): T[] => Array.from(new Set(arr))

export const getArrUpset = <T>(arr: T[]): T[] =>
  arr.sort(() => 0.5 - Math.random())

export const packAttrToArr = <T>(
  item: T | T[],
  factory?: (item: T) => void,
): T[] => {
  const arr = Array.isArray(item) ? item : [item]
  if (factory) arr.forEach(factory)
  return arr
}

export const putEleIndexFirst = <T>(arr: T[], index: number): T[] => {
  let clone = [...arr]
  const [target] = clone.splice(index, 1)
  clone.unshift(target)
  return clone
}
