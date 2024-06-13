const alertTemplateCode = `
<template id="trela-template">
<dialog class="trela">
<div class="trela__icon"></div> 
<h2 class="trela__title"></h2>
<div class="trela__content"></div>
<form method="dialog" class="trela__buttons"></form>
</dialog>
</template>
`;

/**
* @typedef {object} AlertButton
* @property {string} [text] - Text of the button
* @property {string} [className] - Classname of the button
* @property {any} [value] - The value to pass through to resolve
* @property {boolean} [focus=false] - Whether to focus the button when the alert opens
* @property {boolean} [dismiss=false] - Whether to use the button value when the alert gets dismissed
*/

/**
* trela
* @param {object} [settings] - The settings for the alert
* @param {string} [settings.title] - The title of the alert
* @param {string} [settings.icon] - The icon of the alert
* @param {string} [settings.text] - The text of the alert
* @param {AlertButton[]} [settings.buttons] - The buttons of the alert
* @param {string} [settings.className] - An extra class for the alert
* @returns {Promise} A promise that resolves/rejects on clicking the buttons or dismissing the alert
*/
export default function trela({
	title = undefined,
	icon = undefined,
	text = undefined,
	buttons = [],
	className = undefined,
} = {}) {
	/**
	 * @param {AlertButton} arguments - The button settings
	 * @returns {HTMLButtonElement} - A button element
	 */
	const trelaButton = ({
		text = 'no text',
		className = '',
		value = undefined,
		focus = false,
		dismiss = false
	} = {}) => {
		const button = document.createElement('button');
		button.type = 'button';
		button.value = value
		button.innerText = text;
		button.className = className;
		button.dismiss = dismiss
		if (focus) {
			button.setAttribute('autofocus', '')
		}
		return button;
	}

	let value = undefined

	const trelaIcon = () => {
		const el = document.createElement('svg')
		el.innerHTML = "<circle cx='25' cy='25' r='25'></circle>"
		el.setAttribute('xmlns',  "http://www.w3.org/2000/svg")
		el.setAttribute('viewBox', '0 0 50 50')
		el.setAttribute('width', '50')
		el.setAttribute('height', '50')
		return el
	}

	let alertContainer = document.querySelector('#trela-container');
	if (!alertContainer) {
		alertContainer = document.createElement('div');
		alertContainer.id = 'trela-container';
		document.body.appendChild(alertContainer);
	}
	let alertTemplate = document.querySelector('#trela-template');
	if (!alertTemplate) {
		alertContainer.innerHTML += alertTemplateCode;
		alertTemplate = document.querySelector('#trela-template');
	}

	return new Promise((resolve, reject) => {
		const templateClone = alertTemplate.content.cloneNode(true);
		const alertEl = templateClone.querySelector('.trela');
		// eslint-disable-next-line no-unused-vars
		alertEl.oncancel = e => {
			const dismissButtons = buttons.filter(button => button.dismiss)
			if (dismissButtons.length > 0) {
				resolve(dismissButtons.map(button => button.value))
			} else {
				reject('canceled')
			}
		}
		// eslint-disable-next-line no-unused-vars
		alertEl.onclose = e => {
			setTimeout(() => {
				alertEl.parentNode.removeChild(alertEl)
			}, 1000)
			// resolve(alertEl.returnValue)
			resolve(value)
		}
		if (className) {
			alertEl.classList.add(className);
		}
		if (title) {
			const titleEl = templateClone.querySelector('.trela__title');
			titleEl.innerText = title;
		}
		if (icon) {
			const iconWrapper = templateClone.querySelector('.trela__icon');
			const iconEl = trelaIcon(icon)
			iconWrapper.appendChild(iconEl)
		}
		if (text) {
			const contentEl = templateClone.querySelector('.trela__content');
			contentEl.innerText = text;
		}
		const buttonsEl = templateClone.querySelector('.trela__buttons');
		if (buttons.length) {
			buttons.forEach((button) => {
				const buttonEl = trelaButton(button);
				buttonEl.value = button.value
				buttonEl.addEventListener('click', (event) => {
					value = button.value
					event.preventDefault();
					alertEl.close(button.value)
				});
				buttonsEl.appendChild(buttonEl);
			});
		}
		alertContainer.appendChild(alertEl);
		requestAnimationFrame(() => {
			alertEl.showModal()
		})
	});
}
