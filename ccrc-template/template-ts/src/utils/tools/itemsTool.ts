const itemsTool = {
    getArrNoRepeat: (arr: any[]): any[] => Array.from(new Set(arr)),

    getArrUpset: (arr: any[]): any[] => arr.sort(() => 0.5 - Math.random()),

    packAttrToArr: (item: any | any[], factory?: any): any[] => {
        const arr = Array.isArray(item) ? item : [item]
        if (factory) arr.forEach(factory)
        return arr
    },
}

export default itemsTool
