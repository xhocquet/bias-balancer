const biasData = require('./bias_data.json');

async function init() {
  const URL = document.URL
  const toplevelRegex = /(www1?\.)?([a-zA-Z0-9]+\.)?([a-zA-Z0-9]+\.)?([a-zA-Z0-9]+\.[a-z]{2,3})/
  const matches = URL.match(toplevelRegex)
  const toplevelDomain = matches[matches.length - 1]
  console.log(toplevelDomain)
  console.log(biasData.mean[toplevelDomain]);

  if (!biasData.mean[toplevelDomain]) return true

  console.log(`found ${toplevelDomain} in bias dataset`)

  chrome.storage.sync.get('biasMeasure', function(items) {
    console.log('fetched storage')
    console.log(items)
    let newBiasMeasure = biasData.mean[toplevelDomain]
    if (!!items.biasMeasure) {
      newBiasMeasure += items.biasMeasure
    }

    chrome.storage.sync.set({biasMeasure: newBiasMeasure}, function() {
      console.log('Settings saved with new bias measure', newBiasMeasure);
    });
  });
}

void init();
