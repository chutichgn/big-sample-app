var webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

var DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') !== -1;
var DEV = DEV_SERVER || process.env.DEV;

module.exports = {
    mode: DEV ? 'development' : 'production',
    entry: {
        // "sampleapp": "./src/app/bootstrap/bootstrap.js",
        "sampleapp": ["./src/app/bootstrap/bootstrap.js", "./src/styles/app.css"]
    },

    devtool: DEV ? 'eval' : 'source-map',

    output: {
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '_bundles/',
        filename: "js/[name].js",
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html", // Path to your source index.html
            filename: "index.html" // Output HTML file name in _bundles
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css" // Output CSS file (e.g., sampleapp.css)
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "data", // Source folder (relative to project root)
                    to: "data" // Destination folder in _bundles
                }
            ]
        })
    ],
    // Add devServer configuration if using webpack-dev-server
    devServer: {
        static: {
            directory: path.join(__dirname, "dist")
        },
        historyApiFallback: true, // For AngularJS client-side routing
        port: 8081,

        proxy: {
            '/login': 'http://localhost:3000',
            '/check-token': 'http://localhost:3000',
            '/logout': 'http://localhost:3000'
        }
    },

    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },

    resolve: {
        extensions: ['.js', '.html', '.css'], // Ensure Webpack resolves .html files
    },

    optimization: {
        splitChunks: {chunks: 'all', name: 'vendors~sampleapp'},
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre",
                exclude: [/@uirouter/]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {loader: 'babel-loader'},
            },
            // CSS loader configuration
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // Extracts CSS into a separate file
                    "css-loader" // Processes CSS files
                ]
            }
            ,
            {
                test: /\.html$/,
                use: ['html-loader'], // Ensure html-loader is applied to .html files
            },
        ]
    },
};
