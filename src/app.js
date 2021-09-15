const path=require("path")
const express=require("express")
const hbs=require("hbs")
const geocode=require("./utils/geocode")
const forecast=require("./utils/forecast")


const app=express()
const port=process.env.PORT || 3000

const publicDir=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,"../templates/views")
const partialPath=path.join(__dirname,"../templates/partials")


app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDir))


app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather",
        name:"Priyanshu Rathore"

    })
})


app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About Me",
        name:"Priyanshu Rathore"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help Page",
        msg:"Ping me if you need any help",
        name:"Priyanshu Rathore"
    })
})


app.get("/weather",(req,res)=>{
if(!req.query.address){
    return res.send({
        error:"Enter the address"
    })

}
     
      geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
          if(error){
              return res.send({error})
          }

          forecast(latitude,longitude,(error,forecastData)=>{
              if(error){
                  return res.send({error})
              }
             
              res.send({
                  forecast:forecastData,
                  location,
                  address:req.query.address
              })

          })
      })



    // res.send({
    //     address:req.query.address,
    //     location:"Agar",
    //     forecast:"It is raining"
    // })
})


// app.get()


app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"404",
        name:"Priyanshu Rathore",
        errmsg:"Help article not found"
    })
})


app.get("*",(req,res)=>{

res.render("404",{
    title:"404",
    name:"Priyanshu Rathore",
    errmsg:"Page not found"
})

})



app.listen(port,()=>{
    console.log("server is up on port 3000" + port)
})