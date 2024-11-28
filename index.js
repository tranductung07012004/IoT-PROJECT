const express = require('express');
const app = express();
const PORT = 3000;
const HOST = 'localhost';
const expressHbs = require('express-handlebars');

app.use(express.static(__dirname + '/public'));

app.engine(
  'hbs',
  expressHbs.engine({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    extname: 'hbs',
    defaultLayout: 'layout',
  })
);

app.set('view engine', 'hbs');


// Routes
app.get('/', (req, res) => {  // Nếu truy cập đến đường dẫn root directory thì sẽ hiện ra login screen
  res.render('login');
})

app.get('/register', (req, res) => {
  res.render('register');
})

app.get('/controllPanel', (req, res) => {
  res.render('controllPanel');
});



app.listen(PORT, HOST, () => {
  console.log(`Listening on http://${HOST}:${PORT}`);
});