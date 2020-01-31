global.debug = process.env.NODE_ENV === 'development'

document.oncontextmenu = () => false

const resizeTextSize = () => {
    const scale = Math.max(1, document.documentElement.clientHeight / 1080)
    const fontSize = ~~(16 * scale)
    const fontSizePx = `${fontSize}px`
    document.documentElement.style.fontSize = fontSizePx
    global.fontSize = fontSize
    console.warn(`fontSize="${fontSizePx}"`)
}
resizeTextSize()

global.getTextSize = (px) => ~~((px * global.fontSize) / 16)

window.onresize = () => {
    resizeTextSize()
}
