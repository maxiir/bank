const { render } = require("ejs");
const { json } = require("express/lib/response");
const { token } = require("morgan");


const controller = {};

controller.index = (req,res) =>{
    res.render('index')
};

controller.home = (req,res) =>{
    req.getConnection((err,conn) =>{
        conn.query('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = movimientos.id_users AND users.passwd = "'+data_log.log_pass+'" ',(err,row)=>{//query con valores a pasar de cuenta,cbu, saldo y usuario
                            
            console.log(row)
            res.render('home',{row});
        })    
    })
};

controller.registro = (req,res) =>{
    res.render('registro')
};

controller.ingresar = (req,res) =>{
    res.render('ingresar')
}

controller.about_reg = (req,res) =>{
    res.render('about_reg')
}

controller.about = (req,res) =>{
    res.render('about')
}

controller.logout = (req,res) =>{
    res.render('logout')
}

controller.login = (req,res) =>{
    data_log = req.body; //modifico valor de la var global para usarla en funciones
    
    if (data_log.log_email != "" & data_log.log_pass != ""){
        req.getConnection((err,conn)=>{
            conn.query('SELECT id_users FROM users WHERE email = "'+data_log.log_email+'" AND passwd = "'+data_log.log_pass+'" AND validad= "SI" ',(err,row)=>{
                const result = row
                if (result == 0){
                    res.render('err_ingresar');
                }
                else {
                    conn.query('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = movimientos.id_users AND users.passwd = "'+data_log.log_pass+'" ',(err,row)=>{
                        
                        console.log(row)
                        res.render('home',{row});
                    })
                }

            })
        })
    }
    
    else {
        res.render('err_ingresar')
    }
}

//crea token y guarda cuenta sin validar
controller.createToken=(req,res)=>{

    const data = req.body;
    
    function ids(longitud){
        
        var result ='';
        var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var logCaracteres = caracteres.length;
        for (var i = 0; i< longitud; i++){
            result += caracteres.charAt(Math.floor(Math.random() * logCaracteres));
        }
        return result;
        
    }
    let idUser = '' //guardo en una variable el id para luego insertar en dos tablas el mismo
    idUser = ids(5)

    function token(longitud){ //genera un token de hasta 9 digitos, al igual que un cbu de 9 digitos
        var result ='';
        var caracteres = '0123456789';
        var logCaracteres = caracteres.length;
        for (var i = 0; i< longitud; i++){
            result += caracteres.charAt(Math.floor(Math.random() * logCaracteres));
        }
        return result;
    }
    req.getConnection((err,conn)=>{
        conn.query('INSERT INTO tokens VALUES ("'+ids(5)+'","'+idUser+'","'+token(5)+'")')
        console.log('guardado exitosamente en DDBB!')
        
    })
    

    if (data.user != "" & data.mail != "" & data.password != "" & data.repassword != "" & data.password == data.repassword){
        
        req.getConnection((err,conn)=>{
            
            conn.query('INSERT INTO USERS VALUES ("'+idUser+'","'+data.user+'","'+data.mail+'","'+data.password+'","'+data.repassword+'","'+token(9)+'","NO")')
            conn.query('INSERT INTO movimientos VALUES("'+idUser+'",0,0,0,0,CURRENT_TIMESTAMP)')
        })
    
        res.render('email');
    }
    else {
        res.send('[ERROR] revise passwords o complete todos los campos del formulario por favor');
    }

 }


 //validar la cuenta mediante token
 controller.validacion = (req,res) =>{ 
     const tokenCode = req.body; //capturo lo del input
     
     req.getConnection((err,conn) =>{
         if (tokenCode.token != ""){
             conn.query('SELECT * from users INNER JOIN tokens WHERE tokens.token = "'+tokenCode.token+'" AND users.id_users = tokens.id_users  ' ,(err,row)=>{ //para que valide solo con el mismo toquen del id_users
                const result =row
                if (result == 0) { //si no esta en la DDBB
                    console.log ('--token incorrecto--');
                    res.render ('err_token');
                }
                else {
                    conn.query ('UPDATE users JOIN tokens SET users.validad = "SI" WHERE users.id_users="'+result[0].id_users+'" ') //utiliza el id encontrado en la otra consulta para actualizar la validacion a SI
                    
                    console.log ('--cuenta validada!--');
                    res.render ('validad_ingresar');
                } 
                
            });
         }
         else {
             console.log ("--ingrese el token--")
             res.render ('err_token');
         }

    });
};

//selecciona valores a pasar de cuenta,cbu, saldo y usuario     
controller.add_mony =(req,res) =>{
    const{id} = req.params;
    
    req.getConnection ((err,conn) =>{
        conn.query ('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = ? AND movimientos.id_users = ?',[id,id],(err,row)=>{          
            console.log (row)
            res.render ('add_mony',{row});
        })  
    })
}

//agregar nuevo saldo a la cuenta y actualizar
controller.update_mony = (req,res) =>{
    const{id} = req.params; //rescata siempre el id de cada usuario de la variable
    const mony = req.body
    
    req.getConnection((err,conn)=>{
           
        conn.query('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = ? AND movimientos.id_users = ?',[id,id],(err,row)=>{

            if (parseInt(mony.new_saldo) > 0){

                const result = row[0].SALDO_CUENTA + parseInt(mony.new_saldo)
                conn.query('UPDATE movimientos SET SALDO_CUENTA = "'+result+'" WHERE id_users = ?', [id])
                conn.query('INSERT INTO movimientos VALUES (?,"'+result+'","'+mony.new_saldo+'",0,0,CURRENT_TIMESTAMP)', [id]) 
                conn.query('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = ? AND movimientos.id_users = ?',[id,id],(err,row)=>{
    
                    res.render('add_mony',{row});
                })        
            }
            else {
                res.send('no se puede ingresar dinero')
            }
        })
    })
}
//muestra en la view retirar los datos del usuario
controller.retirar_mony = (req,res)=>{
    const {id} = req.params;
    req.getConnection((err,conn) =>{
        conn.query('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = ? AND movimientos.id_users = ?',[id,id],(err,row)=>{//query con valores a pasar de cuenta,cbu, saldo y usuario
            res.render('retirar_mony',{row});
        })  
    })
}
//boton retirar ---> resta y actualiza el monto de la cuenta
controller.restar_mony = (req,res) =>{
    const {id} = req.params;
    const mony = req.body
    
    req.getConnection((err,conn)=>{

        
        conn.query('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = ? AND movimientos.id_users = ?',[id,id],(err,row)=>{
            
            if (mony.mony_retirar <= row[0].SALDO_CUENTA && mony.mony_retirar > 0 ){

                const result = row[0].SALDO_CUENTA - parseInt(mony.mony_retirar)
                conn.query('UPDATE movimientos SET SALDO_CUENTA = "'+result+'" WHERE id_users = ?',[id])
                conn.query('INSERT INTO movimientos VALUES (?,"'+result+'",0,"'+mony.mony_retirar+'",0,CURRENT_TIMESTAMP)', [id]) //query actualiza transferido para ver el monto de la ultima transferencia
                conn.query('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = ? AND movimientos.id_users = ?',[id,id],(err,row)=>{//otra manera de llegar a lo mismo: conn.query('SELECT * FROM users INNER JOIN dinero WHERE users.id_users = dinero.id_users AND users.passwd = "'+data_log.log_pass+'" ', (err,row)=>{
                res.render('retirar_mony',{row});
            })
        }

        else if (mony.mony_retirar > row[0].SALDO_CUENTA | mony.mony_retirar <= 0){
            res.send('no se puede retirar dinero')
        }

        })
    })
}

controller.historial_account = (req,res)=>{
    const {id} = req.params;
    req.getConnection((err,conn) =>{

        conn.query('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = ? AND movimientos.id_users = ?',[id,id],(err,row)=>{
            res.render('historial_account',{row})     
        })
    })

}

controller.transfer_mony=(req,res) =>{
    const {id} = req.params;
    req.getConnection((err,conn) =>{
        conn.query('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = ? AND movimientos.id_users = ?',[id,id],(err,row)=>{
            res.render('transfer_mony',{row})     
        })
    })
}

controller.button_transferir=(req,res)=>{
    const {id} = req.params;
    const transferencia = req.body;
    
    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM users WHERE CBU = "'+transferencia.cbu_transferencia+'" ' ,(err,result)=>{

            if(result!=0){
                
                 if ( transferencia.cbu_transferencia == result[0].CBU & transferencia.name_transferencia == result[0].name_user & transferencia.monto_transferencia > 0 ){ //ver para q valores nulos no arrojen error
                     
                     conn.query('SELECT * FROM movimientos WHERE id_users = ?', [id],(err,row)=>{ //obtiene todos los movimientos de un id
                         
                         if (transferencia.monto_transferencia > 0 & transferencia.monto_transferencia <= row[0].SALDO_CUENTA ){
                             const monto_finaltrans = row[0].SALDO_CUENTA - transferencia.monto_transferencia;

                             conn.query('UPDATE movimientos SET SALDO_CUENTA = "'+monto_finaltrans+'" WHERE id_users = ?',[id])
                             conn.query('INSERT INTO movimientos VALUES(?,"'+monto_finaltrans+'",0,0,"'+transferencia.monto_transferencia+'",CURRENT_TIMESTAMP)', [id])

                             conn.query('SELECT * FROM users WHERE CBU = "'+transferencia.cbu_transferencia+'" ', (err,result)=>{ //encuentra saldo de cuenta del usuario a transferir
                                conn.query('SELECT * FROM movimientos WHERE id_users = "'+result[0].id_users+'" ',(err,result)=>{
                                    
                                    const suma_cuentaTransferida = result[0].SALDO_CUENTA + parseInt(transferencia.monto_transferencia)
                                    console.log(suma_cuentaTransferida,'suma de la transferencia a lola')
                                    conn.query('UPDATE movimientos SET SALDO_CUENTA = "'+suma_cuentaTransferida+'" WHERE id_users = "'+result[0].id_users+'" ')//se actualiza la cuenta a la q se transfirio dinero
                                    conn.query('INSERT INTO movimientos VALUES("'+result[0].id_users+'","'+suma_cuentaTransferida+'","'+transferencia.monto_transferencia+'",0,0,CURRENT_TIMESTAMP)') //MUESTRA EN EL HISTORIAL LO NUEVO Q INGRESO DE LA TRANSFERENCIA
                                    conn.query('SELECT * FROM users INNER JOIN movimientos WHERE users.id_users = ? AND movimientos.id_users = ?',[id,id],(err,row)=>{ //muestra todos los datos en la view actualizados
                                       res.render('transfer_mony',{row})
                                    })
                                 })
                             })
                         }
                         
                         else {
                             res.send('no se puede transferir dinero');
                         }
                         
                         
                     })
                 }
                 
                 else {
                     res.send('[ERROR]datos incompletos o incorrectos para la transferencia')
                 }
                

            }
            else{
                res.send('ERROR CBU INCORRECTO')
            }
            

        })
    })
}


///falta---->
//falta enviar por mail token

module.exports = controller;