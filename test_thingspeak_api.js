const https = require('https');
const express = require('express');

const app = express();
const THINGSPEAK_API_URL = "https://api.thingspeak.com/update";
const API_KEY_WRITE = "HKCGA8T9B2JG3YXJ"; // Thay bằng API key thực tế của bạn
const API_KEY_READ = "UAMIHFSD1DGYWAVC";

app.get('/feed/:value', (req, res) => {
  const field1Value = isNaN(req.params.value) ? 10 : req.params.value; // Lấy giá trị field1 từ query

  // Tạo URL yêu cầu
  const urlWriteFeed = `https://api.thingspeak.com/update?api_key=${API_KEY}&field1=${field1Value}`;
  const urlReadFeed = `https://api.thingspeak.com/channels/2767852/feeds.json?api_key=${API_KEY_READ}&results=2`;
  const urlReadField = `https://api.thingspeak.com/channels/2767852/fields/1.json?api_key=${API_KEY_READ}&results=2`;

  // Gửi yêu cầu GET
  https.get(urlWriteFeed, (response) => {
    let data = '';

    // Nhận dữ liệu từng chunk
    response.on('data', (chunk) => {
      data += chunk;
    });

    // Kết thúc nhận dữ liệu
    response.on('end', () => {
      res.json({
        success: true,
        data,
      });
    });
  }).on('error', (err) => {
    console.error('Error writing to ThingSpeak:', err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  });
});

// Lắng nghe trên một cổng
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
