const alertTemplateCode = `
<template id="xalert-template">
  <dialog class="xalert">
    <h2 class="xalert__title"></h2>
    <div class="xalert__content"></div>
    <div class="xalert__buttons"></div>
  </dialog>
</template>
`;

/**
 * @typedef {object} AlertButton
 * @property {string} text - Label of the option
 * @property {string} [className] - Class of the option
 * @property {any} value - The value to pass through to resolve or reject
 * @property {boolean} [focus=false] - Whether to focus the button when the alert opens
 */

/**
 * xAlert
 * @param {object} [settings] - The settings for the alert
 * @param {string} [settings.title] - The title of the alert
 * @param {string} [settings.icon] - The icon of the alert
 * @param {string} [settings.text] - The text of the alert
 * @param {AlertButton[]} [settings.buttons] - The buttons of the alert
 * @param {string} [settings.className] - An extra class for the alert
 * @param {boolean} [settings.dismissable] - Whether the alert can be dismissed by clicking the backdrop/using esc?
 * @returns {Promise} A promise that resolves/rejects on clicking the buttons or dismissing the alert
 */
export default function xAlert({
  title = undefined,
  icon = undefined,
  text = undefined,
  buttons = [],
  className = undefined,
} = {}) {
  const xAlertButton = (options = {}) => {
    const button = document.createElement('button');
    const { text = 'no text', className = '', focus = false, value = undefined } = options;
    button.type = 'button';
    button.value = value
    button.innerText = text;
    button.className = className;
    if (focus) {
        button.setAttribute('autofocus', '')
    }
    return button;
  }

  let alertContainer = document.querySelector('#xalert-container');
  if (!alertContainer) {
    alertContainer = document.createElement('div');
    alertContainer.id = 'xalert-container';
    document.body.appendChild(alertContainer);
  }
  let alertTemplate = document.querySelector('#xalert-template');
  if (!alertTemplate) {
    alertContainer.innerHTML += alertTemplateCode;
    alertTemplate = document.querySelector('#xalert-template');
  }

  return new Promise((resolve, reject) => {
    const templateClone = alertTemplate.content.cloneNode(true);
    const alertEl = templateClone.querySelector('.xalert');
    // TODO: find out if on cancel we can immediately reopen this?!
    alertEl.oncancel = e => { reject('canceled' )}
    alertEl.onclose = e => { reject('esc') }
    if (className) { alertEl.classList.add(className); }
    if (title) {
      const titleEl = templateClone.querySelector('.xalert__title');
      titleEl.innerText = title;
    }
    if (text) {
      const contentEl = templateClone.querySelector('.xalert__content');
      contentEl.innerText = text;
    }
    const buttonsEl = templateClone.querySelector('.xalert__buttons');
    if (buttons.length) {
      buttons.forEach((button) => {
        const buttonEl = xAlertButton(button);
        buttonEl.addEventListener('click', () => {
          alertEl.close()
          resolve(button.value);

          requestAnimationFrame(() => {
            alertEl.parentNode.removeChild(alertEl)
          })
        });
        buttonsEl.appendChild(buttonEl);
      });
    }
    alertContainer.appendChild(alertEl);
    alertEl.showModal()
    requestAnimationFrame(() => {
      alertEl.querySelector('[autofocus]')?.focus();
    })
  });
}