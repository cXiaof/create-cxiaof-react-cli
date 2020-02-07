const itemsTool = {
    packAttrToArr: (item: any | any[], callback?: any): any[] => {
        const arr = Array.isArray(item) ? item : [item]
        if (callback) arr.forEach(callback)
        return arr
    }
}

export default itemsTool
