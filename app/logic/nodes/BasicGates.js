import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import storeManager from '../utils/store';


const TwoInputAnd = ({ id, selected }) => {
	const { nodes, setNodes, edges, setEdges } = storeManager();

	const currNode = nodes.filter((n) => n.id == id)[0];


	return (
		<div className='w-20 h-14 text-black cursor-pointer'>
			<div style={{ position: 'relative', display: 'inline-block' }}>
				<svg className='w-full h-full' viewBox="0 0 143 100">
					<path d="M 30 25 L 0 25 M 30 75 L 0 75 M 100 50 L 143 50" fill="none" stroke="black" strokeWidth={3} />
					<path d=" M 22 2 L 80 2 A 40 40, 0, 0, 1, 80 98 L 22 98 L 22 2 Z" fill="white" stroke={selected ? 'rgb(37 99 235)' : 'rgb(75 85 99)'} strokeWidth={3} />
				</svg>
				
				<div style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					textAlign: 'center',
					color: 'black'
				}}>
					A-{currNode?.data?.inputs?.[0]}<br />
					B-{currNode?.data?.inputs?.[1]}<br />
					out-{currNode?.data?.output?.[0]}
				</div>
			</div>

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
		</div>
	);
};



const TwoInputOr = ({ id, selected }) => {
	return (
		<div className='w-20 h-14'>
			<svg className='w-full h-full' viewBox="0 0 143 100">
				<path d="M 50 25 L 0 25 M 50 75 L 0 75 M 100 50 L 143 50" fill="none" stroke="black" strokeWidth={3} />

				<path d="
				M 22 2
				Q 90 0, 118 50 
				Q 90 100, 20 98
				Q 70 50, 22 2
				Z" fill="white" stroke={selected ? 'rgb(37 99 235)' : 'rgb(75 85 99)'} strokeWidth={3} />
			</svg>

			<div className='text-black'>{id}</div>

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
		</div>


	);
};

export { TwoInputAnd, TwoInputOr };