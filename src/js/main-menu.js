document.addEventListener('DOMContentLoaded', function () {
  const mainMenuWithChildrenItems = document.querySelectorAll('.main-menu__menu-item.has-children .main-menu__menu-link');
  console.log(mainMenuWithChildrenItems);
  mainMenuWithChildrenItems.forEach(mainMenuWithChildrenItem => {

    const thisParent = mainMenuWithChildrenItem.closest('.main-menu__menu-item');
    mainMenuWithChildrenItem.addEventListener('click', (event) => {
      console.log('mainMenuWithChildrenItem');
      console.log(mainMenuWithChildrenItem);
      console.log('click above')
      console.log('thisParent');
      console.log(thisParent);
      thisParent.classList.toggle('active');

      console.log('event')
      console.log(event.target)
      console.log('===============================');
    })
  });

  const mainMenuWidgetListNames = document.querySelectorAll('.js-main-menu-widget-list-name');
  mainMenuWidgetListNames.forEach(mainMenuWidgetListName => {
    mainMenuWidgetListName.addEventListener('click', (event) => {
      console.log('click below')
      const thisParent = mainMenuWidgetListName.closest('.main-menu__widget');
      thisParent.classList.toggle('active');
      console.log(event.target);
      console.log('===============================');
    })
  })
});