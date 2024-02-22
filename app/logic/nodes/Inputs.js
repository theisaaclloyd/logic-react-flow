import { Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import storeManager from '../utils/store';
import StateColor from '../utils/StateColor';

const InputButton = ({ id, selected }) => {
	const { nodes, setNodes } = storeManager();

	const currNode = nodes.filter((n) => n.id == id)[0];
	const currNodeState = currNode?.data?.output?.[0];

	const onClick = (e) => {
		setNodes(nodes.map((n) => {
			if (n.id == id) {
				return { ...n, data: { ...n.data, output: { 0: Number(!currNodeState) } } };
			} else {
				return n;
			}
		}));
	};
	//<div className='text-black'>{JSON.stringify(nodes.filter((n) => n.id == id))}</div>
	//<input type="checkbox" onChange={onInputChange} checked={(currNode?.data?.output[0] === 1)} className="m-auto" />
	return (
		<div
			className={`w-7 h-7 text-black rounded-md cursor-pointer 
				flex justify-center items-center border-2 ${selected ? 'border-blue-600' : 'border-gray-600'}`}
			onClick={onClick}
			style={{ backgroundColor: StateColor(currNodeState)}}
		>
			<Handle
				type="source"
				position={Position.Right}
				id={`${id}-out`}
				style={{ top: '50%', backgroundColor: StateColor(currNodeState), border: '1px solid black' }}
			/>
		</div>
	);
};

export { InputButton };