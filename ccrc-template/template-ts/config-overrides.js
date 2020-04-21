const {
    override,
    addWebpackAlias,
    addPostcssPlugins,
} = require('customize-cra')

process.env.GENERATE_SOURCEMAP = 'false'

module.exports = override(
    addWebpackAlias({
        '^': path.resolve(__dirname, 'src/assets'),
        '@': path.resolve(__dirname, 'src/components'),
        '#': path.resolve(__dirname, 'src/constants'),
        '~': path.resolve(__dirname, 'src/utils'),
        '~tools': path.resolve(__dirname, 'src/utils/tools'),
    }),
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
