document.addEventListener('DOMContentLoaded', () => {
  const termsFilters = document.querySelectorAll('.filtering-tracks__terms-widget .filtering-tracks__term');
  console.log('termsFilters');
  console.log(termsFilters);
  let existingTaxonomies = [];
  let activeFilters = [];

  const arrayContains = (array, item) => {
    let contains = false;

    array.every(arrayItem => {
      if (arrayItem == item) {
        contains = true;
        return false;
      }
      return true;
    })

    return contains;
  }

  termsFilters.forEach(termsFilter => {
    if (!existingTaxonomies.length) {
      existingTaxonomies.push(termsFilter.dataset.filterTaxonomy);
    }
    if (existingTaxonomies.length) {
      if (!arrayContains(existingTaxonomies, termsFilter.dataset.filterTaxonomy)) {
        existingTaxonomies.push(termsFilter.dataset.filterTaxonomy);
      }
    }
  })

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