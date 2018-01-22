var path = require("path");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/"
    },
    devtool: "inline-source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.(s*)css$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    externals: {
        react: "React",
        "react-dom": "ReactDOM"
    }
};
