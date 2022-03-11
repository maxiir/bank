const express = require('express');
const { route } = require('express/lib/application');
const {index} = require ('../controllers/index.controlles');
const router = express.Router();

const indexcontroller = require('../controllers/index.controlles');

router.get('/', indexcontroller.index); /*salis de todo*/ 
router.get('/ingresar/home', indexcontroller.home); /*home de la app ya loggeado*/
router.get('/registro', indexcontroller.registro);
router.get('/ingresar', indexcontroller.ingresar);// pestaña para loggearse
router.get('/about',indexcontroller.about_reg);
router.get('/home/about',indexcontroller.about);
router.get('/ingresar/home/logout',indexcontroller.logout);
router.get('/ingresar/login/add_mony/:id' ,indexcontroller.add_mony);
router.get('/ingresar/login/retirar_mony/:id' ,indexcontroller.retirar_mony); //es la view
router.get('/ingresar/login/transfer_mony/:id' ,indexcontroller.transfer_mony);
router.get('/ingresar/login/historial_account/:id' ,indexcontroller.historial_account);


router.post('/token', indexcontroller.createToken);
router.post('/validar', indexcontroller.validacion);
router.post('/ingresar/login', indexcontroller.login);
router.post('/ingresar/login/add_mony/update_mony/:id' ,indexcontroller.update_mony); //:id es para q capture la variable antes declarada
router.post('/ingresar/login/retirar_mony/:id',indexcontroller.restar_mony) //es el proceso de restado
router.post('/ingresar/login/transfer_mony/:id' ,indexcontroller.button_transferir);



module.exports = router;