import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges, } from 'reactflow';
import { produce } from 'immer';
import Simulator from './simulator';

const initialNodes = require('./defaultNodes.json');
const initialEdges = require('./defaultEdges.json');

const storeManager = create(produce((set, get) => ({

	nodes: initialNodes,
	edges: initialEdges,

	/*updateNodeInputs: (id, newInputs) => {
		const node = get().nodes.find(node => node.id === id);

		set({
			nodes: get().nodes.map(node =>
				node.id === id ? { ...node, data: { ...node.data, inputs: newInputs } } : node
			)
		});
	},*/

	simulateCircuit: () => {
		// Call the simulation function with the current state of nodes and edges
		const graph = Simulator(get().nodes, get().edges);

		alert('Simulated graph!');
		console.log('Simulated graph:', JSON.stringify(graph));

		// Apply the simulation results to the state
		// This assumes that your nodes have some 'data.state' property to reflect their simulation state
		/* set(state => {
			state.nodes = state.nodes.map(node => {
				if (graph[node.id]) {
					return {
						...node,
						data: {
							...node.data,
							state: graph[node.id].state,
						},
					};
				}
				return node;
			});

			// Optional: If you have edge animations or styles to reflect logic flow,
			// update your edges based on new logic state here
		}); */
	},


	onNodesChange: (changes) => {
		console.log('Nodes changed:', changes);

		set({
			nodes: applyNodeChanges(changes, get().nodes),
		});
	},
	onEdgesChange: (changes) => {
		console.log('Edges changed:', changes);
		set({
			edges: applyEdgeChanges(changes, get().edges),
		});
	},
	addConnection: (connection) => {
		console.log('Connecting:', connection);
		set({
			edges: addEdge(connection, get().edges),
		});

	},
	setNodes: (nodes) => {
		set({ nodes });
	},

	setEdges: (edges) => {
		set({ edges });
	},

	addNode: (node) => {
		let newNode = node;

		if (newNode.type === 'in_button') {
			newNode.data.output = { 0: 0 };
		}
		console.log('Adding node:', newNode);
		set({
			nodes: [...get().nodes, newNode],
		});
	},

	updateEdge: (oldEdge, newConnection) => {
		console.log('Updating edge:', oldEdge, 'with:', newConnection);
		//set((state) => ({
		//	...state,
		//	edges: applyEdgeChanges([newConnection], state.edges)
		//}));

		set({
			edges: applyEdgeChanges([newConnection], get().edges)
		});
	},

	removeEdge: (edge) => {
		console.log('Removing edge:', edge);
		//set((state) => ({
		//	...state,
		//	edges: state.edges.filter((e) => e.id !== edge.id),
		//}));

		set({
			edges: get().edges.filter((e) => e.id !== edge.id),
		});
	},

	resetAnimatedEdges: () => {
		console.log('Resetting animated edges');
		set((state) => ({
			...state,
			edges: state.edges.map((edge) => ({
				...edge,
				animated: false,
			})),
		}));
	},

	toggleEdgeAnimation: (edgeId) => {
		console.log('Toggling edge animation:', edgeId);
		set((state) => ({
			...state,
			edges: state.edges.map((edge) => ({
				...edge,
				animated: edge.id === edgeId ? !edge.animated : edge.animated,
			})),
		}));
	},
})));


export default storeManager;
