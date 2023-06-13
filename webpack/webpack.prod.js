const webpack = require('webpack')
//const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        MAPS_API_KEY: JSON.stringify(process.env.MAPS_API_KEY),
      },
    }),
    //new BundleAnalyzerPlugin(),
  ],
}
