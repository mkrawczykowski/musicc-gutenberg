document.addEventListener('DOMContentLoaded', () => {
  const termsFilters = document.querySelectorAll('.filtering-tracks__terms-widget .filtering-tracks__term');
  console.log('termsFilters');
  console.log(termsFilters);
  let existingTaxonomies = [];
  let activeFilters = {};
  let activeFiltersString = '';

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

  const removeFromArray = (array, itemToRemove) => {
    if (arrayContains(array, itemToRemove)) {
      const itemIndex = array.indexOf(itemToRemove);
      const arrayWithItemRemoved = array.toSpliced(itemIndex, 1);
      return arrayWithItemRemoved;
    }
    return array;
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

  existingTaxonomies.forEach(existingTaxonomy => {
    activeFilters[existingTaxonomy] = [];
  })



  termsFilters.forEach(termsFilter => {
    termsFilter.addEventListener('click', () => {
      termsFilter.classList.toggle('active');
      let activeFiltersString = '';
      let activeTaxonomiesOperatorString = '';
      let fetchString = '';

      if (termsFilter.classList.contains('active')) {
        activeFilters[termsFilter.dataset.filterTaxonomy].push(termsFilter.dataset.filterTermId);
        console.log(activeFilters[termsFilter.dataset.filterTaxonomy]);
        console.log('added!');
      }

      if (!termsFilter.classList.contains('active')) {
        activeFilters[termsFilter.dataset.filterTaxonomy] = removeFromArray(activeFilters[termsFilter.dataset.filterTaxonomy], termsFilter.dataset.filterTermId);
        console.log('removed!');
      }

      for (const taxonomy in activeFilters) {
        let currentTaxonomyString = '';
        let currentOperatorString = '';

        if (activeFilters[taxonomy].length) {
          currentTaxonomyString += taxonomy + '[terms]=' + activeFilters[taxonomy].toString() + '&';
          currentOperatorString = `${taxonomy}[operator]=AND&`;
          activeFiltersString = activeFiltersString + currentTaxonomyString;
          activeTaxonomiesOperatorString = activeTaxonomiesOperatorString + currentOperatorString;
          fetchString = activeFiltersString + activeTaxonomiesOperatorString;

          console.log('activeFiltersString');
          console.log(activeFiltersString);
          console.log('activeTaxonomiesOperatorString');
          console.log(activeTaxonomiesOperatorString);
          console.log('activeFiltersString');
          console.log(activeFiltersString + activeTaxonomiesOperatorString);
          console.log('========');
        }
      }
      logJSONData(fetchString);
    })
  })
  //tags[terms]=22,23&tags[operator]=AND

  async function logJSONData(fetchString) {
    // await fetch('https://musicc-gutenberg.test/wp-json/wp/v2/track?mood=4,57')
    // ======================= const fetchString = 'https://musicc-gutenberg.test/wp-json/wp/v2/track?' + taxonomiesString + ;
    // fetchString = 'https://musicc-gutenberg.test/wp-json/wp/v2/track?instrument[terms]=3,60&instrument[operator]=AND';

    // await fetch(fetchString)
    await fetch('https://musicc-gutenberg.test/wp-json/wp/v2/track?' + fetchString)
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


});