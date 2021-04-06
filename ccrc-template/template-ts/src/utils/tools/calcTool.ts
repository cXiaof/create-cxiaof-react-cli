import numberPrecision from 'number-precision'

numberPrecision.enableBoundaryChecking(false)

const calcTool = {
    ...numberPrecision,

    calcMinUint: (num1: number = 1, num2: number = 1): number =>
        Math.max(0, Math.min(num1, num2)),

    calcAverage: (arr: number[], ratio: number = 20): number => {
        const [num1, num2, ...others] = arr
        return calcTool.round(
            calcTool.divide(calcTool.plus(num1, num2, ...others), arr.length),
            ratio
        )
    },

    calcGolden: (num: number, reverse: boolean): number => {
        const gsa = calcTool.divide(calcTool.minus(Math.sqrt(5), 1), 2)
        const golden = calcTool.round(gsa, 3)
        const divisor = reverse ? calcTool.minus(1, golden) : golden
        return calcTool.times(num, divisor)
    },

    getTextWidth: (txt: string): number => {
        let result = 0
        for (let i = 0; i < txt.length; i++) {
            result += 1
            const word = txt.charAt(i)
            const hasCh = word.match(/[\u4E00-\u9FA5\uF900-\uFA2D]/gi) != null
            if (hasCh) result += 1
        }
        return result
    },
}

export default calcTool
