// CustomEdge.js
import React from 'react';
import { BaseEdge, getSmoothStepPath } from '@xyflow/react';
import useStore from '../utils/store';
import StateColor from '../utils/StateColor';

function CustomEdge({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style = {},
	markerEnd,
	data
}) {
	const [edgePath, labelX, labelY, offsetX, offsetY] = getSmoothStepPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
		borderRadius: 0.5,
		offset: 0,
	});

	const { nodes, edges } = useStore();

	const currEdge = edges.filter((e) => e.id == id)[0];

	const sourceNode = currEdge?.source;


	const sourceNodeState = nodes.filter((n) => n.id == sourceNode)[0]?.data?.out;

	const newStyle = { ...style, stroke: StateColor(sourceNodeState) }

	return (
		<>
			<BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={newStyle} />
			{/* <EdgeLabelRenderer>
				<div
					style={{
						position: 'absolute',
						transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
						fontSize: 12,
						pointerEvents: 'all',
					}}
					className="nodrag nopan"
				>
					<button className="edgebutton">
						{data?.label}
					</button>
				</div>
			</EdgeLabelRenderer> */}
		</>
	);
}

export default CustomEdge;