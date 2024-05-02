const output = (val) => {
	const newEl = document.createElement('div')
	newEl.innerText = val.toString()
	
	const outputEl = document.querySelector('output')
	outputEl.appendChild(newEl)
}

export default output