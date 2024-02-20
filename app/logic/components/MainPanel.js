"use client";

import { useState } from 'react';
import { Panel } from 'reactflow';
import 'reactflow/dist/style.css';
import { PinLeftIcon } from "@radix-ui/react-icons";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";



export default function MainPanel() {
	const [floating, setFloating] = useState(true);

	const onDragStart = (event, nodeType) => {
		event.dataTransfer.setData('application/reactflow', nodeType);
		event.dataTransfer.effectAllowed = 'move';
	};

	return (
		<Panel position="top-left" className={`bg-white text-black p-5 border-2 flex flex-col w-60 ${floating ? 'absolute left-0 transform -translate-x-full hover:translate-x-0 border-r-red-200 hover:border-r-gray-200' : ''} transition-transform duration-700 ease-in-out`}>
			<div>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<PinLeftIcon className={`w-3 h-3 ${floating ? '' : 'text-red-600'} cursor-pointer`} onClick={() => setFloating(!floating)} />
						</TooltipTrigger>
						<TooltipContent>
							<p>Pin open</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>


			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value="basic-gates">
					<AccordionTrigger>Basic Gates</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-1'>
						<div className="height-10 p-2 border-2 cursor-grab flex items-center justify-center flex-col input" onDragStart={(event) => onDragStart(event, '2_and')} draggable>
							Two-input AND
						</div>
						<div className="height-10 p-2 border-2 cursor-grab flex items-center justify-center flex-col" onDragStart={(event) => onDragStart(event, '2_or')} draggable>
							Two-input OR
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="inputs">
					<AccordionTrigger>Inputs</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-1'>
						<div className="height-10 p-2 border-2 cursor-grab flex items-center justify-center flex-col input" onDragStart={(event) => onDragStart(event, 'in_button')} draggable>
							Input Button
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="outputs">
					<AccordionTrigger>Outputs</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-1'>
						<div className="height-10 p-2 border-2 cursor-grab flex items-center justify-center flex-col input" onDragStart={(event) => onDragStart(event, 'out_led')} draggable>
							Output LED
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</Panel>
	);
};