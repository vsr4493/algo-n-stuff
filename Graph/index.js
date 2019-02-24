class GraphError extends Error {}

class Graph {

  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
  }

  get size() {
    return this.nodes.size;
  }

  get relations() {
    return this.edges.size;
  }

  __checkIfNodeExists({...nodes, message = ''}) {
    for(node of nodes) {
      if(!this.nodes.has(node)) {
        throw new GraphError(`${node} does not exist.${message.length > 0 ? '\n'+message : ''}`);
      }
    }
  }

  __addEdge(from, to) {
    const adjacentNodes = this.edges.get(from);
    adjacentNodes.add(to);
    return this;
  }

  __removeEdge(from, to) {
    const adjacentNodes = this.edges.get(from);
    adjacentNodes.delete(to);
    return this;
  }

  addVertex(node, data) {
    this.nodes.set(node, data);
    this.edges.set(node, new Set());
    return this;
  }

  addEdge(from, to) {
    this.__checkIfNodeExists(from, to);
    this.__addEdge(from, to).__addEdge(to, from);
  }

  removeEdge(from, to) {
    this.__checkIfNodeExists(from, to);
    this.__removeEdge(from, to).__removeEdge(to, from);
  }

  __traverseDFS(visited, node, fn) {
    const adjacentNodes = this.edges.get(node);
    visited.set(node, true);
    fn(node);
    if(adjacentNodes.length === 0) {
      return;
    }
    for(let adjacentNode of adjacentNodes) {
      if(!visited.get(adjacentNode)) {
        this.__traverseDFS(visited, adjacentNode, fn);
      }
    }
  }

  traverseDFS(node, fn) {
    this.__checkIfNodeExists(node);
    // For each adjacent node for the graph
    const adjacentNodes = this.edges.get(node);
    const visited = new Map();
    this.__traverseDFS(visited, node, fn);
  }

  traverseBFS(node, fn) {
    this.__checkIfNodeExists(node);
    // For each node, maintain a list of nodes left to visit
    // visit them in order once the previous nodes have been visited
    const nodesToVisit = new Set([node]);
    const visited = new Map();
    for(let node of nodesToVisit) {
      if(!visited.get(node)) {
        fn(node);
        for(let nodeToVisit of this.edges.get(node)) {
          nodesToVisit.add(nodeToVisit);
        }
      }
      nodesToVisit.delete(node);
      visited.set(node, true);
    }
  }

  // Traverse BFS while storing the path to each sub-route
  getPath(from, to) {
    this.__checkIfNodeExists(from, to);
    const nodesToVisit = new Map();
    nodesToVisit.set(from, []);
    for(let node of nodesToVisit.keys()) {
      for(let nodeToVisit of this.edges.get(node)) {
        const route = nodesToVisit.get(node);
        if(nodeToVisit === to) {
          return route.concat(nodeToVisit);
        }
        if(!nodesToVisit.has(nodeToVisit)) {
          nodesToVisit.set(nodeToVisit, route.concat(nodeToVisit));
        }
      }
    }
    return [];
  }

  toString() {
    const output = Array.from(this.nodes.keys()).map(key => {
      const edges = Array.from(this.edges.get(key)).join(', ');
      return `${key} -> ${edges}`;
    }).join(' | ');
    return output;
  }
}

console.clear();
const g = new Graph();

g.addVertex('a', {});
g.addVertex('b', {});
g.addVertex('c', {});
g.addVertex('d', {});
g.addVertex('e', {});
g.addVertex('f', {});
g.addEdge('b', 'c', {});
g.addEdge('b', 'd', {});
g.addEdge('c', 'a', {});
g.addEdge('c', 'e', {});
g.addEdge('e', 'f', {});
g.addEdge('d', 'f', {});



const fn = (node) => {
  console.log(`Visiting ${node}`);
}
console.log(`Graph: ${g.toString()}`);
console.log("Traversing DFS");
g.traverseDFS('b', fn);
console.log("Traversing BFS");
g.traverseBFS('b', fn);

console.log(g.getPath('b', 'f'));

