const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";
//返回处理样式loader的函数
const getStyleLoaders = pre => {
  return [
    isProduction ? MiniCssExtractPlugin.loader : "style-loader", //将css打包成单独文件
    "css-loader",
    pre
  ].filter(Boolean); //把数字中的undefined值过滤掉
};

module.exports = {
  entry: "./src/index.js", //入口,指定一个入口文件，作为webpack的打包入口，从这个文件卡萨构建整个项目
  output: {
    //输出文件的文件名
    path: isProduction ? path.resolve(__dirname, "../dist") : undefined, //输出目录
    filename: isProduction
      ? "static/js/[name].[contenthash:10].js"
      : "static/js/[name].js", //输出的文件名 [name]为chunk打包的名称自动补全(??决定的是入口文件的打包目录??)
    chunkFilename: isProduction
      ? "static/js/[name].[contenthash:10].chunk.js"
      : "static/js/[name].chunk.js", //import()动态导入,打包node_modlues等,的chunk 命名
    assetModuleFilename: "static/media/[hash:10][ext][query]", //图片等资源,10位哈希,扩展名自动补全,其他参数
    clean: true
  },
  module: {
    rules: [
      {
        oneOf: [
          //处理css,打包css文件，通过动态创建script标签插入到页面上，
          {
            test: /\.css$/, //正则,以.css结尾的文件
            use: getStyleLoaders(undefined)
          },
          //处理图片
          {
            test: /\.(jpe?g|png|gif|webp|svg)$/,
            type: "asset",
            //10KB以下图片会转换成Base64,减小请求数量,体积稍微加大
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024
              }
            }
          },
          //处理js
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            include: path.resolve(__dirname, "../src"),
            loader: "babel-loader",
            options: {
              cacheDirectory: true, //开启缓存,第二次打包更快
              cacheCompression: false, //缓存内容不压缩,加快打包速度
              plugins: [
                !isProduction && "react-refresh/  ", //激活js的HMR
                "@babel/plugin-transform-runtime"
              ].filter(Boolean)
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 9999,  // 指定新端口
    }),
    isProduction &&
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:10].css",
        chunkFilename: "static/css/[name].[contenthash:10].chunk.css"
      }),
    new HtmlWebpackPlugin({
      //以template为模板创建新html文件
      template: path.resolve(__dirname, "../public/index.html")
    }),
    isProduction &&
      new CopyPlugin({
        //复制图标文件
        patterns: [
          {
            from: path.resolve(__dirname, "../public"),
            to: path.resolve(__dirname, "../dist"),
            globOptions: {
              //忽略index.html文件
              ignore: ["**/index.html"]
            }
          }
        ]
      }),
    !isProduction && new ReactRefreshWebpackPlugin()
  ].filter(Boolean),
  mode: isProduction ? "production" : "development", //生产模式
  optimization: {
    //代码分割
    splitChunks: {
      //在cacheGroups外层的属性设定适用于所有缓存组，不过每个缓存组内部可以重设这些属性
      chunks: "all", 
      minSize: 500000, //大小超过500kb的模块才会被提取
      maxSize: 800000, 
      minChunks: 1, //某个模块至少被多少代码块引用，才会被提取成新的chunk
      maxAsyncRequests: 7, 
      maxInitialRequests: 3, 
      automaticNameDelimiter: "~", //代码块命名分割符
      name: (module, chunks) => `chunk-${chunks.map(c => c.name).join('~')}`, // 自定义名称规则
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/, //匹配node_modules中的模块
          priority: -10, 
        },
        default: {
          minChunks: 2, //覆盖外层的全局属性
          priority: -20,
          reuseExistingChunk: true, //是否复用已经从原代码块中分割出来的模块
        },
      },
    },
    runtimeChunk: {
      //由于代码分割可能会导致缓存失效
      name: entrypoint => `runtime~${entrypoint.name}.js`
    },
    // runtimeChunk: 'single', // 分离Webpack运行时代码
    minimize: isProduction, //控制是否进行压缩
    minimizer: [
      new CssMinimizerWebpackPlugin(), //css 压缩,
      new TerserWebpackPlugin(
        {
          minify: TerserWebpackPlugin.esbuildMinify
        }
        //js压缩
      )
    ]
  },
  resolve: {
    //自动补全文件扩展名
    extensions: [".js", ".jsx", ".json"]
  },
  cache: {
    type:"filesystem",
    allowCollectingMemory: true,
  },
  performance: false //关闭性能分析,提升打包速度
};

