const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const isProduction = process.env.NODE_ENV === "production";
//返回处理样式loader的函数
const getStyleLoaders = (pre) => {
  return [
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",//将css打包成单独文件
    "css-loader",
    pre
  ].filter(Boolean)//把数字中的undefined值过滤掉
}

module.exports = { 
  entry: "./src/index.js",//入口,指定一个入口文件，作为webpack的打包入口，从这个文件卡萨构建整个项目
  output: { //输出文件的文件名
    path: isProduction ? path.resolve(__dirname, "../dist") : undefined,//输出目录
    filename: isProduction ? "static/js/[name].[contenthash:10].js" : "static/js/[name].js",//输出的文件名 [name]为chunk打包的名称自动补全(??决定的是入口文件的打包目录??)
    chunkFilename: isProduction ? "static/js/[name].[contenthash:10].chunk.js" : "static/js/[name].chunk.js",//import()动态导入,打包node_modlues等,的chunk 命名
    assetModuleFilename: "static/media/[hash:10][ext][query]",//图片等资源,10位哈希,扩展名自动补全,其他参数
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf:[
           //处理css,打包css文件，通过动态创建script标签插入到页面上，
      {
        test: /\.css$/,//正则,以.css结尾的文件
        use: getStyleLoaders(undefined),
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
      //处理js
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "../src"),
        loader: "babel-loader",
        options: {
          cacheDirectory: true,//开启缓存,第二次打包更快
          cacheCompression: false,//缓存内容不压缩,加快打包速度
          plugins: [
            !isProduction && "react-refresh/babel", //激活js的HMR
            "@babel/plugin-transform-runtime"
          ].filter(Boolean),          
        },
      }
        ]
      }
    ]
  },
  
  plugins: [
    // new PreloadWebpackPlugin({
    //   rel: 'preload', // 也可以使用 'prefetch'
    //   // as: 'script', // 根据资源类型指定
    //   include: 'allChunks', // 指定哪些 chunk 需要预加载
    //   // 其他配置...
    // }),
    // new EslintWebpackPlugin({    //可以视情况开启多进程打包
    //   context: path.resolve(__dirname, '../src'),//处理的文件范围
    //   exclude: "node_modules",//排除掉node_modules
    //   cache: true,//开启缓存,第二次打包更快
    //   cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache'),//存储缓存的位置
    // }),
  //   new CompressionPlugin({ //此插件不能使用太高的版本，否则报错：TypeError: Cannot read property 'tapPromise' of undefined
  //     filename: "[path][base].gz", // 这种方式是默认的，多个文件压缩就有多个.gz文件，建议使用下方的写法
  //     // filename: "[path].gz[query]", //  使得多个.gz文件合并成一个文件，这种方式压缩后的文件少，建议使用
  //     algorithm: 'gzip', // 官方默认压缩算法也是gzip
  //     test: /\.js$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/, // 使用正则给匹配到的文件做压缩，这里是给html、css、js以及字体（.ttf和.woff和.eot）做压缩
  //     threshold: 10240, //以字节为单位压缩超过此大小的文件，使用默认值10240吧
  //     minRatio: 0.8, // 最小压缩比率，官方默认0.8
  //     //是否删除原有静态资源文件，即只保留压缩后的.gz文件，建议这个置为false，还保留源文件。以防：
  //     // 假如出现访问.gz文件访问不到的时候，还可以访问源文件双重保障
  //     deleteOriginalAssets: true
  // }),
    isProduction && new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css"
    }),
    new HtmlWebpackPlugin({
      //以template为模板创建新html文件
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    isProduction && new CopyPlugin({ //复制图标文件
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          globOptions: {
            //忽略index.html文件
            ignore: ["**/index.html"],
          }
      }],
    }),
    !isProduction && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  mode: isProduction ? "production" : "development",//生产模式
  // devtool: isProduction ? "source-map" : "cheap-module-source-map",
  optimization: { //代码分割,打包到多个chunk中,比如import()动态导入的文件等
    splitChunks: {
      chunks: "all",
      cacheGroups: {
         //react react-dom react-router-dom 一起打包成一个js文件
// antDesign: {
//   test: /[\\/]node_modules[\\/]@ant-design[\\/]/,
//   name: "chunk-ant-design",
//   priority: 130,
// },
immutable: {
  test: /[\\/]node_modules[\\/]immutable[\\/]/,
  name: "chunk-immutable",
  priority: 120,
},
antdTable: {
  test: /[\\/]node_modules[\\/]antd[\\/]es[\\/]table[\\/]/,
  name: "chunk-antdTable",
  priority: 110,
},
react: {
  test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
  name: "chunk-react",
  priority: 90,
},
reactDraftWysiwyg: {
  test: /[\\/]node_modules[\\/]react-draft-wysiwyg[\\/]/,
  name: "chunk-react-draft-wysiwyg",
  priority: 100,
},
// redux: {
//   test: /[\\/]node_modules[\\/]redux(.*)?[\\/]/,
//   name: "chunk-redux",
//   priority: 80,
// },
zrender: {
  test: /[\\/]node_modules[\\/]zrender[\\/]/,
  name: "chunk-zrender",
  priority: 70,
},
echarts: {
  test: /[\\/]node_modules[\\/]echarts[\\/]/,
  name: "chunk-echarts",
  priority: 60,
},
// loadsh: {
//   test: /[\\/]node_modules[\\/]loadsh[\\/]/,
//   name: "chunk-lodash",
//   priority: 50,
// },
draft: {
  test: /[\\/]node_modules[\\/]draft-js[\\/]/,
  name: "chunk-draft-js",
  priority: 40,
},
//antd 单独打包
antd: {
  test: /[\\/]node_modules[\\/]antd[\\/]/,
  name: "chunk-antd",
  priority: 30,
},
//axios单独打包
// axios: {
//   test: /[\\/]node_modules[\\/]axios[\\/]/,
//   name: "chunk-axios",
//   priority: 20,
// },
//剩下的node_modules单独打包
libs: {
  test: /[\\/]node_modules[\\/]/,
  name: "chunk-libs",
  priority: 10,
},
      },
    },
    runtimeChunk: { //由于代码分割可能会导致缓存失效
      name: (entrypoint) => `runtime~${entrypoint.name}.js`,
    },
    minimize: isProduction,//控制是否进行压缩
    minimizer: [
      new CssMinimizerWebpackPlugin(),//css 压缩,
      new TerserWebpackPlugin( 
          {
            minify: TerserWebpackPlugin.esbuildMinify,
          }
      //js压缩
        ,
      ),      
    ]
  },
  //webpack解析模块加载选项
  resolve: {
    //自动补全文件扩展名
    extensions: [".js", ".jsx", ".json"],
  },
  
  performance: false,//关闭性能分析,提升打包速度
};
