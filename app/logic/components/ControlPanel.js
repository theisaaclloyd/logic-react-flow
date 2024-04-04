import { Controls, ControlButton } from '@xyflow/react';
import "@xyflow/react/dist/style.css";
import { toPng } from 'html-to-image';
import { CameraIcon, MagicWandIcon } from '@radix-ui/react-icons';
//import useStore from '../utils/store';


export default function ControlPanel() {

	//const simulate = useStore(state => state.simulateCircuit);

	const Screenshot = () => {
		toPng(document.querySelector('.react-flow'), {
			backgroundColor: '#FFFFFF',
			filter: (node) => {
				if (
					node?.classList?.contains('react-flow__minimap') ||
					node?.classList?.contains('react-flow__controls') ||
					node?.classList?.contains('react-flow__panel')
				) {
					return false;
				}

				return true;
			},
		}).then((blobUrl) => {
			const a = document.createElement('a');
			const tag = new Date().toISOString().replace(/:/g, '-');
			a.setAttribute('download', `circuit-${tag}.png`);
			a.setAttribute('href', blobUrl);
			a.click();
		}).catch((e) => {
			console.error('Unknown Error');
		});
	};

	return (
		<Controls position='bottom-right' className='text-black'>
			<ControlButton onClick={Screenshot}>
				<CameraIcon />
			</ControlButton>

			<ControlButton /* onClick={simulate} */>
				<MagicWandIcon />
			</ControlButton>
		</Controls>
	);
};