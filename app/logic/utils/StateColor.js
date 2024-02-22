const StateColor = (state) => {
	const colorMap = {
		0: 'black',	// Low
		1: 'red',	// High
		2: 'green',	// Floating
		3: 'blue',	// Indeterminate
		4: 'orange',// Dual driven
	};

	return colorMap[state];
};

export default StateColor;