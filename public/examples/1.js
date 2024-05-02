import xAlert from "../src/xalert.js";

document.querySelector('#openAlert').addEventListener('click',() => {
	xAlert({
		title: 'Title',
		text: 'This is the alert text',
		buttons: [
			{
				text: 'Okay',
				className: 'positive',
				value: true,
				rejects: false,
				focus: true,
			},
			{
				text: 'Cancel',
				className: 'negative',
				value: false,
				rejects: true,
			},
		],
		dismissable: true,
	}).then(value => {
		
	})
})