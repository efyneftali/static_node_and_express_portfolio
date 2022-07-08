const express = require('express')

const bodyParser = require('body-parser')
//const cookieParser = require('cookie-parser')
const app = express();
const {projects} = require('./projectData.json')
//const { projects} = data

//console.log(projects)
console.log("break here")
console.log(projects[0].image_urls)
console.log(projects[1].project_name)
app.use('/static', express.static('public'));

app.use(bodyParser.urlencoded({ extended: false}))

//anything in the public folder will be routed to static

app.use('/static', express.static('public'))
app.set('view engine', 'pug')

app.get('/', (req, res,next) => {
    res.locals.projects = projects;
	res.render('index', projects)
    //res.render('about')
});

// app.get('/project:id', (req, res,next) => {
//     const id = req.params.id
// 	res.locals.projects = projects[id]
//     res.render('project',projects)
// });
app.get('/about', (req, res,next) => {
    res.render('about')
});

// app.use((req,res,next) =>{
// 	const err = new Error('Something went wrong');
// 	res.locals.error = err;
// 	err.status = 404;
// 	res.render('error');
// });

// app.use((err, req, res, next) => {
//     res.locals.error = err
//     console.log(`An error has occured: ${err.status}`.red);
//     res.render('error') 
// });

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
})