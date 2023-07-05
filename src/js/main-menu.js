document.addEventListener('DOMContentLoaded', function () {
  const mainMenuWithChildrenItems = document.querySelectorAll('.main-menu__menu-item.has-children');
  console.log(mainMenuWithChildrenItems);
  mainMenuWithChildrenItems.forEach(mainMenuWithChildrenItem => {
    mainMenuWithChildrenItem.addEventListener('click', () => {
      mainMenuWithChildrenItem.classList.toggle('active');
    })
  })
});