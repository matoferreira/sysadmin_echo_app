const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Get the IP address of the server
const serverIp = getServerIp();

app.post('/echo', (req, res) => {
  const userInput = req.body.input;

  console.log(`Received from ${serverIp}: ${userInput}`);

  // Send the response with the echoed input and server IP
  res.json({ echo: userInput, serverIp });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Function to get the IP address of the server
function getServerIp() {
  const os = require('os');
  const interfaces = os.networkInterfaces();
  let serverIp = 'Unknown';

  // Find the first non-internal IP address
  for (const ifaceName in interfaces) {
    const iface = interfaces[ifaceName];
    for (let i = 0; i < iface.length; i++) {
      const { address, internal } = iface[i];
      if (address && address !== '127.0.0.1') {
        serverIp = address;
        break;
      }
    }
    if (serverIp !== 'Unknown') {
      break;
    }
  }

  return serverIp;
}
