const mongoose = require('mongoose')

const ConnectDb=async()=>{
    try {
        const conn = await mongoose.connect('mongodb+srv://marvel10cent:hjmkN8N4KpdFGjla@cluster0.irm4t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        const db = conn.connection.host
        console.log(`connected to ${db}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {ConnectDb}