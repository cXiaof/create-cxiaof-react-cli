window.debug = process.env.NODE_ENV === 'development'

document.oncontextmenu = () => {
    return false
}

const resizeTextSize = () => {
    const { clientWidth, clientHeight } = document.documentElement
    const screenSize = Math.min(clientWidth, clientHeight)
    const scale = Math.max(1, screenSize / 1080)
    const fontSize = ~~(16 * scale)
    const fontSizePx = `${fontSize}px`
    document.documentElement.style.fontSize = fontSizePx
    window.fontSize = fontSize
    console.warn(`fontSize="${fontSizePx}"`)
}
resizeTextSize()

window.getTextSize = (px = 16) => ~~((px * window.fontSize) / 16)

window.onresize = () => {
    resizeTextSize()
}
