const menuIcon = document.getElementById('menuIcon');
const menu = document.getElementById('menu');

// Thêm sự kiện click vào hình ảnh để hiển thị hoặc ẩn menu
menuIcon.addEventListener('click', (e) => {
  e.stopPropagation(); // Ngừng sự kiện click lan truyền lên body
  menu.classList.toggle('hidden');
});

// Thêm sự kiện click cho toàn bộ tài liệu để ẩn menu nếu click ra ngoài
document.addEventListener('click', (e) => {
  // Kiểm tra xem click có xảy ra bên ngoài menu và icon không
  if (!menu.contains(e.target) && e.target !== menuIcon) {
    menu.classList.add('hidden');
  }
});