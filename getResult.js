var fs = require('fs');
const fetch = require('node-fetch');


exports.getText = ( cb) =>{
  fetch('http://terriblytinytales.com/test.txt')
  .then(response => response.text())
  .then(data => getFreq(data))
  .then(wordsArray => cb(wordsArray))
  .catch(err => console.log(err))
}

getFreq = (data) => {

  //console.log(data);
  var wordsArray = wordTokens(data);
  var wordsMap = uniqueWords(wordsArray);
  var result = sortWords(wordsMap);

  return result;
}

// Split string
function wordTokens (text) {
  var wordsArray = text.split(/\s+/); //regex
  return wordsArray;
}

// Object for unique words
function uniqueWords (wordsArray) {
  var wordsMap = {};
  wordsArray.forEach(function (key) {
    if (wordsMap.hasOwnProperty(key)) {
      wordsMap[key]++;
    } else {
      wordsMap[key] = 1;
    }
  });
  return wordsMap;
}


function sortWords (wordsMap) {
  var result = [];
  result = Object.keys(wordsMap).map( key => {
    return {
      word: key,
      count: wordsMap[key]
    };
  });

  result.sort( (a, b) => {
    return b.count - a.count;
  });

  return result;

}

//getText();