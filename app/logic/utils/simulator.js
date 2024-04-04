// Simulator.js

// ? new updates for simulator
/* 
 - somehow create map of entities
 - run function for each entity to get state after clock event (even for non clocked nodes)
 - update output state of each entity (to edge?) maybe somehow tie output states to edge states?
 */


 export default function Simulator(nodes, edges) {

	// Logic gate function
	const logicGates = {
		'2_and': (inputs) => inputs.every(value => value === 1) ? 1 : 0,
		'2_or': (inputs) => inputs.some(value => value === 1) ? 1 : 0,
		'2_not': (inputs) => inputs[0] === 1 ? 0 : 1,
		'2_nand': (inputs) => inputs.every(value => value === 1) ? 0 : 1,
		'2_nor': (inputs) => inputs.some(value => value === 1) ? 0 : 1,
		'2_xor': (inputs) => inputs.reduce((acc, value) => acc + value, 0) === 1 ? 1 : 0,
		'2_xnor': (inputs) => inputs.reduce((acc, value) => acc + value, 0) === 1 ? 0 : 1,
		'2_buffer': (inputs) => inputs[0],
		'2_led': (inputs) => inputs[0],
	};

	function constructGraph(nodes, edges) {
		const graph = nodes.reduce((acc, node) => {
			acc[node.id] = { ...node, inputs: [], state: false };
			return acc;
		}, {});

		edges = edges.filter(edge => graph[edge.source] && graph[edge.target])

		console.log('CG: graph:', JSON.stringify(graph));

		edges.forEach(edge => {
			const sourceNode = graph[edge.source];
			const targetNode = graph[edge.target];

			console.log('CG: edge:', edge);
			console.log('CG: targetNode:', JSON.stringify(targetNode));
			alert('CG: edge:' + edge);

			targetNode.inputs.push({
				nodeId: edge.source,
				outputHandle: edge.sourceHandle,
				inputHandle: edge.targetHandle
			});
		});

		console.log('CG: graph FINAL:', JSON.stringify(graph));

		return graph;
	}

	function topologicalSort(graph) {
		const inDegree = Object.fromEntries(Object.keys(graph).map(key => [key, 0]));
		const queue = [];
		const sorted = [];

		// Compute in-degree (number of dependencies) for each node
		for (const nodeId in graph) {
			graph[nodeId].inputs.forEach(input => {
				inDegree[input.nodeId]++;
			});
		}

		// Initialize the queue with nodes that have no incoming edges
		for (const nodeId in inDegree) {
			if (inDegree[nodeId] === 0) {
				queue.push(graph[nodeId]);
			}
		}

		// Process nodes with no incoming edges
		while (queue.length > 0) {
			const node = queue.shift();
			sorted.push(node);

			// Decrease the in-degree of each dependent node
			node.inputs.forEach(input => {
				const inputNode = graph[input.nodeId];
				inDegree[input.nodeId]--;
				if (inDegree[input.nodeId] === 0) {
					queue.push(inputNode);
				}
			});
		}

		return sorted;
	}


	const graph = constructGraph(nodes, edges);
	const sortedNodes = topologicalSort(graph);

	console.log('SORTED:', JSON.stringify(sortedNodes));

	sortedNodes.forEach(node => {
		// You need to specify how the inputs of each logic gate are selected and how the state is passed
		// For this example, assume that we have node.data.inputs that is a mapping of the state values
		const inputValues = node.inputs.map(input => graph[input.nodeId].state);

		console.log('Node:', node);

		console.log('Input values:', JSON.stringify(inputValues));

		if (logicGates[node.type]) {
			console.log('Updated state:', logicGates[node.type](inputValues));
			//node.state = logicGates[node.type](inputValues);
		}

		// If your graph includes other behaviors (e.g., button presses, LED outputs),
		// you should handle these cases here as well.
	});

	return graph;
}