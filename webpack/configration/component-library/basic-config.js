const path = require('path');
const glob = require('glob');
const theme = require('iglootheme');

// 动态生成entry配置，保持源码目录结构
function generateEntries() {
  const entries = {};
  
  // 获取所有源文件（包括JS和TS）
  const files = glob.sync('./src/**/*.{js,jsx,ts,tsx}', {
    ignore: [
      './src/**/*.test.{js,jsx,ts,tsx}',
      './src/**/*.stories.{js,jsx,ts,tsx}',
      './src/**/*.d.ts'
    ]
  });
  
  files.forEach(file => {
    // 计算相对路径作为entry key
    const relativePath = path.relative('./src', file);
    const key = relativePath.replace(/\.(js|jsx|ts|tsx)$/, '');
    entries[key] = file;
  });
  
  return entries;
}

// 组件库bundless构建配置
module.exports = {
  mode: 'development',
  entry: generateEntries(),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    library: {
      type: 'commonjs2',
    },
    clean: true, // 清理输出目录
  },
  // 排除peer dependencies，避免打包进bundle
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    'antd': 'antd',
    'dayjs': 'dayjs',
    'lodash.debounce': 'lodash.debounce',
    'classnames': 'classnames',
    'omit.js': 'omit.js',
    'invariant': 'invariant',
    'react-pdf': 'react-pdf',
    '@microblink/blinkid-in-browser-sdk': '@microblink/blinkid-in-browser-sdk',
    '@umijs/hooks': '@umijs/hooks',
    'iglooicon': 'iglooicon',
    'iglootheme': 'iglootheme'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      iglooform: path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }],
              ['@babel/preset-react', { runtime: 'automatic' }]
            ]
          }
        }
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            compilerOptions: {
              module: 'commonjs'
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                  ...theme.default,
                },
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: '[path][name][ext]'
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: '[path][name][ext]'
        }
      },
      {
        test: /\.json$/,
        type: 'asset/resource',
        generator: {
          filename: '[path][name][ext]'
        }
      }
    ],
  },
  optimization: {
    splitChunks: false, // 禁用代码分割，保持文件独立
  },
};
