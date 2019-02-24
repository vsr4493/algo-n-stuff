const isNil = val => typeof val === 'undefined' || val === null;
const path = (pathArray, store) => {
  return pathArray.reduce((acc, key) =>  isNil(acc[key]) ? null : acc[key].children , store);
}

const getAllWords = (store) => {
  if(isNil(store) || Object.keys(store).length === 0) {
    return [];
  }
  return Object.keys(store).reduce((acc, key) => {
    const currentNode = store[key];
    // Generate all the possible suffixes based the current subtree
    const generatedWords = getAllWords(currentNode.children).map(word => currentNode.value.concat(word));
    if(currentNode.isDelimiter) {
      // If the current node is a delimeter, it must also count as an entry in the generated list of words
      return acc.concat([currentNode.value].concat(generatedWords));
    }
    // Push forward the word suffix generated so far, nothing to see here
    return acc.concat(generatedWords);
  }, []);
}

const getNode = ({ value, isDelimiter = false }) => ({
  value,
  children: {},
  isDelimiter,
});

const getTrie = () => {
  let store = {
    children: {},
  };
  return {
    add(termToAdd) {
      const chars = termToAdd.split(''); 
      // For the given path, generate an entry, creating a new node where applicable 
      chars.reduce((acc, char, index) => {
        if(isNil(acc[char])) {
          acc[char] = getNode({ value: char });
        } 
        // Delimiter must be marked if needed even if an entry already exists
        if(index === chars.length - 1) {
          acc[char].isDelimiter = true;
        }
        return acc[char].children;
      }, store.children);
      return this;
    },
    search(searchTerm) {
      const subTree = path(searchTerm.split(''), store.children);
      if(isNil(subTree)) {
        return [];
      }
      return getAllWords(subTree).map(matchedWord => searchTerm.concat(matchedWord));
    },
    print() {
      return JSON.stringify(store);
    },
    // Find the last node that has more than 1 children, and remove any nodes below it
    delete(termToRemove) {
      let currentNode = store;
      let protectedNode = null;
      let protectedNodeIndex = 0;
      const chars = termToRemove.split('');
      for (let keyIndex in chars) {
        currentNode = currentNode.children[chars[keyIndex]];
        // Check if currentNode is not null
        if(!isNil(currentNode)) {
          const hasDependentNodes = Object.keys(currentNode.children).length > 1;
          const isDifferentWord = keyIndex < chars.length - 1 && currentNode.isDelimiter;
          if(hasDependentNodes || isDifferentWord) {
            protectedNode = currentNode;
            protectedNodeIndex = keyIndex; 
          }
        }
      }
      if(isNil(protectedNode)) {
        return this;
      }
      const keyToRemove = chars[Number(protectedNodeIndex) + 1];
      delete protectedNode.children[keyToRemove];
      return this;
    },
  }
}

module.exports = getTrie;