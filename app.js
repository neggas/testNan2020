const express = require("express");
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session')
const app = express();

const http = require("http").createServer(app);
const io = require('socket.io')(http); //liaison de socket au requette http;
const contactes = require("./models/db");

app.set('view engine', 'ejs'); //choix du moteur de template
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))
app.use(flash())

app.get('/', (req, res, next) => {
    res.render('login');
})



app.post('/', (req, res) => {
    const pseudo = req.body.pseudo;

    if (pseudo !== '') {
        res.redirect('/chat');
    } else {

        req.flash("erreur", "Vous n'etes pas membre du chat");
        res.render('login');
    }
})

app.get('/chat', (req, res, next) => {

    res.render('index', { contactes: contactes });
});


io.on('connection', (socket) => {

    socket.on('nouveau_message', (message) => {
        const date = Date();
        socket.emit('message', message)
    })
})
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`le serveur ecoute sur le port ${PORT}`);
})