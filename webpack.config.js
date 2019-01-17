const webpack              = require('webpack');
const path                 = require('path');
const config               = require('./package.json');
const MinicssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const autoprefixer         = require('autoprefixer');
const CleanWebpackPlugin   = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { VueLoaderPlugin }    = require('vue-loader');
const moment               = require('moment');


module.exports = (env,argv)=> {
    
    let  webpackConfig = {
        entry:{
            app:'./src/app.js'
        },
        output:{
            path: path.resolve(__dirname, 'build' + '/' + config.version),
            publicPath: config.publicPath + '/'+config.version+'/',
            filename: 'js/[name].js'
        },
        stats: {
            entrypoints: false,
            children: false
        },
        resolve:{
            extensions:['.js','.vue','.json'],
        },
        
        module:{
           rules:[
                {
                    test:/\.css$/,
                    use: [
                        argv.mode==='development'?'style-loader': MinicssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader"
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        argv.mode==='development'?'style-loader': MinicssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        "sass-loader"
                       
                    ],
                
                },
                {
                    test: /\.(png|jpg|gif|webp|woff|eot|ttf)$/,
                    use:{
                        loader:'url-loader',
                        options:{
                            name:'img/[name].[ext]',
                            limit:3000
                        }
                    },
                   
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-sprite-loader',
                },
                {
                    test:/\.vue$/,
                    use:[
                        {
                            loader:'vue-loader',
                            options:{
                                loaders:{
                                    scss:[
                                         argv.mode==='development'?'vue-style-loader': MinicssExtractPlugin.loader,
                                        'css-loader',
                                        'sass-loader'
                                    ]
                                },
                                postcss: [autoprefixer()]
                            }
                        }
                    ]
                },
                {
                    test:/\.js$/,
                    use:'babel-loader'
                }
           ]
        },
        plugins:[
            new CleanWebpackPlugin('build'),
            new VueLoaderPlugin(),
            new MinicssExtractPlugin({
                filename: 'css/[name].css',
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css\.*(?!.*map)$/g,
                cssProcessorOptions: {
                    discardComments: { removeAll: true },
                    safe: true,
                    autoprefixer: false,
                },
    
            })
        ],
    }
    
    if(argv.mode === 'production'){
        webpackConfig.plugins = (webpackConfig.plugins || []).concat([
            new HtmlWebpackPlugin({
                template:'./src/index.html',
                filename:path.resolve(__dirname,'build/index.html')
            }),
            new webpack.BannerPlugin({
                banner:`${config.name} ${config.version} ${moment().format()}` 
            })
        ]);
    }else{
        webpackConfig.plugins = (webpackConfig.plugins || []).concat([
            new HtmlWebpackPlugin({
                template:'./src/index.html'
            })
            
        ]);
        webpackConfig.output.publicPath = '/';
        webpackConfig.devtool = '#cheap-module-eval-source-map';
        webpackConfig.devServer = {
            contentBase:path.resolve(__dirname,'build'),
            //host:'192.168.191.2',
            //port:8080,
            compress:true,
            historyApiFallback:true
        }
    }
    
    return webpackConfig;
 
}
    


