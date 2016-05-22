var path = require('path');

var projectRoot = path.resolve(__dirname, '../');
var webpack = require('webpack');


// whether to generate source map for production files.
// disabling this can speed up the build.

module.exports = {
    entry: {
        mdebug : './src/mdebug.js'
    },

    output: {
        // 打包后存放的目录路径
        path: './dist',
        filename: '[name].js',
        chunkFilename: '[id].js'
    },

    resolve: {
        root: [projectRoot, path.resolve(__dirname, '../..')],
        extensions: ['', '.js', '.jsx', '.vue', '.json', '.scss', 'css'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'node_modules': path.resolve(__dirname, '../node_modules')
        },
        modulesDirectories: ['../node_modules', '../node_modules/@alife/']
    },

    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },

    module: {
        preLoaders: [{
            test: /\.(vue|jsx?)$/,
            loader: 'eslint',
            include: projectRoot,
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.tpl/,
            loader: 'handlebars-template'
        }, {
            test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 1000000,
                name: '[name]'
            }
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.less$/,
            loader: 'css!less'
        }, {
            test: /\.s(a|c)ss$/,
            loader: 'css!sass'
        }, {
            test: /\.styl(us)?$/,
            loader: 'css!stylus'
        }]
    },

    eslint: {
        formatter: require('eslint-friendly-formatter')
    },

    autoprefixer: {
        browsers: ['last 2 versions']
    },

    babel: {
        cacheDirectory: false,
        presets: [
            "es2015", "react", "stage-2"
        ],
        plugins: [
            'transform-class-properties',
            'transform-es2015-arrow-functions',
            'transform-es2015-block-scoping',
            'transform-es2015-object-super'
        ]
    },

    devtool: false,

    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
    }
};
