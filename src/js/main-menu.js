document.addEventListener('DOMContentLoaded', function () {
  const mainMenuWithChildrenItems = document.querySelectorAll('.main-menu__menu-item.has-children .main-menu__menu-link');
  console.log(mainMenuWithChildrenItems);
  mainMenuWithChildrenItems.forEach(mainMenuWithChildrenItem => {
    thisParent = mainMenuWithChildrenItem.closest('.main-menu__menu-item');
    mainMenuWithChildrenItem.addEventListener('click', () => {
      thisParent.classList.toggle('active');
    })
  })
});