
import TwoInputAnd from '../nodes/AndGate';
import TwoInputOr from '../nodes/OrGate';
import InputButton from '../nodes/Inputs';
import OutputLED from '../nodes/Outputs';

import CustomEdge from '../nodes/Edge';

const nodeTypes = {
	'2_and': TwoInputAnd,
	'2_or': TwoInputOr,
	'in_button': InputButton,
	'out_led': OutputLED,
};

const edgeTypes = {
	'customEdge': CustomEdge,
};

export { nodeTypes, edgeTypes };