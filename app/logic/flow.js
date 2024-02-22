"use client";

import { useCallback, useState, useRef } from 'react';
import ReactFlow, { Background, Panel, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import './logic.css';

import { shallow } from 'zustand/shallow';
import { useControls } from 'leva';

import { CommandMenu, MainPanel, FloatingMiniMap, ControlPanel } from './components/Components';
import { nodeTypes, edgeTypes } from './components/Types';

import storeManager from './utils/store';
import { v1 as uuidv1 } from 'uuid';


const selector = (state) => ({
	nodes: state.nodes,
	edges: state.edges,
	setEdges: state.setEdges,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	//onConnect: state.onConnect,
	addConnection: state.addConnection,
	addNode: state.addNode,
	updateEdge: state.updateEdge,
	removeEdge: state.removeEdge,
	resetAnimatedEdges: state.resetAnimatedEdges,
	toggleEdgeAnimation: state.toggleEdgeAnimation,
});

const getId = () => `${uuidv1()}`;

function FlowCanvas() {
	const edgeUpdateSuccessful = useRef(true);

	const [reactFlowInstance, setReactFlowInstance] = useState(null);

	const { showNodes, showEdges } = useControls({ showNodes: false, showEdges: false, });

	const {
		nodes, edges, setEdges,
		onNodesChange, onEdgesChange,
		addConnection, addNode, updateEdge,
		removeEdge, resetAnimatedEdges,
		toggleEdgeAnimation
	} = storeManager(selector, shallow);

	const onDragOver = useCallback((event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}, []);


	// todo fix edge update
	const onEdgeUpdateStart = useCallback(() => {
		edgeUpdateSuccessful.current = false;
	}, []);
	const onEdgeUpdateEnd = useCallback((_, edge) => {
		if (!edgeUpdateSuccessful.current) {
			removeEdge(edge);
		}
		edgeUpdateSuccessful.current = true;
	}, [removeEdge]);


	const onDrop = useCallback((event) => {
		event.preventDefault();

		const type = event.dataTransfer.getData('application/reactflow');

		if (typeof type === 'undefined' || !type) {
			return;
		}

		const position = reactFlowInstance
			.screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
			});

		const newNode = {
			id: `node_${getId()}`,
			type,
			position,
			data: {
				label: `${type} node`,
				inputs: { 0: 2, 1: 2 },
				output: { 0: 2 }
			},
		};

		addNode(newNode);
	}, [addNode, reactFlowInstance]);

	const onConnect = useCallback((connection) => {
		const newEdge = {
			...connection,
			id: `edge_${getId()}`,
			animated: false,
			data: {
				label: 'edge label',
				state: 2,
			},
		};

		addConnection(newEdge);
	}, [addConnection]);

	const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
		updateEdge(oldEdge, newConnection);
	}, [updateEdge]);

	const onEdgeDoubleClick = useCallback((event, edge) => {
		removeEdge(edge);
	}, [removeEdge]);

	const onSelectionChange = useCallback((elements) => {
		if (elements.edges.length == 0) {
			resetAnimatedEdges();
		}
	}, [resetAnimatedEdges]);

	const onEdgeClick = useCallback((event, edge) => {
		toggleEdgeAnimation(edge.id);
	}, [toggleEdgeAnimation]);

	return (
		<div className='bg-white w-full h-full'>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onEdgeUpdate={onEdgeUpdate}
				onEdgeUpdateStart={onEdgeUpdateStart}
				onEdgeUpdateEnd={onEdgeUpdateEnd}
				className="touchdevice-flow"
				onInit={setReactFlowInstance}
				onDrop={onDrop}
				onDragOver={onDragOver}
				snapToGrid
				snapGrid={[14, 14]}
				nodeTypes={nodeTypes}
				edgeTypes={edgeTypes}
				attributionPosition='hidden'
				fitView
				defaultEdgeOptions={{ animated: false, type: 'customEdge', style: { stroke: 'green' } }}
				onEdgeDoubleClick={onEdgeDoubleClick}
				onEdgeClick={onEdgeClick}
				onSelectionChange={onSelectionChange}
			>
				<Panel position="bottom-left" className={`bg-white text-black p-5 border-2 flex text-lg`}>
					<div hidden={!showNodes}>{JSON.stringify(nodes)}</div>
					<div hidden={!showEdges}>{JSON.stringify(edges)}</div>
				</Panel>
				<MainPanel />
				<ControlPanel />
				<FloatingMiniMap />
				<Background variant="cross" gap={14} size={7} />
			</ReactFlow>
		</div >
	);
};

export default function Flow() {
	return (
		<ReactFlowProvider>
			<FlowCanvas />
			<CommandMenu />
		</ReactFlowProvider>
	);
}