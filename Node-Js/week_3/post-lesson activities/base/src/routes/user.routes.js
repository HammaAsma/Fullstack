const express = require('express');
const router = express.Router();
const app=express()
const authController = require('../controllers/user.controller.js');

app.use(express.json())
app.use(express.urlencoded({extended:true}))

router.post('/register', authController.register );
router.post('/login', authController.login );

module.exports = router;