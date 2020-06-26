window.onload = () => {
    const msgArea = document.getElementsByClassName('type_msg')[0];
    const btn = document.getElementById("btn");

    btn.addEventListener("click", (event) => {
        let msg = msgArea.value;

        socket.emit('nouveau_message', msg);
        msgArea.value = '';

        socket.on("message", (message) => {
            console.log(message);
        })

    })

}