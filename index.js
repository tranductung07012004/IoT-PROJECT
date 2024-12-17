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

app.engine(
  'hbs',
  expressHbs.engine({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    extname: 'hbs',
    defaultLayout: 'layout',
    helpers: {
      formatDate: function (isoDate) {
        const date = new Date(isoDate);

        // Lấy các phần của ngày giờ
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // tháng bắt đầu từ 0
        const year = date.getFullYear();

        // Trả về thời gian định dạng HH:mm:ss dd/MM/yyyy
        return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
      }
    }
  })
);

app.set('view engine', 'hbs');


// Khởi tạo firebase - admin
const serviceAccount = require('./services/iot-project-383ff-firebase-adminsdk-vgmgx-be083cd490.json'); // Thay bằng đường dẫn đến file key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://iot-project-383ff-default-rtdb.asia-southeast1.firebasedatabase.app/', // Thay bằng URL cơ sở dữ liệu Firebase của bạn
});


// Routes
app.use('/', loginRouter);
app.use('/register', registerRouter);
app.use('/controlPanel', controllPanelRouter);
app.use('/activityLog', activityLogRouter);

app.listen(PORT, HOST, () => {
  console.log(`Listening on http://${HOST}:${PORT}`);
});