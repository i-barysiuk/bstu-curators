var JWTService =require('./services/jwtService');
var express = require('express');
var app = express();

var PORT = 3000;

app.get('/' , (req, res) => res.send('Hi world'));
app.get('/login' , (req, res) => {
    var tokens = JWTService.generate({id: 1, role: 'admin'})
    var decode = JWTService.validate(tokens.accessToken)
    res.send({tokens : tokens, decode : decode})
});

app.listen(PORT , (err) => 
{
    if(err) return console.log('something bad happened', err);
    console.log('Server is starting');
});


//for start server use: 1 - 'node server.js' , 2 - 'npm start' , or 3 - 'nodemon server.js'
// '3' way allows you to refresh the page without rebooting the server