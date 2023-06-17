const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path");
module.exports = 
{
    entry: "./src/js/index.js",
    module: {
        rules: 
        [
            {
                test: /\.s?css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader","postcss-loader", "sass-loader"],
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                loader: "babel-loader"
                
            }
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js"
    },
    plugins: [
        new MiniCssExtractPlugin(),
    ],

    mode: process.env.NODE_ENV === "production" ? "production" : "development",

    devServer: {
        static: "./dist",
        port: 3000,
        open: true,
        hot: true
        
    },
};