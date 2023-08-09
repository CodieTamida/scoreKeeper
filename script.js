'use strict'


document.querySelector('#add-param-btn').addEventListener('click', () => {
    console.log("Param Button clicked")
    var text = document.getElementById("param").value;
    var p1 = document.createElement("p1");
    var space = document.createElement("br")

    var num = document.getElementById("scores").value;
    var numValue = document.createElement("p1");

    p1.textContent = text;
    numValue.textContent = num;

    var newTextElement = document.createElement('pl');
    var newText = p1.innerText + " is worth " + numValue.innerText + " points!"

    newTextElement.textContent = newText;
    newTextElement.className= "p1";
    document.getElementById('content').appendChild(newTextElement);
    document.getElementById('space').appendChild(space);
    
    console.log(newText)
})

document.getElementById('add-player-btn').addEventListener('click', () => {
    console.log('Add Player btn clicked')
    var name = document.getElementById('name').value;
    var P = document.createElement('newPlayer');

    P.textContent = name;
    P.className = "pClass";
    document.getElementById('nameList').appendChild(P);

    const name2 = document.getElementById('name').value;
    console.log(name2);
    fetch('/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name2 }),
    })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error( 'Error: ', error));
})


/*
document.getElementById('allPlayers').addEventListener('click', () => {
    fetch('')
})
*/