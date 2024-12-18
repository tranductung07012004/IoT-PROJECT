document.getElementById('login-btn').addEventListener('click', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (!username || !password) {
    alert('Vui lòng nhập đầy đủ thông tin');
    return;
  }

  const userData = {
    username: username,
    password: password
  };

  // Gửi dữ liệu lên server bằng Fetch API
  fetch("/login/check", {
    method: "POST", // Đổi từ GET sang POST 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
  .then(response => response.json())
  .then((data) => {
    if (data.token) {
      // Lưu token vào localStorage
      localStorage.setItem("authToken", data.token);
      alert("Đăng nhập thành công!");
      window.location.href = "http://localhost:3000/controlPanel";
    } else {
      alert(data.message || "Lỗi không xác định!");
    }
  })
  .catch((error) => alert("Lỗi khi gửi dữ liệu:", error)); 
});

