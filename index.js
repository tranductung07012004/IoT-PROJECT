const express = require('express');
const app = express();
const PORT = 3000;
const HOST = 'localhost';
const expressHbs = require('express-handlebars');
//const connectDatabase = require('./services/dbConnection');
const admin = require('firebase-admin');
const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/registerRouter');
const controllPanelRouter = require('./routes/controlPanelRouter');
const activityLogRouter = require('./routes/activityLogRouter');

// connectDatabase();

app.use(express.static(__dirname + '/public'));
app.use(express.json());

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


// Khởi tạo firebase - admin
const serviceAccount = require('./services/project-iot-539e3-firebase-adminsdk-ri5j2-f4088fa085.json'); // Thay bằng đường dẫn đến file key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://project-iot-539e3-default-rtdb.asia-southeast1.firebasedatabase.app/', // Thay bằng URL cơ sở dữ liệu Firebase của bạn
});


// Routes
app.use('/', loginRouter);
app.use('/register', registerRouter);
app.use('/controlPanel', controllPanelRouter);
app.use('/activityLog', activityLogRouter);

app.listen(PORT, HOST, () => {
  console.log(`Listening on http://${HOST}:${PORT}`);
});