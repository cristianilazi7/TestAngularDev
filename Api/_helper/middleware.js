const jwt = require("jsonwebtoken");
const { secret } = require('../config.json');

module.exports = authenticateToken;

function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401) // if there isn't any token
  
    
    jwt.verify(token, secret, (err, user) => {
      //console.log(err.message);
      if (err) return res.status(403).json({'token:': err.message });
      req.user = user
      next() // pass the execution off to whatever request the client intended
    })
  }