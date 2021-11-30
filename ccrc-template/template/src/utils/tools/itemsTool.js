const itemsTool = {
    getArrNoRepeat: (arr) => Array.from(new Set(arr)),

    getArrUpset: (arr) => arr.sort(() => 0.5 - Math.random()),

    packAttrToArr: (item, callback) => {
        const arr = Array.isArray(item) ? item : [item]
        if (callback) arr.forEach(callback)
        return arr
    },

    putEleIndexFirst: (array, index) => {
        let arr = [...array]
        const [target] = arr.splice(index, 1)
        arr.unshift(target)
        return arr
    },
}

export default itemsTool
