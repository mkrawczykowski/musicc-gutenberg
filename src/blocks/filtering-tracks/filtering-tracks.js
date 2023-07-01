document.addEventListener('DOMContentLoaded', () => {
  const termsFilters = document.querySelectorAll('.filtering-tracks__terms-widget .filtering-tracks__term');
  let existingTaxonomies = [];
  let activeFilters = {};
  let visibleFilters = {
    instrument: ['64', '3'],
    mood: ['65', '61', '62'],
  };

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

  const updateVisibleFilters = () => {
    if (Object.keys(visibleFilters).length) {
      for (const visibleFiltersTaxonomy in visibleFilters) {
        const allFilterTaxonomies = document.querySelectorAll(`[data-filter-taxonomy="${visibleFiltersTaxonomy}"]`);

        allFilterTaxonomies.forEach(allFilterTaxonomy => {
          const tArray = visibleFilters[visibleFiltersTaxonomy];

          if (!arrayContains(tArray, allFilterTaxonomy.dataset.filterTermId)) {
            allFilterTaxonomy.classList.add('hidden');
          }
        })
      }
    }
  }

  updateVisibleFilters();



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

  console.log('existingTaxonomies');
  console.log(existingTaxonomies);

  termsFilters.forEach(termsFilter => {
    termsFilter.addEventListener('click', () => {
      termsFilter.classList.toggle('active');
      let activeFiltersString = '';
      let activeTaxonomiesOperatorString = '';
      let fetchString = '';

      if (termsFilter.classList.contains('active')) {
        activeFilters[termsFilter.dataset.filterTaxonomy].push(termsFilter.dataset.filterTermId);
        console.log(activeFilters[termsFilter.dataset.filterTaxonomy]);
      }

      if (!termsFilter.classList.contains('active')) {
        activeFilters[termsFilter.dataset.filterTaxonomy] = removeFromArray(activeFilters[termsFilter.dataset.filterTaxonomy], termsFilter.dataset.filterTermId);
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
        }
      }
      logJSONData(fetchString);
    })
  })

  async function logJSONData(fetchString) {
    await fetch('https://musicc-gutenberg.test/wp-json/wp/v2/track?' + fetchString)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
        }
      })
      .then(data => {
        data.forEach((dataItem => {
          console.log('========== ITEM =========')
          console.log(dataItem);
          existingTaxonomies.forEach(existingTaxonomy => {
            console.log(dataItem[existingTaxonomy]);
          })

        }));
      })
  };
});