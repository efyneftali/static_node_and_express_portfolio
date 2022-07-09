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
})


app.get('/project/:id', (req, res, next) => {
    const id = req.params.id
    if (projects[id] !== undefined) {
    // render the project template if the id exist
        res.locals.projects = projects[id]
        res.render('project')
    } else {
        // otherwise, pass in error
        const err = new Error();
        err.message = "Well this is awkward.......Sorry, this project does not exist";
        err.status = 404
        next(err);
    }
});

app.get('/about', (req, res,next) => {
    res.render('about')
    
});

//errors
app.use((req,res,next) =>{
    //creats 404 error
	const err = new Error('Page Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    //handles other type of errors
    res.locals.error = err
    const status = err.status || 500
    res.status(status)
    console.log(`An error has occured: ${status}`)
    res.render('error') 
})

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
})