const calcTool = {
    calcMinUint: (num1: number = 1, num2: number = 1): number =>
        Math.max(0, Math.min(num1, num2)),

    calcGolden: (num: number, reverse: boolean): number => {
        const golden = calcTool.floatCHU(
            calcTool.floatJIAN(Math.sqrt(5), 1),
            2,
            3
        )
        return calcTool.floatCHEN(
            num,
            reverse ? calcTool.floatJIAN(1, golden) : golden
        )
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

    floatJIA: (
        num1: number = 0,
        num2: number = 0,
        fixed: number = 20
    ): number => {
        const [m] = getJiaJianVal(num1, num2)
        const result = Math.round(num1 * m + num2 * m) / m
        return parseFloat(result.toFixed(fixed))
    },

    floatJIAN: (
        num1: number = 0,
        num2: number = 0,
        fixed: number = 20
    ): number => {
        const [m, r1, r2] = getJiaJianVal(num1, num2)
        const result = (Math.round(num1 * m - num2 * m) / m).toFixed(
            Math.max(r1 - 0, r2 - 0)
        )
        return parseFloat(parseFloat(result).toFixed(fixed))
    },

    floatCHEN: (
        num1: number = 0,
        num2: number = 1,
        fixed: number = 20
    ): number => {
        let m = 0,
            s1 = num1.toString(),
            s2 = num2.toString()
        try {
            m += s1.split('.')[1].length
        } catch (e) {}
        try {
            m += s2.split('.')[1].length
        } catch (e) {}
        const result =
            (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
            Math.pow(10, m)
        return parseFloat(result.toFixed(fixed))
    },

    floatCHU: (
        num1: number = 0,
        num2: number = 1,
        fixed: number = 20
    ): number => {
        const [t1, t2] = getDecimalLength(num1, num2)
        const r1 = Number(num1.toString().replace('.', ''))
        const r2 = Number(num2.toString().replace('.', ''))
        const result = (r1 / r2) * Math.pow(10, t2 - t1)
        return parseFloat(result.toFixed(fixed))
    }
}

const getJiaJianVal = (num1: number, num2: number): number[] => {
    const [r1, r2] = getDecimalLength(num1, num2)
    const m = Math.pow(10, Math.max(r1, r2))
    return [m, r1, r2]
}

const getDecimalLength = (num1: number, num2: number): number[] => {
    let r1, r2
    try {
        r1 = num1.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = num2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    return [r1, r2]
}

export default calcTool
