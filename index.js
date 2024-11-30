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
  res.locals.pageTitle = 'Controll Panel';
  res.render('controllPanel');
});

app.get('/activityLog', (req, res) => {
  res.locals.pageTitle = 'Activity Log';
  res.render('activityLog');
});

// Giả lập dữ liệu động
let data = [
  { time: '08:00', value: 25 },
  { time: '10:00', value: 32 },
  { time: '12:00', value: 33 },
  { time: '14:00', value: 32 },
  { time: '16:00', value: 31.5 },
  { time: '18:00', value: 31 },
  { time: '20:00', value: 30.8 },
];

// Endpoint để trả về dữ liệu mới
app.get('/api/data', (req, res) => {
  // Cập nhật dữ liệu (thêm 1 giá trị mới, ví dụ, giả lập giá trị mới)
  const currentTime = new Date();
  const newValue = Math.floor(Math.random() * 100); // Giá trị ngẫu nhiên để cập nhật

  // Cập nhật thời gian và giá trị mới
  data.push({
    time: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    value: newValue,
  });

  // Giới hạn số lượng dữ liệu giữ lại (giả sử chỉ giữ 7 phần tử mới nhất)
  if (data.length > 7) {
    data.shift();
  }

  res.json(data);
});


app.listen(PORT, HOST, () => {
  console.log(`Listening on http://${HOST}:${PORT}`);
});