document.addEventListener('DOMContentLoaded', () => {
  const termsFilters = document.querySelectorAll('.filtering-tracks__terms-widget .filtering-tracks__term');
  const jsColTracks = document.getElementById('js-col-tracks');
  const jsLoadingList = document.getElementById('js-loading-list');
  let existingTaxonomies = [];
  let activeFilters = {};
  let trackHTMLString = '';
  let visibleFilters = {
    // instrument: ['64', '3'],
    // mood: ['65', '61', '62'],
  };

  /**
   * 
   * @param {array} array - One-dimensional array
   * @param {string or number} item - Item to look for
   * @returns true or false
   */
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

  const updateVisibleFilters = (taxonomyName, taxonomyTerms) => {
    // console.log('=======updateVisibleFilters========')
    // console.log('taxonomyName')
    // console.log(taxonomyName)
    // console.log('taxonomyTerms')
    // console.log(taxonomyTerms)

    if (taxonomyTerms.length) {
      taxonomyTerms.forEach(taxonomyTerm => {
        if (visibleFilters[taxonomyName] === undefined) {
          visibleFilters[taxonomyName] = [];
        }
        // console.log('taxonomyTerm')
        // console.log(taxonomyTerm)
        // console.log('visibleFilters[taxonomyName]')
        // console.log(visibleFilters[taxonomyName])
        // if (!Object.keys(visibleFilters)) {
        //   console.log('był pusty, dodaję ' + taxonomyName)
        //   visibleFilters[taxonomyName] = [];
        // }
        if (!arrayContains(visibleFilters[taxonomyName], taxonomyTerm)) {
          visibleFilters[taxonomyName].push(taxonomyTerm);
        }
      })
    }

    console.log('88888888888888888 visibleFilters 88888888888888888888888')
    console.log(visibleFilters);
    updateHTMLFilters();

  }

  /** Hides/shows HTML elements (adding/removing .hidden class) based on visibleFilters object. Doesn't do anything if visibleFilters is empty
   * 
   */
  const updateHTMLFilters = () => {
    if (Object.keys(visibleFilters).length) {
      for (const visibleFiltersTaxonomy in visibleFilters) {
        const allFilterTaxonomies = document.querySelectorAll(`[data-filter-taxonomy="${visibleFiltersTaxonomy}"]`);

        allFilterTaxonomies.forEach(allFilterTaxonomy => {
          if (!arrayContains(visibleFilters[visibleFiltersTaxonomy], allFilterTaxonomy.dataset.filterTermId)) {
            allFilterTaxonomy.classList.add('hidden');
          }
          if (arrayContains(visibleFilters[visibleFiltersTaxonomy], allFilterTaxonomy.dataset.filterTermId)) {
            allFilterTaxonomy.classList.remove('hidden');
          }
        })
      }
    }
  }

  /**
  * @param {String} HTML representing any number of sibling elements
  * @return {NodeList} 
  */
  function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    console.log('template')
    console.log(typeof template.content.childNodes)
    return template.content.childNodes;
  }

  const removeFromArray = (array, itemToRemove) => {
    if (arrayContains(array, itemToRemove)) {
      const itemIndex = array.indexOf(itemToRemove);
      const arrayWithItemRemoved = array.toSpliced(itemIndex, 1);
      return arrayWithItemRemoved;
    }
    return array;
  }

  const buildTracksHTML = (allTracksArray) => {
    if (allTracksArray.length) {
      jsColTracks.replaceChildren();
      allTracksArray.forEach(singleTrackData => {
        // const divTrack = document.createElement("div");
        // divTrack.classList.add('track');

        // const h3TrackName = document.createElement("h3");
        // const h3TrackNameText = document.createTextNode(singleTrackData.title.rendered);
        // h3TrackName.classList.add('track-name');
        // h3TrackName.appendChild(h3TrackNameText);
        // divTrack.appendChild(h3TrackName);

        // const divTrackDescription = document.createElement("div");
        // const divTrackDescriptionText = document.createTextNode(singleTrackData.content.rendered)
        // divTrackDescription.classList.add('track-description');

        // divTrackDescription.appendChild(divTrackDescriptionText);
        // divTrack.appendChild(divTrackDescription);
        // console.log('divTrack');
        // console.log(divTrack);
        loadingListHTMLString = `
          <div class="filtering-tracks__loading-list active" id="js-loading-list">
        `;

        trackHTMLString = `
          <div class="track">
            <h3 class="track-name">${singleTrackData.title.rendered}</h3>
            <div class="track-description">${singleTrackData.content.rendered}</div>
            
            <div class="track-box">
              <div class="track-box__player">
                <button class="track-box__button track-box__button--pause"></button>
                <h3 class="track-box__player-name">${singleTrackData.title.rendered}</h3>
                <div class="track-box__track">
                  <span class="track-box__pointer"></span>
                </div>
                <span class="track-box__time">05:50</span>
              </div>
              
              <ul class="track-box__icons">
                <li class="track-box__icon track-box__icon--download"><a href="#" target="_blank" rel="nofollow" class="track-box__link"></a></li>
                <li class="track-box__icon track-box__icon--share"><a href="#" target="_blank" rel="nofollow" class="track-box__link"></a></li>
              </ul>
            </div>
          </div>
        `;
        const trackElement = htmlToElements(trackHTMLString);
        // console.log(typeof trackElement);
        // jsColTracks.append(trackElement);
        // jsColTracks.insertAdjacentHTML('afterbegin', loadingListHTMLString);
        jsColTracks.insertAdjacentHTML('afterbegin', trackHTMLString);

      })
    }
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
    jsLoadingList.classList.add('active');
    await fetch('https://musicc-gutenberg.test/wp-json/wp/v2/track?' + fetchString)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
        }
      })
      .then(data => {
        console.log('data');
        console.log(data);

        visibleFilters = {};
        data.forEach((dataItem => {

          console.log('====================== ITEM =======================')
          console.log(dataItem);
          existingTaxonomies.forEach(existingTaxonomy => {
            let thisTaxonomyArray = [];
            dataItem[existingTaxonomy].forEach(arrayItem => {
              if (!arrayContains(thisTaxonomyArray, arrayItem)) {
                thisTaxonomyArray.push(arrayItem);
              }
            })

            // console.log('thisTaxonomyArray ' + existingTaxonomy);
            // console.log(thisTaxonomyArray);

            // console.log(dataItem[existingTaxonomy]);
            updateVisibleFilters(existingTaxonomy, thisTaxonomyArray);


          })

        }));
        console.log('================================================= END ==================================================');

        buildTracksHTML(data);
        // trackHTMLString

        // jsColTracks.insertAdjacentHTML('afterbegin', trackElement);
      })
    jsLoadingList.classList.remove('active');
  };
});