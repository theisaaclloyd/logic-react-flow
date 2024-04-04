import {
	Handle,
	Position,
	useHandleConnections,
	useNodesData,
} from '@xyflow/react';
import "@xyflow/react/dist/style.css";
import useStore from '../utils/store';
import StateColor from '../utils/StateColor';
import { memo } from "react";

function OutputLED({ id, selected }) {
	const connections = useHandleConnections({
		type: 'target',
		id: `${id}-out`,
		/* onConnect: (params) => {
			console.log('handle onConnect', params);
		}, */
	});

	const nodesData = useNodesData(
		connections.map((connection) => connection.source)
	);

	let nodeState = nodesData[0]?.data?.out;

	if (nodesData.length === 0) {
		nodeState = 2;
	}

	else if (nodesData.length > 1) {
		// check if all connection states are the same
		const allSame = nodesData.every((val, i, arr) => val?.data?.out === arr[0]?.data?.out);
		nodeState = allSame ? nodeState : 4;
	}

	return (
		<div className={`w-7 h-7 ${StateColor(nodeState)} text-black rounded-sm cursor-pointer flex justify-center items-center border-2 ${selected ? 'border-blue-600' : 'border-gray-900'}`} style={{ backgroundColor: StateColor(nodeState) }}>
			<Handle
				type="target"
				position={Position.Left}
				id={`${id}-out`}
				style={{ top: '50%', backgroundColor: StateColor(nodeState), border: '1px solid black', borderRadius: '0%' }}
			/>
			{/* <div className='text-black bg-slate-500'>{JSON.stringify(nodesData)}</div> */}
		</div>
	);
};

export default memo(OutputLED);