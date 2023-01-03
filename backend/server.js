const express = require('express');

const app = express();
const dotenv = require('dotenv');
const cors=require("cors")
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const databaseConnect = require('./config/database');
const authRouter = require('./routes/authRoute');
const messengerRoute = require('./routes/messengerRoute');

dotenv.config({
    path : 'backend/config/config.env'
})

app.use(bodyParser.json({size:"10mb"}));
app.use(bodyParser.urlencoded({size:"10mb"}));
app.use(cors({origin:"http://localhosst:3000"}));
app.use(cookieParser({size:"10mb"}));
app.use('/api/messenger',authRouter);
app.use('/api/messenger',messengerRoute);

app.get('/',(req,res)=>{
    res.send('ok');
})

databaseConnect();

const PORT = process.env.PORT || 5000 
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})