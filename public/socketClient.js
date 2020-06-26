window.onload = () => {
    const msgArea = document.getElementsByClassName('type_msg')[0];
    const btn = document.getElementById("btn");
    const msgzonne = document.getElementsByClassName('msg_card_body')[0];
    btn.addEventListener("click", (event) => {
        let msg = msgArea.value;

        socket.emit('nouveau_message', msg);
        msgArea.value = '';

        socket.on("message", (message) => {
            let date = Date();
            let heure = date.substr(16, 5);
            console.log(heure);
            let received = ` 

            <div class="d-flex justify-content-start mb-4">
                <div class="img_cont_msg">
                    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg">
                </div>
                <div class="msg_cotainer">
                    ${message}
                    <span class="msg_time">${heure}, Today</span>
                </div>
            </div>`

            msgzonne.innerHTML += received;

        })

    })

}