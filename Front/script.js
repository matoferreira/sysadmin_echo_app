function sendToServer() {
  const userInput = document.getElementById('userInput').value;

  fetch('http://localhost:8443/echo', {
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
      const ipv4Address = data.ipv4Address;

      console.log(`Received from ${serverIp} (IPv4: ${ipv4Address}): ${echoedInput}`);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
