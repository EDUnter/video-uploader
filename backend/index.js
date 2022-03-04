const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const routes = require('./routes');

global.__basedir = __dirname;

//use express static folder
app.use(express.static('./public'));
 
// body-parser middleware use
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

//api routes
app.use('/videos', routes);
 
//create connection
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))