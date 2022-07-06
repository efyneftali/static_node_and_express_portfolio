const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express();

app.set('view engine', 'pug')

app.get('/', (req, res)=>{
    res.send("<h1>ep im working</h1>")
})

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
})