import NP from 'number-precision'

global.GoldenSection = NP.round(NP.divide(NP.minus(Math.sqrt(5), 1), 2), 3)

const calcTool = {
    calcMinUint: (num1 = 1, num2 = 1) => Math.max(0, Math.min(num1, num2)),

    calcGolden: (num, reverse) => {
        const divisor = reverse
            ? NP.minus(1, global.GoldenSection)
            : global.GoldenSection
        return NP.times(num, divisor)
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
}

export default calcTool
