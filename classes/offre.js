const db = require('../database/data');
class offre{

    static ajoute(date, date_liimite, description, cb){
        db.query('INSERT INTO offre SET Date=?,Date_liimite=?,Description=?',
        [date, date_liimite, description],(error,result)=>{
            if(error) throw error
            cb(result)
        })
    }   
}

module.exports = offre;
