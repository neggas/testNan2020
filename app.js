const express = require("express");

const app = express();
app.set('view engine', 'ejs'); //choix du moteur de template
app.use(express.static(__dirname + '/public'));


app.get('/login', (req, res, next) => {
    res.render('login');
})

app.post('/login', (req, res) => {
    res.redirect('chat');
})

app.get('/chat', (req, res, next) => {
    res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`le serveur ecoute sur le port ${PORT}`);
})