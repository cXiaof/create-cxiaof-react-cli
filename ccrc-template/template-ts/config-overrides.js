const { override, addPostcssPlugins } = require('customize-cra')

process.env.GENERATE_SOURCEMAP = 'false'

module.exports = override(
    addPostcssPlugins([
        require('postcss-plugin-px2rem')({
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
        }),
    ])
)
