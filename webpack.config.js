//const ejsWebpackPlugin = require('ejs-webpack-plugin')
const path = require('path')
const nodeExternals = require('webpack-node-externals');

    
module.exports = {
    target: 'node',
    externals: [nodeExternals()],

    entry:['./src/server.js','./src/views/partials/_main.ejs'], //direccion del archivo principal a convertir
    
    output: {
        path: path.resolve(__dirname,'dist'),
        //path: __dirname + '/dist', //direccion donde se alojara el archivo nuevo
        filename: 'bundle.js' //es la salida del archivo creado
    },
    
    module: {
        rules:[
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /target-file.js$/,    
                loader: `val-loader`
            }
        ]
        
    }
    
    /*Plugins: [
        new ejsWebpackPlugin({
            template:'./src/views/partials/_main.ejs'
        })
    ]*/
}