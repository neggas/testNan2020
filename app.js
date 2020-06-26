const express = require("express");
const bodyParser = require('body-parser');

const app = express();

const http = require("http").createServer(app);
const io = require('socket.io')(http); //liaison de socket au requette http;
const contactes = require("./models/db");

app.set('view engine', 'ejs'); //choix du moteur de template
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/login', (req, res, next) => {
    res.render('login');
})

app.post('/login', (req, res) => {
    const pseudo = req.body.pseudo;

    if (pseudo === '') {
        res.redirect('/login');
    } else {

        res.render('index', { contactes: contactes });
    }
})

app.get('/chat', (req, res, next) => {
    res.render('index');
});


console.log(contactes);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat-message', (message) => {
        console.log("message")
    })
})
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`le serveur ecoute sur le port ${PORT}`);
})