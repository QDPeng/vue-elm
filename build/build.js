// https://github.com/shelljs/shelljs
require('shelljs/global')
require("babel-core/register");
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config/index')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('../config/webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, function(err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})