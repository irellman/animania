module.exports = {
  outputDir: '../public',

  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

  // modify the location of the generated HTML file.
  indexPath: process.env.NODE_ENV === 'production'
    ? '../resources/views/index.edge'
    : '../resources/views/index.edge'
}