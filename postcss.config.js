const production_plugins = [
  require('@fullhuman/postcss-purgecss')({
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
  }),
  require('cssnano')
]

module.exports = ctx => {
  console.log(`PostCSS mode: \`${ctx.env || 'development'}\``)
  return {
    plugins: [
      require('postcss-import'),
      require('tailwindcss'),
      require('autoprefixer'),
      ...(ctx.env === 'production' ? production_plugins : [])
    ]
  }
}
