const admin = require('firebase-admin');

// Hàm xử lý đăng ký
const getRegisterData = async (req, res) => {
  try {
    // Lấy dữ liệu từ body request
    const { username, password, name } = req.body;
    //console.log(username, password);

    // Kiểm tra dữ liệu đầu vào
    if (!username || !password || !name) {
      return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin tài khoản và mật khẩu."});
    }

    // Tham chiếu tới vị trí trong Firebase Realtime Database
    const db = admin.database();
    const usersRef = db.ref("users"); // Node `users` trong database

    // Kiểm tra xem username đã tồn tại hay chưa
    const snapshot = await usersRef.orderByChild("username").equalTo(username).once("value");

    //console.log(snapshot);

    if (snapshot.exists()) {
      return res.status(400).json({ message: "Tài khoản đã tồn tại. Vui lòng chọn tài khoản khác." });
    }

    // Thêm tài khoản mới
    const newUser = {
      username: username,
      password: password,
      name: name
    };

    // Push dữ liệu vào Firebase
    const newUserRef = await usersRef.push(newUser);


    // Phản hồi thành công
    return res.status(201).json({
      message: "Đăng ký thành công!",
      userId: newUserRef.key, // Key của user mới được thêm
    });
  } catch (error) {
    console.error("Lỗi khi xử lý đăng ký:", error);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi xử lý đăng ký. Vui lòng thử lại sau." });
  }
};

module.exports = {
  getRegisterData,
};
