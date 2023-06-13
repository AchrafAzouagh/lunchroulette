//const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
import { DefinePlugin } from 'webpack'

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new DefinePlugin({
      'process.env': {
        MAPS_API_KEY: JSON.stringify(process.env.MAPS_API_KEY),
      },
    }),
    //new BundleAnalyzerPlugin(),
  ],
}
