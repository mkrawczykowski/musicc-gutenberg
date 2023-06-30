document.addEventListener('DOMContentLoaded', () => {
  const termsFilters = document.querySelectorAll('.filtering-tracks__terms-widget .filtering-tracks__term');
  console.log(termsFilters);
  let existingTaxonomies = [];
  let activeFilters = [];

  termsFilters.forEach(termsFilter => {
    let arrayContains = false;

    !existingTaxonomies.length ? existingTaxonomies.push(termsFilter.dataset.filterTaxonomy) : null;

    existingTaxonomies.forEach(existingTaxonomy => {
      console.log('forEach');
      if (termsFilter.dataset.filterTaxonomy === existingTaxonomy) {
        arrayContains = true;
      }
      console.log('existingTaxonomy');
      console.log(existingTaxonomy);
      console.log('termsFilter.dataset.filterTaxonomy');
      console.log(termsFilter.dataset.filterTaxonomy);
      if (arrayContains === false) {
        existingTaxonomies.push(termsFilter.dataset.filterTaxonomy);

      }
    })

    console.log('existingTaxonomies');
    console.log(existingTaxonomies);


  });

  termsFilters.forEach(termsFilter => {
    termsFilter.addEventListener('click', () => {
      termsFilter.classList.toggle('active');

      if (termsFilter.classList.contains('active')) {
        activeFilters[termsFilter.dataset.filterTaxonomy].push(termsFilter.dataset.filterTermId);
        console.log('added!');
        console.log(activeFilters);
      }


    })
  })

  async function logJSONData() {
    // await fetch('https://musicc-gutenberg.test/wp-json/wp/v2/track?mood=4,57')
    await fetch('https://musicc-gutenberg.test/wp-json/wp/v2/track')
      .then(response => {
        console.log(typeof response);
        if (response.status === 200) {
          console.log('ok');
          return response.json();
        } else {
          console.log('nok');
        }
      })
      .then(data => {
        data.forEach((dataItem => console.log(dataItem)));
      })
  };

  logJSONData();
});