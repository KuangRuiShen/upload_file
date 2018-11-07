var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLPlugin = require('html-webpack-plugin');
var argv = require('yargs').argv;

//判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development';
const isPro = nodeEnv === 'production';

let dir="build";

console.log("当前运行环境：", isPro ? 'production' : 'development')

const extractModuleCSS = new ExtractTextPlugin('assets/css/app.css');
const extractGlobalCSS = new ExtractTextPlugin('assets/css/global.css');
const extractLESS = new ExtractTextPlugin('assets/css/xenon.css');
const htmlPlugin=new HTMLPlugin({
    filename: path.resolve(dir, "index.html"),
    template: 'index.html',
    inject: false,
    minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
})

var plugins = [
    extractGlobalCSS,
    extractModuleCSS,
    extractLESS,
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
            // 该配置假定你引入的 vendor 存在于 node_modules 目录中
            return module.context && module.context.indexOf('node_modules') !== -1;
        }
    }),
    new webpack.DefinePlugin({
        // 定义全局变量
        'process.env':{
            'NODE_ENV': JSON.stringify(nodeEnv)
        }
    }),
    htmlPlugin
]
var app = ['./index']
if (isPro) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            comments: false
        })
    )
} else {
    app.unshift('react-hot-loader/patch', 'webpack-dev-server/client?http://127.0.0.1:5678', 'webpack/hot/only-dev-server')
    plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

app.unshift("babel-polyfill");

module.exports = {
    context: path.resolve(__dirname, 'src'),
    devtool: isPro ? 'source-map' : 'inline-source-map',
    entry: {
        app: app
    },
    output: {
        filename: 'assets/js/[name].js',
        path: path.join(__dirname, dir),
    },
    // BASE_URL是全局的api接口访问地址
    plugins,
    // alias是配置全局的路径入口名称，只要涉及到下面配置的文件路径，可以直接用定义的单个字母表示整个路径
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.join(__dirname, './src')
        ]

    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader?cacheDirectory=true'
            }
        },{
            test: /\.css$/,
            include: /(src)/,
            use:extractModuleCSS.extract({
                use: [{
                    loader: "css-loader?modules&localIdentName=[path][name]-[local]-[hash:base64:5]"
                },{
                    loader: "postcss-loader"
                }]
            })
        },{
            test: /\.css$/,
            include: /(assets)/,
            use:extractGlobalCSS.extract({
                use: [{
                    loader: "css-loader"
                },{
                    loader: "postcss-loader"
                }]
            })
        },{
            test: /\.less$/,
            include: /node_modules/,
            use:extractLESS.extract({
                use: [{
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            })



        },{
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: ['url-loader?limit=10000&name=assets/images/[md5:hash:base64:10].[ext]']
        }]
    },
    devServer: {
        hot: true,
        compress: true,
        port: 5678,
        host: "0.0.0.0",
        historyApiFallback: true,
        proxy: {
			"/api": {//我们可以在这里设置个口令  
            "target": "http://127.0.0.1:7001",//target是api服务器地址 
            "changeOrigin": true, //这个是是否替换这里一定要写true  
            "pathRewrite": { //这个是个正则匹配  
                "^/api": "/"  
            }  
        }
        },
        stats: {
            modules: false,
            chunks: false
        },
    },
};