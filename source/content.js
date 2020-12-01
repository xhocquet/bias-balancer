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
    let newIconPath = 'gray.png'
    let newBiasMeasure = biasData.mean[toplevelDomain]
    if (items.biasMeasure) { newBiasMeasure = items.biasMeasure + newBiasMeasure }

    switch (true) {
      case (newBiasMeasure < -100):
          newIconPath = '/blue-3-3.png'
          break;
      case (newBiasMeasure < -50):
          newIconPath = '/blue-2-3.png'
          break;
      case (newBiasMeasure < -20):
          newIconPath = '/blue-1-3.png'
          break;
      case (newBiasMeasure === 0):
          newIconPath = '/gray.png'
          break;
      case (newBiasMeasure < 20):
          newIconPath = '/red-1-3.png'
          break;
      case (newBiasMeasure < 50):
          newIconPath = '/red-2-3.png'
          break;
      default:
          newIconPath = '/red-3-3.png'
          break;
    }

    browser.runtime.sendMessage({iconPath: newIconPath})

    chrome.storage.sync.set({biasMeasure: newBiasMeasure}, function() {
      console.log('Settings saved with new bias measure', newBiasMeasure);
    });
  });
}

void init();
