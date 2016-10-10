var path = require('path');
var autoprefixer  = require('autoprefixer');
var precss        = require('precss');
var cssnano       = require('cssnano');
var webpack       = require('webpack');

var webpackConfig = {
    resolve: {
        root: path.join(__dirname, 'node_modules'),
        extensions: ['', '.js', '.scss', '.css']
    },
    output: {
        filename: '[name].js',
    },
    module: {
        preLoaders: [
            // { test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/ }
        ],
        loaders: [
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV) || 'production'
        })

    ],
    babel: { //配置babel
        "presets": ["es2015", 'stage-2'],
        "plugins": ["transform-runtime"]
    }
};

var src  = {
    static: './src/**/*.{eot,svg,ttf,woff,png,jpg,jpeg,json}',
    //fonts: './src/**/*.{eot,svg,ttf,woff}',
    //images: './src/**/*.{png,jpg,jpeg}',
    js: './src/{pages/**/*.js,app.js}',
    watchJs: './src/**/*.js',
    sass: './src/**/*.{scss,sass}',
    less: './src/**/*.less',
    wxss: './src/**/*.{wxss,css}',
    wxml: './src/**/*.wxml',
    //json: './src/**/*.json',
    views: './src/**/*.{html,wxml}'
};

var dist = './dist/';

var isBuild = false;

var processes = [
    autoprefixer({ browsers: ['last 2 version', 'safari 5', 'opera 12.1', 'ios 6', 'android 4'] }),
    precss,
    cssnano
];

module.exports = {
    webpackConfig,
    src,
    dist,
    isBuild,
    processes
}

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
