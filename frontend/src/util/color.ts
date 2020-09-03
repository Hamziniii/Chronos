export function getColor(hexColor: string) {
    // Remove hash
	if (hexColor.slice(0, 1) === '#')
		hexColor = hexColor.slice(1)

	// Convert to RGB value
	const r = parseInt(hexColor.substr(0,2),16)
	const g = parseInt(hexColor.substr(2,2),16)
	const b = parseInt(hexColor.substr(4,2),16)

	// Get YIQ ratio
	const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000

	// Check contrast
	return (yiq >= 128) ? '#000' : '#fff'
}