const db = require('../database/data');
class demandeur_emploi{

    static ajouter(nom, postnom, prenom, sexe, etat_civil, date_naissance, age, niveau_etude, description, nationalite, adresse, email, telephone, cb){
        db.query('INSERT INTO demandeur_emploi SET Nom=?,Postnom=?,Prenom=?,Sexe=?,Etat_civil=?,Date_naissance=?,Age=?,Niveau_etude=?,Description=?,Nationalite=?,Adresse=?,E_mail=?,Telephone=?',
        [nom, postnom, prenom, sexe, etat_civil, date_naissance, age, niveau_etude, description, nationalite, adresse, email, telephone],(error,result)=>{
            if(error) throw error
            cb(result)
        })
    }

    static modifier(nom, postnom, prenom, sexe, etat_civil, date_naissance, age, niveau_etude, description, nationalite, adresse, email, telephone, cb){
        db.query(`UPDATE demandeur_emploi SET NumeroMatricule=?,Nom=?,Postnom=?,Prenom=?,Sexe=?,Etat_civil=?,Date_naissance=?,Age=?,Niveau_etude=?,Description=?,Nationalite=?,Adresse=?,E_mail=?,Telephone=? WHERE NumeroMatricule=?`,
        [nom, postnom, prenom, sexe, etat_civil, date_naissance, age, niveau_etude, description, nationalite, adresse, email, telephone], (error, result)=>{
            if(error) throw error
            cb(result)
        })
    }

    static afficher(cb){
        db.query('SELECT E_mail and Telephone FROM demandeur_emploi WHERE E_mail =?, Telephone=?', [email, telephone], async(error, results)=>{
            console.log(results)
            cb (results)
        }) 
    }

}

module.exports = demandeur_emploi; 