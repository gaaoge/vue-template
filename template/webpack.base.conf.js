/**
 * Created by GG on 16/12/01.
 */

const path = require('path');
const postcss = require('postcss');
const cssnext = require('postcss-cssnext');
const sprites = require('postcss-sprites');
const px2rem = require('postcss-plugin-px2rem');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const spritesOptions = {
    spritePath: './build/resource/assets/',
    spritesmith: {padding: 20},
    groupBy: function (image) {
        let groupName = /.*\/(.*)\.vue/g.exec(image.styleFilePath)[1].toLowerCase();
        return Promise.resolve(groupName);
    },
    hooks: {
        onUpdateRule: function (rule, token, image) {
            let backgroundSizeX = (image.spriteWidth / image.coords.width) * 100;
            let backgroundSizeY = (image.spriteHeight / image.coords.height) * 100;
            let backgroundPositionX = (image.coords.x / (image.spriteWidth - image.coords.width)) * 100;
            let backgroundPositionY = (image.coords.y / (image.spriteHeight - image.coords.height)) * 100;

            backgroundSizeX = isNaN(backgroundSizeX) ? 0 : backgroundSizeX;
            backgroundSizeY = isNaN(backgroundSizeY) ? 0 : backgroundSizeY;
            backgroundPositionX = isNaN(backgroundPositionX) ? 0 : backgroundPositionX;
            backgroundPositionY = isNaN(backgroundPositionY) ? 0 : backgroundPositionY;

            let background = postcss.decl({
                prop: 'background',
                value: `url(${image.spriteUrl}) ${backgroundPositionX}% ${backgroundPositionY}%  no-repeat`
            });

            let backgroundSize = postcss.decl({
                prop: 'background-size',
                value: backgroundSizeX + '% ' + backgroundSizeY + '%'
            });

            rule.insertAfter(token, background);
            rule.insertAfter(background, backgroundSize);
        }
    }
};
const px2remOptions = {
    propBlackList: ['border', 'border-width']
};

module.exports = {
    entry: {
        main: './src/main.js',
        libs: [
            'rem-adapter',
            'newsapp-client',
            'newsapp-share',
            'axios',
            'normalize.css',
            'v-tap',
            'vue',
            'vue-axios',
            'vue-router'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build/')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    postcss: [cssnext(), sprites(spritesOptions), px2rem(px2remOptions)]
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader?insertAt=top!css-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'resource/assets/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
    resolve: {
        modules: ['node_modules', 'src/libs']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
};