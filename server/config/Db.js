const mongoose = require('mongoose')

const link = "mongodb+srv://AnantJindal:5687Anant@cluster0.zurl5.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(link).then(() => {
    console.log("Db connected")
}).catch((err) => {
    console.log(err)
})