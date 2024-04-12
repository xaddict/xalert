const alertTemplateCode = `
<template id="xalert-template">
  <div class="xalert">
    <h2 class="xalert__title"></h2>
    <div class="xalert__content"></div>
    <div class="xalert__buttons"></div>
  </div>
</template>
`;

/**
 * @typedef {object} AlertButton
 * @property {string} text - Label of the option
 * @property {string} [className] - Class of the option
 * @property {any} value - The value to pass through to resolve or reject
 * @property {boolean} [rejects] - whether clicking the button rejects or resolves (default) the Promise
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
  dismissable = true,
} = {}) {
  function xAlertButton(options = {}) {
    const button = document.createElement('button');
    const { text = 'no text', className = '', focus = false } = options;
    button.innerText = text;
    button.className = className;
    button.autofocus = focus;
    return button;
  }

  let alertContainer = document.querySelector('#alert-container');
  if (!alertContainer) {
    alertContainer = document.createElement('div');
    alertContainer.id = 'alert-container';
    document.body.appendChild(alertContainer);
  }
  let alertTemplate = document.querySelector('#xalert-template');
  if (!alertTemplate) {
    alertContainer.innerHTML += alertTemplateCode;
    alertTemplate = document.querySelector('#xalert-template');
  }

  return new Promise((resolve, reject) => {
    const templateClone = alertTemplate.content.cloneNode(true);
    const titleEl = templateClone.querySelector('.xalert__title');
    titleEl.innerText = title;
    const contentEl = templateClone.querySelector('.xalert__content');
    contentEl.innerText = text;
    const buttonsEl = templateClone.querySelector('.xalert__buttons');
    if (buttons.length) {
      buttons.forEach((button) => {
        const buttonEl = xAlertButton(button);
        buttonEl.addEventListener('click', () => {
          // alertContainer.removeChild(templateClone);
          console.log(alertContainer);

          if (button.rejects) {
            reject(button.value);
          } else {
            resolve(button.value);
          }
        });
        buttonsEl.appendChild(buttonEl);
      });
    }
    alertContainer.appendChild(templateClone);
  });
}