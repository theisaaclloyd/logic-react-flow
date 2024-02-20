import { MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';

export default function FloatingMiniMap() {
	return (
		<MiniMap pannable zoomable position='bottom-left' className='border-r-red-200 hover:border-r-gray-200 cursor-move border-2 border-gray-200 absolute left-0 transform -translate-x-full hover:translate-x-0 transition-transform duration-700 ease-in-out' />
	);
}