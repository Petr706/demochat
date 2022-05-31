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