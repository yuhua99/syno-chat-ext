const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        "background": "./src/background/index.ts",
        "content_scripts": "./src/content_scripts/index.ts",
        "options": "./src/options/index.ts",
        "popup": "./src/popup/index.ts",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        publicPath: '',
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "./src/manifest.json" },
                { from: "./src/options/options.html" },
                { from: "./src/popup/popup.html" },
                { from: "icons/*", to: path.resolve(__dirname, "dist"), context: "src/" }
            ]
        }),
    ],
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: ['.ts', '.js'],
    }
};
