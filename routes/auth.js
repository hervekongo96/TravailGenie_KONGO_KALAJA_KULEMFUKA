const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();


router.post('/registrer', authController.registrer)
router.post('/login', authController.login)
router.post('/enregistrement', authController.enregistrement)
router.post('/editer', authController.editer)
router.post('/enregistrementO', authController.enregistrementO)
router.post('/verification', authController.verification)
router.post('/choix', authController.choix)
router.post('/modification', authController.modification)
router.post('/loginE', authController.loginE)

 
module.exports = router;
