"use client";

import React, { useCallback, useState, useRef } from 'react';

import ReactFlow, {
	Background,
	useNodesState,
	useEdgesState,
	addEdge,
	updateEdge,
	ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import './logic.css';


import { TwoInputAnd, TwoInputOr } from './nodes/BasicGates';
import { InputButton } from './nodes/Inputs';
import { OutputLED } from './nodes/Outputs';

import CommandMenu from './components/CommandMenu';
import MainPanel from './components/MainPanel';
import FloatingMiniMap from './components/MiniMap';
import ControlPanel from './components/ControlPanel';


const initialNodes = [
	{
		id: 'gate-1',
		type: '2_and',
		data: { label: 'AND' },
		position: { x: 154, y: 154 },
	},
	{
		id: 'gate-2',
		type: '2_or',
		data: { label: 'OR' },
		position: { x: 350, y: 154 },
	},
];

const initialEdges = [];

const nodeTypes = {
	'2_and': TwoInputAnd,
	'2_or': TwoInputOr,
	'in_button': InputButton,
	'out_led': OutputLED,
};


let id = 0;
const getId = () => `node_${id++}`;

function FlowCanvas() {
	const edgeUpdateSuccessful = useRef(true);
	//const reactFlowWrapper = useRef(null);

	const [reactFlowInstance, setReactFlowInstance] = useState(null);

	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const onConnect = useCallback(
		(params) => setEdges((eds) => addEdge(params, eds)),
		[setEdges],
	);

	const onDragOver = useCallback((event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}, []);

	const onDrop = useCallback(
		(event) => {
			event.preventDefault();

			const type = event.dataTransfer.getData('application/reactflow');

			// check if the dropped element is valid
			if (typeof type === 'undefined' || !type) {
				return;
			}

			const position = reactFlowInstance.screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
			});
			const newNode = {
				id: getId(),
				type,
				position,
				data: { label: `${type} node`, inputs: { 0: 0, 1: 0 }, output: { 0: 0 } },
			};

			setNodes((nds) => nds.concat(newNode));
			//alert(JSON.stringify(nodes));
		},
		[reactFlowInstance],
	);

	const onEdgeUpdateStart = useCallback(() => {
		edgeUpdateSuccessful.current = false;
	}, []);

	const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
		edgeUpdateSuccessful.current = true;

		setEdges((els) => updateEdge(oldEdge, newConnection, els));
	}, []);

	const onEdgeUpdateEnd = useCallback((_, edge) => {
		if (!edgeUpdateSuccessful.current) {
			setEdges((eds) => eds.filter((e) => e.id !== edge.id));
		}

		edgeUpdateSuccessful.current = true;
	}, []);

	const onEdgeDoubleClick = (event, clickedEdge) => {
		setEdges((edges) => edges.filter((edge) => edge.id !== clickedEdge.id));
	};

	const onSelectionChange = (elements) => {
		if (elements.edges.length == 0) {
			setEdges((edges) => { // todo: make this a separate function
				const hasAnimatedEdges = edges.some((edge) => edge.animated);

				if (hasAnimatedEdges) {
					return edges.map((edge) => {
						return {
							...edge,
							animated: false,
						};
					});
				}

				return edges;
			});
		}
	};

	const onEdgeClick = (event, clickedEdge) => {
		setEdges((edges) =>
			edges.map((edge) => {
				if (edge.id === clickedEdge.id) {
					return {
						...edge,
						animated: true,
					};
				}
				return edge;
			}),
		);
	};

	return (
		<div className='bg-white w-full h-full'>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onEdgeUpdate={onEdgeUpdate}
				onEdgeUpdateStart={onEdgeUpdateStart}
				onEdgeUpdateEnd={onEdgeUpdateEnd}
				onConnect={onConnect}
				className="touchdevice-flow"
				onInit={setReactFlowInstance}
				onDrop={onDrop}
				onDragOver={onDragOver}
				snapToGrid
				snapGrid={[14, 14]}
				nodeTypes={nodeTypes}
				attributionPosition='hidden'
				fitView
				defaultEdgeOptions={{ animated: false, type: 'smooth', style: { stroke: 'green' } }}
				onEdgeDoubleClick={onEdgeDoubleClick}
				onEdgeClick={onEdgeClick}
				onSelectionChange={onSelectionChange}
			>
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