require('./config/Db')
const express = require('express')
const cors = require('cors')
const productRouter = require('./routes/product.routes')
const authRouter = require('./routes/auth.routes')

const Port = process.env.Port || 8989

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/auth', authRouter)
app.use('/product', productRouter)

app.listen(Port,()=>{
    console.log(`server is running at ${Port}`)
})