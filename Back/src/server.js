const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const os = require('os');

const app = express();
const port = 8443;

app.use(cors());
app.use(bodyParser.json());

// Get network interfaces
const networkInterfaces = os.networkInterfaces();

// Find the IPv4 address
let ipv4Address;
Object.keys(networkInterfaces).forEach((interfaceName) => {
  const interfaces = networkInterfaces[interfaceName];
  for (const iface of interfaces) {
    if (iface.family === 'IPv4' && !iface.internal) {
      ipv4Address = iface.address;
      break;
    }
  }
});

console.log('IPv4 Address:', ipv4Address);

// Function to get the IP address of the server
function getServerIp() {
  let serverIp = 'Unknown';

  // Find the first IP address that is not 127.0.0.1
  for (const ifaceName in networkInterfaces) {
    const interfaces = networkInterfaces[ifaceName];
    for (let i = 0; i < interfaces.length; i++) {
      const { address, internal } = interfaces[i];
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

app.post('/echo', (req, res) => {
  const userInput = req.body.input;

  console.log(`Received from ${getServerIp()}: ${userInput}`);

  // Send the response with the echoed input, server IP, and IPv4 address
  res.json({ echo: userInput, serverIp: getServerIp(), ipv4Address });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
