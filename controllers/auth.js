const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    key: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

//se connecter demandeur
exports.login = async (req, res) =>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).render('login', {
                message: 'remplir les deux champs SVP!'
            })
        }
        db.query('SELECT * FROM users WHERE email=?', [email], async(error, results)=>{

                console.log(results)
           
            
            if(!results || !(await bcrypt.compare(password, results[0].password))){
                res.status(401).render('login',{
                    message: 'Email ou mot de Passe incorect'
                })
            }else{
                const id= results[0].id

                const token =jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("le token est :" + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.status(200).render('presentation',{
                    message : `${results[0].nom}`
                });
            } 
        }) 

        }catch (error) 
        
        {
     console.log(error);
        }
     
}

// se connecter employeur
exports.loginE = async (req, res) =>{
    try {
        const { entreprise, password } = req.body;

        if(!entreprise || !password){
            return res.status(400).render('loginE', {
                message: 'remplir les deux champs SVP!'
            })
        }
        db.query('SELECT * FROM employeur WHERE password=?', [password], async(error, results)=>{
            console.log(results)
           if(results==0){
                res.status(401).render('loginE',{
                    message: 'nom ou mot de passe est incorecte'
                })
            }else{
                    res.status(200).redirect("/enregistrementO");
            } 
        })

        }catch (error) 
        
        {
     console.log(error);
        } 
}

//ouverture du compte demandeur
exports.registrer = (req, res)=>{
    console.log(req.body);

const {name, email, password, passwordconfirm} = req.body;

db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results)=>{
     if(error){
        console.log(error)
    }
    if(results.length > 0){
        return res.render('registrer', {
             message : 'le compte existe'
            })
        }else if(password !== passwordconfirm){
            return res.render('registrer', {
                message : 'mot de passe incorrect'
            })
        }
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);
    db.query('INSERT INTO users SET ?', {nom: name, email: email, password: hashedPassword}, (error, results)=>{
        if(error){
            console.log(error)
        }else{
            console.log(results)
            return res.render('registrer',{
                message: `vous êtes enregistré`
            })
        }
    })
    })

}

//envoi du fomulaire

exports.enregistrement = (req, res)=>{
    console.log(req)
    const demandeur_emploi = require('../classes/demandeur_emploi')
    const identite ={
        'NumeroMatricule'   : req.params.NumeroMatricule,
        'Nom'               : req.body.nom, 
        'Postnom'           : req.body.postnom,
        'Prenom'            : req.body.prenom, 
        'Sexe'              : req.body.sexe, 
        'Etat_civil'        : req.body.etat_civil, 
        'Date_naissance'    : req.body.date_naissance, 
        'Age'               : req.body.age, 
        'Niveau_etude'      : req.body.niveau_etude, 
        'Description'       : req.body.description,
        'Nationalite'       : req.body.nationalite, 
        'Adresse'           : req.body.adresse, 
        'E_mail'            : req.body.email, 
        'Telephone'         : req.body.telephone 
    }
    console.log(identite)
    
    demandeur_emploi.ajouter(identite.Nom, identite.Postnom, identite.Prenom, identite.Sexe, identite.Etat_civil, identite.Date_naissance, identite.Age, identite.Niveau_etude, identite.Description, identite.Nationalite, identite.Adresse, identite.E_mail, identite.Telephone,
        ()=>{
        res.redirect('/presentation2')
    })
}
// modification
exports.editer = (req, res)=>{
    
    let c = req.params.NumeroMatricule
    demandeur_emploi.modifier(c, identite.Nom, identite.Postnom, identite.Prenom, identite.Sexe, identite.Etat_civil, identite.Date_naissance, identite.Age, identite.Niveau_etude, identite.Description, identite.Nationalite, identite.Adresse, identite.E_mail, identite.Telephone,
        ()=>{
        return res.redirect('/presentation',{
             message: 'Modification reusi'
        })
    })
}

// offre publication
exports.enregistrementO = (req, res)=>{
const offre = require('../classes/offre') 
    console.log(req)

    const identites ={
        'Numero'        : req.params.Numero,
        'Date'          : req.body.date, 
        'Date_liimite'  : req.body.date_liimite,
        'Description'   : req.body.description 
    }
    console.log(identites) 

    offre.ajoute(identites.Date, identites.Date_liimite, identites.Description,
        ()=>{
            res.status(401).render('enregistrementO',{
                message: 'Offre publier avec succès!!!'
            })
        })
}

//verification
exports.verification = async (req, res) =>{
    try {
        const { nom, telephone } = req.body;

        if(!nom || !telephone){
            return res.status(400).render('verification', {
                message: 'remplir les deux champs SVP!'
            })
        }
        db.query('SELECT * FROM demandeur_emploi WHERE telephone=?', [telephone], async(error, results)=>{
            console.log(results)
           if(results==0){
                res.status(401).render('verification',{
                    message: 'nom ou telephone incorecte'
                })
            }else{
                    res.status(200).redirect("/offres");
            } 
        })

        }catch (error) 
        
        {
     console.log(error);
        }
     
}
// offre choix
exports.choix = async (req, res)=>{
    try {
        const choit = require('../classes/choix')
        console.log(req)
    
        const info ={
            'id'     : req.params.id,
            'profil'    : req.body.profil,
            'numero' : req.body.numero,  
            'email'  : req.body.email,
            'identites': req.body.identites
            
        }
        console.log(info) 
        db.query('SELECT * FROM choix WHERE email=?', [info.email], async(error, results)=>{
            
            console.log(results) 
            if(results > 0){
                res.status(401).render('contact',{
                    message : 'on fait le choix une seule fois '
                })
            }else{
                choit.ajout(info.profil, info.numero, info.email, info.identites,
                    ()=>{
                    res.status(200).render('valide',{
                        message:`${info.identites}` + ` ` +`Compte : `+ `${info.email}`
                    })
                })
            }
        })
    } catch (error) {
       console.log(error) 
    }
        
        
}
exports.modification =(req, res)=>{
    var data = {
        Numero : req.params.Numero,
        Date : req.body.Date,
        Date_liimite : req.body.Date_liimite,
        Description : req.body.Description,
        
    }

    console.log(data)
}
