const express = require('express')
const {GoogleGenerativeAI} = require('@google/generative-ai')
const cors = require('cors')
const app = express()
const multer = require('multer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {ConnectDb} = require('./DbConfig')
const {userModel} = require('./model/UserModel')
require('dotenv').config()
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

// connect to the mongoose database
ConnectDb()



const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (token) {
      jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
        if (err) {
          return res.json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
      });
    } else {
      return res.json({ message: 'No token provided' });
    }
  };




app.post('/',(req,res)=>{
    const {prompt} = req.body

    const aiCall=async()=>{
        try {
            const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: "You are an AI model with deep knowledge in the field of computer science. Your responses should be focused on topics such as programming languages, algorithms, data structures, computer architecture, software engineering, machine learning, artificial intelligence, databases, networking, and other related subfields of computer science. Please avoid answering questions outside of the computer science domain." });
            const result = await model.generateContent(prompt);
            const aiResponse = result.response.text()
            res.status(200).json({message: aiResponse})
        } catch (error) {
            console.log(error)
        }
    }

    aiCall()

    
})


app.post('/signup',async(req,res)=>{
    const {username, email, password} = req.body
    try {
        const userExist = await userModel.findOne({email})
        if(userExist){
            res.status(401).json({message:'found'})
        }
        console.log(username, password, email)
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await userModel.create({username,email,password:hashedPassword})
        res.status(201).json({message:'successful'})
        console.log(user)
    } catch (error) {
        console.log(error)
    }
})


app.post('/login',async(req,res)=>{
    const {email, password} = req.body
    try {
        const user = await userModel.findOne({email})
        if(user){
            const response = await bcrypt.compare(password, user.password)
            if(response){
                const id = user.username
                const email = user.email
                var token = jwt.sign(id, process.env.PRIVATE_KEY)
                res.status(200).json({token: token, email:email})
                console.log(token)
            }else{
                console.log('Wrong credentials')
            }
        }
    } catch (error) {
        console.log(error)
    }
})



app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})