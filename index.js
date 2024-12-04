const express = require('express');
const app = express();
const PORT = 3000;
const HOST = 'localhost';
const expressHbs = require('express-handlebars');
const getSensorRecords = require('./controllers/sensorController');
const connectDatabase = require('./services/dbConnection');

connectDatabase();

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
  res.locals.pageTitle = 'Controll Panel';
  res.render('controllPanel');
});

app.get('/activityLog', (req, res) => {
  res.locals.pageTitle = 'Activity Log';
  res.render('activityLog');
});



app.get('/api/data', async (req, res) => {
  try {
    // Gọi hàm getLatestRecords để lấy dữ liệu mới nhất từ MongoDB
    const sensorRecords = await getSensorRecords();
    console.log(sensorRecords.photoresistor);
    // Trả về dữ liệu mới nhất dưới dạng JSON
    res.json(sensorRecords);

  } catch (error) {
    console.error('Error fetching latest records:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});


app.listen(PORT, HOST, () => {
  console.log(`Listening on http://${HOST}:${PORT}`);
});