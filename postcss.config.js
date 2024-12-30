const { purgeCSSPlugin } = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    purgeCSSPlugin({
      content: ['./**/*.html']
    })
  ]
}
