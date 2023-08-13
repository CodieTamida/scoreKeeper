'use strict'


document.querySelector('#add-param-btn').addEventListener('click', () => {
    console.log("Param Button clicked")
    let text = document.getElementById("param").value;
    let p1 = document.createElement("p1");
    let space = document.createElement("br")

    let num = document.getElementById("scores").value;
    let numValue = document.createElement("p1");

    p1.textContent = text;
    numValue.textContent = num;

    let newTextElement = document.createElement('pl');
    let newText = p1.innerText + " is worth " + numValue.innerText + " points!"

    newTextElement.textContent = newText;
    newTextElement.className= "p1";
    document.getElementById('content').appendChild(newTextElement);
    document.getElementById('space').appendChild(space);
    
    console.log(newText)
})

document.getElementById('add-player-btn').addEventListener('click', () => {
    console.log('Add Player btn clicked')
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    //let P = document.createElement('newPlayer');

    //P.textContent = name;
    //P.className = "pClass";

    //const firstname = document.getElementById('firstname').value;
    console.log(firstname, lastname);
    fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstname: firstname, lastname: lastname, id: null}),
    })
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error: ', error));

      
})

document.getElementById('add-param-btn').addEventListener('click', () => {
  let parameter = document.getElementById('param').value;
  let score = document.getElementById('scores').value;
  console.log(param, score);

  fetch('/api/rules', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ parameter: parameter, score: score, rid: null}),
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error: ', error));
})
document.getElementById('add-player-btn').addEventListener('click', () => {
  fetch('/getPlayers', {
    method: 'GET',
  })
  .then((response) => response.json())
  .then((data) => {
    const lastPlayer = data[data.length - 1];
    const tableBody = document.getElementById('playersTable').querySelector('tbody');

    const row = tableBody.insertRow();
    const cell = row.insertCell();

    row.setAttribute('data-id', lastPlayer.id);
    row.classList.add('custom-row');
    cell.classList.add('custom-cell');



    const editCell = row.insertCell();
    const editButton = document.createElement('button');

    editButton.classList.add('custom-cell')

    editCell.classList.add('custom-cell')
    editButton.textContent = 'Edit';
    editCell.append(editButton);
    const deleteCell = row.insertCell();
    const deleteButton = document.createElement('button');

    deleteCell.classList.add('custom-cell');

    deleteButton.textContent = 'Delete';
    deleteButton.classList.add("del-player");
    deleteButton.setAttribute(`data-id`, lastPlayer.id);
    deleteCell.append(deleteButton);
    
    cell.textContent = `${lastPlayer.id} ${lastPlayer.firstname} ${lastPlayer.lastname}`;
    
    const dropdown = document.getElementById('playersDrop');
    const option = document.createElement('option');
    option.setAttribute('data-id', lastPlayer.id)
    //option.value = lastPlayer.id;
    option.textContent = `${lastPlayer.firstname} ${lastPlayer.lastname}`;
    dropdown.appendChild(option);

    console.log(lastPlayer.id);
    console.log(lastPlayer.firstname, lastPlayer.lastname);
    
    })
  .catch(error => {
    console.error("Error fetching players");
  })
})
  


document.addEventListener('click', (event) => {
  if (event.target.classList.contains('del-player')) {
    const playerId = event.target.getAttribute('data-id');
    fetch(`/delete/player/${playerId}`, {
      method: 'DELETE',
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      const tr =document.querySelector(`tr[data-id = "${playerId}"]`);
      //const delDrop = document.getElementById('playersDrop');//.querySelector('option');
      const delDrop = document.getElementById('playersDrop').querySelector(`option[data-id = "${playerId}"]`);
      
      console.log(delDrop);
      delDrop.remove();
      if (tr) {
        tr.remove();
      }
      console.log(tr);
      
     
      
    })
    .catch((error) => console.error('error: ', error));
  }
  
});


//button to redirect to list of players
/*
document.getElementById('playerListPage').addEventListener('click', () => {
  window.location.href = "/playersList.html";
})
*/
document.getElementById('clearList').addEventListener('click', () => {
  fetch('/deleteList', {
    method: 'DELETE', 
  })
  .then((response) => response.json())
  .then((data) => {console.log(data);
  const tds = document.querySelectorAll('#playersTable td');
  tds.forEach(td => {
    td.innerHTML = '';
  })
  })
  .catch(error => {
    console.error("Error deleting Table");
  })
})















/*
document.getElementById('allPlayers').addEventListener('click', () => {
    fetch('')
})
*/