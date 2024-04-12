import xAlert from "../src/xalert.js";
import "../src/style.css";

document.querySelector('#alert1').addEventListener('click',() => {
  const alert = new xAlert({
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
  });
  
  alert
    .then(() => {
      alert('you pressed ok');
    })
    .catch(() => {
      alert('you pressed cancel');
    });
})
