const itemsTool = {
    packAttrToArr: (item, callback = () => false) => {
        const arr = Array.isArray(item) ? item : [item]
        arr.forEach(callback)
        return arr
    }
}

export default itemsTool
