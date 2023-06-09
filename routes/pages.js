const express = require('express');
const router = express.Router();
const mysql = require("mysql")

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    key: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})


const queries = require('../database/queries/offres')


router.get('/www.onem.com', (req, res)=>{
    res.render('index')
})
router.get('/registrer', (req, res)=>{
    res.render('registrer')
}) 
router.get('/login', (req, res)=>{
    res.render('login')
})
router.get('/loginE', (req, res)=>{
    res.render('loginE')
})

router.get('/affiche', (req, res)=>{
    const tous = require('../models/Ajout')
    tous.afficher((demandeur_emploi)=>{
        res.render('affiche',  {demandeur_emploi : demandeur_emploi})
    })
})

router.get('/enregistrement', (req, res)=>{
    res.render('enregistrement')
})

router.get('/editer', (req, res)=>{
    res.render('editer')
})

router.get('/presentation', (req, res)=>{
    res.render('presentation')
})
router.get('/presentation2', (req, res)=>{
    res.render('presentation2')
})

//offre
router.get('/offres', (req, res)=>{
    const tous = require('../models/Ajout')
    tous.affiche((offre)=>{
    res.render('offres',  {offre : offre})
    })
})

router.get('/enregistrementO', (req, res)=>{
    res.render('enregistrementO')
})

router.get('/verification', (req, res)=>{
    res.render('verification')
})

router.get('/contact', (req, res)=>{
    res.render('contact')
})

router.get('/valide', (req, res)=>{
    res.render('valide')
})

router.get('/modification/:Numero', (req, res)=>{
    db.query(queries.offre(req.params.Numero), (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.render('contact', {offre: result});
        }
    })
})

module.exports = router;

