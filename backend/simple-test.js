const http = require('http');

const PORTS = [5000, 5001, 5002, 5003, 5004, 5005];

function testPort(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}/health`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.status === 'healthy') {
            resolve({ port, success: true, data: json });
          } else {
            resolve({ port, success: false, error: 'Invalid response' });
          }
        } catch (e) {
          resolve({ port, success: false, error: 'Invalid JSON' });
        }
      });
    });

    req.on('error', () => {
      resolve({ port, success: false, error: 'Connection failed' });
    });

    req.setTimeout(1000, () => {
      req.destroy();
      resolve({ port, success: false, error: 'Timeout' });
    });
  });
}

async function testAllPorts() {
  console.log('í·ª Testing AINEON Server Ports...');
  
  for (const port of PORTS) {
    const result = await testPort(port);
    if (result.success) {
      console.log(`âœ… Server running on port ${port}`);
      console.log(`   Health: ${result.data.status}`);
      console.log(`   Services: ${result.data.services.join(', ')}`);
      return port;
    } else {
      console.log(`âŒ Port ${port}: ${result.error}`);
    }
  }
  
  console.log('âŒ No running server found');
  return null;
}

testAllPorts().then(port => {
  if (port) {
    console.log(`\ní¾‰ Server is running correctly!`);
    console.log(`í³Š Dashboard: http://localhost:${port}/dashboard/metrics`);
    console.log(`í¿¥ Health: http://localhost:${port}/health`);
    console.log(`í´Œ WebSocket: ws://localhost:${port}/ws`);
  } else {
    console.log('\ní²¡ Start the server with: node server-complete.js');
  }
});
