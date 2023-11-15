const EslintWebpackPlugin = require('eslint-webpack-plugin');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
//返回处理样式loader的函数
const getStyleLoaders = (pre) => {
  return [
    MiniCssExtractPlugin.loader,//将css打包成单独文件
    "css-loader",
    {
      //处理css兼容性问题 postcss-loader,还要配合package.json中的browserslist来指定兼容性
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        },
      },
    },
    pre
  ].filter(Boolean)//把数字中的undefined值过滤掉
}

module.exports = {
  entry: "./src/main.js",//入口,指定一个入口文件，作为webpack的打包入口，从这个文件卡萨构建整个项目
  output: { //输出文件的文件名
    path: path.resolve(__dirname, "../dist"),//输出目录
    filename: "static/js/[name].[contenthash:10].js",//输出的文件名 [name]为chunk打包的名称自动补全(??决定的是入口文件的打包目录??)
    chunkFilename: "static/js/[name].[contenthash:10].chunk.js",//import()动态导入,打包node_modlues等,的chunk 命名
    assetModuleFilename: "static/media/[hash:10][ext][query]",//图片等资源,10位哈希,扩展名自动补全,其他参数
    clean: true,
  },
  module: {
    rules: [
      //处理css,打包css文件，通过动态创建script标签插入到页面上，
      {
        test: /\.css$/,//正则,以.css结尾的文件
        use: getStyleLoaders(undefined),
      },
      {
        test: /\.less$/,//正则,以.less结尾的文件
        use: getStyleLoaders("less-loader"),        
      },
      {
        test: /\.s[ac]ss$/,//正则,以.sass结尾的文件
        use: getStyleLoaders("sass-loader"),    
      },
      {
        test: /\.styl$/,//正则,以.styl结尾的文件
        use: getStyleLoaders("stylus-loader")       
      },
      //处理图片
      {
        test: /\.(jpe?g|png|gif|webp|svg)$/,
        type: "asset",
        //10KB以下图片会转换成Base64,减小请求数量,体积稍微加大
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      //处理其他资源
      {
        test: /\.(woff2?|ttf)$/,
        type: "asset/resource",//asset/resource是原封不动,而asset可能会转Base64
      },
      //处理js,先通过eslint插件检查语法,再经过babel编译处理
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "../src"),
        loader: "babel-loader",
        options: {
          cacheDirectory: true,//开启缓存,第二次打包更快
          cacheCompression: false,//缓存内容不压缩,加快打包速度
        }
      }
    ]
  },
  //处理html
  plugins: [
    new EslintWebpackPlugin({    //可以视情况开启多进程打包
      context: path.resolve(__dirname, '../src'),//处理的文件范围
      exclude: "node_modules",//排除掉node_modules
      cache: true,//开启缓存,第二次打包更快
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache'),//存储缓存的位置
    }),
    new HtmlWebpackPlugin({
      //以template为模板创建新html文件
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css"
    }),
    new CopyPlugin({ //复制图标文件
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          globOptions: {
            //忽略index.html文件
            ignore: ["**/index.html"],
          }
      }],
    })
  ],
  mode: "production",//生产模式
  devtool: "source-map",
  optimization: { //代码分割,打包到多个chunk中,比如import()动态导入的文件等
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: { //由于代码分割可能会导致缓存失效
      name: (entrypoint) => `runtime~${entrypoint.name}.js`,
    },
    minimizer: [
      new CssMinimizerWebpackPlugin(),//css 压缩,
      new TerserWebpackPlugin(),      // js压缩
      new ImageMinimizerWebpackPlugin({
        minimizer: {
          implementation: ImageMinimizerWebpackPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ]
  },
  //webpack解析模块加载选项
  resolve: {
    //自动补全文件扩展名
    extensions: [".jsx", ".js", ".json"],
  },

};
