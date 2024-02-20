import { Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';

const OutputLED = ({ id, selected }) => {
	return (
		<div className={`w-7 h-7 bg-white text-black rounded-md cursor-pointer flex justify-center items-center border-2 ${selected ? 'border-blue-600' : 'border-gray-600'}`}>
			<input type="checkbox" className="m-auto" />
			<Handle
				type="target"
				position={Position.Left}
				id={`${id}-out`}
				style={{ top: '50%' }}
			/>
		</div>
	);
};

export { OutputLED };