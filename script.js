function sendToServer() {
  const userInput = document.getElementById('userInput').value;

  fetch('http://localhost:3000/echo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input: userInput }),
  })
    .then(response => response.json())
    .then(data => {
      const echoedInput = data.echo;
      const serverIp = data.serverIp;

      console.log(`Received from ${serverIp}: ${echoedInput}`);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
