import { Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import storeManager from '../utils/store';
import StateColor from '../utils/StateColor';

const OutputLED = ({ id, selected }) => {
	const { nodes, edges } = storeManager();

	const currNode = nodes.filter((n) => n.id == id)[0];
	const currNodeState = currNode?.data?.output?.[0];

	// get state of incoming edge
	const incomingEdge = nodes.filter((n) => n.id == id)[0]?.target;
	const incomingEdgeState = nodes.filter((n) => n.id == incomingEdge)?.data?.output?.[0];


	return (
		<div className={`w-7 h-7 ${StateColor(incomingEdgeState)} text-black rounded-md cursor-pointer flex justify-center items-center border-2 ${selected ? 'border-blue-600' : 'border-gray-600'}`} style={{ backgroundColor: StateColor(currNodeState)}}>
			<Handle
				type="target"
				position={Position.Left}
				id={`${id}-out`}
				style={{ top: '50%', backgroundColor: StateColor(currNodeState), border: '1px solid black' }}
			/>
		</div>
	);
};

export { OutputLED };