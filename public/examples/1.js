import trela from "../src/trela.js";
import output from "./output.js";

document.querySelector('#openAlert').addEventListener('click',() => {
	trela({
		title: 'Title',
		text: 'This is the alert text',
		buttons: [
			{
				text: 'Okay',
				className: 'positive',
				value: true,
				focus: true,
			},
			{
				text: 'Cancel',
				className: 'negative',
				value: false,
			},
		],
		dismissable: true,
	}).then(value => {
		output(value)
	}).catch(error => {
		output('error: ' + error)
	})
})
