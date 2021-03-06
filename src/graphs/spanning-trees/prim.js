var Heap = require('../../data-structures/heap').Heap;

/**
 * Graph vertex
 *
 * @constructor
 * @public
 * @param {number} id The id of the vertex
 */
function Vertex(id) {
  'use strict';
  this.id = id;
}

/**
 * Graph edge
 *
 * @constructor
 * @public
 * @param {Vertex} e Vertex which this edge connects
 * @param {Vertex} v Vertex which this edge connects
 * @param {number} distance Weight of the node
 */
function Edge(e, v, distance) {
  'use strict';
  this.e = e;
  this.v = v;
  this.distance = distance;
}

/**
 * Graph
 *
 * @constructor
 * @public
 */
function Graph(edges, nodesCount) {
  'use strict';
  this.edges = edges || [];
  this.nodesCount = nodesCount || 0;
}

/**
 * Prim's algorithm for minimum spanning tree
 *
 * @public
 * @return {Graph} Graph which is the minimum spanning tree
 */
Graph.prototype.prim = (function () {
  'use strict';

  var queue;

  /**
   * Initialize the algorithm.
   *
   * @private
   */
  function init() {
    queue = new Heap(compareEdges);
  }

  /**
   * Used for comparitions in the heap
   *
   * @private
   * @param {Vertex} a First operand of the comparition
   * @param {Vertex} b Second operand of the comparition
   * @return {number} Number which which is equal, greater or less then zero and
   *  indicates whether the first vertex is "greater" than the second.
   */
  function compareEdges(a, b) {
    return b.distance - a.distance;
  }

  /**
   * Prim's algorithm implementation
   *
   * @public
   * @return {Graph} Minimum spanning tree.
   */
  return function () {
    init.call(this);
    var inTheTree = {},
        startVertex = this.edges[0].e.id,
        spannigTree = [],
        parents = {},
        distances = {},
        current;
    inTheTree[startVertex] = true;
    queue.add({
      node: startVertex,
      distance: 0
    });
    for (var i = 0; i < this.nodesCount - 1; i += 1) {
      current = queue.extract().node;
      inTheTree[current] = true;
      this.edges.forEach(function (e) {
        if (inTheTree[e.v.id] && inTheTree[e.e.id]) {
          return;
        }
        var collection = queue.getCollection(),
            node;
        if (e.e.id === current) {
          node = e.v.id;
        } else if (e.v.id === current) {
          node = e.e.id;
        } else {
          return;
        }
        for (var i = 0; i < collection.length; i += 1) {
          if (collection[i].node === node) {
            if (collection[i].distance > e.distance) {
              queue.changeKey(i, {
                node: node,
                distance: e.distance
              });
              parents[node] = current;
              distances[node] = e.distance;
            }
            return;
          }
        }
        queue.add({
          node: node,
          distance: e.distance
        });
        parents[node] = current;
        distances[node] = e.distance;
      });
      console.log(queue._heap);
      console.log();
    }
    for (var node in parents) {
      spannigTree.push(new Edge(node, parents[node], distances[node]));
    }
    return new Graph(spannigTree);
  };

}());

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * *  Sample graph * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
 
(function () {
  'use strict';
  var graph, edges = [];
  edges.push(new Edge(new Vertex(0), new Vertex(1), 4));
  edges.push(new Edge(new Vertex(0), new Vertex(7), 8));
  edges.push(new Edge(new Vertex(1), new Vertex(7), 11));
  edges.push(new Edge(new Vertex(1), new Vertex(2), 8));
  edges.push(new Edge(new Vertex(2), new Vertex(8), 2));
  edges.push(new Edge(new Vertex(2), new Vertex(3), 7));
  edges.push(new Edge(new Vertex(2), new Vertex(5), 4));
  edges.push(new Edge(new Vertex(2), new Vertex(3), 7));
  edges.push(new Edge(new Vertex(3), new Vertex(4), 9));
  edges.push(new Edge(new Vertex(3), new Vertex(5), 14));
  edges.push(new Edge(new Vertex(4), new Vertex(5), 10));
  edges.push(new Edge(new Vertex(5), new Vertex(6), 2));
  edges.push(new Edge(new Vertex(6), new Vertex(8), 6));
  edges.push(new Edge(new Vertex(8), new Vertex(7), 7));
  graph = new Graph(edges, 9);

  console.log(graph.prim());
}());


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
