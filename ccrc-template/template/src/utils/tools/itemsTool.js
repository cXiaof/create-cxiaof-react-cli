const itemsTool = {
    getArrNoRepeat: (arr) => Array.from(new Set(arr)),

    getArrUpset: (arr) => arr.sort(() => 0.5 - Math.random()),

    packAttrToArr: (item, callback) => {
        const arr = Array.isArray(item) ? item : [item]
        if (callback) arr.forEach(callback)
        return arr
    },
}

export default itemsTool
