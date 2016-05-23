var baseConf = require('./webpack.conf.base');
var merge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = merge(baseConf, {
    watch: true,

    cache: true,

    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        })
    ]
});
