import xAlert from "../src/xalert.js";
import output from "./output.js";

document.querySelector('#openAlert').addEventListener('click',() => {
	xAlert({
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