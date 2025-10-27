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
  console.log('� Testing AINEON Server Ports...');
  
  for (const port of PORTS) {
    const result = await testPort(port);
    if (result.success) {
      console.log(`✅ Server running on port ${port}`);
      console.log(`   Health: ${result.data.status}`);
      console.log(`   Services: ${result.data.services.join(', ')}`);
      return port;
    } else {
      console.log(`❌ Port ${port}: ${result.error}`);
    }
  }
  
  console.log('❌ No running server found');
  return null;
}

testAllPorts().then(port => {
  if (port) {
    console.log(`\n� Server is running correctly!`);
    console.log(`� Dashboard: http://localhost:${port}/dashboard/metrics`);
    console.log(`� Health: http://localhost:${port}/health`);
    console.log(`� WebSocket: ws://localhost:${port}/ws`);
  } else {
    console.log('\n� Start the server with: node server-complete.js');
  }
});
