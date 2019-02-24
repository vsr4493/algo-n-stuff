const createNode = ({key = '', value = ''}) => ({
	key: key,
	value: value,
	prev: null,
	next: null
});

const createDoublyLinkedList = () => {	
	const Proto = {
		init: function() {
			this.head = null;
			this.tail = null;
			return this;
		},
		/**
		 * Add a node to the list
		 * @param {Object} data to be stored in the node 
		 * @param {Number} Index after which the node is to be added - add to front if no index provided
		 */
		add: function({key = '', value = '', index = -1}) {
			const newNode = createNode({key, value});
			if(this.isEmpty()){
				this.head = newNode;
				this.tail = newNode;
			} else {
				if(index === -1 ) {
					//Add to front
					const head = this.head;
					newNode.next = head;
					head.prev = newNode;
					this.head = newNode;
				} else {
					//Add after given index
					let itr = this.head;
					let ctr = 0;
					while(itr != null && ctr < index){
						itr = itr.next;
						ctr += 1;
					}
					newNode.next = itr.next;
					newNode.prev = itr;
					if(itr.next){
						itr.next.prev = newNode;
					}	
					itr.next = newNode;
				}
			}
			//Return the added node
			return newNode;
		},
		/**
		 * Remove a node from the list - Delete from the end if no index is provided
		 * @param  {Integer} : remove the node at the given index
		 */
		remove: function(index = -1) {
			if(index === -1 || this.isEmpty()){
				const node = this.tail;
				this.tail = this.tail.prev;
				this.tail.next = null;
				return node;	
			} else {
				let itr = this.head;
				let ctr = 0;
				while(itr !== null && ctr < index) {
					itr = itr.next;
					ctr += 1;
				}
				return this.removeNode(itr);
			}
		},
		removeNode: function(node){
			if(node == null){
				return;
			}
			if(node.prev === null && node.next === null) {
				this.head = null;
				this.tail = null;
			} else if(node.prev === null) {
				node.next.prev = null;
				this.head = node.next;
			} else {
				node.prev.next = null;
				this.tail = node.prev;
			}
			return node;
		},
		isEmpty: function() {
			return this.head == null && this.tail == null;
		},
		iterator: function*(){
			let itr = this.head;
			while(itr !== null){
				yield [itr.key, itr.value];
				itr = itr.next;
			}	
		},
		toJSON: function(){
			return JSON.stringify(Array.from(this.iterator()));
		},
		length: function(){
			let ctr = 0 ;
			let itr = this.head;
			while( itr!=null ){
				itr = itr.next;
				ctr += 1;
			}
			return ctr;
		}
	}
	return Object.create(Proto).init();
}

module.exports = createDoublyLinkedList;
