const itemsTool = {
    getArrNoRepeat: <T>(arr: T[]): T[] => Array.from(new Set(arr)),

    getArrUpset: <T>(arr: T[]): T[] => arr.sort(() => 0.5 - Math.random()),

    packAttrToArr: <T>(item: T | T[], factory?: any): T[] => {
        const arr = Array.isArray(item) ? item : [item]
        if (factory) arr.forEach(factory)
        return arr
    },

    putEleIndexFirst: <T>(array: T[], index: number): T[] => {
        let arr = [...array]
        const [target] = arr.splice(index, 1)
        arr.unshift(target)
        return arr
    },
}

export default itemsTool
