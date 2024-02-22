import { Controls, ControlButton } from 'reactflow';
import 'reactflow/dist/style.css';
import { toPng } from 'html-to-image';
import { CameraIcon } from '@radix-ui/react-icons';


export default function ControlPanel() {

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
		});
	};

	return (
		<Controls position='bottom-right'>
			<ControlButton onClick={Screenshot}>
				<CameraIcon className='text-black' />
			</ControlButton>
		</Controls>
	);
};