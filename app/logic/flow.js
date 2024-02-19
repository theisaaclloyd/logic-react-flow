// Import necessary dependencies
"use client";

import React, { useCallback, useState } from 'react';
import ReactFlow, {
	MiniMap,
	Controls,
	Background,
	useNodesState,
	useEdgesState,
	addEdge,
	Handle,
	Position,
	Node,
	Panel,
	ControlButton,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { MagicWandIcon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define a custom logic gate node
const TwoInputAnd = ({ id, data }) => {
	const [dialogOpen, setDialog] = useState(false);
	const [gateSettings, setGateSettings] = useState({
		delay: 0,
	});

	const handleGateSettingsChange = (e) => {
		const { name, value } = e.target;
		setGateSettings((prevSettings) => ({
			...prevSettings,
			[name]: parseInt(value, 10),
		}));
	};

	return (
		<>
			<Dialog open={dialogOpen} onOpenChange={setDialog}>
				<DialogTrigger asChild>
					<div className='bg-white text-black border-2 rounded-md p-5 w-20 h-20 flex justify-center items-center'>
						<Handle
							type="source"
							position={Position.Right}
							id={`${id}-out`}
							style={{ top: '50%' }}
						/>

						<Handle
							type="target"
							position={Position.Left}
							id={`${id}-A`}
							style={{ top: '25%' }}
						/>

						<Handle
							type="target"
							position={Position.Left}
							id={`${id}-B`}
							style={{ top: '75%' }}
						/>

						<div className='cursor-pointer'  >|{data.label || id}|</div>
					</div>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] bg-white text-black">
					<DialogHeader>
						<DialogTitle>Gate settings</DialogTitle>
						<DialogDescription>
							Make changes to the gate settings
						</DialogDescription>
					</DialogHeader>
					<form className={"grid items-start gap-4"}>
						<label>
							Number of Inputs:
							<input
								type="number"
								name="inputs"
								value={gateSettings.inputs}
								onChange={handleGateSettingsChange}
								min="2"
								max="4"
							/>
						</label>
						<label>
							Delay Time (ms):
							<input
								type="number"
								name="delay"
								value={gateSettings.delay}
								onChange={handleGateSettingsChange}
							/>
						</label>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};

const initialNodes = [
	{
		id: 'gate-1',
		type: 'gate',
		data: { label: 'AND Gate' },
		position: { x: 150, y: 150 },
	},

	{
		id: 'gate-2',
		type: 'gate',
		data: { label: 'AND Gate' },
		position: { x: 350, y: 150 },
	},
];

const initialEdges = [];

const nodeTypes = {
	gate: TwoInputAnd,
};

// Main Flow component
export default function Flow() {
	const [nodes, , onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const onConnect = useCallback(
		(params) => setEdges((eds) => addEdge(params, eds)),
		[setEdges],
	);

	return (
		<div className='bg-white w-full h-full'>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				snapToGrid
				snapGrid={[15, 15]}
				nodeTypes={nodeTypes}
				attributionPosition='hidden'
				fitView
				defaultEdgeOptions={{ animated: true }}
			>
				<Panel position="top-left" className='bg-white text-black p-5 border-2'>panel</Panel>
				<Controls>
					<ControlButton onClick={() => alert('Test auto organize button')}>
						<MagicWandIcon />
					</ControlButton>
				</Controls>
				<MiniMap pannable zoomable className='cursor-move' />
				<Background variant="dots" gap={15} size={1} />
			</ReactFlow>
		</div >
	);
}