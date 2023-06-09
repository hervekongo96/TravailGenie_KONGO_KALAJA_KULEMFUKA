const db = require('../database/data');
class choix{

    static ajout(profil, numero, email, identites, cb){
        db.query('INSERT INTO choix SET profil=?, numero=?, email=?, identites=?',
        [profil, numero, email, identites],(error,result)=>{
            if(error) throw error
            cb(result)
        })
    }   
} 

module.exports= choix;
