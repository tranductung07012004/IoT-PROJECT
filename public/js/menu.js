const menuIcon = document.getElementById('menuIcon');
const menu = document.getElementById('menu');


menuIcon.addEventListener('click', (e) => {
  e.stopPropagation(); // Ngừng sự kiện click lan truyền lên body
  menu.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && e.target !== menuIcon) {
    menu.classList.add('hidden');
  }
});