import trela from "../src/trela.js";
import "../src/style.css";

document.querySelector('#alert1').addEventListener('click',() => {
	// TODO:
	// let alert = new trela({})
	// trela.fire()
	// trela.close()
	// trela.then()
	// trela.catch()

	trela({
		title: 'Title',
		text: 'This is the alert text',
		icon: 'hi',
		buttons: [
			{
				text: 'ok',
				className: 'positive',
				value: true,
				rejects: false,
				focus: true,
			},
			{
				text: 'cancel',
				className: 'negative',
				value: false,
				rejects: true,
			},
		],
		className: 'xalert--disco',
		dismissable: true,
	})
	.then((e) => {
		output(`you clicked '${e}': ${typeof e}`);
	})
	.catch((e) => {
		output(`dialog got closed: ${e}`);
	});
})

setTimeout(() => {
	trela().catch(e => console.log({ e }))
}, 3000)

const output = (val) => {
	const newEl = document.createElement('div')
	newEl.innerText = val.toString()

	const outputEl = document.querySelector('output')
	outputEl.appendChild(newEl)
}

