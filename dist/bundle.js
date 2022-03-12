/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/views/partials/_main.ejs":
/*!**************************************!*\
  !*** ./src/views/partials/_main.ejs ***!
  \**************************************/
/***/ (() => {

eval("throw new Error(\"Module build failed (from ./node_modules/ejs-loader/index.js):\\nError: \\n      To support the 'esModule' option, the 'variable' option must be passed to avoid 'with' statements\\n      in the compiled template to be strict mode compatible. Please see https://github.com/lodash/lodash/issues/3709#issuecomment-375898111.\\n      To enable CommonJS, please set the 'esModule' option to false.\\n    \\n    at Object.module.exports (C:\\\\Users\\\\maxir\\\\OneDrive\\\\Escritorio\\\\programacion\\\\mis_sitiosWEB\\\\bank\\\\node_modules\\\\ejs-loader\\\\index.js:12:11)\");\n\n//# sourceURL=webpack://cajero/./src/views/partials/_main.ejs?");

/***/ }),

/***/ "./src/controllers/index.controlles.js":
/*!*********************************************!*\
  !*** ./src/controllers/index.controlles.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { render } = __webpack_require__(/*! ejs */ \"ejs\");\r\nconst { json } = __webpack_require__(/*! express/lib/response */ \"express/lib/response\");\r\nconst { token } = __webpack_require__(/*! morgan */ \"morgan\");\r\n\r\n\r\nconst controller = {};\r\n\r\ncontroller.index = (req,res) =>{\r\n    res.render('index')\r\n};\r\n\r\ncontroller.home = (req,res) =>{\r\n    req.getConnection((err,conn) =>{\r\n        conn.query('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = movimientos.id_users AND users.passwd = \"'+data_log.log_pass+'\" ',(err,row)=>{//query con valores a pasar de cuenta,cbu, saldo y usuario\r\n                            \r\n            console.log(row)\r\n            res.render('home',{row});\r\n        })    \r\n    })\r\n};\r\n\r\ncontroller.registro = (req,res) =>{\r\n    res.render('registro')\r\n};\r\n\r\ncontroller.ingresar = (req,res) =>{\r\n    res.render('ingresar')\r\n}\r\n\r\ncontroller.about_reg = (req,res) =>{\r\n    res.render('about_reg')\r\n}\r\n\r\ncontroller.about = (req,res) =>{\r\n    res.render('about')\r\n}\r\n\r\ncontroller.logout = (req,res) =>{\r\n    res.render('logout')\r\n}\r\n\r\ncontroller.login = (req,res) =>{\r\n    data_log = req.body; //modifico valor de la var global para usarla en funciones\r\n    \r\n    if (data_log.log_email != \"\" & data_log.log_pass != \"\"){\r\n        req.getConnection((err,conn)=>{\r\n            conn.query('SELECT id_users FROM users WHERE email = \"'+data_log.log_email+'\" AND passwd = \"'+data_log.log_pass+'\" AND validad= \"SI\" ',(err,row)=>{\r\n                const result = row\r\n                if (result == 0){\r\n                    res.render('err_ingresar');\r\n                }\r\n                else {\r\n                    conn.query('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = movimientos.id_users AND users.passwd = \"'+data_log.log_pass+'\" ',(err,row)=>{\r\n                        \r\n                        console.log(row)\r\n                        res.render('home',{row});\r\n                    })\r\n                }\r\n\r\n            })\r\n        })\r\n    }\r\n    \r\n    else {\r\n        res.render('err_ingresar')\r\n    }\r\n}\r\n\r\n//crea token y guarda cuenta sin validar\r\ncontroller.createToken=(req,res)=>{\r\n\r\n    const data = req.body;\r\n    \r\n    function ids(longitud){\r\n        \r\n        var result ='';\r\n        var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';\r\n        var logCaracteres = caracteres.length;\r\n        for (var i = 0; i< longitud; i++){\r\n            result += caracteres.charAt(Math.floor(Math.random() * logCaracteres));\r\n        }\r\n        return result;\r\n        \r\n    }\r\n    let idUser = '' //guardo en una variable el id para luego insertar en dos tablas el mismo\r\n    idUser = ids(5)\r\n\r\n    function token(longitud){ //genera un token de hasta 9 digitos, al igual que un cbu de 9 digitos\r\n        var result ='';\r\n        var caracteres = '0123456789';\r\n        var logCaracteres = caracteres.length;\r\n        for (var i = 0; i< longitud; i++){\r\n            result += caracteres.charAt(Math.floor(Math.random() * logCaracteres));\r\n        }\r\n        return result;\r\n    }\r\n    req.getConnection((err,conn)=>{\r\n        conn.query('INSERT INTO tokens VALUES (\"'+ids(5)+'\",\"'+idUser+'\",\"'+token(5)+'\")')\r\n        console.log('guardado exitosamente en DDBB!')\r\n        \r\n    })\r\n    \r\n\r\n    if (data.user != \"\" & data.mail != \"\" & data.password != \"\" & data.repassword != \"\" & data.password == data.repassword){\r\n        \r\n        req.getConnection((err,conn)=>{\r\n            \r\n            conn.query('INSERT INTO USERS VALUES (\"'+idUser+'\",\"'+data.user+'\",\"'+data.mail+'\",\"'+data.password+'\",\"'+data.repassword+'\",\"'+token(9)+'\",\"NO\")')\r\n            conn.query('INSERT INTO movimientos VALUES(\"'+idUser+'\",0,0,0,0,CURRENT_TIMESTAMP)')\r\n        })\r\n    \r\n        res.render('email');\r\n    }\r\n    else {\r\n        res.send('[ERROR] revise passwords o complete todos los campos del formulario por favor');\r\n    }\r\n\r\n }\r\n\r\n\r\n //validar la cuenta mediante token\r\n controller.validacion = (req,res) =>{ \r\n     const tokenCode = req.body; //capturo lo del input\r\n     \r\n     req.getConnection((err,conn) =>{\r\n         if (tokenCode.token != \"\"){\r\n             conn.query('SELECT * from users INNER JOIN tokens WHERE tokens.token = \"'+tokenCode.token+'\" AND users.id_users = tokens.id_users  ' ,(err,row)=>{ //para que valide solo con el mismo toquen del id_users\r\n                const result =row\r\n                if (result == 0) { //si no esta en la DDBB\r\n                    console.log ('--token incorrecto--');\r\n                    res.render ('err_token');\r\n                }\r\n                else {\r\n                    conn.query ('UPDATE users JOIN tokens SET users.validad = \"SI\" WHERE users.id_users=\"'+result[0].id_users+'\" ') //utiliza el id encontrado en la otra consulta para actualizar la validacion a SI\r\n                    \r\n                    console.log ('--cuenta validada!--');\r\n                    res.render ('validad_ingresar');\r\n                } \r\n                \r\n            });\r\n         }\r\n         else {\r\n             console.log (\"--ingrese el token--\")\r\n             res.render ('err_token');\r\n         }\r\n\r\n    });\r\n};\r\n\r\n//selecciona valores a pasar de cuenta,cbu, saldo y usuario     \r\ncontroller.add_mony =(req,res) =>{\r\n    const{id} = req.params;\r\n    \r\n    req.getConnection ((err,conn) =>{\r\n        conn.query ('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = ? AND movimientos.id_users = ?',[id,id],(err,row)=>{          \r\n            console.log (row)\r\n            res.render ('add_mony',{row});\r\n        })  \r\n    })\r\n}\r\n\r\n//agregar nuevo saldo a la cuenta y actualizar\r\ncontroller.update_mony = (req,res) =>{\r\n    const{id} = req.params; //rescata siempre el id de cada usuario de la variable\r\n    const mony = req.body\r\n    \r\n    req.getConnection((err,conn)=>{\r\n           \r\n        conn.query('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = ? AND movimientos.id_users = ?',[id,id],(err,row)=>{\r\n\r\n            if (parseInt(mony.new_saldo) > 0){\r\n\r\n                const result = row[0].SALDO_CUENTA + parseInt(mony.new_saldo)\r\n                conn.query('UPDATE movimientos SET SALDO_CUENTA = \"'+result+'\" WHERE id_users = ?', [id])\r\n                conn.query('INSERT INTO movimientos VALUES (?,\"'+result+'\",\"'+mony.new_saldo+'\",0,0,CURRENT_TIMESTAMP)', [id]) \r\n                conn.query('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = ? AND movimientos.id_users = ?',[id,id],(err,row)=>{\r\n    \r\n                    res.render('add_mony',{row});\r\n                })        \r\n            }\r\n            else {\r\n                res.send('no se puede ingresar dinero')\r\n            }\r\n        })\r\n    })\r\n}\r\n//muestra en la view retirar los datos del usuario\r\ncontroller.retirar_mony = (req,res)=>{\r\n    const {id} = req.params;\r\n    req.getConnection((err,conn) =>{\r\n        conn.query('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = ? AND movimientos.id_users = ?',[id,id],(err,row)=>{//query con valores a pasar de cuenta,cbu, saldo y usuario\r\n            res.render('retirar_mony',{row});\r\n        })  \r\n    })\r\n}\r\n//boton retirar ---> resta y actualiza el monto de la cuenta\r\ncontroller.restar_mony = (req,res) =>{\r\n    const {id} = req.params;\r\n    const mony = req.body\r\n    \r\n    req.getConnection((err,conn)=>{\r\n\r\n        \r\n        conn.query('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = ? AND movimientos.id_users = ?',[id,id],(err,row)=>{\r\n            \r\n            if (mony.mony_retirar <= row[0].SALDO_CUENTA && mony.mony_retirar > 0 ){\r\n\r\n                const result = row[0].SALDO_CUENTA - parseInt(mony.mony_retirar)\r\n                conn.query('UPDATE movimientos SET SALDO_CUENTA = \"'+result+'\" WHERE id_users = ?',[id])\r\n                conn.query('INSERT INTO movimientos VALUES (?,\"'+result+'\",0,\"'+mony.mony_retirar+'\",0,CURRENT_TIMESTAMP)', [id]) //query actualiza transferido para ver el monto de la ultima transferencia\r\n                conn.query('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = ? AND movimientos.id_users = ?',[id,id],(err,row)=>{//otra manera de llegar a lo mismo: conn.query('SELECT * FROM users INNER JOIN dinero WHERE users.id_users = dinero.id_users AND users.passwd = \"'+data_log.log_pass+'\" ', (err,row)=>{\r\n                res.render('retirar_mony',{row});\r\n            })\r\n        }\r\n\r\n        else if (mony.mony_retirar > row[0].SALDO_CUENTA | mony.mony_retirar <= 0){\r\n            res.send('no se puede retirar dinero')\r\n        }\r\n\r\n        })\r\n    })\r\n}\r\n\r\ncontroller.historial_account = (req,res)=>{\r\n    const {id} = req.params;\r\n    req.getConnection((err,conn) =>{\r\n\r\n        conn.query('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = ? AND movimientos.id_users = ?',[id,id],(err,row)=>{\r\n            res.render('historial_account',{row})     \r\n        })\r\n    })\r\n\r\n}\r\n\r\ncontroller.transfer_mony=(req,res) =>{\r\n    const {id} = req.params;\r\n    req.getConnection((err,conn) =>{\r\n        conn.query('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = ? AND movimientos.id_users = ?',[id,id],(err,row)=>{\r\n            res.render('transfer_mony',{row})     \r\n        })\r\n    })\r\n}\r\n\r\ncontroller.button_transferir=(req,res)=>{\r\n    const {id} = req.params;\r\n    const transferencia = req.body;\r\n    \r\n    req.getConnection((err,conn)=>{\r\n        conn.query('SELECT * FROM users WHERE CBU = \"'+transferencia.cbu_transferencia+'\" ' ,(err,result)=>{\r\n\r\n            if(result!=0){\r\n                \r\n                 if ( transferencia.cbu_transferencia == result[0].CBU & transferencia.name_transferencia == result[0].name_user & transferencia.monto_transferencia > 0 ){ //ver para q valores nulos no arrojen error\r\n                     \r\n                     conn.query('SELECT * FROM movimientos WHERE id_users = ?', [id],(err,row)=>{ //obtiene todos los movimientos de un id\r\n                         \r\n                         if (transferencia.monto_transferencia > 0 & transferencia.monto_transferencia <= row[0].SALDO_CUENTA ){\r\n                             const monto_finaltrans = row[0].SALDO_CUENTA - transferencia.monto_transferencia;\r\n\r\n                             conn.query('UPDATE movimientos SET SALDO_CUENTA = \"'+monto_finaltrans+'\" WHERE id_users = ?',[id])\r\n                             conn.query('INSERT INTO movimientos VALUES(?,\"'+monto_finaltrans+'\",0,0,\"'+transferencia.monto_transferencia+'\",CURRENT_TIMESTAMP)', [id])\r\n\r\n                             conn.query('SELECT * FROM users WHERE CBU = \"'+transferencia.cbu_transferencia+'\" ', (err,result)=>{ //encuentra saldo de cuenta del usuario a transferir\r\n                                conn.query('SELECT * FROM movimientos WHERE id_users = \"'+result[0].id_users+'\" ',(err,result)=>{\r\n                                    \r\n                                    const suma_cuentaTransferida = result[0].SALDO_CUENTA + parseInt(transferencia.monto_transferencia)\r\n                                    console.log(suma_cuentaTransferida,'suma de la transferencia a lola')\r\n                                    conn.query('UPDATE movimientos SET SALDO_CUENTA = \"'+suma_cuentaTransferida+'\" WHERE id_users = \"'+result[0].id_users+'\" ')//se actualiza la cuenta a la q se transfirio dinero\r\n                                    conn.query('INSERT INTO movimientos VALUES(\"'+result[0].id_users+'\",\"'+suma_cuentaTransferida+'\",\"'+transferencia.monto_transferencia+'\",0,0,CURRENT_TIMESTAMP)') //MUESTRA EN EL HISTORIAL LO NUEVO Q INGRESO DE LA TRANSFERENCIA\r\n                                    conn.query('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = ? AND movimientos.id_users = ?',[id,id],(err,row)=>{ //muestra todos los datos en la view actualizados\r\n                                       res.render('transfer_mony',{row})\r\n                                    })\r\n                                 })\r\n                             })\r\n                         }\r\n                         \r\n                         else {\r\n                             res.send('no se puede transferir dinero');\r\n                         }\r\n                         \r\n                         \r\n                     })\r\n                 }\r\n                 \r\n                 else {\r\n                     res.send('[ERROR]datos incompletos o incorrectos para la transferencia')\r\n                 }\r\n                \r\n\r\n            }\r\n            else{\r\n                res.send('ERROR CBU INCORRECTO')\r\n            }\r\n            \r\n\r\n        })\r\n    })\r\n}\r\n\r\n\r\n///falta---->\r\n//falta enviar por mail token\r\n\r\nmodule.exports = controller;\n\n//# sourceURL=webpack://cajero/./src/controllers/index.controlles.js?");

/***/ }),

/***/ "./src/routes/index.routes.js":
/*!************************************!*\
  !*** ./src/routes/index.routes.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\r\nconst { route } = __webpack_require__(/*! express/lib/application */ \"express/lib/application\");\r\nconst {index} = __webpack_require__ (/*! ../controllers/index.controlles */ \"./src/controllers/index.controlles.js\");\r\nconst router = express.Router();\r\n\r\nconst indexcontroller = __webpack_require__(/*! ../controllers/index.controlles */ \"./src/controllers/index.controlles.js\");\r\n\r\nrouter.get('/', indexcontroller.index); /*salis de todo*/ \r\nrouter.get('/ingresar/home', indexcontroller.home); /*home de la app ya loggeado*/\r\nrouter.get('/registro', indexcontroller.registro);\r\nrouter.get('/ingresar', indexcontroller.ingresar);// pestaña para loggearse\r\nrouter.get('/about',indexcontroller.about_reg);\r\nrouter.get('/home/about',indexcontroller.about);\r\nrouter.get('/ingresar/home/logout',indexcontroller.logout);\r\nrouter.get('/ingresar/login/add_mony/:id' ,indexcontroller.add_mony);\r\nrouter.get('/ingresar/login/retirar_mony/:id' ,indexcontroller.retirar_mony); //es la view\r\nrouter.get('/ingresar/login/transfer_mony/:id' ,indexcontroller.transfer_mony);\r\nrouter.get('/ingresar/login/historial_account/:id' ,indexcontroller.historial_account);\r\n\r\n\r\nrouter.post('/token', indexcontroller.createToken);\r\nrouter.post('/validar', indexcontroller.validacion);\r\nrouter.post('/ingresar/login', indexcontroller.login);\r\nrouter.post('/ingresar/login/add_mony/update_mony/:id' ,indexcontroller.update_mony); //:id es para q capture la variable antes declarada\r\nrouter.post('/ingresar/login/retirar_mony/:id',indexcontroller.restar_mony) //es el proceso de restado\r\nrouter.post('/ingresar/login/transfer_mony/:id' ,indexcontroller.button_transferir);\r\n\r\n\r\n\r\nmodule.exports = router;\n\n//# sourceURL=webpack://cajero/./src/routes/index.routes.js?");

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const express= __webpack_require__(/*! express */ \"express\");\r\nconst path= __webpack_require__(/*! path */ \"path\");\r\nconst morgan = __webpack_require__(/*! morgan */ \"morgan\");\r\nconst mysql = __webpack_require__ (/*! mysql */ \"mysql\");\r\nconst myconnection = __webpack_require__ (/*! express-myconnection */ \"express-myconnection\");\r\n\r\n\r\nconst app=express();\r\n\r\napp.set('port',process.env.PORT||3000)\r\napp.listen(app.get('port'), ()=>{\r\n    console.log('escuchando en puerto:',app.get('port'))\r\n});\r\n\r\n//middleware - connection mysql\r\n\r\napp.use(morgan('dev'));\r\napp.use(myconnection(mysql, {\r\n    host:'localhost',\r\n    user:'root',\r\n    password:'',\r\n    port:'3306',\r\n    database:'bank'\r\n}, 'single')) //single modulo de myconnect\r\n\r\napp.use(express.urlencoded({extended:false})); //entender los datos mandados del formulario\r\n\r\n\r\n//motor de plantilla\r\napp.set('view engine','ejs');\r\napp.set('views', path.join(__dirname,'views'));\r\n\r\n//statics files\r\napp.use(express.static(path.join(__dirname, 'public')));\r\n\r\n//import routes\r\nconst misRoutes = __webpack_require__(/*! ./routes/index.routes */ \"./src/routes/index.routes.js\");\r\n\r\n//routes\r\napp.use('/',misRoutes)\n\n//# sourceURL=webpack://cajero/./src/server.js?");

/***/ }),

/***/ "ejs":
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("ejs");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "express-myconnection":
/*!***************************************!*\
  !*** external "express-myconnection" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("express-myconnection");

/***/ }),

/***/ "express/lib/application":
/*!******************************************!*\
  !*** external "express/lib/application" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("express/lib/application");

/***/ }),

/***/ "express/lib/response":
/*!***************************************!*\
  !*** external "express/lib/response" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("express/lib/response");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("morgan");

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("mysql");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_require__("./src/server.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/views/partials/_main.ejs");
/******/ 	
/******/ })()
;