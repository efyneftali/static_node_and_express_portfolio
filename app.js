const express = require('express')
const bodyParser = require('body-parser')

const app = express();
const {projects} = require('./projectData.json')

app.use(bodyParser.urlencoded({ extended: false}))

app.use('/static', express.static('public'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.locals.projects = projects;
	res.render('index', projects)
});

app.get('/project/:id', (req, res) => {
    const id = req.params.id
	res.locals.projects = projects[id]
    res.render('project')
});

app.get('/about', (req, res,next) => {
    res.render('about')
    
});
app.use((req,res,next) =>{
	const err = new Error('Page Not Found')
    err.status = 404
    next(err)
})
app.use((err, req, res, next) => {
    res.locals.error = err
    res.status(err.status)
    console.log(`An error has occured: ${err.status}`)
    res.render('error') 
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
})