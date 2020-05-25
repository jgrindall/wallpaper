const VueLoaderPlugin = require('vue-loader/lib/plugin')

const path = require('path');
const ROOT = path.resolve( __dirname, 'src' );
const DESTINATION = path.resolve( __dirname, 'dist' );


module.exports = {
    context: ROOT,
    mode:'production',
    entry: {
        'main': './main.ts'
    },
    node: {
        fs: "empty"
    },

    output: {
        filename: '[name].bundle.js',
        path: DESTINATION
    },

    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            ROOT,
            'node_modules'
        ]
    },

    module: {
        rules: [
            {
               use: 'babel-loader',
               test: /\.jsx?$/,
               resolve: {
                 extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
               },
               exclude: /node_modules/
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader'
            },
            {
                enforce: 'pre',
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'tslint-loader'
            },
            {
                test: /\.tsx?$/,
            	use: {
            		loader: "ts-loader",
            		options: {
            			configFile: path.resolve( __dirname, 'tsconfig.json' ),
            			appendTsSuffixTo: [/\.vue$/]
            		}
            	}
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
              test: /\.vue$/,
              loader: 'vue-loader'
            }
        ]
    },
    plugins: [
      new VueLoaderPlugin()
    ],
    devtool: 'cheap-module-source-map',
    devServer: {}
};
