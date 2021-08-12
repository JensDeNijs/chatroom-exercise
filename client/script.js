let socket = io.connect();
let name = "Anonymous";
let id = Math.random().toString(36).substr(2, 9);

//make the h1 use "anonymous" on page load
document.getElementById('headName').innerText = name;

//event listener for the sendAll button
document.getElementById('sendAll').addEventListener('click', () => {

    //function with parameter "sendToAll"
        sendToServer("sendToAll")
})

//event listener for the sendYou button
document.getElementById('sendYou').addEventListener('click', () => {

    //function with parameter "sendToMe"
        sendToServer("sendToMe")
})

//event listener for the changeName button
document.getElementById('changeName').addEventListener('click', () => {

    //if input box is not empty
    if (document.getElementById('name').value !== "") {

        //change the global variable 'name' accordingly and change the h1 on the page
        name = document.getElementById('name').value
        document.getElementById('headName').innerText = name;
    }

    //make the input box value empty again
    document.getElementById('name').value = "";
})

//socket
socket.on('displayMessage', (message) => {

    //put properties of 'allMessages in a variable 'div'
    let div = document.getElementById('allMessages');

    //if the id of the message is the same as our id, then we know it is our message
    if (message.id === id) {
        div.innerHTML += '<div class="row" id="textMe"><span id="time"><div class="ml-auto p-2 ">' + message.time + '</span><span id="textName">' + ' me:' + '</span><br><div class="btn btn-secondary rounded-pill p-1 px-2 " id="textMessage"><span class="">' + message.message + '</span></div></div>';
    } else {
        div.innerHTML += '<div class="row ps-3" id="textYou"><span id="time"><div class="ml-auto p-2 ">' + message.time + '</span><span id="textName">' + " " + message.name + ":" + '</span><br><div class="btn btn-dark rounded-pill p-1 px-2 " id="textMessage"><span class="">' + message.message + '</span></div></div>';
    }

    //make the scrollbar always scroll to the bottom after a new message
    div.scrollTop = div.scrollHeight;
});

//function used to send date to the server depending on if it is for everyone or just for us
function sendToServer(sendToWho) {

    //if the input box is not empty
    if (document.getElementById('message').value !== "") {
        let d = new Date();
        let message = document.getElementById('message').value;
        //randomly generated id to identify if the message is ours
        let n = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);

        //socket emit with an object filled with all the info we need
        socket.emit(sendToWho, ({
            time: n,
            name: name,
            message: message,
            id: id,
        }));

        //make the input box empty and put the focus on the box again
        document.getElementById('message').value = "";
        document.getElementById('message').focus();
    }
}