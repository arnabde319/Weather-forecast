const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
require('dotenv').config();

const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res) {
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res) {
  const city = req.body.cityName;
  const appkey=process.env.API_KEY;
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appkey+"&units="+unit+"";
  https.get(url, function(respond) {
    console.log(respond.statusCode);
    respond.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imgUrl="http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The temperature in "+city+" is "+temp+" degree celcius</h1>");
      res.write("<p>The current weather is "+weatherDescription+"</p>");
      res.write("<img src= " + imgUrl + " >")
      res.send();
    });
  });

});



app.listen(4000, function() {
  console.log("server is on 4000");
});
