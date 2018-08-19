import { STARTNODENAME_CHANGED, ENDNODENAME_CHANGED, GRAPH_CHANGED } from './types'

export const startNodeNameChanged = (text) => {
 return {
   type: STARTNODENAME_CHANGED,
   payload: text
 }
}

export const endNodeNameChanged = (text) => {
  return {
    type: ENDNODENAME_CHANGED,
    payload: text
  }
}

export const graphChanged = ({ startNodeName, endNodeName }) => {
  return {
    type: GRAPH_CHANGED,
    payload: dijkstra(startNodeName, endNodeName)
    //startNodeName: "J",
    //endNodeName: "A"
  }
}

// returns the minimum cost and path to reach endNodeName
const dijkstra = (startNodeName, endNodeName) => {

  const graph = {
    A:{E: 20, D: 19, B:12, G: 16},
    B:{D:13, C: 5, I: 15},
    C:{D: 5},
    D:{E: 7},
    E:{F: 5},
    F:{A: 5},
    G:{F: 11},
    H:{G: 6, A: 4, B: 19},
    I:{H: 21, J: 10},
    J:{B: 7, C: 15}
  }

  // track the lowest cost to reach each node
  let costs = {};
  costs[endNodeName] = "Infinity";
  costs = Object.assign(costs, graph[startNodeName]);


  // track paths
  const parents = {endNodeName: null};
  for (let child in graph[startNodeName]) {
      parents[child] = startNodeName;
  }

  // track nodes that have already been processed
  const processed = [];

  let node = lowestCostNode(costs, processed);

  while (node) {
      let cost = costs[node];
      let children = graph[node];
      for (let n in children) {
          if (String(n) === String(startNodeName)) {
              log("WE DON'T GO BACK TO START");
          } else {
              log("StartNodeName: " + startNodeName);
              log("Evaluating cost to node " + n + " (looking from node " + node + ")");
              log("Last Cost: " + costs[n]);
              let newCost = cost + children[n];
              log("New Cost: " + newCost);
              if (!costs[n] || costs[n] > newCost) {
                  costs[n] = newCost;
                  parents[n] = node;
                  log("Updated cost und parents");
              } else {
                  log("A shorter path already exists");
              }
          }
      }
      processed.push(node);
      node = lowestCostNode(costs, processed);
  }

  let optimalPath = [endNodeName];
  let parent = parents[endNodeName];
  while (parent) {
      optimalPath.push(parent);
      parent = parents[parent];
  }
  optimalPath.reverse();

  const results = {
      distance: costs[endNodeName],
      path: optimalPath
  };
  return results;
};

const log = (message) => {
  const logging = false;
  if (logging) {
      console.log(message);
  }
}

const lowestCostNode = (costs, processed) => {
  return Object.keys(costs).reduce((lowest, node) => {
      if (lowest === null || costs[node] < costs[lowest]) {
          if (!processed.includes(node)) {
              lowest = node;
          }
      }
      return lowest;
  }, null);
};
