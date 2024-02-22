// CustomEdge.js
import React from 'react';
import { getBezierPath, getMarkerEnd } from 'reactflow';
import storeManager from '../utils/store';
import StateColor from '../utils/StateColor';

const Edge = ({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style = {},
	data,
	arrowHeadType,
	markerEndId,
}) => {
	const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
	const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

	const { nodes, edges } = storeManager();

	const currEdge = edges.filter((e) => e.id == id)[0];

	const sourceNode = currEdge?.source;
	const targetNode = currEdge?.target;
	// update the state of the target node
	//updateNodeInputs(targetNode, { 0: 3, 1: 4 });


	const sourceNodeState = nodes.filter((n) => n.id == sourceNode)[0]?.data?.output?.[0];

	//StateColor(data?.state)

	return (
		<g>
			<path id={id} style={{ ...style, stroke: StateColor(sourceNodeState) }} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
			<text>
				<textPath href={`#${id}`} style={{ fontSize: '10px' }} startOffset="50%" textAnchor="middle">
					{data?.label}
				</textPath>
			</text>
		</g>
	);
};

export default Edge;