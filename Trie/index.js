const getTrie = require('./Trie');
const trie = getTrie();

trie.add('abc').add('abe').add('abxef').add('abxed').add('abx');
//trie.delete('abc');
//console.log(trie.search('ab'));
trie.delete('abxed').delete('abxef');
console.log(trie.search('ab'));
//console.log(trie.add('abc').add('abe').print());