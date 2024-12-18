document.getElementById('register-btn').addEventListener('click', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const name = document.getElementById('name').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm_password').value;
  console.log(username, password, confirmPassword);

  if (!username || !password || !confirmPassword || !name) {
    alert('Vui lòng nhập đầy đủ thông tin');
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(username)) {
    alert('Tài khoản phải là email hợp lệ');
    return;
  }
  
  if (password !== confirmPassword) {
    alert('Mật khẩu và xác nhận mật khẩu không khớp');
    return;
  }
  
  if (password.includes(' ')) {
    alert('Mật khẩu không được chứa dấu cách');
    return;
  }

  // Kiểm tra mật khẩu ít nhất 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt');
    return;
  }


  const userData = {
    username: username,
    password: password,
    name: name
  };

  // Gửi dữ liệu lên server bằng Fetch API
  fetch("register/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.message) {
      alert(data.message);
    }
  })
  .catch((error) => console.error("Lỗi khi gửi dữ liệu:", error));
});