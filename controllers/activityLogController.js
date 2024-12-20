const nodemailer = require('nodemailer'); // Import Nodemailer

// Tạo transporter để gửi email
const transporter = nodemailer.createTransport({
  service: 'gmail', // Bạn có thể thay đổi dịch vụ email (ví dụ: Gmail, Outlook, v.v.)
  auth: {
    user: 'tdtung22@clc.fitus.edu.vn', // Thay bằng email của bạn
    pass: 'yisn ipxd xmqh wwmr' // Thay bằng mật khẩu hoặc mật khẩu ứng dụng
  }
});

const sendMail = async (req, res) => {
  const { to_email, subject, message } = req.body; // Lấy thông tin từ client gửi lên

  // Cấu hình email
  const mailOptions = {
    from: 'tdtung22@clc.fitus.edu.vn', // Email của người gửi
    to: to_email, // Địa chỉ email người nhận
    subject: subject, // Tiêu đề email
    text: message // Nội dung email
  };

  try {
    // Gửi email
    await transporter.sendMail(mailOptions);
    // Nếu gửi email thành công, trả về thông báo thành công
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    // Nếu có lỗi trong quá trình gửi email, trả về thông báo lỗi
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: 'Error sending email!' });
  }
};

module.exports = {
  sendMail
};
