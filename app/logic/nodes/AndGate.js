import {
	Handle,
	Position,
	useHandleConnections,
	useNodesData,
	useReactFlow
} from '@xyflow/react';
import { memo, useEffect } from "react";
import StateColor from '../utils/StateColor';
import "@xyflow/react/dist/style.css";


function TwoInputAnd({ id, data, selected }) {
	const { updateNodeData } = useReactFlow();

	const inputA = useNodesData(
		useHandleConnections({
			type: 'target',
			id: `${id}-A`,
		}).map((connection) => connection.source)
	);

	const inputB = useNodesData(
		useHandleConnections({
			type: 'target',
			id: `${id}-B`,
		}).map((connection) => connection.source)
	);

	let stateA = inputA[0]?.data.out ?? 2;
	let stateB = inputB[0]?.data.out ?? 2;
	let output = stateA && stateB;

	useEffect(() => {
		//console.log('updating node data');
		//console.log({ ...data, out: output});
		updateNodeData(id, { ...data, out: output});
	}, [updateNodeData, output]);


	return (
		<div className='w-20 h-14 text-black cursor-pointer'>
			<div style={{ position: 'relative', display: 'inline-block' }}>
				<svg className='w-full h-full' viewBox="0 0 143 100">
					<path d="M 30 25 L 0 25 M 30 75 L 0 75 M 100 50 L 143 50" fill="none" stroke="black" strokeWidth={3} />
					<path d=" M 22 2 L 80 2 A 40 40, 0, 0, 1, 80 98 L 22 98 L 22 2 Z" fill="white" stroke={selected ? 'rgb(37 99 235)' : 'rgb(0 0 0)'} strokeWidth={2} />
				</svg>

				{/* <div style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					textAlign: 'center',
					color: 'black'
				}}>
					A-{stateA}<br />
					B-{stateB}<br />
					out-{output}
				</div> */}
			</div>

			<Handle
				type="source"
				position={Position.Right}
				id={`${id}-out`}
				style={{ top: '50%', backgroundColor: StateColor(data.out), border: '1px solid black', borderRadius: '0%' }}
			/>

			<Handle
				type="target"
				position={Position.Left}
				id={`${id}-A`}
				style={{ top: '25%', backgroundColor: StateColor(stateA), border: '1px solid black', borderRadius: '0%' }}
			/>

			<Handle
				type="target"
				position={Position.Left}
				id={`${id}-B`}
				style={{ top: '75%', backgroundColor: StateColor(stateB), border: '1px solid black', borderRadius: '0%' }}
			/>
		</div>
	);
};

export default memo(TwoInputAnd);