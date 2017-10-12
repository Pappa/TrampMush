const path = require('path');

module.exports = [
    {
        entry: './src/client/main.ts',
        output: {
            path: path.resolve(__dirname, 'dist-webpack/client'),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.webpack.js', '.ts', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader'
                }
            ]
        }
    }
];