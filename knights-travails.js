const moveOffsets = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
];

function legalMovesFrom(row, column, size) {
  const nextNodes = [];
  moveOffsets.forEach((offset) => {
    const nextNode = [];
    const nextRow = row + offset[0];
    const nextColumn = column + offset[1];
    if (
      nextRow >= 0 &&
      nextRow < size &&
      nextColumn >= 0 &&
      nextColumn < size
    ) {
      nextNode.push(nextRow, nextColumn);
      nextNodes.push(nextNode);
    }
  });

  return nextNodes;
}

function buildGraph(size) {
  const graph = new Map();
  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      graph.set(`[${row}, ${column}]`, legalMovesFrom(row, column, size));
    }
  }

  return graph;
}

function knightMoves(start, end = null) {
  const graph = buildGraph(8);
  const visited = [[null, start]];
  const queue = [start];

  while (queue.length !== 0) {
    const cur = queue.pop();

    if (cur[0] === end[0] && cur[1] === end[1]) {
      const path = [end];
      let curr = end;
      const checkArr = (arr) => arr[1][0] === curr[0] && arr[1][1] === curr[1];
      let prev = visited.find(checkArr)[0];
      while (curr !== start) {
        curr = prev;
        path.push(curr);
        [prev] = visited.find(checkArr);
      }

      return path.reverse();
    }

    graph.get(`[${cur[0]}, ${cur[1]}]`).forEach((node) => {
      if (
        !visited.some((arr) => arr[1][0] === node[0] && arr[1][1] === node[1])
      ) {
        visited.push([cur, node]);
        queue.unshift(node);
      }
    });
  }
}
