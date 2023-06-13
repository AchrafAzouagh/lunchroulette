const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devServer: {
    hot: true,
    open: true,
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_KEY: JSON.stringify(process.env.MAPS_API_KEY),
      },
    }),
    // Specify development API URL
    // new webpack.DefinePlugin({
    //     "process.env": {
    //         NODE_ENV: JSON.stringify("development"),
    //     },
    // }),
    new ReactRefreshWebpackPlugin(),
  ],
}
