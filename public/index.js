import xAlert from "../src/xalert.js";
import "../src/style.css";

document.querySelector('#alert1').addEventListener('click',() => {
  // TODO:
  // let alert = new xAlert({})
  // alert.fire()
  // alert.close()
  // alert.then()
  // alert.catch()


  xAlert({
    title: 'Title',
    text: 'This is the alert text',
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
    class: 'sexy-alert',
    dismissable: true,
  })
  .then((e) => {
    output(`you clicked ${e}`);
  })
  .catch((e) => {
    output(`alert canceled: ${e}`);
  });
})

setTimeout(() => {
  xAlert().catch(e => console.log({ e }))
}, 3000)

const output = (val) => {
  const newEl = document.createElement('div')
  newEl.innerText = val.toString()

  const outputEl = document.querySelector('output')
  outputEl.appendChild(newEl)
}
  
