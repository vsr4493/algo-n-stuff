/**
 * DS:
 * 	- Queue (Get/Put - O(N)) Using LinkedList
 * 		- Max Size: Total number of frames available in the cache
 * 		- Most recently used pages will be near the front
 * 		- Least recently used pages will be near the back
 * 	- Hash :: pageNumber -> Reference to the Node in the Queue
 */
/**
 * Implementation:
 * - When a page is accessed:
 * 	- Hit: Bring to the front of the queue
 *  - Miss: Add to the front of the queue
 *  	- If the queue is full, remove the rear node
 */

const createLRUCache = (capacity = 3) => {
	const Proto = {
		/**
		 * Initialize the cache
		 * @return {[type]} [description]
		 */
		init: function(){
			this.store = createDoublyLinkedList();
			this.hash = new Map();
			this.capacity = capacity;
			return this;
		},
		/**
		 * Add a new item into the cache
		 * @return {[Object]} Hit: set the item in the cache and return this for chaining
		 */
		set: function(key, item){
			// Add a new node to the cache
			if(this.store.length() === capacity){
				console.log("capacity exceeded removing old node");
				const removedNode = this.store.remove();
				this.hash.delete(removedNode.key);
			}
			const addedNode = this.store.add({key: key, value: item});
			this.hash.set(key, addedNode);
			//TODO: Logic to maintain capacity
		},
		/**
		 * Remove an item from the cache
		 * @return {[Object]} Hit: returns the item, undefined if not found
		 */
		get: function(key){
			const node = this.hash.get(key);
			//HIT
			if(typeof node !== "undefined"){
				//Shift the node to first position in the queue
				const key = node.key;
				const value = node.value;
				this.store.removeNode(node);
				this.store.add({key, value});
				return this;
			}
			return node && node.value;
		},
		remove: function(key){
			const node = this.hash.get(key);
			this.store.removeNode(node);
			this.hash.delete(key);
		},
		toJSON: function(debug){
			console.log(this.store.toJSON());
			return Array.from(this.hash).map(([key, node]) => {
				return {
					key,
					value: node.value //Get value from stored node
				}
			});
		}
	}
	return Object.create(Proto).init();
}

const createDoublyLinkedList = require('./DoublyLinkedList.js');

function main(){
	const cache = createLRUCache();
	cache.set('ITEM ONE', 'ITEM ONE');
	cache.set('ITEM TWO', 'ITEM TWO');
	cache.set('ITEM THREE', 'ITEM THREE');
	cache.get('ITEM ONE');
	console.log(cache.toJSON());
	cache.set('ITEM FOUR', 'ITEM FOUR');
	console.log(cache.toJSON());
}

main();

