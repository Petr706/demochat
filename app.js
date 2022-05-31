import {loadRecentMsgs,getFullHeight,printMessage} from './util.js';
const form = document.getElementById('form');
const input = document.getElementById('input');
const ws = new WebSocket('ws://localhost:3333');
document.getElementById('sbmt_btn').addEventListener('click', event => {
    event.preventDefault();
    ws.send(input.value);
    input.value = '';
    const heightNow = getFullHeight()
    window.scrollBy({
        top: heightNow,
        behavior: 'smooth'
    })
});
form.addEventListener('submit', event => {
    event.preventDefault();
    ws.send(input.value);
    input.value = '';
    const heightNow = getFullHeight()
    window.scrollBy({
        top: heightNow,
        behavior: 'smooth'
    })
})
setInterval(loadRecentMsgs, 500)
ws.onopen = () => {
    (async () => {
        let response = await fetch('http://localhost:3333/messages?page=1')
        let responseObject = await response.json()
        responseObject = responseObject.reverse()
        for (const el of responseObject) {
            printMessage(el.text)
        }
        const heightNow = getFullHeight()
        window.scrollBy({
            top: heightNow,
            behavior: 'smooth'
        })
    })().catch(e => {
        console.log(e)
    });
}
ws.onmessage = response => printMessage(response.data)
