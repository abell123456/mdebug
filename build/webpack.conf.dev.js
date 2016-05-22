var baseConf = require('./webpack.conf.base');
var merge = require('webpack-merge');
var webpack = require('webpack');


module.exports = merge(baseConf, {
    watch: true,

    cache: true,

    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
});
