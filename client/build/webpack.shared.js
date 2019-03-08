const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});

const favicon = new FaviconsWebpackPlugin({
  logo: path.resolve('favicon.png'),
  persistentCache: true,
  inject: true,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: true,
    favicons: true,
    firefox: true,
  }
});

const appManifest = new WebpackPwaManifest({
  name: 'My Progressive Web App',
  short_name: 'MyPWA',
  description: 'My awesome Progressive Web App!',
  background_color: '#ffffff',
  theme_color: '#ffffff',
  icons: {
    src: path.resolve('favicon.png'),
    sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
  },
});

const resolve = { extensions: ['.js', '.jsx'] };
const entry = './src/index.jsx';

module.exports = { appManifest, HtmlWebpackPluginConfig, favicon, resolve, entry };
