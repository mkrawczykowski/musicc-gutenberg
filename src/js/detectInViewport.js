document.addEventListener('DOMContentLoaded', () => {
  const lazySection = document.querySelector('[data-load="lazy"]');
  console.log(lazySection);



  document.addEventListener('scroll', () => {
    const rect = lazySection.getBoundingClientRect()
    const elemTop = rect.top;
    const elemBottom = rect.bottom;
    console.log(elemTop);
    console.log(elemBottom);
    console.log(window.innerHeight);
    console.log(elemTop < window.innerHeight + 200 && elemBottom >= 0);
    console.log('================');
  })
})