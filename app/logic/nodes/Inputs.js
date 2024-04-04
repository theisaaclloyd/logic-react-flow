import { Handle, Position, useReactFlow } from '@xyflow/react';
import { memo } from "react";
import "@xyflow/react/dist/style.css";
import StateColor from '../utils/StateColor';

const InputButton = ({ id, data, selected }) => {
	const { updateNodeData } = useReactFlow();

	const onClick = (e) => {
		updateNodeData(id, { ...data, out: data.out != 1 ? 1 : 0});
	};

	return (
		<div
			className={`w-7 h-7 text-black rounded-sm cursor-pointer 
				flex justify-center items-center border-2 ${selected ? 'border-blue-600' : 'border-gray-900'}`}
			onClick={onClick}
			style={{ backgroundColor: StateColor(data.out) }}
		>
			<Handle
				type="source"
				position={Position.Right}
				id={`${id}-out`}
				style={{ top: '50%', backgroundColor: StateColor(data.out), border: '1px solid black', borderRadius: '0%'}}
			/>
		</div>
	);
};

export default memo(InputButton);