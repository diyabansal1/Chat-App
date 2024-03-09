const express = require('express');
const app = express();
const mongoose = require('mongoose');
const seedDB = require('./seed');
var cors = require('cors');
const authRoutes = require('./routes/apis/authRoutes');
const chatRoutes = require('./routes/apis/chatRoutes');
const messageRoutes = require('./routes/apis/messageRoutes');





// connect DB
const DB_url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zw6hky5.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(DB_url , {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(()=>{
    console.log("DB connected successfully")
})
.catch((err)=>{
    console.log("DB error"); 
    console.log(err)
})

app.use(cors({origin:['http://localhost:3000']}));

app.use(express.urlencoded({extended:true})); // form data
app.use(express.json());  // json data

app.use(authRoutes);
app.use(chatRoutes);
app.use(messageRoutes);

app.get('/' , (req,res)=>{
    res.send('Welcome to chat-app');
})
// seedDB();
app.listen(8080 , (req,res)=>{
    console.log("Server connected at port 8080");
})