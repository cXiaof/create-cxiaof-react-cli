import NP from 'number-precision'

NP.enableBoundaryChecking(false)

const calcTool = {
    calcMinUint: (num1 = 1, num2 = 1) => Math.max(0, Math.min(num1, num2)),

    calcAverage: (...args) =>
        calcTool.floatCHU(calcTool.floatJIA(...args), args.length),

    calcGolden: (num, reverse) => {
        const gsa = calcTool.floatCHU(calcTool.floatJIAN(Math.sqrt(5), 1), 2)
        const golden = calcTool.floatRound(gsa, 3)
        const divisor = reverse ? calcTool.floatJIAN(1, golden) : golden
        return calcTool.floatCHEN(num, divisor)
    },

    getTextWidth: (txt) => {
        let result = 0
        for (let i = 0; i < txt.length; i++) {
            result += 1
            const word = txt.charAt(i)
            const hasCh = word.match(/[\u4E00-\u9FA5\uF900-\uFA2D]/gi) != null
            if (hasCh) result += 1
        }
        return result
    },

    floatJIA: (...args) => NP.plus(...args),

    floatJIAN: (...args) => NP.minus(...args),

    floatCHEN: (...args) => NP.times(...args),

    floatCHU: (...args) => NP.divide(...args),

    floatFix: (num) => NP.strip(num),

    floatRound: (num, ratio = 1) => NP.round(num, ratio),
}

export default calcTool
