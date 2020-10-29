const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret } = require('../config.json');
const { body, validationResult } = require('express-validator');
// Require Business model in our routes module
let User = require('../models/User');



// genetarion token
router.route('/').post([
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 })
  ],function (req, res) {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
        console.log('entro al auth');
         email = req.body.email;
         password = req.body.password;
         token = jwt.sign({
            data: email
          }, secret, { expiresIn: '1m' });
         res.status(200).json({'email':email, 'password':password,'Token':token, 'result': 'successfully','status':200});
});

  module.exports = router;