const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
const ws = new WebSocket('ws://localhost:3333')
let messageListCounter = 1
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
function loadRecentMsgs() {
    (async () => {
        if (window.pageYOffset <= 300) {
            let response = await fetch(`http://localhost:3333/messages?page=${messageListCounter}`);
            if(response.ok) {
                messageListCounter++;
                let responseObject = await response.json();
                for (const el of responseObject) {
                    const li = document.createElement('li');
                    li.innerHTML = el.text;
                    messages.insertBefore(li, document.querySelector("li"));
                }
            }
            
        }
    })().catch(e => {
        console.log(e);
    });
}
setInterval(loadRecentMsgs, 500)
ws.onopen = () => {
    (async () => {
        let response = await fetch('http://localhost:3333/messages?page=1')
        let responseObject = await response.json()
        responseObject = responseObject.reverse()
        for (const el of abc) {
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
ws.onclose = () => setStatus('OFFLINE')
ws.onmessage = response => printMessage(response.data)
