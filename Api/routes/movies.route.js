const express = require('express');
var jsonpClient = require('jsonp-client');
const moment = require('moment');
const request = require("request-promise");
const router = express.Router();
const { apikey,urlMoviedb } = require('../config.json');
const from = moment(Date.now()).format('YYYY-MM-DD');
const to = moment(new Date().setDate(new Date().getDate() + 7)).format('YYYY-MM-DD');



// Defined get data(index or listing) route
router.route('/').get(async function (req, res) {
    console.log(' : ', req.params);
    const url = `${urlMoviedb}/discover/movie?primary_release_date.gte=${from}&primary_release_date.lte=${to}&api_key=${apikey}&language=es`;
    
    let promise = new Promise(function(resolve, reject){
        jsonpClient(url, function (err, data) {
            if(err){
            console.log(err);
            reject(new Error({msg: err}));
            //return err;
            }else{
                resolve(data);
            }
            
        })
    });
    promise.then((result) => {
        console.log("Success", result);
        res.status(200).json({'data':result, 'result': 'successfully','status':200});
    }).catch((error) => {
        console.log("Error", error);
        res.status(200).json({'data':error, 'result': 'Error not','status':200});
    })
   
    
  });


  router.route('/:id').get(async function (req, res) {
    console.log('Entro id: ', req.params);
      const id = req.params.id;
    const url = `${urlMoviedb}/movie/${id}?api_key=${apikey}&language=es`;
    let promise = new Promise(function(resolve, reject){
        jsonpClient(url, function (err, data) {
            if(err){
            console.log(err);
            reject(new Error({msg: err}));
            //return err;
            }else{
                resolve(data);
            }
            
        })
    });
    promise.then((result) => {
        console.log("Success", result);
        res.status(200).json({'data':result, 'result': 'successfully','status':200});
    }).catch((error) => {
        console.log("Error", error);
        res.status(200).json({'data':error, 'result': 'Error id','status':200});
    })
    
  });

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