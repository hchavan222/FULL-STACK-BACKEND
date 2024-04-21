const ex = require('express')
const mon = require('mongoose')

const cors = require('cors')

const bp = require('body-parser')

const app = ex()

const port = process.env.PORT || 5000;

app.use(cors())

app.use(bp.json())

mon.connect("mongodb+srv://hrishi007:qwerty100@cluster0.rdpsxvx.mongodb.net/stockapp").then(()=>{
    console.log("connected to mongoose")
})

const sSchema = ({
    company : String,
    description : String,
    initial_price : Number,
    price_2002 : Number,
    price_2007 : Number,
    symbol : String
})

const conStock = mon.model("Stock" , sSchema)
const watchStock = mon.model("Watch" , sSchema)

app.get("/api/stock" , async(req, res)=>{

    try{
        const data  =  await conStock.find()

        res.json(data)


    }catch(error){
        console.log(error)
        res.status(500).json({error : "Internal Error Occured"})
    }

})



app.get("/api/watchlist" , async(req, res)=>{

    try{
        const data  =  await watchStock.find()

        res.json(data)


    }catch(error){
        console.log(error)
        res.status(500).json({error : "Internal Error Occured"})
    }

})


app.post("/api/watchlist" , async (req , res)=>{

    try{
        const { company,
            description,
            initial_price,
            price_2002,
            price_2007,
            symbol,} = req.body;

            const st = new watchStock({

            company,
            description,
            initial_price,
            price_2002,
            price_2007,
            symbol,

            })

            await st.save()
            res.json({message : "DATA ADDED TO WATCHLIST"})

    }catch(error){

        console.log(error)
        res.status(500).json({error : "Internal Error Occured"})

    }

})

app.delete("/api/watchlist" , (req , res)=>{

    
})




app.listen(port , ()=>{
    console.log("Server is Running")
})