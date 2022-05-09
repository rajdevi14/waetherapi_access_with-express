const express=require('express');
const bodyparser=require("body-parser")
//const { json } = require('express/lib/response');
const https=require('https')
const app=express();


app.use(bodyparser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/weather.html")

})
app.post('/',(req,res)=>{ 

    const city=req.body.t1;
    const api="copy ur api key"
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api+"&units="+unit



        https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on("data",function(data){

            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp
            const icon=weatherData.weather[0].icon
            const desc=weatherData.weather[0].description
            const icon_url="http://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write("<h1>Weather forecaster</h1>")
            res.write("City:"+city)
            res.write("<br>Temperature in celcius "+temp.toString()+"<br>");
            res.write("<img src="+icon_url+"></img><br>");
            res.write("Description :"+desc)

            res.send()

            })



    })
});

app.listen(5000,()=>
{console.log("server started")});
