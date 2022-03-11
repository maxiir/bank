const ejsWebpackPlugin = require('ejs-webpack-plugin')


module.exports = {
    entry: './src/server.js', //direccion del archivo principal a convertir
    
    output: {
        path: __dirname + '/build', //direccion donde se alojara el archivo nuevo
        filename: 'bundle.js' //es la salida del archivo creado
    },
    
    Plugins: [
        new ejsWebpackPlugin({
            template:'./src/views/partials/_main.ejs'
        })
    ]
}