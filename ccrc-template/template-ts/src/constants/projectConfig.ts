let global: any = window
global.debug = process.env.NODE_ENV === 'development'

document.oncontextmenu = () => false

const resizeTextSize = (): void => {
    const { clientWidth, clientHeight } = document.documentElement
    const screenSize: number = Math.min(clientWidth, clientHeight)
    const scale: number = Math.max(1, screenSize / 1080)
    const fontSize: number = ~~(16 * scale)
    const fontSizePx: string = `${fontSize}px`
    document.documentElement.style.fontSize = fontSizePx
    global.fontSize = fontSize
    console.warn(`fontSize="${fontSizePx}"`)
}
resizeTextSize()

global.getTextSize = (px: number = 16): number =>
    ~~((px * global.fontSize) / 16)

global.onresize = (): void => {
    resizeTextSize()
}

export {}
