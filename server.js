var express = require('express');
var app = express();
const fs = require("fs");
const path = require('path');        //rutas de archivos, src, public

// Setup static directory to serve
//const publicDirectoryPath = path.join(__dirname, '..')      //Fuera de su carpeta
const publicDirectoryPath = path.join(__dirname, './public') //Fuera de su carpeta en public
app.use(express.static(publicDirectoryPath))    //serve a directory of static files(CSS, JS, HTML)
app.use(express.json());    //To read JSON?


const fileName = 'data.json';   //path.join(__dirname,jsonPath)

app.get('/rooms-data', function(req, res) {
  let jsonString = fs.readFileSync(fileName,"utf8"); //load JSON
  res.send(jsonString); //Se puede mandar como string u Obj
});


//Redireccionar página
app.get('/clima', function(req, res) {
  res.sendFile(publicDirectoryPath + '/clima.html'); 
})

//Redireccionar página
app.get('/bebidas', function(req, res) {
  res.sendFile(publicDirectoryPath + '/bebidas.html'); 
})

//Redireccionar página
app.get('/acceso', function(req, res) {
  res.sendFile(publicDirectoryPath + '/acceso.html'); 
})

app.post('/clima', (req, res) => {
  console.log("Desde el Backend: " + req.body);
  
  fetch('http://api.weatherstack.com/current?access_key=d4861eb5cc4cb18ef825593bf0e5eb9e&query='+req.body.ciudad).then((response) => {
      response.json().then((data) => {
          if (data.error) {
              console.log('Error Backend')
              console.log(data.error)
              res.send({
                  dataWeather: data        //Si no se le pone nombre a la propiedad, se llamara data la propiedad del data enviadoej. -> data.data.error en el Frontend
              })
          } else {
              console.log('Exito Backend')
              console.log(data)
              res.send({
                  dataWeather: data
                  //dataWeather: data,    //Se envía dentro de la propiedad dataWeather -> data.dataWeather
                  //location: 'Prueba',   //Manda la información al front
              })
              //console.log("Datos de interés: "+ data.location.name + data.location.country + data.request.query + data.current.temperature + data.current.weather_icons + data.current.wind_speed + data.current.humidity)
          }
      })
  });     
});

app.post('/bebidas', (req, res) => {
  console.log("Desde el Backend: " + req.body);
  
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+req.body.bebida).then((response) => {
      response.json().then((data) => {
          if (data.error) {
              console.log('Error Backend')
              console.log(data.error)
              res.send({
                  dataDrinks: data        //Si no se le pone nombre a la propiedad, se llamara data la propiedad del data enviadoej. -> data.data.error en el Frontend
              })
          } else {
              console.log('Exito Backend')
              console.log(data)
              res.send({
                  dataDrinks: data
                  //dataWeather: data,    //Se envía dentro de la propiedad dataWeather -> data.dataWeather
                  //location: 'Prueba',   //Manda la información al front
              })
              //console.log("Datos de interés: "+ data.location.name + data.location.country + data.request.query + data.current.temperature + data.current.weather_icons + data.current.wind_speed + data.current.humidity)
          }
      })
  });     
});

app.post('/acceso', (req, res) => {
  //console.log("Desde el Backend: " + req.body);
  //console.log(req.body.user);
  //console.log(req.body.password);

  //Access account
  const user = 'usuario';
  const password = '1234';

  if(req.body.user == 'usuario' && req.body.password == '1234'){
    
    Promise.all([fetch('https://jsonplaceholder.typicode.com/users'),
                fetch('https://jsonplaceholder.typicode.com/comments')]).then((response) => {
                  Promise.all([response[0].json(),response[1].json()]).then((data) => {
                      if (data[0].error) {
                          console.log('Error Backend')
                          console.log(data[0].error)
                          res.send({
                            dataAccess: data[0]        //Si no se le pone nombre a la propiedad, se llamara data la propiedad del data enviadoej. -> data.data.error en el Frontend
                          })
                      }else if (data[1].error) {
                        console.log('Error Backend')
                        console.log(data[1].error)
                        res.send({
                          dataAccess: data[1]        
                        })
                    } else {
                          console.log('Exito Backend')
                          console.log(data)
                          res.send({
                              dataAccess: true,
                              users: data[0],
                              comments: data[1]
                          })
                        }
                  })
    });  
  } else{
    res.send({
      dataAccess: false
      
    })
  }
});


function jsonStringifyPretty (json) {
  return JSON.stringify(json, null, 2); //Makes JSON-string pretty
}

app.listen(3000); //PORT