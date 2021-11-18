fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
        // Problem 1: filter data to only include objects with tile of
        // more than 6 words then map this so only the title is shown
        let result = data.filter(getWordCount).map(obj => obj.title);

        // Console log the result
        console.log(result);

        // Problem 2: map objects so only the body is shown then
        // reduce the array down to a single large string of all
        // bodys text. Split this so each word is its own value in 
        // an array then reduce this counting the number of times
        // each word appears
        result = data.map(obj => obj.body)
        .reduce(concatStrings).split(' ')
        .reduce((obj, word) => {
            obj[word] = (obj[word] || 0) + 1;
            return obj;
          }, {});

        console.log(result);

    });

/**
 * Callback function for the filter function
 * Finds the number of words in an objects title
 * returns true if the title is greater than 6 words
 * returns false if the title is less than 6 words
 */
getWordCount = (obj) => {
    let wordCount = obj.title.match(/(\w+)/g).length;
    
    return wordCount > 6;
}

/**
 * Reducer function to add strings together
 */
concatStrings = (prevString, currString) => {
    return prevString + currString;
}