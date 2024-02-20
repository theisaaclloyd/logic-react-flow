import { Controls, ControlButton } from 'reactflow';
import 'reactflow/dist/style.css';
import { toPng } from 'html-to-image';

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

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
			a.setAttribute('download', 'reactflow.png');
			a.setAttribute('href', blobUrl);
			a.click();
		});
	};

	return (
		<Controls position='bottom-right'>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<ControlButton onClick={Screenshot}>
							<CameraIcon className='text-black' />
						</ControlButton>
					</TooltipTrigger>
					<TooltipContent>
						<p>Screenshot</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</Controls>
	);
};