module.exports = {
  devServer: {
    port: 8888,
  },

  configureWebpack: {
    devServer: {
      watchOptions: {
        poll: true
      }
    }
  },

  transpileDependencies: [
    'vuetify'
  ]
}
