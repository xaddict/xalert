import trela from "../src/trela.js";
import output from "./output.js";

document.querySelector('#openAlert').addEventListener('click',() => {
	trela({
		title: 'Let us talk',
		text: 'I noticed you looking especially cheerful lately. It is because of the beautiful weather we are having?',
		buttons: [
			{
				text: 'Yes',
				className: 'positive',
				value: 'I agree, it is quite beautiful',
				focus: true,
			},
			{
				text: 'No',
				className: 'negative',
				value: 'No? Then what is the reason for this glow?',
			},
			{
				text: 'I am in love',
				className: 'flower',
				value: 'Oh really? Is it someone I know? ;)',
			},
		],
		dismissable: true,
	}).then(value => {
		output(value)
	}).catch(error => {
		output('error: ' + error)
	})
})
