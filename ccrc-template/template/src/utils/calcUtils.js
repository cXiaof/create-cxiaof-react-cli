import NP from 'number-precision'

NP.enableBoundaryChecking(false)

export const calcMinUint = (num1 = 1, num2 = 1) => {
    return Math.max(0, Math.min(num1, num2))
}

export const calcAverage = (arr, ratio = 20) => {
    const [num1, num2, ...others] = arr
    return NP.round(
        NP.divide(NP.plus(num1, num2, ...others), arr.length),
        ratio
    )
}

export const calcGolden = (num, reverse) => {
    const gsa = NP.divide(NP.minus(Math.sqrt(5), 1), 2)
    const golden = NP.round(gsa, 3)
    const divisor = reverse ? NP.minus(1, golden) : golden
    return NP.times(num, divisor)
}

export const getTextWidth = (txt) => {
    let result = 0
    for (let i = 0; i < txt.length; i++) {
        result += 1
        const word = txt.charAt(i)
        const hasCh = word.match(/[\u4E00-\u9FA5\uF900-\uFA2D]/gi) != null
        if (hasCh) result += 1
    }
    return result
}

export default NP
