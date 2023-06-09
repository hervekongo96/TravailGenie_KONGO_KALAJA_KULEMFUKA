const cnx = require('../database/data');

class offre {

    static affiche(cb){
        cnx.query('SELECT * FROM offre', (error, result)=>{
            if(error) throw error
            cb (result)
        })
    }
  

}

module.exports = offre


