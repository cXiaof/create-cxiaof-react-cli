const itemsTool = {
    getArrNoRepeat: (arr) => Array.from(new Set(arr)),

    packAttrToArr: (item, callback) => {
        const arr = Array.isArray(item) ? item : [item]
        if (callback) arr.forEach(callback)
        return arr
    },
}

export default itemsTool
