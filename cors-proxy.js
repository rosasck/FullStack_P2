const express = require('express');
const request = require('request');
const proxyurl = "https://cors-anywhere.herokuapp.com/";

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/feed', (req, res) => {
  request(
    { url: `https://api.petfinder.com/v2/animals?sort=recent&status=adoptable${req.param}` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        getToken().then(loadPets(petId)).catch(err=>{console.log(err);})
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

app.get('/saved_pets_index', (req, res) => {
    request(
      { url: `https://api.petfinder.com/v2/animals/${req.id}`},
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }
  
        res.json(JSON.parse(body));
      }
    )
  }); 

const PORT = process.env.PORT || 3000;
app.listen