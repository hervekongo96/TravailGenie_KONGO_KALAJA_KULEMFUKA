


/*app.get('/information', (req, res)=>{
    const tous = require('./models/Ajout')
    tous.afficher((demandeur_emploi)=>{
        res.render('affiche',  {demandeur_emploi : demandeur_emploi})
    })
})
*/
/*app.get('/enregistrement', (req, res)=>{
    res.render('enregistrement')
})
app.post('/enregistrement', (req, res)=>{
    const identite = { 
        'Nom' : req.body.nom, 
        'Postnom' :req.body.postnom,
        'Prenom' :req.body.prenom, 
        'Sexe':req.body.sexe, 
        'Etat_civil' :req.body.etat_civil, 
        'Date_naissance':req.body.date_naissance, 
        'Age' :req.body.age, 
        'Niveau_etude' :req.body.niveau_etude, 
        'Description':req.body.description,
        'Nationalite':req.body.nationalite, 
        'Adresse':req.body.adresse, 
        'E_mail' :req.body.email, 
        'Telephone':req.body.telephone             
    }

    console.log(identite)
    const tous = require('./models/Ajout')
    tous.ajouter(identite.Nom, identite.Postnom, identite.Prenom, identite.Sexe, identite.Etat_civil, identite.Date_naissance, identite.Age, identite.Niveau_etude, identite.Description, identite.Nationalite, identite.Adresse, identite.E_mail, identite.Telephone, ()=>{
        res.redirect('/information')
    }) 
})


app.post('/editer/:NumeroMatricule', (req, res)=>{
   const queries = require('./models/Ajout') 
   var data ={
    'NumeroMatricule' : req.params.NumeroMatricule,
    'Nom' : req.body.nom, 
    'Postnom' :req.body.postnom,
    'Prenom' :req.body.prenom, 
    'Sexe':req.body.sexe, 
    'Etat_civil' :req.body.etat_civil, 
    'Date_naissance':req.body.date_naissance, 
    'Age' :req.body.age, 
    'Niveau_etude' :req.body.niveau_etude, 
    'Description':req.body.description,
    'Nationalite':req.body.nationalite, 
    'Adresse':req.body.adresse, 
    'E_mail' :req.body.email, 
    'Telephone':req.body.telephone
    }
    
})*/