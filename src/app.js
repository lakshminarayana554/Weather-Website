const request = require("request")
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const path  = require('path')
const hbs = require('hbs')


const app=express()

//defined paths for express config
const publiDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publiDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'LN'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'LN'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help page',
        name:'LN',
        contact_info:'contact info: 123456789'
    })
})

app.get('/weather',(req,res) =>{
    const address = req.query.address
    if(!address){
        return res.send({
            error:'you must provide address for weather details'
        })
    }
        geocode(address,(error,{latitude,longitude,location} = {})=>{
            if(error){
              return res.send(error)
            }
            forecast(latitude,longitude,(error,forecastdata) =>{
                if(error){
                    return res.send(error)
                }
                res.send({
                    address,
                    location,
                    forecastdata
                })
                      
            
            })

        })





    console.log(req.query.address) 
    


    
    

})

app.get('/products',(req,res)=> {
    if(!req.query.search){
        return res.send({
           Error:'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        product: []
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 Error',
        name:'LN',
        errorMessage:'help article not found'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{

        title:'404 Error',
        name:'LN',
        errorMessage:"page not found"

    })
})










app.listen(3000,()=>{
    console.log('server is up')
})