var baseConf = require('./webpack.conf.base');
var merge = require('webpack-merge');
var webpack = require('webpack');


module.exports = merge(baseConf, {
    watch: true,

    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
});
