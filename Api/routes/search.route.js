const express = require('express');
var jsonpClient = require('jsonp-client');
const router = express.Router();
const { apikey,urlMoviedb } = require('../config.json');

router.route('/:moviename').get(async function (req, res) {
  console.log('Entro a buscar: ', req.params); 
  const moviename = req.params.moviename;
  const url = `${urlMoviedb}/search/movie?query=${moviename}&sort_by=popularity.desc&api_key=${apikey}&language=es`;
  
  let promise = new Promise(function(resolve, reject){
      jsonpClient(url, function (err, data) {
          if(err){
          console.log(err);
          reject(new Error({msg: err}));
          //return err;
          }else{
              console.log(data);
              resolve(data);
          }
          
      })
  });
  promise.then((result) => {
      console.log("Success", result);
      res.status(200).json({'data':result, 'result': 'successfully','status':200});
  }).catch((error) => {
      console.log("Error search", error);
      res.status(200).json({'data':error, 'result': 'Error search','status':200});
  })
  
});

module.exports = router;