const CracoAlias = require('craco-alias')
const px2rem = require('postcss-plugin-px2rem')

const px2remOpts = {
    rootValue: 16,
    // unitPrecision: 5,
    // propWhiteList: [],
    // propBlackList: [],
    // exclude: false,
    // selectorBlackList: [],
    // ignoreIdentifier: false,
    // replace: true,
    // mediaQuery: false,
    minPixelValue: 3,
}

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: 'tsconfig',
                baseUrl: './src',
                tsConfigPath: './tsconfig.extend.json',
            },
        },
    ],
    style: { postcss: { mode: 'extends', plugins: [px2rem(px2remOpts)] } },
}
