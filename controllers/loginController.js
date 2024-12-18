const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

// Secret key cho JWT
const SECRET_KEY = "QZ3xj!84a7^Xkd9s$5fLwT9z8@Nc1Gp!";



// Hàm xử lý đăng nhập
const loginControl = async (req, res) => {
  try {
    // Lấy dữ liệu từ body request
    const { username, password } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!username || !password) {
      return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin tài khoản và mật khẩu."});
    }

    // Tham chiếu tới vị trí trong Firebase Realtime Database
    const db = admin.database();
    const usersRef = db.ref("users"); // Node `users` trong database

    // Kiểm tra xem username đã tồn tại hay chưa
    const snapshot = await usersRef.orderByChild("username").equalTo(username).once("value");

    if (snapshot.exists()) {
      // Lấy key và dữ liệu của user
      const userKey = Object.keys(snapshot.val())[0];
      const userData = snapshot.val()[userKey];
      console.log(userKey);
      console.log(userData);

      // Kiểm tra mật khẩu
      if (userData.password !== password) {
        return res.status(401).json({ message: "Mật khẩu không chính xác." });
      }

      //console.log(userData.name, userData.username);
      // Tạo JWT
      const tokenPayload = { name: userData.name, username: userData.username };
      //console.log(tokenPayload);
      const token = jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: "1h" });

      // Phản hồi với token
      return res.status(200).json({
        message: "Đăng nhập thành công!",
        token,
      });
    }

    // Phản hồi thất bại nếu username không tồn tại
    return res.status(404).json({ message: "Tài khoản không tồn tại." });
  } catch (error) {
    console.error("Lỗi khi xử lý đăng nhập:", error);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi xử lý đăng nhập. Vui lòng thử lại sau." });
  }
};

module.exports = {
  loginControl,
};
