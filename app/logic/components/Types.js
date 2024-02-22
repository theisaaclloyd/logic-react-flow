
import { TwoInputAnd, TwoInputOr } from '../nodes/BasicGates';
import { InputButton } from '../nodes/Inputs';
import { OutputLED } from '../nodes/Outputs';

import Edge from '../nodes/Edge';

const nodeTypes = {
	'2_and': TwoInputAnd,
	'2_or': TwoInputOr,
	'in_button': InputButton,
	'out_led': OutputLED,
};

const edgeTypes = {
	'customEdge': Edge,
};

export { nodeTypes, edgeTypes };