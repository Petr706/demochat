export const getFullHeight = function() {
    const body = document.body, html = document.documentElement;
    const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,
                            html.scrollHeight, html.offsetHeight);
    return height
};
export const printMessage = function(value) {
    const li = document.createElement('li');
    li.innerHTML = value;
    messages.appendChild(li);
};

export const loadRecentMsgs = function() {
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
let messageListCounter = 1;
const messages = document.getElementById('messages');
