export const getArrNoRepeat = (arr) => Array.from(new Set(arr))

export const getArrUpset = (arr) => arr.sort(() => 0.5 - Math.random())

export const packAttrToArr = (item, factory) => {
    const arr = Array.isArray(item) ? item : [item]
    if (factory) arr.forEach(factory)
    return arr
}

export const putEleIndexFirst = (array, index) => {
    let arr = [...array]
    const [target] = arr.splice(index, 1)
    arr.unshift(target)
    return arr
}
