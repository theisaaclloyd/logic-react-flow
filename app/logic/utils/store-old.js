// store.js
import {create} from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { applyNodeChanges, applyEdgeChanges, addEdge, Connection, Edge, Node, NodeChange, EdgeChange } from 'reactflow';
import { produce, enableMapSet } from 'immer';

enableMapSet();
// We'll use immer for immutability

// A helper function to create a new history entry
const newHistoryEntry = (nodes, edges) => ({ nodes, edges });

// Our initial state
const initialHistory = {
	past: [],
	present: newHistoryEntry([], []),
	future: [],
};

// Store definition with undo/redo capabilities
export const useStore = create(produce((set, get) => ({
	history: initialHistory,
	nodes: [],
	edges: [],

	addNode: (newNode) => {
		console.log('Adding node:', newNode);
		set((state) => {
			state.nodes.push(newNode);
		});
	},
	removeNode: (nodeId) => {
		console.log('Removing node:', nodeId);
		set((state) => {
			state.nodes = state.nodes.filter((node) => node.id !== nodeId);
		});
	},
	removeEdge: (edge) => {
		console.log('Removing edge:', edge);
		set((state) => {
			state.edges = state.edges.filter((e) => e.id !== edge.id);
		});
	},
	onEdgeUpdate: (oldEdge, newConnection) => {
		console.log('Updating edge:', oldEdge, 'with:', newConnection);
		set((state) => {
			state.edges = applyEdgeChanges([newConnection], state.edges);
		});
	},
	onConnect: (connection) => {
		console.log('Connecting:', connection);
		set((state) => {
			state.edges = addEdge(connection, state.edges);
		});
	},

	onNodesChange: (changes) => {
		console.log('Node changes:', changes);
		const nodes = applyNodeChanges(changes, get().history.present.nodes);
		set((state) => {
			state.history.past.push(newHistoryEntry(state.history.present.nodes, state.history.present.edges));
			state.history.present.nodes = nodes;
		});
	},
	onEdgesChange: (changes) => {
		console.log('Edge changes:', changes);
		const edges = applyEdgeChanges(changes, get().history.present.edges);
		set((state) => {
			state.history.past.push(newHistoryEntry(state.history.present.nodes, state.history.present.edges));
			state.history.present.edges = edges;
		});
	},
	onConnect: (connection) => {
		const edges = addEdge(connection, get().history.present.edges);
		set((state) => {
			state.history.past.push(newHistoryEntry(state.history.present.nodes, state.history.present.edges));
			state.history.present.edges = edges;
		});
	},
	undo: () => {
		set((state) => {
			if (state.history.past.length > 0) {
				const newPresent = state.history.past.pop();
				state.history.future.push(state.history.present);
				state.history.present = newPresent;
			}
		});
	},
	redo: () => {
		set((state) => {
			if (state.history.future.length > 0) {
				const newPresent = state.history.future.pop();
				state.history.past.push(state.history.present);
				state.history.present = newPresent;
			}
		});
	},
	save: () => {
		const content = JSON.stringify({
			nodes: get().history.present.nodes,
			edges: get().history.present.edges,
		});
		// Save content to a file or backend service
	},
	load: (content) => {
		set((state) => {
			state.history.present = newHistoryEntry(content.nodes, content.edges);
		});
	},
	// Add other state and actions as needed for your application...
})));




/*

// store.js
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
} from 'reactflow';
import produce from 'immer';

// Our initial state
const initialState = {
  nodes: [],
  edges: [],
};

// Store definition
export const useStore = create(devtools(produce((set, get) => ({
  ...initialState,
  addNode: (newNode) => {
	console.log('Adding node:', newNode);
	set((state) => {
	  state.nodes.push(newNode);
	});
  },
  removeNode: (nodeId) => {
	console.log('Removing node:', nodeId);
	set((state) => {
	  state.nodes = state.nodes.filter((node) => node.id !== nodeId);
	});
  },
  removeEdge: (edge) => {
	console.log('Removing edge:', edge);
	set((state) => {
	  state.edges = state.edges.filter((e) => e.id !== edge.id);
	});
  },
  onNodesChange: (changes) => {
	console.log('Node changes:', changes);
	set((state) => {
	  state.nodes = applyNodeChanges(changes, state.nodes);
	});
  },
  onEdgesChange: (changes) => {
	console.log('Edge changes:', changes);
	set((state) => {
	  state.edges = applyEdgeChanges(changes, state.edges);
	});
  },
  onEdgeUpdate: (oldEdge, newConnection) => {
	console.log('Updating edge:', oldEdge, 'with:', newConnection);
	set((state) => {
	  state.edges = applyEdgeChanges([newConnection], state.edges);
	});
  },
  onConnect: (connection) => {
	console.log('Connecting:', connection);
	set((state) => {
	  state.edges = addEdge(connection, state.edges);
	});
  },
  // Add other state and actions as needed for your application...
  // Remember to add undo/redo actions here as well
}))));*/