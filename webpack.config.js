const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: "./src/lib.tsx",
  devServer: {
    host: "127.0.0.1",
    port: 8080,
    static: [
      {
        directory: path.resolve(__dirname, "./src"),
        staticOptions: {},
        publicPath: "/",
        serveIndex: true,
        watch: true,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    library: "AZSocial",
    // libraryTarget: "umd"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss", ".mjs", ".json", ".jsx",".css",".scss"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js)$/,
        // exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(s(a|c)ss)$/,
        exclude: /node_modules/,
        
        use: [
          "style-loader",          
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options:{
               modules:true,
               importLoaders: 0,
              //  localIdentName: '[sha1:hash:hex:4]'
            }
          },
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: "url-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "az-consent-preference-style.css",
    }),
    new CompressionPlugin({algorithm: "gzip"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ],
};
