window.debug = process.env.NODE_ENV === 'development'

document.oncontextmenu = () => false

const resizeTextSize = () => {
    const scale = Math.max(1, document.documentElement.clientHeight / 1080)
    const fontSize = ~~(16 * scale)
    const fontSizePx = `${fontSize}px`
    document.documentElement.style.fontSize = fontSizePx
    window.fontSize = fontSize
    console.warn(`fontSize="${fontSizePx}"`)
}
resizeTextSize()

window.getTextSize = (px) => ~~((px * window.fontSize) / 16)

window.onresize = () => {
    resizeTextSize()
}
