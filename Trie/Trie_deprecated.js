const _add = (store, chars) => {
  if(chars.length === 0) {
    return store;
  }
  const char = chars[0];
  if(store[char] == null) {
    store[char] = {};
  }
  return _add(store[char], chars.slice(1));
}

// Find all branches that match the keyword
/*
- Find leaf branch for the current character set
- Generate all words based on that leaf
*/
const _getLeafNode = (store, chars) => {
  if(chars.length === 0) {
    return store;
  }
  if(store[chars[0]] == null) {
    return null;
  }
  return _getLeafNode(store[chars[0]], chars.slice(1));
}

// Perform depth first traversal, generate words as we bubble up the tree 
const _getSubPaths = (store) => {
  if(store == null) {
    return [];
  }
  const keys = Object.keys(store);
  let results = [];
  for(let key of keys) {
    const subWords = _getSubPaths(store[key]);
    const generatedWords = [key].concat(subWords.map(path => key.concat(path)));
    results = results.concat(generatedWords);
  }
  return results;
}

const getTrie = () => {
  let trie = {};
  return {
    add(entry, item) {
      const chars = entry.split('');
      _add(trie, chars);
      return this;
    },
    search(searchTerm) {
      const matchedLeafNode = _getLeafNode(trie, searchTerm.split(''));
      if(matchedLeafNode === null) {
        return [];
      }
      return _getSubPaths(matchedLeafNode).map(match => searchTerm.concat(match));
    },
    print() {
      return JSON.stringify(trie);
    },
  }
}


class Node {
  constructor(value) {
    this.value = value;
    this.
  }
}

class Trie {
  constructor() {
    this.trie = {};
  }
  add(entry, item) {
    const chars = entry.split('');
    chars.reduce((acc, char, index) => {
      if(acc[char] == null) {
        acc[char] = {
          value: char,
          children: {},
          isDelimiter: index === chars.length - 1, 
        };
      }
      return acc[char].children;
    }, this.trie);
    return this;
  }
  _findSubTree(path) {
    return path.reduce((acc, key) => acc === null ? null : acc[key].children, this.trie);
  }
  _getSubPaths(trie) {
    if(trie == null || Object.keys(trie).length === 0) {
      return [];
    }
    return Object.keys(trie).reduce((acc, key) => {
      const currentNode = trie[key];
      const subPaths = this._getSubPaths(currentNode.children);
      console.log(subPaths);
      if(!currentNode.isDelimiter) {
        // If the current node is not an ending character, we need to skip the entries for the current term, but not for its subtrees 
        return acc.concat(subPaths.map(path => currentNode.value.concat(path)));
      }
      const possibleWords = [currentNode.value].concat(subPaths.map(path => currentNode.value.concat(path))); 
      return acc.concat(possibleWords);
    }, []);
  }
  search(searchTerm) {
    const subTree = this._findSubTree(searchTerm.split(''));
    if(subTree === null) {
      return [];
    }
    return this._getSubPaths(subTree).map(path => searchTerm.concat(path));
  }
  print() {
    return JSON.stringify(this.trie);
  }
}